qrcode.symbol.calcsize = function (ver){
	var _ret = 0;
	for(var i=1;i<=ver;i++){
		if(i==1){
			_ret += 26;
		} else if(i==2){
			_ret += 18;
		} else if((i%7)==0){
			_ret += ((i/7)*22);
			if(i<=7){
				_ret += 2;
			} else {
				_ret += 5;
			}
		} else {
			_ret += i*4+14;
		}
	}
	return _ret;
};