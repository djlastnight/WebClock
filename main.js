var canvasBg = document.getElementById("canvasBg");
canvasBg.style.display = "none";

var canvasWidth = canvasBg.width;
var canvasHeight = canvasBg.height;
var context = canvasBg.getContext("2d");
context.translate(canvasWidth / 2, canvasWidth / 2);

var padding = canvasWidth / 30;
var outerRingWidth = canvasWidth / 30;
var secondsLineFrontLength = canvasWidth / 3.3;
var secondsLineBackLength = canvasWidth / 15;
var minutesLineFrontLength = canvasWidth / 3.3;
var minutesLineBackLength = canvasWidth / 15;
var hoursLineFrontLength = canvasWidth / 5;
var hoursLineBackLength = canvasWidth / 30;
var secondsLineColor = "red";
var minutesLineColor = "black";
var hoursLineColor = "black";
var secondsLineWidth = 1;
var minutesLineWidth = 3;
var hoursLineWidth = 5;

// Creating gradient background - From outside to inside
var gradient = context.createRadialGradient(0, 0, canvasWidth / 2, 0, 0, 10);
gradient.addColorStop(0.00, "#5f5f5f");
gradient.addColorStop(0.10, "black");
gradient.addColorStop(0.15, "gray");
gradient.addColorStop(0.20, "black");
gradient.addColorStop(0.25, "gray");
gradient.addColorStop(0.30, "lightgray");
context.fillStyle = gradient;
context.arc(0, 0, canvasWidth / 2 - padding, 0, 2 * Math.PI);
context.fill();

// WA Logo - hardcoded size
var img = new Image();
img.src = "wa_logo.png";
img.alt = "logo";
img.onload = function () {
    var aspectRatio = img.width / img.height;
    img.width = canvasWidth / 2;
    img.height = img.width / aspectRatio;
    context.drawImage(img, -img.width / 2, img.height, img.width, img.height);
};

// Bottom decoration
var spot = context.createRadialGradient(0, 0, canvasWidth * 0.5 - padding, 0, 0, 0);
var spotAngle = -45 * Math.PI / 180;
context.rotate(-spotAngle);
spot.addColorStop(0.00, "transparent");
spot.addColorStop(0.10, "rgba(255,255,255,0.85)");
spot.addColorStop(0.20, "transparent");
context.fillStyle = spot;
context.beginPath();
context.arc(0, 0, canvasWidth / 2, 0, 0.5 * Math.PI);
context.closePath();
context.fill();
context.rotate(spotAngle);

// Creating clock points (every 30 degrees)
for (var i = 0; i < 12; i++) {
    drawHourPoint(context, canvasWidth / 3 + 5, 5, "black");
}

for (var i = 0; i < 60; i++) {
    drawMinuteLine(context, canvasWidth / 3 + 10, i, 10, "black");
}

context.moveTo(0, 0);
context.arc(0, 0, 3, 0, 2 * Math.PI);
context.stroke();

for (var i = 0; i < 12; i += 3) {
    drawHourDigit(context, canvasWidth / 3, "Arial", canvasWidth / 10, "gray", i);
}

function updateClock() {
    var time = new Date();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(canvasBg, 0, 0);

    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Minutes line
    ctx.strokeStyle = minutesLineColor;
    ctx.lineWidth = minutesLineWidth;
    var minutesAngle = time.getMinutes() * 360 / 60;
    drawLineAtAngle(ctx, 0, 0, minutesLineFrontLength, minutesAngle);
    drawLineAtAngle(ctx, 0, 0, minutesLineBackLength, 180 + minutesAngle);

    // Hours line
    ctx.strokeStyle = hoursLineColor;
    ctx.lineWidth = hoursLineWidth;
    var partOfMinutes = (time.getMinutes() / 60) * (360 / 12);
    var hoursAngle = (time.getHours() % 12) * (360 / 12) + partOfMinutes;
    drawLineAtAngle(ctx, 0, 0, hoursLineFrontLength, hoursAngle);
    drawLineAtAngle(ctx, 0, 0, hoursLineBackLength, 180 + hoursAngle);

    // Seconds line
    ctx.strokeStyle = secondsLineColor;
    ctx.fillStyle = secondsLineColor;
    ctx.lineWidth = secondsLineWidth;
    drawLineAtAngle(ctx, 0, 0, secondsLineFrontLength, time.getSeconds() * 6);
    drawLineAtAngle(ctx, 0, 0, secondsLineBackLength, 180 + time.getSeconds() * 6);

    // Seconds circle
    ctx.beginPath();
    ctx.arc(0, 0, secondsLineWidth * 3, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(0, 0, secondsLineWidth, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    // Glass
    var glass = ctx.createRadialGradient(0, 0, canvasWidth * 0.52, 0, 0, 10);
    glass.addColorStop(0.00, "transparent");
    glass.addColorStop(0.25, "transparent");
    glass.addColorStop(0.26, "white");
    glass.addColorStop(0.27, "transparent");
    glass.addColorStop(0.28, "white");
    glass.addColorStop(0.31, "transparent");
    glass.addColorStop(0.48, "rgba(255,255,255,0.1)");
    glass.addColorStop(0.75, "transparent");
    glass.addColorStop(0.98, "rgba(255,255,255,0.1)");
    ctx.fillStyle = glass;
    ctx.beginPath();
    ctx.arc(0, 0, canvasWidth / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // Translate back to normal
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
}

setInterval(updateClock, 1000);