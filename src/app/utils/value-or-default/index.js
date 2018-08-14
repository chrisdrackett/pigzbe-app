const isUndefined = value => typeof value === 'undefined';

export default (value, defaultValue) => {
    return isUndefined(value) ? defaultValue : value;
};
