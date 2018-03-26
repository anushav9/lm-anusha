export default function capitalize(string) {
    const len = string.length;
    if (len > 1) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else if (len === 1) {
        return string.charAt(0).toUpperCase();
    }
    return string;
}
