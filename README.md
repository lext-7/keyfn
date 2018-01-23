# keyfn

Safe getter using magic key.

# Examples

```javascript
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

console.log(keyfn(data, 'a')); // 1
console.log(keyfn(data, 'b')); // 2
console.log(keyfn(data, 'c')); // false
console.log(keyfn(data, 'd')); // [3, 4]
console.log(keyfn(data, 'd.[0]')); // 3
console.log(keyfn(data, 'e.f')); // 5
console.log(keyfn(data, 'e.g.[0].h')); // 6
console.log(keyfn(data, 'e.g.[1]?.h')); // 8
console.log(keyfn(data, 'e.g.[0].i.[0]')); // 7
console.log(keyfn(data, 'e.g.[2]?.i.[0]')); // null
console.log(keyfn(data, 'e.g.[]?.h')); // [6, 8, null, 9]
```

## Usage

### nested key

```javascript
keyfn(data, 'a.b.c')
// equals
data.a.b.c
```

### Array index

```javascript
keyfn(data, 'a.[1]')
// equals
data.a[1]
```

### Array mapper

```javascript
keyfn(data, 'a.[].a')
// equals
data.a.map(({ a }) => a);
```

### ? nullable operator

```javascript
// ----------
keyfn(data, 'a?.b')
// equals
const a = data.a;
if (isNullOrUndefined(a)) {
    return a.b;
}
return a;

// ----------
keyfn(data, 'a[]?.b')
// equals
data.a.map(item => {
    if (isNullOrUndefined(item)) {
        return item.b;
    }
    return item;
});
```