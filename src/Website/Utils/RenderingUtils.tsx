export function getCenterLocation(width: number, height: number, parent: any) {
    const parentX = (parent.screen.width / 2) - (width / 2);
    const parentY = (parent.screen.height / 2) - (height / 2);

    return Object.entries({
        "width": width,
        "height": height,
        "left": parentX,
        "top": parentY
    }).map(([k, v]) => `${k} = ${v}`).join(',');
}