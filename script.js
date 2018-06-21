var canv = document.getElementById('canvas');
var canv1 = document.getElementById('canvas1');
var point_xy = document.getElementById('point_xy');
var tipCanvas = document.getElementById("tip");
var tipCtx = tipCanvas.getContext("2d");
var temp = [];
var point_xy_cords = [
  []
];
var pentagon_one = 27;
var pentagon_two = 24;
var pentagon_three = 21;
var pentagon_four = 18;
var pentagon_five = 15;
var pentagon_six = 12;
var pentagon_seven = 9;
var pentagon_eight = 6;
var pentagon_nine = 3;
var pentagon_ten = 0;
var circles = [];
var contx = canv.getContext('2d');
var contx1 = canv1.getContext('2d');
var j = 0;
var offsetX = canv1.offsetLeft;
var offsetY = canv1.offsetTop;
contx.clearRect(0, 0, canv.width, canv.height);

function drawShape(ctx, x, y, points, radius1, radius2, alpha0) {
  //points: number of points (or number of sides for polygons)
  //radius1: "outer" radius of the star
  //radius2: "inner" radius of the star (if equal to radius1, a polygon is drawn)
  //angle0: initial angle (clockwise), by default, stars and polygons are 'pointing' up
  var i, angle, radius;
  if (radius2 !== radius1) {
    points = 2 * points;
  }
  for (i = 0; i <= points; i++) {
    angle = i * 2 * Math.PI / points - Math.PI / 10 + alpha0 ;
    radius = i % 2 === 0 ? radius1 : radius2;
    temp = [(x + radius * Math.cos(angle)), (y + radius * Math.sin(angle))];
    ctx.lineTo(temp[0, 0], temp[0, 1]);
    point_xy_cords[j++] = temp;

  }
  point_xy.textContent = point_xy_cords;
}

function style(ctx, fill) {
  ctx.strokeStyle = "#bdba11";
  ctx.lineWidth = 1;
  if (fill) {
    ctx.fillStyle = "rgba(35, 2, 57, 0.8)";
    ctx.fill();
  } else {
    ctx.stroke()
  }

  //contx.fill();
}

var radius = 2;

function points(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#121212';
  ctx.stroke();
}

var Circle = function(x, y, radius) {
  this.left = x - radius;
  this.top = y - radius;
  this.right = x + radius;
  this.bottom = y + radius;
};

var radius_size = 100;

function drawBackgroundPentagons(ctx) {
  for (var x = 0; x <= 10; x++) {
    ctx.beginPath();
    drawShape(ctx, 120, 120, 10, radius_size, radius_size, 0);
    style(ctx);
    ctx.closePath();
    radius_size = radius_size - 20;
  }
}

function drawMainPentagon(ctx, points) {

  contx1.beginPath();
  contx1.moveTo(points[0][0], points[0][1]);
  for (var x = 1; x <= 10; x++) {
    ctx.lineTo(points[x][0], points[x][1]);
  }
  style(ctx, "fill");
  ctx.closePath();
}
drawBackgroundPentagons(contx);

//0, 6, 12, 18, 24 (starting position of each pentagon in point_xy_cords array)
//test array
test = [];
var start = 33;
for (var x = 0; x <= 10; x++) {
  test[x] = point_xy_cords[start];
  start++;
}

//Draw all points
var n = 56;
while (n > 0) {
  var circle = new Circle(point_xy_cords[n][0], point_xy_cords[n][1], 8);
  circles.push(circle);
  points(contx1, point_xy_cords[n][0], point_xy_cords[n][1]);
  n--;
}
//draw main Pentagon
drawMainPentagon(contx1, test);



