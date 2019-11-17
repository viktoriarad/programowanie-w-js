const Settings = () => {
    let color = "#ffffff";
    let size = 5;
    let brush = 'round';

    const defaultBrightness = 100;
    let brightness = defaultBrightness; // could be from 0 to 200

    const defaultContrast = 100;
    let contrast = defaultContrast; // could be from 0 to 200

    const defaultBlur = 0;
    let blur = defaultBlur; // could be from 0 to 100

    const getColor = () => color;
    const setColor = (newColor) => color = newColor;

    const getSize = () => size;
    const setSize = (newSize) => size = newSize;

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