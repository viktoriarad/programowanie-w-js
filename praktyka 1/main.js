const btn = document.querySelector('button');
const div = document.querySelector('div');
const counter = document.querySelector('.counterBtn');

let licznik = 1;
let oblicznieInterwal;

btn.addEventListener('click', (e) => {
  div.classList.add('div_active');
})

counter.addEventListener('click', (e) => {
  oblicznieInterwal = setInterval(wypiszLiczbe, 500);
})

function wypiszLiczbe() {
  div.innerHTML += licznik + '<br>';
  licznik++;

  if (licznik > 10) {
    clearInterval(oblicznieInterwal);
  }

}
