import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import CleanCSS from 'clean-css';
import { classy } from 'utils';
import { getRequester } from 'server/utils';

// Release hash
// provided by deploy script
const version = process.env.RELEASE;

// Load index template and core.css
const indexTemplate = fs.readFileSync(path.join(__dirname, 'template.html.ejs'), 'utf8');
const core_css_uncompressed = fs.readFileSync(path.join(process.cwd(), 'app/assets/core.css'), 'utf8');
const core_css = new CleanCSS().minify(core_css_uncompressed).styles;

export default function generateHTML({ rendered, head, store, req, cache }) {
    const reqUser = getRequester(req.headers['user-agent']);

    const html = ejs.render(indexTemplate, {
        head,
        appHTML: rendered.markup,
        core_css,
        version,
        preloadedState: store.getState(),
        htmlClass: classy(reqUser === 'googlebot' && 'googlebot'),
    });

    if (cache) {
        // Avoid caching if request was not successful
        // only status 2xx is cached
        const status = rendered.context.status || 200;
        let toSave = html;

        if (status >= 300 || req.url.indexOf('/customer') === 0) {
            toSave = null;
        }

        cache.finishRender(req.url, reqUser, toSave);
    }

    return html;
}
