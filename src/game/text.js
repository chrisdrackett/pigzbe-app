import * as PIXI from 'pixi.js';

export default class Text extends PIXI.extras.BitmapText {
    constructor(value, size = 32) {
        super(value, {font: `${size * 2}px Chalkboard`});
        this.scale.set(0.5);
    }
}
