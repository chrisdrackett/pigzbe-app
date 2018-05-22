import random from 'usfl/math/random';

const SPEED_MIN = 2;
const SPEED_MAX = 4;
const START_MIN = 100;
const START_MAX = 800;
const RANGE_Y = 30;

export default class Birds {
    constructor(map) {
        this.create(map);
    }

    create(map) {
        this.container = map.layer.birds.container;
        this.w = map.width;

        this.birds = this.container.children.map(b => ({
            x: b.position.x,
            y: b.position.y,
            speed: random(SPEED_MIN, SPEED_MAX),
            sprite: b
        }));

    }

    updateBird(bird, camera, delta) {
        bird.x -= bird.speed * delta - camera.dx;

        if (bird.x < -100) {
            bird.x = camera.w + random(START_MIN, START_MAX);
            bird.sprite.position.y = bird.y + random(-RANGE_Y, RANGE_Y);
            bird.speed = random(SPEED_MIN, SPEED_MAX);
        }

        bird.sprite.position.x = bird.x;
    }

    update(camera, delta) {
        this.container.position.y = 0 - camera.y;

        const [a, b] = this.birds;
        this.updateBird(a, camera, delta);
        this.updateBird(b, camera, delta);
    }
}
