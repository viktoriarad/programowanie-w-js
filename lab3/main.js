const btnCircle = document.querySelector('.circle');
// const btnSquare = document.querySelector('.square');
// const redClr = document.querySelector('.red');
// const blueClr = document.querySelector('.blue');
// const greenClr = document.querySelector('.green');
const drawField = document.querySelector('.drawingField');
const colors = document.querySelector('.colors').children;
const btnClear = document.querySelector('.clear');


let mouseDown = false;
let mouseMove = false;
let mouseUp = false;
let color = 'red';


const draw = function (e) {
  const x = e.clientX;
  const y = e.clientY;
  const div = document.createElement("div");
  const xOverflow = x <= drawField.offsetLeft + 5 || x >= drawField.offsetLeft + drawField.offsetWidth - 5;
  const yOverflow = y <= drawField.offsetTop + 5 || y >= drawField.offsetTop + drawField.offsetHeight - 5;

  if (xOverflow || yOverflow) {
    return
  }

  div.classList.add('draw-element');
  div.style.backgroundColor = color;
  div.style.top = y + "px";
  div.style.left = x + "px";
  drawField.appendChild(div);
}

const drawMouseMove = (e) => {
  mouseMove = true;
  draw(e);
}

const drawMouseUp = (e) => {
  mouseDown = false;
  mouseMove = false;

  draw(e);
  drawField.removeEventListener("mousemove", drawMouseMove);
  document.removeEventListener("mouseup", drawMouseUp);
}

const drawMouseDown = function () {
  mouseDown = true;
  drawField.addEventListener("mousemove", drawMouseMove);
  document.addEventListener("mouseup", drawMouseUp);
}

const changeColor = (colors, newColor) => {
  for (let i = 0; i < colors.length; i++) {
    colors[i].classList.remove('color-active');
  }
  newColor.classList.add('color-active');
  color = newColor.dataset.color;
};

for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', () => changeColor(colors, colors[i]));
}

btnClear.addEventListener('click', () => {

})


drawField.addEventListener("mousedown", drawMouseDown);
