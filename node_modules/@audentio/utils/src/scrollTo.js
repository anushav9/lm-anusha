// @flow

import { easeInOutQuad } from './easings';

type scrollConfig = {
    callback?: Function,
    duration: number,
    targetNode: any,
    easing: Function,
};

export default function scrollTo(to: number, 
    {
        callback,
        duration = 500,
        targetNode = window,
        easing = easeInOutQuad,
    }: scrollConfig = {},
) {
    const initialY = targetNode.scrollY;
    const initialX = targetNode.scrollX;
    
    if (duration) {
        const diff = to - initialY;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;

            const newScrollTop = easing(currentTime, initialY, diff, duration);
            targetNode.scrollTo(initialX, newScrollTop); // eslint-disable-line no-param-reassign

            // animate unless its over
            if (currentTime < duration) {
                window.requestAnimationFrame(animateScroll);
            } else if (callback && typeof callback === 'function') {
                callback();
            }
        };
        
        animateScroll();
    } else {
        targetNode.scrollTo(initialX, to);
    }
}
