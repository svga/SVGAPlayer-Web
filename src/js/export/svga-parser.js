
import SVGAVideoEntity from './modules/svga-videoEntity'

module.exports = class SVGAParser {

    static worker;
    static database;

    constructor(worker, dbClass) {
        // 创建 worker
        if (worker) {
            SVGAParser.worker = new Worker(worker);
        }
        // 复用 worker
        else if (typeof SVGAPlayer.worker !== 'undefined') {
            SVGAParser.worker = new Worker(SVGAPlayer.worker);
        }
        SVGAParser.worker.onerror = ( err ) => {
            console.log('[SVGA Web Canvas]: worker is error');
        };
        if (dbClass) {
            SVGAParser.database = new dbClass();
        }
    }

    /**
     * url: 资源路径
     * callback(SVGAVideoEntity videoItem)
     */
    load(url, callback) {
        if (SVGAParser.database) {
            SVGAParser.database.find(url, ( images, movie, err ) => {
                if (!err) {
                    let videoItem = new SVGAVideoEntity(movie, images);
                    callback(videoItem);
                } 
                else {
                    SVGAParser.worker.postMessage(url);
                    SVGAParser.worker.onmessage = ({ data }) => {
                        let movie = data.movie;
                        let images = data.images;
                        SVGAParser.database.add({
                            url : url,
                            movie,
                            images,
                        });
                        let videoItem = new SVGAVideoEntity(movie, images);
                        callback(videoItem);
                    };
                }
            });
        }
        else if (SVGAParser.worker) {
            SVGAParser.worker.postMessage(url);
            SVGAParser.worker.onmessage = ({ data }) => {
                let spec = data.movie;
                let images = data.images;
                let videoItem = new SVGAVideoEntity(spec, images);
                callback(videoItem);
            };
        }
        else {
            callback(null);
        }
    }

}