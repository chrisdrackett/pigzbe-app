import getTextureId from './get-texture-id';

const getGid = (tileset, localGid) => String(Number(tileset.firstgid) + Number(localGid));

function getFrame(tile, localGid, tileset, appendGid = false) {
    const {name, tilewidth, tileheight} = tileset;
    const {type, animation} = tile;
    const image = tile.image || tileset.image;
    const gid = getGid(tileset, localGid);
    const textureId = getTextureId(image);

    return {
        gid,
        id: `${textureId}${appendGid ? gid : ''}`,
        x: tile.x || 0,
        y: tile.y || 0,
        width: tilewidth,
        height: tileheight,
        tilesetName: name,
        animation,
        type,
        image: textureId
    };
}

function getTilesetSheet(tileset) {
    const {columns, margin, spacing, tilewidth, tileheight, tilecount} = tileset;

    const frames = {};
    let x = margin;
    let y = margin;
    for (let i = 0; i < tilecount; i++) {
        if (i > 0 && i % columns === 0) {
            x = margin;
            y += tileheight + spacing;
        }
        const animation = tileset.tiles[i] && tileset.tiles[i].animation;
        const frame = getFrame({x, y, animation}, i, tileset, true);
        frames[frame.gid] = frame;
        x += tilewidth + spacing;
    }
    return frames;
}

function getTilesetItems(tileset) {
    if (!tileset.tiles) {
        console.error('Tileset not embedded', tileset.source.split('/').pop());
    }
    return Object.keys(tileset.tiles)
        .reduce((newOb, localGid) => {
            const tile = tileset.tiles[localGid];
            const frame = getFrame(tile, localGid, tileset);
            newOb[frame.gid] = frame;
            return newOb;
        }, {});
}

function getTilesetFrames(tileset) {
    const frames = tileset.columns ? getTilesetSheet(tileset) : getTilesetItems(tileset);
    Object.values(frames).forEach(frame => {
        if (frame.animation) {
            frame.animation = frame.animation.map(a => {
                const gid = getGid(tileset, a.tileid);
                return Object.assign(a, {id: frames[gid].id, gid});
            });
        }
    });
    return frames;
}

export default map => map.tilesets.reduce((ob, set) => Object.assign(ob, getTilesetFrames(set)), {});
