const {round, min, max} = Math;

export default class Camera {
    constructor({target, w, h, maxX, maxY}) {
        this.target = target;
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.maxX = maxX;
        this.maxY = maxY;

        this.hw = w / 2;
        this.hh = h / 2;

        this.dx = 0;
        this.dy = 0;
        this.lx = 0;
        this.ly = 0;
    }

    update() {
        this.x = round(this.target.x - this.hw);
        this.y = round(this.target.y - this.hh);

        this.x = max(0, min(this.x, this.maxX - this.w));
        this.y = max(0, min(this.y, this.maxY - this.h));

        this.dx = this.lx - this.x;
        this.lx = this.x;
        this.dy = this.ly - this.y;
        this.ly = this.y;
    }

    resize(w, h) {
        this.w = w;
        this.h = h;
        this.hw = w / 2;
        this.hh = h / 2;
    }
}
