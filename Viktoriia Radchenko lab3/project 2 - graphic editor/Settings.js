// Funkcja która zwraca obiekt z przekazanymi do niego właściwościami/metodami
// Ten obiekt przychowywuje wybrane ustawienia użytkownikiem takie jak: rozmiar pędzla, kolor, filtry
// Dzięki closure hermetyzujemy zmienne size, color, brush, brightness, contrast i blur tak aby były prywatne i nie było do nich dostępu od zewnątrz
const Settings = () => {
    let color = "#ffffff";
    let brush = 'round';

    const defaultBrightness = 100;
    let brightness = defaultBrightness; // can be from 0 to 200

    const defaultContrast = 100;
    let contrast = defaultContrast; // can be from 0 to 200

    const defaultBlur = 0;
    let blur = defaultBlur; // can be from 0 to 100

    const defaultSize = 5;
    let size = defaultSize;

    const getColor = () => color;
    const setColor = (newColor) => color = newColor;

    const getSize = () => size;
    const setSize = (newSize, callback) => {
        if (newSize === 'default') {
            size = defaultSize;
        } else {
            size = parseInt(newSize);
        }

        if (callback) {
            callback();
        }
    };

    const getBrush = () => brush;
    const setBrush = (newBrush) => brush = newBrush;

    const getBrightness = () => {
        if (brightness === defaultBrightness) return false;
        return brightness;
    }

    const setBrightness = (newBrightness, callback) => {
        if (newBrightness === 'default') {
            brightness = defaultBrightness
        } else {
            brightness = parseInt(newBrightness);
        }
        if (callback) {
            callback();
        }
    }

    const getContrast = () => {
        if (contrast === defaultContrast) return false;
        return contrast;
    }
    const setContrast = (newContrast, callback) => {
        if (newContrast === 'default') {
            contrast = defaultContrast;
        } else {
            contrast = parseInt(newContrast);
        }
        if (callback) {
            callback();
        }
    }

    const getBlur = () => {
        if (blur === defaultBlur) return false;
        return blur;
    }
    const setBlur = (newBlur, callback) => {
        if (newBlur === 'default') {
            blur = defaultBlur;
        } else {
            blur = parseInt(newBlur);
        }
        if (callback) {
            callback();
        }
    }

    return {
        getColor,
        setColor,
        getSize,
        setSize,
        getBrush,
        setBrush,
        getBrightness,
        setBrightness,
        getContrast,
        setContrast,
        getBlur,
        setBlur
    }
};
