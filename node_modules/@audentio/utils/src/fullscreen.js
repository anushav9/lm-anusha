const fullscreen = {
    lastScrollPos: null,
};

fullscreen.isAvailable = () => {
    if (document.fullscreenEnabled ||
        document.msFullscreenEnabled ||
        document.mozFullscreenEnabled ||
        document.webkitFullscreenEnabled) {
        return true;
    }
    return false;
};

fullscreen.isEnabled = () => {
    if (document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement) {
        return true;
    }
    return false;
};

fullscreen.enter = (elem) => {
    elem = (elem instanceof HTMLElement) ? elem : document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

fullscreen.exit = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

fullscreen.toggle = (elem) => {
    if (fullscreen.isEnabled()) {
        fullscreen.exit();
    } else {
        fullscreen.enter(elem);
    }
};

export default fullscreen;
