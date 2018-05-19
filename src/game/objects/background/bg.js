export default class Bg {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        const {container, layer} = map.layer.background;

        this.container = container;

        this.sky = layer.sky.objects[0].sprite;

        this.mountains = layer.mountains.objects[0].sprite;
        // this.mountainsY = this.mountains.position.y;

        this.hills = layer.hills.objects[0].sprite;
        this.hills.width = 2048;
        // this.hillsY = this.hills.position.y;


        this.cloudsLow = layer.cloudsLow.objects[0].sprite;
        // this.cloudsLowY = this.cloudsLow.position.y;

        this.cloudsHigh = layer.cloudsHigh.objects[0].sprite;
        // this.cloudsHighY = this.cloudsHigh.position.y;
    }

    update(camera) {
        this.cloudsHigh.tilePosition.x -= 0.048 * camera.dx;
        this.cloudsLow.tilePosition.x -= 0.064 * camera.dx;
        this.mountains.tilePosition.x -= 0.096 * camera.dx;
        this.hills.tilePosition.x -= 0.128 * camera.dx;

        // const yOffset = -0.5 + camera.y / (camera.maxY - camera.h);
        // this.cloudsHigh.position.y = this.cloudsHighY + 4 * yOffset;
        // this.cloudsLow.position.y = this.hillsY + 8 * yOffset;
        // this.mountains.position.y = this.mountainsY + 12 * yOffset;
        // this.hills.position.y = this.hillsY + 16 * yOffset;
    }
}
