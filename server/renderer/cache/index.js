// Cache wrapper
// -- 2fast4u

import { getRequester } from 'server/utils';
import * as cache from './store';

// Cache life (in seconds)
// if cache is older than this, visitor will be served new content immediately
const CACHE_LIFE = 3600; 

// Cache half life (in seconds)
// if cache is older than this, visitor will be served cached content 
// and new content will start rendering in background
// next visitor will see new content
const CACHE_SHORT_LIFE = 300; // 5 minutes

// returns cache-enabled render function
// which only renders page if there's no cache or cache-life is up
const withCache = render => req =>
    new Promise((resolve, reject) => {
        const reqUser = getRequester(req.headers['user-agent']);

        const catchRenderError = error => {
            // remove from cache, so it's re-rendered on next request
            // avoids error pages from being served from cache
            cache.remove(req.url, reqUser); 
            reject(error);
        };

        cache.get(req.url, reqUser)
            .then(cached => {
                const cache_age = cached && cache.age(req.url, reqUser);

                if (cached && cache_age < CACHE_LIFE) {
                    // send cached content
                    resolve({ html: cached });

                    if (cache_age > CACHE_SHORT_LIFE) {
                        // cache's short life is up
                        // Re-render this page asyncrhonously
                        // unless it's already rendering
                        if (!cache.isRendering(req.url, reqUser)) {
                            render(req, cache)
                                .catch(catchRenderError);
                        }
                    }
                } else {
                    // cache expired or doesn't exist
                    // wait for the new render
                    render(req, cache)
                        .then(resolve)
                        .catch(catchRenderError);
                }
            });
    });

export default withCache;
