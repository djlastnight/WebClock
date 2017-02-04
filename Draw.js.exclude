function drawHourPoint(context, distanceFromCenter, radius, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(0, -distanceFromCenter, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    var radians = (360 / 12) * (Math.PI / 180);
    context.rotate(radians);
}

function drawMinuteLine(context, distanceFromCenter, angleInDegrees, length, color) {
    if (angleInDegrees % 5 != 0) {
        context.beginPath();
        context.moveTo(0, -distanceFromCenter + length);
        context.lineTo(0, -distanceFromCenter);
        context.strokeStyle = color;
        context.closePath();
        context.stroke();
    }

    var radians = (360 / 60) * (Math.PI / 180);
    context.rotate(radians);
}

function drawHourDigit(context, distanceFromCenter, font, sizeInPoints, color, digit) {
    digit = digit == 0 ? 12 : Number(digit);
    var x, y;
    if (digit == 12) {
        x = 0;
        y = -distanceFromCenter;
        context.textAlign = "center";
        context.textBaseline = "top";
    }

    if (digit == 3) {
        x = distanceFromCenter;
        y = 0;
        context.textAlign = "right";
        context.textBaseline = "middle";
    }

    if (digit == 6) {
        x = 0;
        y = distanceFromCenter;
        context.textAlign = "center";
        context.textBaseline = "bottom";
    }

    if (digit == 9) {
        x = -distanceFromCenter;
        y = 0;
        context.textAlign = "left";
        context.textBaseline = "middle";
    }

    context.fillStyle = color;
    context.font = sizeInPoints + "pt " + font;
    context.fillText(digit, x, y);
}

function drawLineAtAngle(context, startX, startY, length, angleInDegrees) {
    var angle = (angleInDegrees - 90) * Math.PI / 180;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(startX + length * Math.cos(angle), startY + length * Math.sin(angle));
    context.closePath();
    context.stroke();
}