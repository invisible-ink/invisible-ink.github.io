// REMEMBER!!! This is ES5, not fancy TypeScript or ES2016 or whatever!

window['VER'] = function(defaultValue, versions, cacheID) {
    return window['CONFIG'].selectValue(defaultValue, versions, cacheID)
}

window['MATCH'] = function(sel) {
    return window['CONFIG'].match(sel)
}
