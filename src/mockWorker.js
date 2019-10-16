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
        if (typeof wx !== "undefined") {
            wx.request({
                url: url,
                dataType: 'arraybuffer',
                responseType: 'arraybuffer',
                success: (res) => {
                    actions.load_viaProto(res.data, cb, failure)
                }
            })
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
            actions._loadImages(images, movieData, function () {
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

    _loadImages: function (images, movieData, imagesLoadedBlock) {
        var finished = true;
        for (const key in movieData.images) {
            if (movieData.images.hasOwnProperty(key)) {
                const element = movieData.images[key];
                if (typeof wx !== "undefined" && typeof wx.arrayBufferToBase64 !== "undefined") {
                    images[key] = wx.arrayBufferToBase64(element)
                }
                else {
                    const value = Uint8ToString(element);
                    images[key] = btoa(value)
                }
            }
        }
        finished && imagesLoadedBlock.call(this)
    },

}

module.exports = (data, cb, failure) => {
    actions['loadAssets'](data, cb, failure);
}
