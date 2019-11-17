const Drawing = () => {
    let points = [];
    let drawing = false;

    const getDrawing = () => drawing;
    const setDrawing = (value) => drawing = value;
    const reset = () => points.length = 0;
    const getLength = () => points.length;
    const getPoint = (i) => points[i];
    const setPoint = (x, y, dragging, color, brush, size) => {
        points.push({
            x,
            y,
            dragging,
            color,
            brush,
            size
        });
    };

    return {
        getPoint,
        setPoint,
        getLength,
        reset,
        getDrawing,
        setDrawing
    }
};