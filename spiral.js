var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
for(j = 0; j < 100; j++) {
  for(i = 0; i < 100; i++) {
    ctx.fillRect(/* x position */ i * 10 * 2, /* y position */ j * 10 * 2, /* x length */ 10, /* y length */ 10);
  }
}
