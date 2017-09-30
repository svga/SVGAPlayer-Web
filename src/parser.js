'use strict';

import { VideoEntity } from './videoEntity'
import MockWorker from './mockWorker'

if (typeof window === "object") {
    window.SVGAPerformance = {}
}

export class Parser {

    /**
     * url: 资源路径
     * success(VideoEntity videoItem)
     */
    load(url, success, failure) {
        this.loadViaWorker(url, success, failure);
    }

    loadViaWorker(url, success, failure) {
        if (typeof window === "object") {
            window.SVGAPerformance.networkStart = performance.now()
        }
        MockWorker(url, (data) => {
            let movie = data.movie;
            let images = data.images;
            if (typeof window === "object") {
                window.SVGAPerformance.parseStart = performance.now()
            }
            let videoItem = new VideoEntity(movie, images);
            if (typeof window === "object") {
                window.SVGAPerformance.parseEnd = performance.now()
                console.log(window.SVGAPerformance);
            }
            success(videoItem);
        }, failure)
    }

}