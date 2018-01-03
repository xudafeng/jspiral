'use strict';

const Monitor = require('monitor.js');

const spiral = require('./lib/spiral');

const {
  archimedean
} = spiral;

const canvas = document.getElementById('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

var context = canvas.getContext('2d');

var center_x = WIDTH / 2;
var center_y = HEIGHT / 2;
var a = 1;
var b = 1;
var angle = 0;
var number = 0;

var handle = () => {
  if (number < 5000) {
    number++;
  }
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.moveTo(center_x, center_y);
  context.beginPath();
  context.lineWidth = 2;

  for (var i = a; i < a + number; i++) {
    angle = 0.1 * i;
    var pos = archimedean([center_x, center_y], angle, a, b);
    context.lineTo(pos[0], pos[1]);
  }
  context.strokeStyle = '#fff';
  context.stroke();
};

window.onmousemove = () => {
  a = Math.pow(event.clientX / WIDTH + 0.5, 2);
  b = Math.pow(event.clientY / HEIGHT + 0.5, 2);
};

var Timer = Monitor.Timer;
var FPSBoard = Monitor.FPSBoard;

var fpsBoard = new FPSBoard({
  width: 100,
  height: 60,
  boardColor: '#222',
  textColor: '#d2ff1d',
  containerStyles: {
    left: 0,
  }
});

var timer = new Timer();

timer.update(function() {
  fpsBoard.tick();
  handle();
});

timer.start();
