export const getHostnameByUrl = (url) => {
    return new URL(url).hostname;
};