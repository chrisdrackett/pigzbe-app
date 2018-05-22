export default class Intro {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        this.container = map.layer.intro.object.intro.container;
    }

    remove() {
        this.container.parent.removeChild(this.container);
    }
}
