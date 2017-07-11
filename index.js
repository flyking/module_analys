var fs = require('fs');
var path = require('path');
var xlsxWrite = require('./lib/modules_xlsx.js');

var node_modules_dir = '../node_modules';
var packageValues = [];
var packageLength = 0;
var is_write_xlsx_file = true; //是否需要输出为xlsx文件

function walk(path, floor, handleFile) {  
    handleFile(path, floor);
    fs.readdir(path, function(err, files) {
    	if(floor==0){
    		packageLength = files.length;  
    	}
    	floor++;
        if (err) {  
            console.log('read dir error');  
        } else {  
                files.forEach(function(item) {  
                var tmpPath = path + '/' + item;  
                fs.stat(tmpPath, function(err1, stats) {  
                    if (err1) {  
                        console.log('stat error');  
                    } else {  
                        if (stats.isDirectory()) {  
                        	//floor = tempFloor 
                            walk(tmpPath, floor, handleFile);
                        } else {  
                            handleFile(tmpPath, floor);  
                        }  
                    }  
                })  
            });  
  
        }  
    });  
}  


function _get_modules_dir(){

}

function _get_modules_package(){
	walk(node_modules_dir,0,_handleFile);
}

function _handleFile(path, floor){
	if(floor==1){
		fs.stat(path, function(err1, stats) {
			if (err1) {  
                console.log('stat error');  
            } else {  
                if (stats.isDirectory()) {
                	var package_path =  path+"/package.json"
                	fs.stat(package_path,function(err2,stats){
                		if(err2) return;
                		if(stats.isFile()){
                			packageValues.push(_read_package_file(package_path));
                			if(packageLength - 5 < packageValues.length && is_write_xlsx_file){
                				xlsxWrite.writeXlsx('modules','react-bootstrap-master',packageValues)
                			}
                			//console.log(packageValues)
                		}
                	})
                } 
            } 
		})
	}
}	

function _read_package_file(path){
	var package = JSON.parse(fs.readFileSync(path));
	var name = _get_module_name(package),
		description = _get_module_description(package),
		homepage = _get_module_homepage(package),
		keywords = _get_module_keywords(package);
	
	var packageValues  = [];
	packageValues.push(name,description,homepage,keywords);
	return packageValues;
}

function _get_module_name(package){
	return package.name
}

function _get_module_homepage(package){
	return package.homepage || ''
}

function _get_module_keywords(package){
	return package.keywords || ''
}

function _get_module_description(package){
	return package.description || ''
}


function init(){
	_get_modules_package();
}

init();

