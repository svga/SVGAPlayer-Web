import Svga from './export/svga.js';

let svga = new Svga({
	canvas: '#canvas',
	assets: `${ window.location.origin }/assets/rose.svga`,
	playCount: 2,
	autoPlay: false,
	loop: true,
}, (event) => {
	console.log('svga is ready');
	svga.play();
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

document.getElementById('destroy').addEventListener('click', () => {
	svga.destroy();
});
