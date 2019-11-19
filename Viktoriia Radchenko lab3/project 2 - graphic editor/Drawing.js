// Funkcja która zwraca obiekt z przekazanymi do niego właściwościami/metodami
// Ten obiekt głównie przychowywuje wszystki pozyje myszki użytkownika podczas rysowania na canvasie
// Dzięki closure hermetyzujemy zmienne points i drawing tak aby były prywatne i nie było do nich dostępu od zewnątrz
const Drawing = () => {
    const points = [];
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
