'use strict';

import SVGAVideoEntity from './svga-videoEntity'
import SVGAMockWorker from './svga-mock-worker'

module.exports = class SVGAParser {

    static worker;
    static lastWorker;
    static database;

    constructor(worker, dbClass) {
        if (worker && window.Worker) {
            SVGAParser.worker = new Worker(worker);
            SVGAParser.lastWorker = worker;
        }
        if (dbClass && window.openDatabase) {
            SVGAParser.database = new dbClass();
        }
    }

    /**
     * url: 资源路径
     * callback(SVGAVideoEntity videoItem)
     */
    load(url, success, failure) {
        if (SVGAParser.database) {
            SVGAParser.database.find(url, ( images, movie, err ) => {
                if (!err) {
                    let videoItem = new SVGAVideoEntity(movie, images);
                    callback(videoItem);
                } 
                else {
                    this.loadViaWorker(url, success, failure);
                }
            });
        }
        else {
            this.loadViaWorker(url, success, failure);
        }
    }
    
    loadViaWorker(url, success, failure) {
        if (SVGAParser.worker) {
            const currentWorker = failure !== undefined ? new Worker(SVGAParser.lastWorker) : SVGAParser.worker;
            currentWorker.postMessage(url);
            currentWorker.onerror = ( err ) => {
                failure(err);
            };
            currentWorker.onmessage = ({ data }) => {
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
                success(videoItem);
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
                success(videoItem);
            }, failure)
        }
    }

}