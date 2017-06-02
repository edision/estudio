/**
 * ASCII 转换 Unicode  
 * @param {String} content ASCII字符, 如&#49;
 */
export function AsciiToUnicode(content) {
    let result = '';
    if (!content) return result;
    for (var i = 0; i < content.length; i++)
        result += '&#' + content.charCodeAt(i) + ';';
    return result;
}

/**
 * Unicode 转换 ASCII  
 * @param {String} content Unicode字符，如\u1294
 */
export function UnicodeToAscii(content) {
    let result = '';   
    let code = content.match(/&#(\d+);/g);
     if (!code) return result;
    for (var i = 0; i < code.length; i++)
        result += String.fromCharCode(code[i].replace(/[&#;]/g, ''));
    return result;
}
