export default class Background {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        this.mountains = map.layer.mountains.sprite;
        this.mountains.width = map.width;
        this.mountainsY = this.mountains.position.y;

        this.hills = map.layer.hills.sprite;
        this.hills.width = map.width;
        this.hillsY = this.hills.position.y;

        this.cloudsLow = map.layer.cloudsLow.sprite;
        this.cloudsLow.width = map.width;
        this.cloudsLowY = this.cloudsLow.position.y;

        this.cloudsHigh = map.layer.cloudsHigh.sprite;
        this.cloudsHigh.width = map.width;
        this.cloudsHighY = this.cloudsHigh.position.y;
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
