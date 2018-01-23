const isNullOrUndefined = val => (val === null || typeof val === 'undefined');

const keyfn = (data, keyString) => {
    const keys = Array.isArray(keyString) ? keyString.slice() : keyString.split('.');
    let value = data;
    while (keys.length) {
        let key = keys.shift();
        let checkNull = false;
        if (key.endsWith('?')) {
            checkNull = true;
            key = key.substr(0, key.length - 1);
        }
        const arrayReg = /^\[(\d+)?\]$/;
        const isArray = arrayReg.exec(key);
        if (isArray) {
            const arrayIndex = isArray[1];
            if (arrayIndex) {
                value = value[arrayIndex];
            } else {
                value = value.map((item) => {
                    if (checkNull && isNullOrUndefined(item)) {
                        return item;
                    }
                    return keyfn(item, keys);
                });
                return value;
            }
        } else {
            value = value[key];
        }
        if (checkNull && isNullOrUndefined(value)) {
            return value;
        }
    }
    return value;
};

module.exports = keyfn;