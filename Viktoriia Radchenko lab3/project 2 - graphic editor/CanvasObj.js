// Funkcja która zwraca obiekt z przekazanymi do niego właściwościami/metodami
// Ten obiekt odpowiada za rysowanie (metoda draw) i przerysowanie (metoda redraw) canvasu, wgranie grafiki i wyczyszczenie.
// Dzięki closure hermetyzujemy zmienne img, imgWidth, imgHeight, centerY, lastX i lastY tak aby były prywatne i nie było do nich dostępu od zewnątrz
const CanvasObj = () => {
    const img = new Image();
    let imgWidth = 0;
    let imgHeight = 0;
    let centerY = 0;
    let lastX;
    let lastY;

    // Funkcja która pobiera aktualną grafikę w canvasie i zapisuję ją w postaci png pliku
    const saveToImg = () => {
        const downloadLink = document.querySelector('.download-link');

        downloadLink.setAttribute('download', 'myCanvas.png');
        downloadLink.setAttribute('href', canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));

        downloadLink.click();
    };

    // Ukrywa button wgrania grafiki do canvasu
    const hideUploadBtn = () => {
        document.querySelector('.imageLoaderLabel').classList.add('imageLoaderLabel--hide');
    };

    // Funkcja odpowiada za wyświetlenie wgranej grafiki do canvasu
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

    // Funkcja która obsługuję wgranie grafiki, wybranej użytkownikom
    const handleImage = function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            img.onload = onLoadImage;
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    // Funkcja która jest przyznaczona do rysowania na canvasie
    const draw = function (x, y, brush, color, size, start) {
        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.lineJoin = 'round';
        ctx.fillStyle = ctx.strokeStyle = color;

        if (brush === 'square') {
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
        } else {
            if (start) {
                ctx.moveTo(x - 1, y - 1);
            } else {
                ctx.moveTo(lastX, lastY);
            }
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }

        lastX = x;
        lastY = y;
    };

    // Funkcja która wyczyszcza canvas, pozostawiając tylko wgraną grafikę
    const clear = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.filter = 'none';
        ctx.drawImage(img, 0, centerY, imgWidth, imgHeight);
    };

    //Funkcja która odpowiada za przerysowanie canvasu według danych które przechowuje userDrawing i userSettings obiekty
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

        // Iteracja po wszystkich pozycjach myszki użytkownika podczas rysowania na canvasie
        // ktore sa przechowywane w objekcie userDrawing
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
        draw,
        redraw,
        saveToImg,
        handleImage,
        clear
    }
};
