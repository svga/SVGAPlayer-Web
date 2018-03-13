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
            if (url.toString() == "[object File]"){
                actions._readBlobAsArrayBuffer(url, function (arrayBufferSVGA) {
                    const dataHeader = new Uint8Array(arrayBufferSVGA, 0, 4)
                    if (dataHeader[0] == 80 && dataHeader[1] == 75 && dataHeader[2] == 3 && dataHeader[3] == 4) {
                        JSZip.loadAsync(arrayBufferSVGA).then(function (zip) {
                            actions._decodeAssets(zip, cb);
                        });
                    }
                    else {
                        actions.load_viaProto(arrayBufferSVGA, cb, failure);
                    }
                });

            } else if(url.indexOf("data:svga/1.0;base64,") >= 0) {
                var arrayBufferSVGA = actions._base64ToArrayBuffer(url.substring(21));
                JSZip.loadAsync(arrayBufferSVGA).then(function (zip) {
                    actions._decodeAssets(zip, cb);
                });
            }else if(url.indexOf("data:svga/2.0;base64,") >= 0){
                var arrayBufferSVGA = actions._base64ToArrayBuffer(url.substring(21));
                actions.load_viaProto(arrayBufferSVGA, cb, failure);
            }else{
                JSZipUtils.getBinaryContent(url, function (err, data) {
                    if (err) {
                        failure && failure(err);
                        console.error(err);
                        throw err;
                    }
                    else {
                        const dataHeader = new Uint8Array(data, 0, 4)
                        if (dataHeader[0] == 80 && dataHeader[1] == 75 && dataHeader[2] == 3 && dataHeader[3] == 4) {
                            JSZip.loadAsync(data).then(function (zip) {
                                actions._decodeAssets(zip, cb);
                            });
                        }
                        else {
                            actions.load_viaProto(data, cb, failure);
                        }
                    }
                });
            }
        }
        else {
            const req = new XMLHttpRequest()
            req.open("GET", url, true);
            req.responseType = "arraybuffer"
            req.onloadend = () => {
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
                movieData.ver = "2.0";
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

        var version = "1.0";
        if(zip.file("movie.binary")){
            version = "1.5";
        }

        zip.file("movie.spec").async("string").then(function (spec) {
            let movieData = JSON.parse(spec);
            let images = {};

            movieData.ver = version;

            actions._loadImages(images, zip, movieData, function () {
                cb({
                    movie: movieData,
                    images,
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

    _base64ToArrayBuffer: (base64) => {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    },

    _readBlobAsArrayBuffer: (blob, callback) => {
        var reader = new FileReader();
        reader.onload = function(e) {callback(e.target.result);};
        reader.readAsArrayBuffer(blob);
    }

}

module.exports = (data, cb, failure) => {
    actions['loadAssets'](data, cb, failure);
}
