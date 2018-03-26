export default function truncate(string, length, suffix = '...') {
    const cut = string.indexOf(' ', length);
    if (cut === -1) return string;
    return string.substring(0, cut) + suffix;
}
