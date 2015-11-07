module.exports = function(n) {
	var a = n * (n - 1) + 1,
		res = a + '',
		i = 1;
	
	while (i < n) {
		res += ' + ' + (a + 2*i + '');
		i++;
	}
	return res;
}