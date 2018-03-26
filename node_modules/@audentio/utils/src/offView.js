// Check if element is inside specified container (window by default)
// pass these (if you have them cached) to improve performance
// scrollY boundingClientRect, windowHeight,
// windowWidth, scrollX - if you're checking horizontal as well
export default function offView (element, params) {

    const scrollY = params.scrollY === undefined ? window.scrollY : scrollY;
    const rect = params.boundingClientRect || element.getBoundingClientRect();
    const windowHeight = params.windowHeight || window.innerHeight;
    const windowWidth = params.windowHeight || window.innerWidth;

    if (rect.top > (scrollY + windowHeight)) return true; // below viewport
    if ((rect.top + rect.height) < scrollY) return true; // above viewport

    return false; // Not offview
}
