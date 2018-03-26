import {DOMParser} from 'xmldom-qsa';
import * as PIXI from 'pixi.js';
import fontTxt from './font';

export const registerFont = texture => {
    const xmlData = new DOMParser().parseFromString(fontTxt, 'application/xml');
    PIXI.extras.BitmapText.registerFont(xmlData, texture);
};
