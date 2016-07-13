const MAX_INT = 10000000;

function dashed(key, ...subkeys) {
    let base = typeof key === 'string' ? key : 'no-key';
    subkeys.forEach(skey => base += (skey && typeof skey !== 'object') ? `-${skey}` : '');
    return base;
}

function rand(max) {
    return Math.floor(Math.random() * max);
}

function keysFor(name) {
    return (...elems) => dashed(dashed(name, rand(MAX_INT)), ...elems);
}

export default keysFor;