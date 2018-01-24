var pubAppLink = 'https://script.google.com/a/google.com/macros/s/AKfycbyw37GiwIXBbqDm3Gw6GsLh_-E_1vf0a_DYIuKNWl7E/dev';
var ss = SpreadsheetApp.openById('1qEn-NzkF8FXtiFE5IXU0c68-wgwHA6caoVEga7oLq2k'),
	sheets = ss.getSheets();
var reportSheets = ['1302592490', '765939537', '1655391502', '358754018', '524643340', '1756621706', '261997280', '308775893', '1543509270', '1525219547', '1957125539'];
function doGet(e) {
	var t = HtmlService.createTemplateFromFile('index');
	return t.evaluate()
		.setSandboxMode(HtmlService.SandboxMode.IFRAME)
		.setTitle('Angular-GAS-Zoo');
}

function require(filename) {
	return HtmlService.createHtmlOutputFromFile(filename)
		.getContent();
}
function getData() {
	var ret = {
		validUser: isValidUser(),
//        isReportSheet()
        isReportSheet: isReportSheet(),
		data: {}
	};
	sheets.forEach(function (sh) {
		ret.data[sh.getName()] = sh.getDataRange()
			.getValues();
	});
	return JSON.parse(JSON.stringify(ret));
}

function create(shName, arr, shIndex) {
	if (!isValidUser()) return {
		error: "Invalid user"
	};
	var sh = ss.getSheetByName(shName);
	if (!sh) return {
		error: 'Invalid sheet name'
	};
	var lastColumn = sh.getLastColumn(),
		lastRow = sh.getLastRow(),
		id = sh.getRange(lastRow, 1)
		.getValue() + 1;
	arr[0] = typeof id === 'number' ? id : 1;
	var data = arr.slice(0, lastColumn);
	sh.getRange(lastRow + 1, 1, 1, lastColumn)
		.setValues([data]);
	return {
		data: data,
		shIndex: shIndex
	};
}

function remove(shName, id, shIndex, itemIndex) {
	if (!isValidUser()) return {
		error: "Invalid user"
	};
	var sh = ss.getSheetByName(shName);
	if (!sh) return {
		error: 'Invalid sheet name'
	};
	var rowIndex = getRowIndex_(sh, id);
	if (!rowIndex) return {
		error: 'Invalid item id'
	};
	return {
		shIndex: shIndex,
		itemIndex: itemIndex
	};
}

function getRowIndex_(sh, id) {
	var values = sh.getDataRange()
		.getValues(),
		i = 0,
		len = values.length;
	for (; i < len; i += 1) {
		if (values[i][0] == id) return i + 1;
	}
}

function update(shName, arr, shIndex, itemIndex) {
	if (!isValidUser()) return {
		error: "Invalid user"
	};
	var sh = ss.getSheetByName(shName);
	if (!sh) return {
		error: 'Invalid sheet name'
	};
	var rowIndex = getRowIndex_(sh, arr[0]);
	if (!rowIndex) return {
		error: 'Invalid item id'
	};
	var lastColumn = sh.getLastColumn();
	var data = arr.slice(0, lastColumn);
	sh.getRange(rowIndex, 1, 1, lastColumn)
		.setValues([data]);
	return {
		data: data,
		shIndex: shIndex,
		itemIndex: itemIndex
	};
}

function isValidUser() {
	return true;
}
function isReportSheet() {
	sheets.forEach(function (sh) {
		var sheetIds = sh.getSheetId();
		if (sheetIds = reportSheets) {
			Logger.log(sheetIds)
		} return sheetIds
	})
    return true;
}
