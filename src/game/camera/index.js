// import lerp from 'usfl/math/lerp';
const {round, min, max} = Math;

export default class Camera {
    constructor({target, w, h, maxX, maxY, wrapW}) {
        this.target = target;
        this.tx = 0;
        this.ty = 0;
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.maxX = maxX;
        this.maxY = maxY;
        this.wrapW = wrapW;

        this.hw = w / 2;
        this.hh = h / 2;

        this.dx = 0;
        this.dy = 0;
        this.lx = 0;
        this.ly = 0;
        this.rx = 0;

        this.top = 0;
        this.right = w;
        this.bottom = h;
        this.left = 0;
    }

    update() {
        this.tx = this.target.x - this.hw;
        this.ty = this.target.y - this.hh;
        this.x = round(this.tx);
        this.y = round(this.ty);
        // this.x = round(lerp(this.x, this.tx, 0.1));
        // this.y = round(lerp(this.y, this.ty, 0.1));

        if (this.maxX) {
            this.x = max(0, min(this.x, this.maxX - this.w));
        }

        if (this.maxY) {
            this.y = max(0, min(this.y, this.maxY - this.h));
        }

        this.dx = this.lx - this.x;
        this.lx = this.x;
        this.dy = this.ly - this.y;
        this.ly = this.y;
        // this.rx = this.x % this.wrapW;
        this.rx = this.x;
        while (this.rx < 0) {
            this.rx += this.wrapW;
        }
        while (this.rx > this.wrapW) {
            this.rx -= this.wrapW;
        }

        this.top = this.y;
        this.right = this.rx + this.w;
        this.bottom = this.y + this.h;
        this.left = this.rx;
    }

    resize(w, h) {
        this.w = w;
        this.h = h;
        this.hw = w / 2;
        this.hh = h / 2;
    }
}
