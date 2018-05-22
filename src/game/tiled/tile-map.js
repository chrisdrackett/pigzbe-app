import getTilemapFrames from './get-tilemap-frames';
import getTilemapLayers from './get-tilemap-layers';
import renderMap from './render-map';
import {OBJECT_LAYER, TILE_LAYER, IMAGE_LAYER} from './layer-type';

function getBgColor(mapJSON) {
    return mapJSON.backgroundcolor && parseInt(mapJSON.backgroundcolor.slice(1), 16);
}

function layerMap(layers) {
    return layers.reduce((obj, layer) => {
        obj[layer.name] = layer;
        return obj;
    }, {});
}

export default function TileMap(map) {
    const tileWidth = map.tilewidth;
    const tileHeight = map.tileheight;
    const cols = map.width;
    const rows = map.height;
    const width = cols * tileWidth;
    const height = rows * tileHeight;

    const bgColor = getBgColor(map);
    const frames = getTilemapFrames(map);
    const layers = getTilemapLayers(map, frames);
    const layer = layerMap(layers);

    const tileMap = {
        map,
        frames,
        bgColor,
        layers,
        layer,
        width,
        height,
        tileWidth,
        tileHeight,
    };

    function render(renderer, opts) {
        return renderMap(tileMap, renderer, opts);
    }

    function renderLayer(layerName, renderer, opts = {}) {
        return renderMap(tileMap, renderer, Object.assign(opts, {layer: layerName}));
    }

    return Object.assign(tileMap, {
        render,
        renderLayer
    });
}

TileMap.OBJECT_LAYER = OBJECT_LAYER;
TileMap.TILE_LAYER = TILE_LAYER;
TileMap.IMAGE_LAYER = IMAGE_LAYER;
