function drawImg(img, width, height, parent, cnvStyle) {
    var cnv = document.createElement('canvas');
    if (typeof cnvStyle !== 'undefined')
        cnv.className = cnvStyle;
    cnv.width = width;
    cnv.height = height;

    parent.appendChild(cnv);
    var ctx = cnv.getContext('2d');
    ctx.putImageData(new ImageData(new Uint8ClampedArray(img), width, height), 0, 0);
}