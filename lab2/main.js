const boom = document.querySelector('.aBoom');
const clap = document.querySelector('.aClap');
const channeli1 = []

document.body.addEventListener('keypress', playClap);


function playClap(e) {
  if (e.code === 'KeyA') {
    clap.currentTime = 0;
    clap.play();

    const time = Date.now()
    channeli1.push({
      key: e.code,
      time: time
    });
  }
  console.log(channeli1);
}
