const boom = document.querySelector('.aBoom');
const clap = document.querySelector('.aClap');
const hihat = document.querySelector('.aHihat');
const kick = document.querySelector('.aKick');
const openhat = document.querySelector('.aOpenhat');
const ride = document.querySelector('.aRide');
const snare = document.querySelector('.aSnare');
const tink = document.querySelector('.aTink');
const tom = document.querySelector('.aTom');
const channeli1 = [];

document.body.addEventListener('keypress', playClap);


function playClap(e) {

  if (e.code === 'KeyQ') {
    boom.currentTime = 0;
    boom.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyW') {
    clap.currentTime = 0;
    clap.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    });
  }

  if (e.code === 'KeyE') {
    hihat.currentTime = 0;
    hihat.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyR') {
    kick.currentTime = 0;
    kick.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyT') {
    openhat.currentTime = 0;
    openhat.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyY') {
    ride.currentTime = 0;
    ride.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyU') {
    snare.currentTime = 0;
    snare.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyI') {
    tink.currentTime = 0;
    tink.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }

  if (e.code === 'KeyO') {
    tom.currentTime = 0;
    tom.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    })
  }
  console.log(channeli1);
}
