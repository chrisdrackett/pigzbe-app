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

const checkDuplicateKeys = entries => {
    const keys = [];
    entries.forEach(entry => {
        const entryKeys = Object.keys(entry);
        const duplicateKeys = entryKeys.filter(key => keys.includes(key));
        if (duplicateKeys.length) {
            throw new Error(`Duplicate key ${duplicateKeys.join(',')}`);
        }
        keys.push(...entryKeys);
    });
    return entries;
};

getEntry('5W591xuNMW22EayaUCwyEC')
    .then(data => data.includes.Entry.map(entry => entry.fields))
    .then(entries => checkDuplicateKeys(entries))
    .then(entries => Object.assign({}, ...entries))
    .then(fields => exportJSON(fields))
    .catch(error => console.error(error));
