(function (global){

var Utils = function() {
	var self = {};

	self.trim = function(string) {
		return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	self.createIdentifier = function(string) {
		/** @Todo Here'll be the code to clean the ^1color tags **/
		/** trims, lowercase and replace spaces for underscores **/
		return utils.trim(string).toLowerCase().split(' ').join('_');
	}

	self.contains = function(array, k) {
    	for(var p in array)
        	if(array[p] === k)
            	return true;
    	return false;
	}

	/** Taken From http://stackoverflow.com/a/5885493/7946 **/
	self.makeId = function (length, current){
		current = current ? current : '';
		return length ? self.makeId( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
	}

	return self;
};

global.Utils = new Utils();
}(typeof window  === 'undefined' ? exports : window));