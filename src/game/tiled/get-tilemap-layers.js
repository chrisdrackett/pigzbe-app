import getTextureId from './get-texture-id';
import {OBJECT_LAYER, TILE_LAYER, IMAGE_LAYER} from './layer-type';

const FLIPPED_HORIZONTALLY = 0x80000000;
const FLIPPED_VERTICALLY = 0x40000000;
const FLIPPED_DIAGONALLY = 0x20000000;

function getTileY(index, layerWidth) {
    return Math.floor(index / layerWidth);
}

function getTileX(index, layerWidth) {
    return index - getTileY(index, layerWidth) * layerWidth;
}

function flattenPath(path) {
    return path.reduce((arr, point) => {
        arr.push(point.x, point.y);
        return arr;
    }, []);
}

function getImagelayer(layer) {
    console.log('getImagelayer', layer);
    return [Object.assign({}, layer, {
        frame: getTextureId(layer.image)
    })];
}

function getTileLayer(layer, mapFrames, tileWidth, tileHeight) {
    return layer.data.map((gid, index) => {
        if (gid < 1) {
            return gid;
        }

        const flippedD = !!(gid & FLIPPED_DIAGONALLY);
        const flippedH = !!(gid & FLIPPED_HORIZONTALLY);
        const flippedV = !!(gid & FLIPPED_VERTICALLY);

        gid = gid & ~(FLIPPED_HORIZONTALLY | FLIPPED_VERTICALLY | FLIPPED_DIAGONALLY);

        const frame = mapFrames[gid];
        if (!frame) {
            console.error('Frame not found', gid);
        }
        // tiled reg point is bottom left:
        const yOffset = frame && frame.height > tileHeight ? tileHeight - frame.height : 0;

        const col = getTileX(index, layer.width);
        const row = getTileY(index, layer.width);
        const x = col * tileWidth;
        const y = row * tileHeight + yOffset;

        return {
            index,
            tile: gid,
            gid,
            x,
            y: y,
            col,
            row,
            width: tileWidth,
            height: tileHeight,
            frame,
            top: y,
            right: x + tileWidth,
            bottom: y + tileHeight,
            left: x,
            flippedH,
            flippedV,
            flippedD
        };
    })
        .filter(item => !!item);
}

function getObjectGroup(layer, mapFrames) {
    return layer.objects.map(object => {
        const frame = mapFrames[object.gid];
        const yOffset = frame ? 0 - object.height : 0;
        const scale = {
            x: frame ? object.width / frame.width : 1,
            y: frame ? object.height / frame.height : 1
        };

        if (object.polygon) {
            const path = flattenPath(object.polygon);
            object.polygon = path.concat(path.slice(0, 2));
        } else if (object.polyline) {
            object.polyline = flattenPath(object.polyline);
        } else if (object.ellipse) {
            object.halfW = object.width / 2;
            object.halfH = object.height / 2;
            object.x += object.halfW;
            object.y += object.halfH;
        }

        const y = object.y + yOffset;
        const type = object.type || (frame && frame.type) || '';

        return Object.assign({}, object, {
            frame,
            y,
            top: y,
            right: object.x + object.width,
            bottom: y + object.height,
            left: object.x,
            type,
            scale
        });
    });
}

function getLayerObjects(layer, mapFrames, tileWidth, tileHeight) {
    switch (layer.type) {
        case TILE_LAYER:
            return getTileLayer(layer, mapFrames, tileWidth, tileHeight);
        case OBJECT_LAYER:
            return getObjectGroup(layer, mapFrames);
        case IMAGE_LAYER:
            return getImagelayer(layer);
        default:
            console.error('Unknown layer type:', layer && layer.type);
    }
    return [];
}

export default function getTilemapLayers(mapJSON, mapFrames) {
    const tileWidth = mapJSON.tilewidth;
    const tileHeight = mapJSON.tileheight;

    return mapJSON.layers.map((layer, z) => {
        const {offsetx, offsety} = layer;
        const l = Object.assign({}, layer, {
            cols: layer.width,
            rows: layer.height,
            x: offsetx || 0,
            y: offsety || 0,
            z,
            objects: getLayerObjects(layer, mapFrames, tileWidth, tileHeight),
            width: layer.width * tileWidth,
            height: layer.height * tileHeight,
            tileWidth,
            tileHeight
        });

        switch (l.type) {
            case TILE_LAYER:
                l.map = l.objects.reduce((ob, object) => {
                    ob['tile' + object.index] = object;
                    return ob;
                }, {});
                l.tileAt = function(x, y) {
                    x = Math.floor(x / tileWidth);
                    y = Math.floor(y / tileHeight);
                    const index = x + y * l.cols;
                    return l.map['tile' + index];
                };
                break;
            case OBJECT_LAYER:
                l.map = l.objects.reduce((ob, object) => {
                    if (object.name) {
                        if (ob[object.name]) {
                            console.warn('Duplicate object name:', object.name);
                        }
                        ob[object.name] = object;
                    }
                    return ob;
                }, {});
                break;
            default:

        }
        return l;
    });
}
