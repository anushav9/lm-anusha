// check who's requesting the page
export default function getRequester(userAgent) {
    if (userAgent && userAgent.indexOf('Googlebot/2.1') > -1) return 'googlebot';
    return 'user';
}
