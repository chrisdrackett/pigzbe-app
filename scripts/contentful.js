const pkg = require('../package.json');
const {createClient} = require('contentful');
const fs = require('fs');
const path = require('path');

const client = createClient(pkg.contentful);

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
    const filepath = path.join(__dirname, '../src/data/strings.json');

    const content = JSON.stringify(fields, null, 2);

    console.log(content);

    writeFile(filepath, content);
};

// const exportJS = fields => {
//     const filepath = path.join(__dirname, '../src/data/strings.js');
//
//     const content = Object.keys(fields)
//         .map(key => `export const ${key} = '${fields[key]}';\n`)
//         .join('');
//
//     writeFile(filepath, content);
// };

client.getEntry('3XEFz4Mf3qqMSaUSeKEM8e')
    .then(({fields}) => {
        exportJSON(fields);
        // exportJS(fields);
    })
    .catch(error => {
        console.error(error.message);
    });
