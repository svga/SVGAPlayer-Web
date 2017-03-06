'use strict';

import SVGAVideoEntity from './svga-videoEntity'
import SVGAMockWorker from './svga-mock-worker'

module.exports = class SVGAParser {

    static worker;
    static database;

    constructor(worker, dbClass) {
        if (worker && window.Worker) {
            SVGAParser.worker = new Worker(worker);
            SVGAParser.worker.onerror = ( err ) => {
                console.log('[SVGA Web Canvas]: worker is error');
            };
        }
        else if (typeof SVGAParser.worker !== 'undefined') {
            SVGAParser.worker = new Worker(SVGAParser.worker);
            SVGAParser.worker.onerror = ( err ) => {
                console.log('[SVGA Web Canvas]: worker is error');
            };
        }
        if (dbClass && window.openDatabase) {
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
                    this.loadViaWorker(url, callback);
                }
            });
        }
        else {
            this.loadViaWorker(url, callback);
        }
    }
    
    loadViaWorker(url, callback) {
        if (SVGAParser.worker) {
            console.log("using worker.");
            SVGAParser.worker.postMessage(url);
            SVGAParser.worker.onmessage = ({ data }) => {
                let movie = data.movie;
                let images = data.images;
                if (SVGAParser.database) {
                    SVGAParser.database.add({
                        url : url,
                        movie,
                        images,
                    });
                }
                let videoItem = new SVGAVideoEntity(movie, images);
                callback(videoItem);
            };
        }
        else {
            SVGAMockWorker(url, (data) => {
                let movie = data.movie;
                let images = data.images;
                if (SVGAParser.database) {
                    SVGAParser.database.add({
                        url : url,
                        movie,
                        images,
                    });
                }
                let videoItem = new SVGAVideoEntity(movie, images);
                callback(videoItem);
            })
        }
    }

}