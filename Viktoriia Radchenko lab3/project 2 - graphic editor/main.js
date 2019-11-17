const imageLoader = document.querySelector('.imageLoader');
const imgUploadField = document.querySelector('.img-upload');
const brushCircle = document.querySelector('.toolbar__brush--circle');
const brushSquare = document.querySelector('.toolbar__brush--square');
const paletteSelector = document.getElementById('palette-selector');
const brightnessBtn = document.getElementById('brightnessRange');
const contrastBtn = document.getElementById('contrastRange');
const blurBtn = document.getElementById('blurRange');
const clearBtn = document.querySelector('.toolbar__clear');
const saveBtn = document.querySelector('.toolbar__save');
const canvas = document.querySelector('.imageCanvas');
const ctx = canvas.getContext('2d');

const userSettings = Settings();
const userDrawing = Drawing();
const userCanvas = CanvasObj();

const clearCanvas = () => {
  userDrawing.reset();
  userSettings.setBrightness('default');
  userSettings.setContrast('default');
  userSettings.setBlur('default');
  brightnessBtn.value = "100";
  contrastBtn.value = "100";
  blurBtn.value = "0";
  userCanvas.redraw();
};

const addClick = function (x, y, dragging) {
  const color = userSettings.getColor();
  const size = userSettings.getSize();
  const brush = userSettings.getBrush();

  userDrawing.setPoint(x, y, dragging, color, brush, size);
};

const mouseMoveHandler = function(e) {
    if (userDrawing.getDrawing() === true) {
        const offsetLeft = (window.innerWidth - this.offsetWidth) / 2;
        const offsetTop = (window.innerHeight - this.offsetHeight) / 2;
        const mouseX = e.pageX - offsetLeft;
        const mouseY = e.pageY - offsetTop;

        addClick(mouseX, mouseY, true);
        userCanvas.redraw();
    }
};

const mouseDownHandler = function(e) {
    const offsetLeft = (window.innerWidth - this.offsetWidth) / 2;
    const offsetTop = (window.innerHeight - this.offsetHeight) / 2;
    const mouseX = e.pageX - offsetLeft;
    const mouseY = e.pageY - offsetTop;

    userDrawing.setDrawing(true);
    addClick(mouseX, mouseY);
    userCanvas.redraw();
};

imageLoader.addEventListener('change', userCanvas.handleImage);

canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", () => userDrawing.setDrawing(false));
canvas.addEventListener("mouseleave", () => userDrawing.setDrawing(false));


brushCircle.addEventListener('click', () => userSettings.setBrush('round'));
brushSquare.addEventListener('click', () => userSettings.setBrush('miter'));
brightnessBtn.addEventListener('change', (e) => userSettings.setBrightness(e.target.value, userCanvas.redraw));
contrastBtn.addEventListener('change', (e) => userSettings.setContrast(e.target.value, userCanvas.redraw));
blurBtn.addEventListener('change', (e) => userSettings.setBlur(e.target.value, userCanvas.redraw));
paletteSelector.addEventListener('change', (e) => userSettings.setColor(e.target.value));
clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', userCanvas.saveToImg);
