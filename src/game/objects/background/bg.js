export default class Bg {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const {container, layer} = map.layer.background;

        this.container = container;

        this.sky = layer.sky.objects[0].sprite;

        this.mountains = layer.mountains.objects[0].sprite;
        this.mountains.texture.baseTexture.mipmap = false;

        this.hills = layer.hills.objects[0].sprite;
        this.hills.texture.baseTexture.mipmap = false;

        this.cloudsLow = layer.cloudsLow.objects[0].sprite;
        this.cloudsLow.texture.baseTexture.mipmap = false;

        this.cloudsHigh = layer.cloudsHigh.objects[0].sprite;
        this.cloudsHigh.texture.baseTexture.mipmap = false;
    }

    update(camera) {
        this.cloudsHigh.tilePosition.x -= 0.048 * camera.dx;
        this.cloudsLow.tilePosition.x -= 0.064 * camera.dx;
        this.mountains.tilePosition.x -= 0.096 * camera.dx;
        this.hills.tilePosition.x -= 0.128 * camera.dx;
    }
}
