import SvgaDB from './export/svga-db.js';
// import Svga from './export/svga.js';
import Svga from './export/svga-not-worker';

console.time('下载转码耗时');
let svga = new Svga({
	// worker: `${ window.location.origin }/assets/svga-worker.min.js`,
	canvas: '#canvas',
	// assets: `${ window.location.origin }/assets/rose.svga`,
	assets: `${ window.location.origin }/assets/kingset_dyn.svga`,
	// playCount: 1,
	// autoPlay: true,
	autoPlay: false,
	loop: true,
	// db: SvgaDB,
}, (event) => {
	console.log('svga is ready');
	// svga.play();
	console.timeEnd('下载转码耗时');

	svga.setDynamicImage('../assets/avatar.png', '99');

	svga.setDynamicText({
		text  : '崔小姐不吃鱼 送了帝王套',
		size  : '30px',
		family: 'Arial',
		color : '#ffe0a4',
		key   : 'banner',
	})

	svga.play();
})

svga.complete(() => {
	console.log('svga complete');
})

document.getElementById('play').addEventListener('click', () => {
	svga.play();
	console.log(svga.getState());
});

document.getElementById('pause').addEventListener('click', () => {
	svga.pause();
	console.log(svga.getState());
});

document.getElementById('stop').addEventListener('click', () => {
	svga.stop();
	console.log(svga.getState());
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
