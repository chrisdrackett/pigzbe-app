const remote = window.require('electron').remote;
const {dialog} = remote;
const fs = remote.require('fs');
const path = remote.require('path');


export const openImagePicker = () => {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog({
            filters: [
                {name: 'Image Files', extensions: ['jpg', 'png']}
            ]
        }, fileNames => {
            if (!fileNames) {
                // cancelled
                reject({error: null});
                return;
            }

            const [fileName] = fileNames;

            fs.readFile(fileName, (error, data) => {
                if (error) {
                    reject({error});
                    return;
                }

                const extensionName = path.extname(fileName);
                const base64Image = new Buffer(data, 'binary').toString('base64');
                const uri = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;

                console.log('uri', uri);

                resolve({uri});
            });
        });
    });
};
