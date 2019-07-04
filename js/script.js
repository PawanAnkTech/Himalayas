// var stickyOffset = $('.sticky').offset().top;
//
// $(window).scroll(function(){
//   var sticky = $('.sticky'),
//       scroll = $(window).scrollTop();
//
//   if (scroll >= stickyOffset) sticky.addClass('fixed-top');
//   else sticky.removeClass('fixed-top');
// });

// $(window).scroll(function() {
// if ($(this).scrollTop() > 1){
//     $('.navbar').addClass("navbar-shrink");
//   }
//   else{
//     $('.navbar').removeClass("navbar-shrink");
//   }
// });


$(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() < $(document).height()) {
           $('.navbar').addClass("navbar-shrink");
       }
       else{
         $('.navbar').removeClass("navbar-shrink");
       }
   });





var canvas = document.querySelector("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");

var TAU = 2 * Math.PI;

times = [];
function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
update();
draw();
requestAnimationFrame(loop);
}

function Ball (startX, startY, startVelX, startVelY) {
this.x = startX || Math.random() * canvas.width;
this.y = startY || Math.random() * canvas.height;
this.vel = {
  x: startVelX || Math.random() * 2 - 1,
  y: startVelY || Math.random() * 2 - 1
};
this.update = function(canvas) {
  if (this.x > canvas.width + 50 || this.x < -50) {
    this.vel.x = -this.vel.x;
  }
  if (this.y > canvas.height + 50 || this.y < -50) {
    this.vel.y = -this.vel.y;
  }
  this.x += this.vel.x;
  this.y += this.vel.y;
};
this.draw = function(ctx, can) {
  ctx.beginPath();
  var distM = distMouse(this);
  if (distM > 200) {
    ctx.fillStyle = "#000";
    ctx.globalAlpha = .2;
  } else {
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 1 - distM / 240;
  }
  ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 3, 0, TAU, false);
  ctx.fill();
}
}

var balls = [];
for (var i = 0; i < canvas.width * canvas.height / (85*85); i++) {
balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
}

var lastTime = Date.now();
function update() {
var diff = Date.now() - lastTime;
for (var frame = 0; frame * 16.6667 < diff; frame++) {
  for (var index = 0; index < balls.length; index++) {
    balls[index].update(canvas);
  }
}
lastTime = Date.now();
}
var mouseX = -1e9, mouseY = -1e9;
document.addEventListener('mousemove', function(event) {
mouseX = event.clientX;
mouseY = event.clientY;
});

function distMouse(ball) {
return Math.hypot(ball.x - mouseX, ball.y - mouseY);
}

function draw() {
for (var index = 0; index < balls.length; index++) {
  var ball = balls[index];
  ctx.beginPath();
  for (var index2 = balls.length - 1; index2 > index; index2 += -1) {
    var ball2 = balls[index2];
var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
      if (dist < 100) {
        var distM = distMouse(ball2);
        if (distM > 150) {
          ctx.strokeStyle = "#c9ccce";
          ctx.globalAlpha = .2;
        } else {
          ctx.globalAlpha = 0;
        }
        ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
        ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
      }
}
  ctx.stroke();
  ball.draw(ctx, canvas);
}
}

// Start
loop();
//# sourceURL=pen.js


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
