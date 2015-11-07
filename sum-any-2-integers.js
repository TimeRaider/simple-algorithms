String.prototype.repeat = String.prototype.repeat || function(n) {
    return new Array(++n).join(this);
}

module.exports = function(a, b) {
    a = a + '';
    b = b + '';
    
    // abs
    var aUnsigned = a.replace('-', ''), 
    	bUnsigned = b.replace('-', '');
    	
    // switch
    if (bUnsigned.length > aUnsigned.length || (bUnsigned.length === aUnsigned.length && bUnsigned > aUnsigned)) {
        aUnsigned = [bUnsigned, bUnsigned = aUnsigned][0];
        a = [b, b = a][0]
    }

    // signs
    var aSign = a[0] === '-' ? -1 : 1,  
    	bSign = b[0] === '-' ? -1 : 1,
    	resSign = aSign < 0 ? '-' : '',
    	opSign = aSign === bSign ? 1 : -1

    // normalize
    bUnsigned = '0'.repeat(aUnsigned.length - bUnsigned.length) + bUnsigned;
    
    var aArr = aUnsigned.split('').reverse().map(function(i) { return i * 1 }),
	    bArr = bUnsigned.split('').reverse().map(function(i) { return i * 1 }),
	    cArr = []

	aArr.forEach(function(item, index) {
		var cur = cArr[index] || 0;

		if (opSign === 1) {
			var	res = aArr[index] + bArr[index] + cur;

			if (res > 9) {
				cArr[index] = res % 10;
				cArr[index + 1] = 1;
			} else {
				cArr[index] = res;
			}
		} else {
			var	res = aArr[index] - bArr[index] - cur;
			if (res < 0) {
				cArr[index] = 10 + aArr[index] - bArr[index] - cur;
				cArr[index + 1] = 1;
			} else {
				cArr[index] = res;	
			}
		}
	}, 0)

	var ansMod = cArr.reverse().join('')
	return ansMod !== '0' ? resSign + ansMod : ansMod;
}