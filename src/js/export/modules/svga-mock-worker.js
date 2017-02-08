const largeuint8ArrToString = (uint8arr, callback) => {
    let bb = new Blob([uint8arr]);
    let f = new FileReader();
    f.onload = (e) => {
        callback(e.target.result);
    };
    f.readAsText(bb);
}

const base64ArrayBuffer = (arrayBuffer) => {
    let base64    = '';
    let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    let bytes         = new Uint8Array(arrayBuffer);
    let byteLength    = bytes.byteLength;
    let byteRemainder = byteLength % 3;
    let mainLength    = byteLength - byteRemainder;

    let a, b, c, d;
    let chunk;

    for (let i = 0; i < mainLength; i = i + 3) {
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        a = (chunk & 16515072) >> 18;
        b = (chunk & 258048)   >> 12;
        c = (chunk & 4032)     >>  6;
        d = chunk & 63;
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2;
        b = (chunk & 3)   << 4;
        base64 += encodings[a] + encodings[b] + '==';
    }else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10;
        b = (chunk & 1008)  >>  4;
        c = (chunk & 15)    <<  2;
        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return base64;
}

const actions = {

	// TODO 请求加载资源
	loadAssets: (url, cb) => {
		let xhr = new XMLHttpRequest();
		// worker 使用同步
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.response != null) {
					actions.decodeAssets((Zip.inflate(new Uint8Array(this.response))).files, cb);
                }
            }
        };
        xhr.responseType = 'arraybuffer';
        xhr.send();
	},

	// TODO 转码资源文件
	decodeAssets: (files, cb) => {
		const movie = files['movie.spec'].inflate();
		largeuint8ArrToString(movie, (data) => {
			const movieData = JSON.parse(data);
			const images = {};

			for(let item in movieData.images){
				images[item] = base64ArrayBuffer(files[`${ item }.png`].inflate());
			}

			// 回调
            cb({
                movie: movieData,
				images,
            })
		})
	}
}

module.exports = (data, cb) => {
    actions['loadAssets'](data, cb);
}
