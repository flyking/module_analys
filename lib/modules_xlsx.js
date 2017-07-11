var xlsx = require('node-xlsx');                                                                                                                                               
var fs = require('fs');


function buildXlsxData(sheetName,array){
	var data = [];
	var obj = {
		name:sheetName,
		data:array
	}
	data.push(obj)
	return xlsx.build(data)
}

function writeXlsx(fileName,sheetName,values){
	var file = './xlsxbuild/'+fileName + '.xlsx';
	fs.writeFileSync(file, buildXlsxData(sheetName,values), 'binary');
}


module.exports.writeXlsx = writeXlsx;