function handleMouseDown(e, message) {

  point_xy.textContent = (message);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canv1.onmousedown = function(e) {
  var pos = getMousePos(canv1, e);
  var clickedX = pos.x;
  var clickedY = pos.y;

  var pointX = test[1][0];
  var pointY = test[1][1];

  handleMouseDown(e, clickedX + " clickedX | " + pointX + " pointX |" + pointY + " pointY | " + clickedY + " clickedY |");

  //contx1.clearRect(0, 0, canv.width, canv.height);
  //drawMainPentagon(contx1, test);
  //
  for (var i = 0; i < circles.length; i++) {
    if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
      //alert ('clicked number ' + (i + 1));
      if (i == 6) {
        test[0] = point_xy_cords[pentagon_one];
        test[5] = point_xy_cords[pentagon_one];
      } else if (i == 9) {
        test[0] = point_xy_cords[pentagon_two];
        test[5] = point_xy_cords[pentagon_two];
      } else if (i == 12) {
        test[0] = point_xy_cords[pentagon_three];
        test[5] = point_xy_cords[pentagon_three];
      } else if (i == 15) {
        test[0] = point_xy_cords[pentagon_four];
        test[5] = point_xy_cords[pentagon_four];
      } else if (i == 18) {
        test[0] = point_xy_cords[pentagon_five];
        test[5] = point_xy_cords[pentagon_five];
      } else if (i == 21) {
      	test[0] = point_xy_cords[pentagon_six];
        test[5] = point_xy_cords[pentagon_six];
      } else if (i == 24) {
        test[0] = point_xy_cords[pentagon_seven];
        test[5] = point_xy_cords[pentagon_seven];
      } else if (i == 27) {
        test[0] = point_xy_cords[pentagon_eight];
        test[5] = point_xy_cords[pentagon_eight];
      } else if (i == 30) {
        test[0] = point_xy_cords[pentagon_nine];
        test[5] = point_xy_cords[pentagon_nine];
      } else if (i == 33) {
        test[0] = point_xy_cords[pentagon_ten];
        test[5] = point_xy_cords[pentagon_ten];
      }

      else if (i == 5) {
        test[1] = point_xy_cords[pentagon_one + 1];
      }
			else if (i == 8) {
        test[1] = point_xy_cords[pentagon_two + 1];
      }
      else if (i == 11) {
        test[1] = point_xy_cords[pentagon_three + 1];
      }
      else if (i == 14) {
        test[1] = point_xy_cords[pentagon_four + 1];
      }
      else if (i == 17) {
        test[1] = point_xy_cords[pentagon_five + 1];
      }
      else if (i == 20) {
        test[1] = point_xy_cords[pentagon_six + 1];
      }
			else if (i == 23) {
        test[1] = point_xy_cords[pentagon_seven + 1];
      }
      else if (i == 26) {
        test[1] = point_xy_cords[pentagon_eight + 1];
      }
      else if (i == 29) {
        test[1] = point_xy_cords[pentagon_nine + 1];
      }
      else if (i == 32) {
        test[1] = point_xy_cords[pentagon_ten + 1];
      }

      else if (i == 4) {
        test[2] = point_xy_cords[pentagon_one + 2];
      }
			else if (i == 7) {
        test[2] = point_xy_cords[pentagon_two + 2];
      }
      else if (i == 10) {
        test[2] = point_xy_cords[pentagon_three + 2];
      }
      else if (i == 13) {
        test[2] = point_xy_cords[pentagon_four + 2];
      }
      else if (i == 16) {
        test[2] = point_xy_cords[pentagon_five + 2];
      }
      else if (i == 19) {
        test[2] = point_xy_cords[pentagon_six + 2];
      }
			else if (i == 22) {
        test[2] = point_xy_cords[pentagon_seven + 2];
      }
      else if (i == 25) {
        test[2] = point_xy_cords[pentagon_eight + 2];
      }
      else if (i == 28) {
        test[2] = point_xy_cords[pentagon_nine + 2];
      }
      else if (i == 31) {
        test[2] = point_xy_cords[pentagon_ten + 2];
      }

      else if (i == 3) {
        test[3] = point_xy_cords[pentagon_one + 3];
      }
			else if (i == 6) {
        test[3] = point_xy_cords[pentagon_two + 3];
      }
      else if (i == 9) {
        test[3] = point_xy_cords[pentagon_three + 3];
      }
      else if (i == 12) {
        test[3] = point_xy_cords[pentagon_four + 3];
      }
      else if (i == 15) {
        test[3] = point_xy_cords[pentagon_five + 3];
      }
      else if (i == 18) {
        test[3] = point_xy_cords[pentagon_six + 3];
      }
			else if (i == 21) {
        test[3] = point_xy_cords[pentagon_seven + 3];
      }
      else if (i == 24) {
        test[3] = point_xy_cords[pentagon_eight + 3];
      }
      else if (i == 27) {
        test[3] = point_xy_cords[pentagon_nine + 3];
      }
      else if (i == 30) {
        test[3] = point_xy_cords[pentagon_ten + 3];
      }

      else if (i == 2) {
        test[4] = point_xy_cords[pentagon_one + 4];
      }
			else if (i == 5) {
        test[4] = point_xy_cords[pentagon_two + 4];
      }
      else if (i == 8) {
        test[4] = point_xy_cords[pentagon_three + 4];
      }
      else if (i == 11) {
        test[4] = point_xy_cords[pentagon_four + 4];
      }
      else if (i == 14) {
        test[4] = point_xy_cords[pentagon_five + 4];
      }
      else if (i == 17) {
        test[4] = point_xy_cords[pentagon_six + 4];
      }
			else if (i == 20) {
        test[4] = point_xy_cords[pentagon_seven + 4];
      }
      else if (i == 23) {
        test[4] = point_xy_cords[pentagon_eight + 4];
      }
      else if (i == 26) {
        test[4] = point_xy_cords[pentagon_nine + 4];
      }
      else if (i == 29) {
        test[4] = point_xy_cords[pentagon_ten + 4];
      }
    }
  }
  contx1.clearRect(0, 0, canv.width, canv.height);
  var n = 30;
	while (n > 0) {
    points(contx1, point_xy_cords[n][0], point_xy_cords[n][1]);
    n--;
	}
  drawMainPentagon(contx1, test);

  //tooltip
  tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
  tipCtx.fillText("Attribute", 5, 15);
  tipCanvas.style.left = (clickedX) + "px";
  tipCanvas.style.top = (clickedY) + "px";


};


canv1.onmouseover = function(e){
    return null;

}
canv1.onmouseout = function(e) {
    return null;
}
canv1.onmousemove = function(e) {
    return null;
}