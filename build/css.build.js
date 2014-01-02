/* Minify all css */
({
    baseUrl: '../application/',
    dir: '../release/',
    optimizeCss: 'standard',
    /* Exclude app folder and .cs .js files */
    fileExclusionRegExp: /(^(app)|\.(cs|js|html|php|aspx))$/
})