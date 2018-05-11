import {OBJECT_LAYER, TILE_LAYER, IMAGE_LAYER} from './layer-type';

import {
    Sprite,
    Texture,
    utils,
    // RenderTexture,
    Container,
    Rectangle,
    Graphics,
    extras
} from 'pixi.js';

function getGraphic(object, color = 0xff0000) {
    const container = new Container();
    const graphic = new Graphics();
    graphic.lineStyle(2, color);

    if (object.polygon) {
        graphic.drawPolygon(object.polygon);
    } else if (object.polyline) {
        graphic.drawPolygon(object.polyline);
    } else if (object.ellipse) {
        graphic.drawEllipse(0, 0, object.halfW, object.halfH);
    } else {
        graphic.drawRect(0, 0, object.width, object.height);
    }
    container.addChild(graphic);
    return container;
}

// function renderTileLayer2(layer, app) {
//     const renderTexture = RenderTexture.create(layer.width, layer.height);
//     const holder = new Container();
//     layer.objects.forEach((object) => {
//         const {frame, x, y} = object;
//         const sprite = Sprite.from(frame.id);
//         sprite.position.set(x, y);
//         holder.addChild(sprite);
//     });
//     app.renderer.render(holder, renderTexture);
//     const sprite = new Sprite(renderTexture);
//     sprite.position.set(layer.x, layer.y);
//     return sprite;
// }

function createFrameTexture(frame) {
    if (!frame) {
        return null;
    }
    if (!utils.TextureCache[frame.id]) {
        const tex = Texture.from(frame.image);
        const rect = new Rectangle(tex.frame.x + frame.x, tex.frame.y + frame.y, frame.width, frame.height);
        utils.TextureCache[frame.id] = new Texture(tex.baseTexture, rect);
    }
    return utils.TextureCache[frame.id];
}

function getSprite(frame) {
    // console.log(' getSprite', frame);
    if (frame.animation) {
        const textures = frame.animation.map(a => ({
            texture: Texture.from(a.id),
            time: a.duration
        }));
        const sprite = new extras.AnimatedSprite(textures, true);
        sprite.play();
        return sprite;
    }

    return Sprite.from(frame.id);
}

function flipSprite(object, sprite) {
    if (object.flippedH || object.flippedV || object.flippedD) {
        sprite.tint = 0xff0000;
    }

    const {width, height} = object.frame;

    if (object.flippedH) {
        sprite.scale.x = -1;
        sprite.x += width;
    }

    if (object.flippedV) {
        sprite.scale.y = -1;
        sprite.position.y += height;
    }

    if (object.flippedD) {
        sprite.rotation = Math.PI / 2;
        sprite.scale.x *= -1;

        const scaleX = sprite.scale.x;
        sprite.scale.x = sprite.scale.y;
        sprite.scale.y = scaleX;

        const halfDiff = Math.abs(height / 2) - Math.abs(width / 2);
        sprite.position.y += halfDiff;
        sprite.position.x += halfDiff;
    }
}

function renderTileLayer(layer) {
    const holder = new Container();
    let animated = false;
    layer.objects.forEach(object => {
        const {frame, x, y} = object;
        // console.log('frame', frame);
        if (!frame) {
            console.log('No frame', object);
        }
        if (frame.animation) {
            animated = true;
        }
        const sprite = getSprite(frame);
        sprite.position.set(x, y);
        flipSprite(object, sprite);
        holder.addChild(sprite);
    });
    holder.position.set(layer.x, layer.y);
    holder.cacheAsBitmap = !animated;
    return holder;
}

function renderObjectLayer(layer) {
    const holder = new Container();
    holder.position.set(layer.x, layer.y);
    layer.objects.forEach((object) => {
        const {frame, x, y} = object;
        if (frame) {
            const sprite = getSprite(frame);
            sprite.position.set(x, y);
            flipSprite(object, sprite);
            holder.addChild(sprite);
            // FIXME: temp
            object.gfx = sprite;
        } else {
            const g = getGraphic(object);
            g.position.set(x, y);
            holder.addChild(g);
            // FIXME: temp
            object.gfx = g;
        }
    });
    return holder;
}

function renderImageLayer(layer) {
    const object = layer.objects[0];
    const img = Sprite.from(object.frame);
    img.position.set(layer.x, layer.y);
    return img;
}

function createLayerTextures(layer, frames) {
    layer.objects.forEach(object => {
        createFrameTexture(object.frame);
        if (object.frame.animation) {
            object.frame.animation.forEach(a => {
                createFrameTexture(frames[a.gid]);
            });
        }
    });
}

function renderLayer(layer) {
    switch (layer.type) {
        case TILE_LAYER:
            return renderTileLayer(layer);
            break;
        case OBJECT_LAYER:
            return renderObjectLayer(layer);
            break;
        case IMAGE_LAYER:
            return renderImageLayer(layer);
            break;
        default:
    }
    return null;
}

export default function renderMap(map) {
    const container = new Container();
    map.layers.forEach(layer => {
        createLayerTextures(layer, map.frames);
        const ob = renderLayer(layer);
        if (!ob) {
            console.error('Render layer failed', layer.name);
        }
        container.addChild(ob);
    });
    // app.stage.addChild(container);

    // map.layers.filter((layer) => layer.type === TILE_LAYER).forEach((layer) => {});

    // const a = map.layer.tilelayerA;
    // app.stage.interactive = true;
    // app.stage.on('mousedown', (event) => {
    //     console.log('event.data', event.data.global);
    //     const tile = a.tileAt(event.data.global.x, event.data.global.y);
    //     console.log('tile', tile);
    // });
    return container;
}
