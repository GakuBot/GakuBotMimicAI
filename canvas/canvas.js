function Canvas(canvas) {
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    // Draw a circle
    this.circle = function(x, y, r, thickness, fill, stroke) {
        context.beginPath();
        context.lineWidth = thickness;
        context.arc(x, y, r, 0, Math.PI * 2, false);

        if (fill)   { context.fill(); }
        if (stroke) { context.stroke(); }

        return this;
    };

    // Draw a circle
    this.line = function(x, y, i, j) {
        context.beginPath();
        context.lineWidth = 6;
        context.moveTo(x,y);
        context.lineTo(i,j);
        context.stroke();

        return this;
    };

    // Set canvas draw color
    this.setColor = function(type, color) {
        if (type === 'fill') {
            context.fillStyle = color;
        } else if (type === 'stroke') {
            context.strokeStyle = color;
        }

        return this;
    };

    this.textDraw = function(text, positionX, positionY, color) {
        context.font = "bold " + (height/20) + "px Bookman";
        context.fillStyle = color;
        context.fillText(text,positionX,positionY)

        return this;
    };

    this.textDrawBig = function(text, positionX, positionY, color) {
        context.font = "bold " + (height/12) + "px Bookman";
        context.fillStyle = color;
        context.fillText(text,positionX,positionY)

        return this;
    };

    // Clear entire canvas
    this.clear = function() {
        context.fillStyle = "rgb(172, 236, 219)";
        context.fillRect(0, 0, width, height);

        return this;
    };

}
