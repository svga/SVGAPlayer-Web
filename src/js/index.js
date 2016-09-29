import SvgaDB from './export/modules/svga-db.js';
import Svga from './export/svga.js';

console.time('下载转码耗时');
let svga = new Svga({
	worker: `${ window.location.origin }/assets/svga-worker.min.js`,
	canvas: '#canvas',
	assets: `${ window.location.origin }/assets/rose.svga`,
	// playCount: 1,
	autoPlay: true,
	loop: true,
	// db: SvgaDB,
}, (event) => {
	console.log('svga is ready');
	// svga.play();
	console.timeEnd('下载转码耗时');
})

svga.complete(() => {
	console.log('svga complete');
})

document.getElementById('play').addEventListener('click', () => {
	svga.play();
});

document.getElementById('pause').addEventListener('click', () => {
	svga.pause();
});

document.getElementById('stop').addEventListener('click', () => {
	svga.stop();
});

//
// setTimeout(() => {
// 	new Svga({
// 		canvas: '#canvas2',
// 		assets: `${ window.location.origin }/assets/rose.svga`,
// 		// playCount: 1,
// 		autoPlay: true,
// 		loop: true,
// 	}, (event) => {
// 		console.log('svga2 is ready');
// 	})
// }, 1000)
