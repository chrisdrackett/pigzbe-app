const TIMEOUT_DEFAULT = 10000;

export default (url, timeout = TIMEOUT_DEFAULT) => new Promise(async (resolve, reject) => {
    let hasTimedOut = false;

    const timeoutId = setTimeout(() => {
        hasTimedOut = true;
        reject(new Error('Request timed out'));
    }, timeout);

    try {
        const json = await (await fetch(url)).json();
        clearTimeout(timeoutId);
        if (hasTimedOut) {
            return;
        }
        resolve(json);
    } catch (error) {
        if (hasTimedOut) {
            return;
        }
        reject(error);
    }
});
