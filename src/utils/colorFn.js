/**
 * @description: 调整颜色更亮更暗
 * @param {string} color 六位十六禁止颜色
 * @param {number} range 正负数决定颜色更改 [0 - 255]
 * @return {string} new color
 */
export function adjustColor(color, range) {
    let newColor = '#';
    for (let i = 0; i < 3; i++) {
        const hxStr = color.substr(i * 2 + 1, 2);
        let val = parseInt(hxStr, 16);
        val += range;
        if (val < 0) val = 0;
        else if (val > 255) val = 255;
        newColor += val.toString(16).padStart(2, '0')
    }
    return newColor;
}
/**
 * @description: 混合颜色
 * @param {string} c1 六位十六禁止颜色
 * @param {string} c2 六位十六禁止颜色
 * @param {number} ratio [0 - 1] 调整混合度
 * @return {string} new color
 */
export function mixColor(c1, c2, ratio) {
    ratio = Math.max(Math.min(Number(ratio), 1), 0)
    let r1 = parseInt(c1.substring(1, 3), 16)
    let g1 = parseInt(c1.substring(3, 5), 16)
    let b1 = parseInt(c1.substring(5, 7), 16)
    let r2 = parseInt(c2.substring(1, 3), 16)
    let g2 = parseInt(c2.substring(3, 5), 16)
    let b2 = parseInt(c2.substring(5, 7), 16)
    let r = Math.round(r1 * (1 - ratio) + r2 * ratio)
    let g = Math.round(g1 * (1 - ratio) + g2 * ratio)
    let b = Math.round(b1 * (1 - ratio) + b2 * ratio)
    r = ('0' + (r || 0).toString(16)).slice(-2)
    g = ('0' + (g || 0).toString(16)).slice(-2)
    b = ('0' + (b || 0).toString(16)).slice(-2)
    return '#' + r + g + b
}
