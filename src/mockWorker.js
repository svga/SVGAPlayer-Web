const { ProtoMovieEntity } = require("./proto")
const assignUtils = require('pako/lib/utils/common').assign;
const inflate = require("pako/lib/inflate")
const pako = {}
assignUtils(pako, inflate);

const Uint8ToString = function (u8a) {
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join("");
}

const actions = {

    loadAssets: (url, cb, failure) => {
        if (typeof JSZipUtils === "object" && typeof JSZip === "function") {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if (err) {
                    failure && failure(err);
                    console.error(err);
                    throw err;
                }
                else {
                    if (typeof window === "object") {
                        window.SVGAPerformance.networkEnd = performance.now()
                        window.SVGAPerformance.unzipStart = performance.now()
                    }
                    JSZip.loadAsync(data).then(function (zip) {
                        actions._decodeAssets(zip, cb);
                    }).catch(function () {
                        actions.load_viaProto(data, cb, failure);
                    });
                }
            });
        }
        else {
            const req = new XMLHttpRequest()
            req.open("GET", url, true);
            req.responseType = "arraybuffer"
            req.onloadend = () => {
                if (typeof window === "object") {
                    window.SVGAPerformance.networkEnd = performance.now()
                    window.SVGAPerformance.unzipStart = performance.now()
                }
                actions.load_viaProto(req.response, cb, failure);
            }
            req.send()
        }
    },

    load_viaProto: (arraybuffer, cb, failure) => {
        try {
            const inflatedData = pako.inflate(arraybuffer);
            const movieData = ProtoMovieEntity.decode(inflatedData);
            let images = {};
            actions._loadImages(images, undefined, movieData, function () {
                if (typeof window === "object") {
                    window.SVGAPerformance.unzipEnd = performance.now()
                }
                cb({
                    movie: movieData,
                    images,
                })
            })
        } catch (err) {
            failure && failure(err);
            console.error(err);
            throw err;
        }
    },

    _decodeAssets: (zip, cb) => {
        zip.file("movie.binary").async("arraybuffer").then(function (spec) {
            const movieData = Proto.MovieEntity.deserializeBinary(spec);
            let images = {};
            actions._loadImages(images, zip, movieData, function () {
                if (typeof window === "object") {
                    window.SVGAPerformance.unzipEnd = performance.now()
                }
                cb({
                    movie: movieData,
                    images,
                })
            })
        }, function (error) {
            zip.file("movie.spec").async("string").then(function (spec) {
                let movieData = JSON.parse(spec);
                let images = {};
                actions._loadImages(images, zip, movieData, function () {
                    if (typeof window === "object") {
                        window.SVGAPerformance.unzipEnd = performance.now()
                    }
                    cb({
                        movie: movieData,
                        images,
                    })
                })
            })
        })
    },

    _loadImages: function (images, zip, movieData, imagesLoadedBlock) {
        if (typeof movieData === "object" && movieData.$type == ProtoMovieEntity) {
            var finished = true;
            if (!zip) {
                for (const key in movieData.images) {
                    if (movieData.images.hasOwnProperty(key)) {
                        const element = movieData.images[key];
                        const value = Uint8ToString(element);
                        images[key] = btoa(value)
                    }
                }
            }
            else {
                for (const key in movieData.images) {
                    if (movieData.images.hasOwnProperty(key)) {
                        const element = movieData.images[key];
                        const value = Uint8ToString(element);
                        if (images.hasOwnProperty(key)) {
                            continue;
                        }
                        finished = false;
                        zip.file(value + ".png").async("base64").then(function (data) {
                            images[key] = data;
                            actions._loadImages(images, zip, movieData, imagesLoadedBlock);
                        }.bind(this))
                        break;
                    }
                }
            } 
            finished && imagesLoadedBlock.call(this)
        }
        else {
            var finished = true;
            for (var key in movieData.images) {
                if (movieData.images.hasOwnProperty(key)) {
                    var element = movieData.images[key];
                    if (images.hasOwnProperty(key)) {
                        continue;
                    }
                    finished = false;
                    zip.file(element + ".png").async("base64").then(function (data) {
                        images[key] = data;
                        actions._loadImages(images, zip, movieData, imagesLoadedBlock);
                    }.bind(this))
                    break;
                }
            }
            finished && imagesLoadedBlock.call(this)
        }
    },

}

module.exports = (data, cb, failure) => {
    actions['loadAssets'](data, cb, failure);
}
