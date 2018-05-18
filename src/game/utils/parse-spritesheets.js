import {Spritesheet} from 'pixi.js';

const removeFolderNames = json => {
    return Object.assign(json, {
        frames: Object.keys(json.frames).reduce((ob, key) => {
            ob[key.split('/').pop()] = json.frames[key];
            return ob;
        }, {})
    });
};

const parseSpritesheet = ({baseTexture, json}) => new Promise(resolve => {
    const sprites = new Spritesheet(baseTexture, removeFolderNames(json));
    sprites.parse(textures => resolve(textures));
});

export default async sheets => {
    const allTextures = [];
    for (const sheet of sheets) {
        const textures = await parseSpritesheet(sheet);
        allTextures.push(...Object.keys(textures));
    }
    return allTextures;
};
