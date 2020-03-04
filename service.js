const fs = require('fs');
const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2eot = require('ttf2eot');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
let basePath = '';

fs.readFile('metadata.json', 'utf-8', (err, data) => {
    if (err) throw err
    const res = JSON.parse(data);

    basePath = res.fontDestination + '/' + res.fontName;
    fs.mkdir(basePath, { recursive: true }, (err) => {
        if (err) console.log(`Error creating directory: ${err}`)
        convertSvgToSvgFont(res);
    })

});

function convertSvgToSvgFont(res) {
    const fontStream = new SVGIcons2SVGFontStream({
        fontName: res.fontName,
        normalize: true
    });


    const svgFontPath = basePath + '/' + res.fontName + '.svg';
    fontStream.pipe(fs.createWriteStream(svgFontPath))
        .on('finish', function () {
            console.log('Font successfully created!');
            convertToWebFonts(res);
        })
        .on('error', function (err) {
            console.log(err);
        });

    res.fontClasses.forEach(function (fontClass) {
        const iconPath = res.iconPath + '/' + res.fontName + '/' + fontClass.name + '.svg';
        const glyph = fs.createReadStream(iconPath);
        glyph.metadata = {
            unicode: [fontClass.unicode],
            name: fontClass.name
        };
        fontStream.write(glyph);
    });

    fontStream.end();
}

function convertToWebFonts(res) {

    const cssPath = basePath + '/' + res.fontName + '.css';
    const svgFontPath = basePath + '/' + res.fontName + '.svg';
    const ttfFontPath = basePath + '/' + res.fontName + '.ttf';
    const eotFontPath = basePath + '/' + res.fontName + '.eot';
    const woffFontPath = basePath + '/' + res.fontName + '.woff';
    const woff2FontPath = basePath + '/' + res.fontName + '.woff2';

    let hubFontCss = '';
    for (var i = 0; i < res.fontClasses.length; i++) {
        let unicode = res.fontClasses[i].unicode.codePointAt(0).toString(16);
        hubFontCss += "." + res.fontClasses[i].name + ":before { content: '\\" + unicode + "';}" + "\n";
    }

    try {
        fs.writeFileSync(cssPath, hubFontCss);
        const ttf = svg2ttf(fs.readFileSync(svgFontPath, 'utf8'), {});
        fs.writeFileSync(ttfFontPath, new Buffer.from(ttf.buffer));

        const eot = new Buffer.from(ttf2eot(ttf).buffer);
        fs.writeFileSync(eotFontPath, eot);

        const woff = new Buffer.from(ttf2woff(ttf).buffer);
        fs.writeFileSync(woffFontPath, woff);

        const woff2 = new Buffer.from(ttf2woff2(ttf).buffer);
        fs.writeFileSync(woff2FontPath, woff2);


    } catch (err) {
        console.log('some thing went wrong');
        console.log(err);
    }

}