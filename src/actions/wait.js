export default (time, value) => new Promise(resolve => setTimeout(() => resolve(value), time * 1000));
