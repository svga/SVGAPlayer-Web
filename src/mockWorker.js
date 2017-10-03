const Proto = require("./svga.pb")
const JSZip = require("jszip")
const JSZipUtils = require("jszip-utils")
const pako = require("pako")

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
                    actions.jszip_decodeAssets(zip, cb);
                }).catch(function () {
                    try {
                        const inflatedData = pako.inflate(data);
                        const movieData = Proto.MovieEntity.deserializeBinary(inflatedData);
                        let images = {};
                        actions.jszip_loadImages(images, undefined, movieData, function () {
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
                });
            }
        });
    },

    jszip_decodeAssets: (zip, cb) => {
        zip.file("movie.binary").async("arraybuffer").then(function (spec) {
            const movieData = Proto.MovieEntity.deserializeBinary(spec);
            let images = {};
            actions.jszip_loadImages(images, zip, movieData, function () {
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
                actions.jszip_loadImages(images, zip, movieData, function () {
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

    jszip_loadImages: function (images, zip, movieData, imagesLoadedBlock) {
        if (movieData instanceof Proto.MovieEntity) {
            var finished = true;
            const movieDataImages = movieData.getImagesMap()
            if (!zip) {
                for (const key in movieDataImages.map_) {
                    if (movieDataImages.map_.hasOwnProperty(key)) {
                        const element = movieDataImages.map_[key].value;
                        const value = Uint8ToString(element);
                        images[key] = btoa(value)
                    }
                }
            }
            else {
                for (const key in movieDataImages.map_) {
                    if (movieDataImages.map_.hasOwnProperty(key)) {
                        const element = movieDataImages.map_[key].value;
                        const value = Uint8ToString(element);
                        if (images.hasOwnProperty(key)) {
                            continue;
                        }
                        finished = false;
                        zip.file(value + ".png").async("base64").then(function (data) {
                            images[key] = data;
                            actions.jszip_loadImages(images, zip, movieData, imagesLoadedBlock);
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
                        actions.jszip_loadImages(images, zip, movieData, imagesLoadedBlock);
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
