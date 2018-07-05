export const load = key => {
    return new Promise(resolve => {
        let saved = localStorage.getItem(key);
        try {
            saved = JSON.parse(saved);
        } catch (e) {}

        resolve(saved && typeof saved === 'object' ? saved : {});
    });
};

export const save = (key, ob) => {
    localStorage.setItem(key, JSON.stringify(ob));
    return Promise.resolve();
};

export const clear = key => {
    localStorage.removeItem(key);
    return Promise.resolve();
};

export default module.exports;
