const TIMEOUT_DEFAULT = 3000;

export default (url, timeout = TIMEOUT_DEFAULT) => new Promise((resolve, reject) => {
    let hasTimedOut = false;

    const timeoutId = setTimeout(() => {
        hasTimedOut = true;
        reject(new Error('Request timed out'));
    }, timeout);

    return fetch(url)
        .then(res => res.json())
        .then(json => {
            clearTimeout(timeoutId);
            if (hasTimedOut) {
                return;
            }
            resolve(json);
        })
        .catch(err => {
            if (hasTimedOut) {
                return;
            }
            reject(err);
        });
});
