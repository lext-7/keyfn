const keyfn = require('../src/index');

const data = {
    a: 1,
    b: "2",
    c: false,
    d: [3, 4],
    e: {
        f: 5,
        g: [
            {
                h: 6,
                i: [7],
            },
            {
                h: 8,
            },
            null,
            {
                h: 9,
            },
        ],
    },
};

console.log(keyfn(data, 'a'));
console.log(keyfn(data, 'b'));
console.log(keyfn(data, 'c'));
console.log(keyfn(data, 'd'));
console.log(keyfn(data, 'd.[0]'));
console.log(keyfn(data, 'e.f'));
console.log(keyfn(data, 'e.g.[0].h'));
console.log(keyfn(data, 'e.g.[1]?.h'));
console.log(keyfn(data, 'e.g.[0].i.[0]'));
console.log(keyfn(data, 'e.g.[2]?.i.[0]'));
console.log(keyfn(data, 'e.g.[]?.h'));