function normalizeAndDraw(mat, parent, cnvStyle) {
    var max = Math.max.apply(null, mat.data);
    for (var i = 0; i < mat.data.length; i++) {
        mat.data[i] = mat.data[i] * 255 / max;
    }
    drawMat(mat, parent, cnvStyle);
}

function matrixFromCtx(ctx, cols, rows) {
    var imageData = ctx.getImageData(0, 0, cols, rows);
    var dataBuffer = new jsfeat.data_t(cols * rows, imageData.data.buffer);

    return new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C4_t, dataBuffer);
}

function drawMat(mat, parent, cnvStyle) {
    var cnv = document.createElement('canvas');
    if (typeof cnvStyle !== 'undefined')
        cnv.className = cnvStyle;
    cnv.width = mat.cols;
    cnv.height = mat.rows;

    parent.appendChild(cnv);
    var ctx = cnv.getContext('2d');

    if (mat.channel === jsfeat.C1_t) {
        ctx.putImageData(matrix2img(mat), 0, 0);
    } else if (mat.channel === jsfeat.C3_t || mat.channel === jsfeat.C4_t) {
        ctx.putImageData(matrix2imgInColor(mat), 0, 0);
    }
    return ctx.getImageData(0, 0, mat.cols, mat.rows);
}

function matrix2img(mat) {
    var imageData = new ImageData(mat.cols, mat.rows);

    var dataU32 = new Uint32Array(imageData.data.buffer);
    var alpha = (0xff << 24);
    var i = mat.cols * mat.rows, pix = 0;
    while (--i >= 0) {
        pix = mat.data[i];
        dataU32[i] = alpha | (pix << 16) | (pix << 8) | pix;
    }
    return imageData;
}

function matrix2imgInColor(mat) {
    var data = new Uint8ClampedArray(mat.data);
    return new ImageData(data, mat.cols, mat.rows);
}