'use strict';

/**
 * @file  : svga-db
 * @author: lijialiang
 * @team  : UED中心
 * @export: umd
 */

module.exports = class SvgaDB {

	static db;
	static table = {
		name: 'svga',
		attribute: 'url, movie, images, time',
	};

    constructor (args) {
		this._initDB();
		this._createTable();
    }

	// TODO: 初始化 DB
	_initDB () {
		SvgaDB.db = openDatabase('legox', '1.0', 'LegoX DB', 5 * 1024 * 1024);
	}

	// TODO: SQL 错误回调
	_errorCallBack (context, err) {
		console.error(`[Svga Web Canvas DB]: `, err);
	}

	// TODO: 创建表格
	_createTable () {
		SvgaDB.tableAttributeString = '';
		SvgaDB.db.transaction((context) => {
			// context.executeSql(`DROP TABLE IF EXISTS ${ SvgaDB.table.name }`);
			context.executeSql(`CREATE TABLE IF NOT EXISTS ${ SvgaDB.table.name } (${ SvgaDB.table.attribute })`);
		});
	}

	// TODO: 增加 item
	add ({ url, movie, images }) {
		SvgaDB.db.transaction((context) => {
        	context.executeSql(`INSERT INTO ${ SvgaDB.table.name } (${ SvgaDB.table.attribute }) VALUES (?, ?, ?, ?)`, [url, JSON.stringify(movie), JSON.stringify(images), new Date], (context, results) => {
				console.info(`[Svga Web Canvas DB]: add success`);
			}, this._errorCallBack);
		});
	}

	// TODO: 通过 url 查找 item
	find (url, callback) {
		SvgaDB.db.transaction((context) => {
        	context.executeSql(`SELECT * FROM ${ SvgaDB.table.name } WHERE url LIKE ?`, [url], (context, results) => {
				if(results.rows.length > 0){
					callback(JSON.parse(results.rows.item(0).images), JSON.parse(results.rows.item(0).movie), false);
				}else{
					callback('', '', true);
				}
			}, this._errorCallBack);
        });
	}

	// TODO: 清除 item
	clear (arg) {
		if(typeof arg === 'string'){
			this._clearByUrl(arg);
		}else if(typeof arg === 'number'){
			this._clearByDate(arg);
		}
	}

	// TODO: 通过 url 清除 item
	_clearByUrl (url) {
		SvgaDB.db.transaction((context) => {
        	context.executeSql(`DELETE FROM ${ SvgaDB.table.name } WHERE url LIKE ?`, [url], (context, results) => {
				console.info(`[Svga Web Canvas DB]: clear success`);
			}, this._errorCallBack);
        });
	}

	// 通过日期差 清除 item
	_clearByDate (day) {
		const today = new Date();
		SvgaDB.db.transaction((context) => {
        	context.executeSql(`SELECT * FROM ${ SvgaDB.table.name }`, [], (context, results) => {
				const rowsLength = results.rows.length;
				for(let i = 0; i < rowsLength; i++){
					const item     = results.rows.item(i);
					const itemDate = new Date(item.time);
					const dt       = (today.getTime() - itemDate.getTime()) / (24 * 3600 * 1000);
					if(dt >= day){
						this._clearByUrl(item.url);
					}
				}
			}, this._errorCallBack);
        });
	}

}
