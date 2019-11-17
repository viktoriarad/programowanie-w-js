const CanvasObj = () => {
    const img = new Image();
    let imgWidth = 0;
    let imgHeight = 0;
    let centerY = 0;

    const saveToImg = () => {
        const downloadLink = document.querySelector('.download-link');

        downloadLink.setAttribute('download', 'myCanvas.png');
        downloadLink.setAttribute('href', canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));

        downloadLink.click();
    };

    const hideUploadBtn = () => {
        document.querySelector('.imageLoaderLabel').classList.add('imageLoaderLabel--hide');
    };

    const onLoadImage = function () {
        imgWidth = img.width;
        imgHeight = img.height;

        imgHeight *= imgUploadField.offsetWidth / imgWidth;
        imgWidth = imgUploadField.offsetWidth;

        canvas.width = imgUploadField.offsetWidth;
        canvas.height = imgUploadField.offsetHeight;

        centerY = (canvas.height - imgHeight) / 2;

        ctx.drawImage(img, 0, centerY, imgWidth, imgHeight);

        hideUploadBtn();
    };

    const handleImage = function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            img.onload = onLoadImage;
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    const redraw = function () {
        const brightness = userSettings.getBrightness();
        const contrast = userSettings.getContrast();
        const blur = userSettings.getBlur();

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
        ctx.filter = 'none';

        if (brightness !== false || contrast !== false || blur !== false) {
            const brFilter = brightness !== false ? `brightness(${brightness}%) ` : '';
            const ctFilter = contrast !== false ? `contrast(${contrast}%) ` : '';
            const blFilter = blur !== false ? `blur(${blur}px)` : '';

            ctx.filter = `${brFilter}${ctFilter}${blFilter}`;
        }

        ctx.drawImage(img, 0, centerY, imgWidth, imgHeight);

        for (let i = 0; i < userDrawing.getLength(); i++) {

            const currentPoint = userDrawing.getPoint(i);
            const previousPoint = userDrawing.getPoint(i - 1);
            const dragging = currentPoint.dragging;
            const brush = currentPoint.brush;

            ctx.lineJoin = brush;

            ctx.beginPath();

            if (dragging === true && i > 0) {
                ctx.moveTo(previousPoint.x, previousPoint.y);
            } else {
                ctx.moveTo(currentPoint.x - 1, currentPoint.y);
            }

            ctx.strokeStyle = currentPoint.color;
            ctx.lineWidth = currentPoint.size;
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.closePath();
            ctx.stroke();

        }
    };

    return {
        redraw,
        saveToImg,
        handleImage
    }
};