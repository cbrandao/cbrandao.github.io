/* Used the anime.js library to animate buttons */

var animateScaling1 = anime({
    targets: '#but-1',
    scale: 1.05,
    autoplay: false
  });

  var animateScaling2 = anime({
    targets: '#but-2',
    scale: 1.05,
    autoplay: false
  });

  var animateScaling3 = anime({
    targets: '#but-3',
    scale: 1.05,
    autoplay: false
  });

document.querySelector('#but-1').onmouseover = animateScaling1.restart;
document.querySelector('#but-2').onmouseover = animateScaling2.restart;
document.querySelector('#but-3').onmouseover = animateScaling3.restart;