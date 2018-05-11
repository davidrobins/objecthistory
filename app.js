const merge = require('deepmerge');

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

const updateDiff = (current, update, diff = {}) => {
  Object.keys(update).forEach(k => {
    if (current.hasOwnProperty(k) && update[k] !== current[k]) {
      if (isPrimitive(update[k])) {
        diff[k] = update[k]
      } else {
        diff[k] = updateDiff(current[k], update[k], diff[k])
      }
    }
  });
  return diff;
}

const historyDiff = (current, update, diff = {}) => {
  Object.keys(update).forEach(k => {
    if (current.hasOwnProperty(k) && update[k] !== current[k]) {
      if (isPrimitive(update[k])) {
        diff[k] = current[k]
      } else {
        diff[k] = historyDiff(current[k], update[k], diff[k])
      }
    }
  });
  return diff;
}

const ObjDiff = (current, update, difftype = 'update', diff = {}) => {
  Object.keys(update).forEach(k => {
    if (current.hasOwnProperty(k) && update[k] !== current[k]) {
      if (isPrimitive(update[k])) {
        diff[k] = difftype === 'history' ? current[k] : update[k]
      } else {
        diff[k] = ObjDiff(current[k], update[k], diff[k])
      }
    }
  });
  return diff;
}

let a1 = {
  name: 'David',
  gender: 'm',
  foods: {
    favourite: 'cheese',
    hates: 'chips'
  },
  games: {
    ps4: {
      new: 'God of War'
    }
  }
}

let b = {
  name: 'Tim',
  foods: {
    favourite: 'beer',
  },
  games: {
    ps4: {
      new: 'Gran Turismo'
    }
  }
}

let c = {
  name: 'Mark',
  gender: 'm',
  foods: {
    hates: 'chilli'
  },
}

const ab = {
  name: 'Tim',
  gender: 'm',
  foods: {
    favourite: 'beer',
    hates: 'chips'
  },
  games: {
    ps4: {
      new: 'Gran Turismo'
    }
  }
}

const abc = {
  name: 'Mark',
  gender: 'm',
  foods: {
    favourite: 'beer',
    hates: 'chilli'
  },
  games: {
    ps4: {
      new: 'Gran Turismo'
    }
  },
  notExpected: 'banana'
}

const d = merge(a1, b);
const e = merge.all([a1, b, c]);

console.log('d', d);

console.log('e', e);

console.log('diff', objDiff(a1, b));

console.log('history', objDiff(a1, b, 'history'));

const f = merge(a1, objDiff(a1, b));

console.log('f', f);

console.log('merged diff d == f', JSON.stringify(d) == JSON.stringify(f));

const historyArray = [];


historyArray.push(objDiff(a1, b, 'history'))
a2 = merge(a1, b);
console.log('a with b == ab', JSON.stringify(a2) == JSON.stringify(ab));

historyArray.push(objDiff(a2, c, 'history'))
a3 = merge(a2, c);
console.log('ab with c == abc', JSON.stringify(a3) == JSON.stringify(abc));

console.log('historyArray', historyArray);

const reset = merge.all(historyArray.reverse());

console.log('reset', reset);

const resetA = merge(a3, reset);

console.log(JSON.stringify(a1) == JSON.stringify(resetA) || objDiff(a1, resetA));
