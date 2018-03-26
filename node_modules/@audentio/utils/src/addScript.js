import xhr from './xhr';
import logger from './logger';

export default function addScript(params) {
    if (document.getElementById(`Peapod_${params.id}_script`)) {
        params.callback(true);
        return;
    }

    const addToPage = (cb) => {
        const script = document.createElement('script');
        script.id = `Peapod_${params.id}_script`;
        script.type = 'text/javascript';
        script.src = params.url;
        if (cb) script.onload = (res, status) => cb(true, status);
        document.head.appendChild(script);
    };

    if (params.ajax) {
        xhr({
            url: params.url,
            success: () => addToPage(params.callback),
            error: () => {
                logger.error('[addScript] Unable to load script');
            },
        });
    } else {
        addToPage(params.callback);
    }
}
