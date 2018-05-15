export default function intersects(obA, obB) {
    return !(obB.left >= obA.right ||
           obB.right <= obA.left ||
           obB.top >= obA.bottom ||
           obB.bottom <= obA.top);
}
