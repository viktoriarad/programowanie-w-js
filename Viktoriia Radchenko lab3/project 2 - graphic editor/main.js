//Pobieranie DOM elementów
const imageLoader = document.querySelector('.imageLoader');
const imgUploadField = document.querySelector('.img-upload');
const brushCircle = document.querySelector('.toolbar__brush--circle');
const brushSquare = document.querySelector('.toolbar__brush--square');
const paletteSelector = document.getElementById('palette-selector');
const sizeBtn = document.getElementById('sizeRange');
const brightnessBtn = document.getElementById('brightnessRange');
const contrastBtn = document.getElementById('contrastRange');
const blurBtn = document.getElementById('blurRange');
const clearBtn = document.querySelector('.toolbar__clear');
const saveBtn = document.querySelector('.toolbar__save');
const canvas = document.querySelector('.imageCanvas');
const ctx = canvas.getContext('2d');

//Inicjalizacja głównych obiektów aplikacji
const userSettings = Settings();
const userDrawing = Drawing();
const userCanvas = CanvasObj();

// Funkcja która resetuje filtry, dane obiektu userDrawing i canvas
const clearCanvas = () => {
  userDrawing.reset();
  userSettings.setBrightness('default');
  userSettings.setContrast('default');
  userSettings.setBlur('default');
  brightnessBtn.value = "100";
  contrastBtn.value = "100";
  blurBtn.value = "0";
  userCanvas.clear();
};

// Funkcja która zapisuje każde działania użytkownika na canvasie
const addClick = function (x, y, dragging) {
  const color = userSettings.getColor();
  const size = userSettings.getSize();
  const brush = userSettings.getBrush();

  userDrawing.setPoint(x, y, dragging, color, brush, size);
};

// Funkcja obsługująca mouseMove event na canvasie. Przy spełnionym warunku, że myszka została naciśnięta, definuje pozycję myszki według canvasu, zapisuje te dane przy pomocy addClick i rysuje to na canvasie przy pomocy metody draw w obiekcie userCanvas
const mouseMoveHandler = function (e) {
  if (userDrawing.getDrawing() === true) {
    const offsetLeft = (window.innerWidth - this.offsetWidth) / 2;
    const offsetTop = (window.innerHeight - this.offsetHeight) / 2;
    const mouseX = e.pageX - offsetLeft;
    const mouseY = e.pageY - offsetTop;

    addClick(mouseX, mouseY, true);
    userCanvas.draw(mouseX, mouseY, userSettings.getBrush(), userSettings.getColor(), userSettings.getSize());
  }
};

// Funkcja obsługująca mouseDown event na canvasie. Definuje pozycję myszki według canvasu, zapisuje te dane przy pomocy addClick i rysuje to na canvasie przy pomocy metody draw w obiekcie userCanvas
const mouseDownHandler = function (e) {
  const offsetLeft = (window.innerWidth - this.offsetWidth) / 2;
  const offsetTop = (window.innerHeight - this.offsetHeight) / 2;
  const mouseX = e.pageX - offsetLeft;
  const mouseY = e.pageY - offsetTop;

  userDrawing.setDrawing(true);
  addClick(mouseX, mouseY);
  userCanvas.draw(mouseX, mouseY, userSettings.getBrush(), userSettings.getColor(), userSettings.getSize(), true);
};


imageLoader.addEventListener('change', userCanvas.handleImage);

// eventListenery które obserwują działania użytkownika przy pomocy myszki na canvasie
canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", () => {
  userDrawing.setDrawing(false);
  ctx.beginPath();
});
canvas.addEventListener("mouseleave", () => userDrawing.setDrawing(false));

// eventListenery które obsługują clicknięcia na pasku narzędzi
brushCircle.addEventListener('click', () => {
  userSettings.setBrush('round');
  brushCircle.classList.add('toolbar__brush--selected');
  brushSquare.classList.remove('toolbar__brush--selected');
});
brushSquare.addEventListener('click', () => {
  userSettings.setBrush('square');
  brushCircle.classList.remove('toolbar__brush--selected');
  brushSquare.classList.add('toolbar__brush--selected');
});
sizeBtn.addEventListener('change', (e) => userSettings.setSize(e.target.value));
brightnessBtn.addEventListener('change', (e) => userSettings.setBrightness(e.target.value, userCanvas.redraw));
contrastBtn.addEventListener('change', (e) => userSettings.setContrast(e.target.value, userCanvas.redraw));
blurBtn.addEventListener('change', (e) => userSettings.setBlur(e.target.value, userCanvas.redraw));
paletteSelector.addEventListener('change', (e) => userSettings.setColor(e.target.value));
clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', userCanvas.saveToImg);
