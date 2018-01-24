import { VideoEntity } from './videoEntity'
import MockWorker from './mockWorker'

export class Parser {

    /**
     * url: 资源路径
     * success(VideoEntity videoItem)
     */
    load(url, success, failure) {
        this.loadViaWorker(url, success, failure);
    }

    loadViaWorker(url, success, failure) {
        MockWorker(url, (data) => {
            let movie = data.movie;
            movie["version"] = data.ver;
            let images = data.images;
            let videoItem = new VideoEntity(movie, images);
            success(videoItem);
        }, failure)
    }

}