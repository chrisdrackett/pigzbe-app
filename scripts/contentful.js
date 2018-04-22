const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const writeFile = (filepath, content) => {
    fs.writeFile(filepath, content, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Strings saved from Contentful');
    });
};

const exportJSON = fields => {
    const filepath = path.join(__dirname, '../src/app/constants/strings.json');
    const content = JSON.stringify(fields, null, 2);
    console.log(content);
    writeFile(filepath, content);
};

const getEntry = id => {
    const {space, accessToken} = pkg.contentful;
    const uri = `https://cdn.contentful.com/spaces/${space}/entries?access_token=${accessToken}&sys.id=${id}`;
    return axios.get(uri).then(res => res.data);
};

getEntry('3XEFz4Mf3qqMSaUSeKEM8e')
    .then(({items}) => items.pop())
    .then(({fields}) => exportJSON(fields))
    .catch(error => {
        console.error(error.message);
    });
