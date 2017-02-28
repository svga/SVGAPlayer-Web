require('./export/modules/easeljs.min');
import Bezier from './export/modules/bezier/bezier';

const validMethods = {
	'M': 1,
	'm': 1,
	'L': 1,
	'l': 1,
	'H': 1,
	'h': 1,
	'V': 1,
	'v': 1,
	'C': 1,
	'c': 1,
	'S': 1,
	's': 1,
	'Q': 1,
	'q': 1,
	'R': 1,
	'r': 1,
	'Z': 1,
	'z': 1,
};

const start = 0.6;
const end = 0.9;

const calTwoPointLineDistance = (x1, y1, x2, y2) => {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

const _mask = () => {
	// let path = `M -109.500 54.750 C -109.500 54.750 119.500 54.750 119.500 54.750`;
	let path = `M 20 20 L 20 100 L 100 100 L 100 20 L 20 20 Z`;
	let shape = new createjs.Shape();
	let g = shape.graphics;
	// let g = new createjs.Graphics();
	// g.beginFill('#fff');
	shape.x = 0;
	shape.y = 0;
	let args = [];
	let tempArg = [];
	let items = path.replace(/,/g, ' ').split(' ');
	let point = {
		x: 0,
		y: 0,
	};
	let length = 0;
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		if (item.length < 1) {
			continue;
		}
		let firstLetter = item.substr(0, 1);
		if (validMethods[firstLetter] === 1) {
			if (tempArg.length > 0) {
				args.push(tempArg);
				tempArg = [];
			}
			tempArg.push(firstLetter);
			if (item.substr(1).trim().length > 0) {
				tempArg.push(item.substr(1));
			}
		}else{
			tempArg.push(item);
		}
	}
	if (tempArg.length > 0) {
		args.push(tempArg);
		tempArg = [];
	}
	let lengthArray = [];
	let lastPointX, lastPointY = 0;
	for (let i = 0; i < args.length; i++) {
		let arg = args[i];
		if (!(arg[0] == 'C' || arg[0] == 'c')) {
			delete (point.x1);
			delete (point.y1);
			delete (point.x2);
			delete (point.y2);
		}
		switch (arg[0]) {
			case 'M':
				point.x = Number(arg[1]);
				point.y = Number(arg[2]);
				lengthArray.push(0);
				g.mt(point.x, point.y);
				lastPointX = point.x;
				lastPointY = point.y;
				break;
			case 'm':
				point.x += Number(arg[1]);
				point.y += Number(arg[2]);
				lengthArray.push(0);
				g.mt(point.x, point.y);
				lastPointX = point.x;
				lastPointY = point.y;
				break;
			case 'L':
				point.x = Number(arg[1]);
				point.y = Number(arg[2]);
				lengthArray.push(calTwoPointLineDistance(lastPointX, lastPointY, point.x, point.y));
				g.lt(point.x, point.y);
				lastPointX = point.x;
				lastPointY = point.y;
				break;
			case 'l':
				point.x += Number(arg[1]);
				point.y += Number(arg[2]);
				lengthArray.push(calTwoPointLineDistance(lastPointX, lastPointY, point.x, point.y));
				g.lt(point.x, point.y);
				lastPointX = point.x;
				lastPointY = point.y;
				break;
			case 'H':
				point.x = Number(arg[1]);
				lengthArray.push(calTwoPointLineDistance(lastPointX, lastPointY, point.x, point.y));
				g.lt(point.x, point.y);
				lastPointX = point.x;
				break;
			case 'h':
				point.x += Number(arg[1]);
				lengthArray.push(calTwoPointLineDistance(lastPointX, lastPointY, point.x, point.y));
				g.lt(point.x, point.y);
				lastPointX = point.x;
				break;
			case 'V':
				point.y = Number(arg[1]);
				lengthArray.push(calTwoPointLineDistance(lastPointX, lastPointY, point.x, point.y));
				g.lt(point.x, point.y);
				lastPointY = point.y;
				break;
			case 'v':
				point.y += Number(arg[1]);
				lengthArray.push(calTwoPointLineDistance(lastPointX, lastPointY, point.x, point.y));
				g.lt(point.x, point.y);
				lastPointY = point.y;
				break;
			case 'C':
				point.x1 = Number(arg[1]);
				point.y1 = Number(arg[2]);
				point.x2 = Number(arg[3]);
				point.y2 = Number(arg[4]);
				point.x = Number(arg[5]);
				point.y = Number(arg[6]);
				g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				break;
			case 'c':
				point.x1 = point.x + Number(arg[1]);
				point.y1 = point.y + Number(arg[2]);
				point.x2 = point.x + Number(arg[3]);
				point.y2 = point.y + Number(arg[4]);
				point.x += Number(arg[5]);
				point.y += Number(arg[6]);
				g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				break;
			case 'S':
				if (point.x1 && point.y1 && point.x2 && point.y2) {
					point.x1 = point.x - point.x2 + point.x;
					point.y1 = point.y - point.y2 + point.y;
					point.x2 = Number(arg[1]);
					point.y2 = Number(arg[2]);
					point.x = Number(arg[3]);
					point.y = Number(arg[4]);
					g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				} else {
					point.x1 = Number(arg[1]);
					point.y1 = Number(arg[2]);
					point.x = Number(arg[3]);
					point.y = Number(arg[4]);
					g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				}
				break;
			case 's':
				if (point.x1 && point.y1 && point.x2 && point.y2) {
					point.x1 = point.x - point.x2 + point.x;
					point.y1 = point.y - point.y2 + point.y;
					point.x2 = point.x + Number(arg[1]);
					point.y2 = point.y + Number(arg[2]);
					point.x += Number(arg[3]);
					point.y += Number(arg[4]);
					g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				} else {
					point.x1 = point.x + Number(arg[1]);
					point.y1 = point.y + Number(arg[2]);
					point.x += Number(arg[3]);
					point.y += Number(arg[4]);
					g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				}
				break;
			case 'Q':
				point.x1 = Number(arg[1]);
				point.y1 = Number(arg[2]);
				point.x = Number(arg[3]);
				point.y = Number(arg[4]);
				g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				break;
			case 'q':
				point.x1 = point.x + Number(arg[1]);
				point.y1 = point.y + Number(arg[2]);
				point.x += Number(arg[3]);
				point.y += Number(arg[4]);
				g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				break;
			case 'A':
				break;
			case 'a':
				break;
			case 'Z':
			case 'z':
				lengthArray.push(0);
				g.cp();
				break;
			default:
				break;
		}
	}
	console.log(lengthArray);
	let totalLength = 0;
	lengthArray.forEach((item) => {
	    totalLength += item;
	})
	const startFlag = totalLength * start;
	const endFlag = totalLength * end;

	let totalLength2 = 0;
	let includePath = [];
	let valFlag = 0;
	lengthArray.forEach((item, index) => {
		if(totalLength2 + item >= startFlag && valFlag == 0){
			valFlag = 1;
			const distancePathLength = startFlag - totalLength2;
			includePath.push({
				index,
				d1: distancePathLength,
				d2: item - distancePathLength,
			});
		}else if(totalLength2 + item >= endFlag && valFlag == 1){
			valFlag = 2;
			const distancePathLength = endFlag - totalLength2;
			includePath.push({
				index,
				d1: distancePathLength,
				d2: item - distancePathLength,
			});
		}
		totalLength2 += item;
	})
	console.log(includePath);
	console.log(args);

	let newArgs = [];
	args.forEach((item, index) => {
		if(index == includePath[0].index){
			const { d1, d2 } = includePath[0];
			const o = d1 / d2;
			const x = (Number(args[index - 1][1]) + o * Number(args[index][1])) / (1 + o);
			const y = (Number(args[index - 1][2]) + o * Number(args[index][2])) / (1 + o);
			newArgs.push(['M', x, y]);
			newArgs.push(item);
		}else if(index > includePath[0].index && index < includePath[1].index){
			newArgs.push(item);
		}else if(index == includePath[1].index){
			const { d1, d2 } = includePath[0];
			const o = d1 / d2;
			const x = (Number(args[index - 1][1]) + o * Number(args[index][1])) / (1 + o);
			const y = (Number(args[index - 1][2]) + o * Number(args[index][2])) / (1 + o);
			newArgs.push(['L', x, y]);
		}
	    // console.log(item);
	})

	console.log(newArgs);

	g.clear();
	g.setStrokeStyle(5);
 	g.beginStroke("#fff");

	for (let i = 0; i < newArgs.length; i++) {
		let arg = args[i];
		if (!(arg[0] == 'C' || arg[0] == 'c')) {
			delete (point.x1);
			delete (point.y1);
			delete (point.x2);
			delete (point.y2);
		}
		switch (arg[0]) {
			case 'M':
				point.x = Number(arg[1]);
				point.y = Number(arg[2]);
				g.mt(point.x, point.y);
				break;
			case 'm':
				point.x += Number(arg[1]);
				point.y += Number(arg[2]);
				g.mt(point.x, point.y);
				break;
			case 'L':
				point.x = Number(arg[1]);
				point.y = Number(arg[2]);
				g.lt(point.x, point.y);
				break;
			case 'l':
				point.x += Number(arg[1]);
				point.y += Number(arg[2]);
				g.lt(point.x, point.y);
				break;
			case 'H':
				point.x = Number(arg[1]);
				g.lt(point.x, point.y);
				break;
			case 'h':
				point.x += Number(arg[1]);
				g.lt(point.x, point.y);
				break;
			case 'V':
				point.y = Number(arg[1]);
				g.lt(point.x, point.y);
				break;
			case 'v':
				point.y += Number(arg[1]);
				g.lt(point.x, point.y);
				break;
			case 'C':
				point.x1 = Number(arg[1]);
				point.y1 = Number(arg[2]);
				point.x2 = Number(arg[3]);
				point.y2 = Number(arg[4]);
				point.x = Number(arg[5]);
				point.y = Number(arg[6]);
				g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				break;
			case 'c':
				point.x1 = point.x + Number(arg[1]);
				point.y1 = point.y + Number(arg[2]);
				point.x2 = point.x + Number(arg[3]);
				point.y2 = point.y + Number(arg[4]);
				point.x += Number(arg[5]);
				point.y += Number(arg[6]);
				g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				break;
			case 'S':
				if (point.x1 && point.y1 && point.x2 && point.y2) {
					point.x1 = point.x - point.x2 + point.x;
					point.y1 = point.y - point.y2 + point.y;
					point.x2 = Number(arg[1]);
					point.y2 = Number(arg[2]);
					point.x = Number(arg[3]);
					point.y = Number(arg[4]);
					g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				} else {
					point.x1 = Number(arg[1]);
					point.y1 = Number(arg[2]);
					point.x = Number(arg[3]);
					point.y = Number(arg[4]);
					g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				}
				break;
			case 's':
				if (point.x1 && point.y1 && point.x2 && point.y2) {
					point.x1 = point.x - point.x2 + point.x;
					point.y1 = point.y - point.y2 + point.y;
					point.x2 = point.x + Number(arg[1]);
					point.y2 = point.y + Number(arg[2]);
					point.x += Number(arg[3]);
					point.y += Number(arg[4]);
					g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
				} else {
					point.x1 = point.x + Number(arg[1]);
					point.y1 = point.y + Number(arg[2]);
					point.x += Number(arg[3]);
					point.y += Number(arg[4]);
					g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				}
				break;
			case 'Q':
				point.x1 = Number(arg[1]);
				point.y1 = Number(arg[2]);
				point.x = Number(arg[3]);
				point.y = Number(arg[4]);
				g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				break;
			case 'q':
				point.x1 = point.x + Number(arg[1]);
				point.y1 = point.y + Number(arg[2]);
				point.x += Number(arg[3]);
				point.y += Number(arg[4]);
				g.bt(point.x1, point.y1, point.x, point.y, point.x, point.y);
				break;
			case 'A':
				break;
			case 'a':
				break;
			case 'Z':
			case 'z':
				lengthArray.push(0);
				g.cp();
				break;
			default:
				break;
		}
	}



	return shape;
}

let stage = new createjs.Stage('canvas');
stage.addChild(_mask());
stage.update();
