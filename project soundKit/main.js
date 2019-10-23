const instrumensSounds = {
  'drum': ['KeyD', document.querySelector('.drum')],
  'trumpet': ['KeyT', document.querySelector('.trumpet')],
  'guitar': ['KeyG', document.querySelector('.guitar')],
  'piano': ['KeyP', document.querySelector('.piano')],
  'xylophone': ['KeyX', document.querySelector('.xylophone')],
  'maracas': ['KeyM', document.querySelector('.maracas')]
}

const instruments = document.querySelector('.instrumets__wrapper').children;

const instrumentsArray = [];

function playSounds(e) {
  const time = Date.now();
  let keyNote,
    audio;

  if (e.type === 'click') {
    audio = instrumensSounds[e.target.dataset.key][1];
    keyNote = e.target.dataset.key;
  } else if (e.type === 'keypress') {
    for (key in instrumensSounds) {
      if (e.code === instrumensSounds[key][0]) {
        keyNote = key;
        audio = instrumensSounds[key][1];
      }
    }
  }
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  instrumentsArray.push({
    keyNote,
    time
  })
}

document.body.addEventListener('keypress', playSounds);

for (let i = 0; i < instruments.length; i++) {
  instruments[i].addEventListener('click', playSounds);
}
