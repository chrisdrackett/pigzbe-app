const key = 'state';

export const load = () => {
    return new Promise(resolve => {
        let saved = localStorage.getItem(key);
        try {
            saved = JSON.parse(saved);
        } catch (e) {}

        resolve(saved && typeof saved === 'object' ? saved : {});
    });
};

export const save = state => {
    localStorage.setItem(key, JSON.stringify(state));
    return Promise.resolve();
};

export const clear = () => {
    localStorage.clear();
    return Promise.resolve();
};
