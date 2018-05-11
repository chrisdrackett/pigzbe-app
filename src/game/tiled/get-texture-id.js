export default url => url.slice(url.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, '');
