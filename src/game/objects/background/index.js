import LayerWrapper from '../../utils/layer-wrapper';
import Bg from './bg';

export default class Background {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        this.bgA = new Bg(map);

        // render a 2nd copy of bg
        map.renderLayer('background');
        this.bgB = new Bg(map);

        this.wrapper = new LayerWrapper(this.bgA.container, this.bgB.container, map.width);
        this.container = this.wrapper.container;
    }

    update(camera) {
        this.wrapper.update(camera);
        this.bgA.update(camera);
        this.bgB.update(camera);
    }
}
