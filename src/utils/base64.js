const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64DecodeChars = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
];
export function encode(s) {
    if (!s) {
        return;
    }
    s += '';
    if (s.length === 0) {
        return s;
    }
    s = escape(s);

    var i, b, x = [],
        padchar = map[64];
    var len = s.length - s.length % 3;

    for (i = 0; i < len; i += 3) {
        b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8) | s.charCodeAt(i + 2);
        x.push(map.charAt(b >> 18));
        x.push(map.charAt((b >> 12) & 0x3f));
        x.push(map.charAt((b >> 6) & 0x3f));
        x.push(map.charAt(b & 0x3f));
    }

    switch (s.length - len) {
        case 1:
            b = s.charCodeAt(i) << 16;
            x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar);
            break;
        case 2:
            b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8);
            x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar);
            break;
    }
    return x.join('');
}

export function decode(s) {
    s += '';
    var len = s.length;
    if ((len === 0) || (len % 4 !== 0)) {
        return s;
    }

    var pads = 0;
    if (s.charAt(len - 1) === map[64]) {
        pads++;
        if (s.charAt(len - 2) === map[64]) {
            pads++;
        }
        len -= 4;
    }

    var i, b, x = [];
    for (i = 0; i < len; i += 4) {
        b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i + 1)) << 12) | (map.indexOf(s.charAt(i + 2)) << 6) | map.indexOf(s.charAt(i + 3));
        x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff, b & 0xff));
    }

    switch (pads) {
        case 1:
            b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12) | (map.indexOf(s.charAt(i)) << 6);
            x.push(String.fromCharCode(b >> 16, (b >> 8) & 0xff));
            break;
        case 2:
            b = (map.indexOf(s.charAt(i)) << 18) | (map.indexOf(s.charAt(i)) << 12);
            x.push(String.fromCharCode(b >> 16));
            break;
    }
    return unescape(x.join(''));
}
