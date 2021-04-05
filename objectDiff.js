const isPrimitive = val => {
    const primitives = [
        'string',
        'boolean',
        'number',
        'null',
        'undefined',
        'function'
    ]
    return primitives.includes(typeof val);
}

export const diffTypes = {
    UPDATE: 'UPDATE',
    HISTORY: 'HISTORY'
}

export const ObjDiff = (current, update, difftype = diffTypes.UPDATE, diff = {}) => {
    Object.keys(update).forEach(k => {
        if (current.hasOwnProperty(k) && update[k] !== current[k]) {
            if (isPrimitive(update[k])) {
                diff[k] = difftype === diffTypes.HISTORY ? current[k] : update[k]
            } else {
                diff[k] = ObjDiff(current[k], update[k], difftype, diff[k])
            }
        }
    });
    return Object.keys(diff).length > 0 ? diff : current;
}
