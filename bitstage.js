var bitstrage =  function(_packbits){
	this._data= [];
	this._restbit= 0;
	this._packbit= _packbits;
	this._unshiftbit = 1;
	this._unshiftindex = -1;
	this.set = function (dat) {this._data = dat;return this;};
	this.get = function () {return this._data;};
	this.unshiftreset = function (){
		this._unshiftbit = 1;
		this._unshiftindex = -1;
		return this;
	};
	this.unshiftbit = function(){
		this._unshiftbit >>= 1;
		if(!this._unshiftbit){
			this._unshiftbit = 1<<(this._packbit-1);
			this._unshiftindex++;
		}
		if(this._data.length<=this._unshiftindex){
			return null;
		} else if ((this._data.length-1)==this._unshiftindex && this._unshiftbit < 1<<(this._restbit)) {
			return null;
		}
		return (this._data[this._unshiftindex] & this._unshiftbit)>0 ? true:false;
	}; // unshiftbit
	this.push= function (_val,bitlen){
		while(bitlen>0){
			var _targetBit,_lastData;
			//残処理
			if(this._restbit>0 && this._data.length > 0){
				_targetBit = this._restbit;
				_lastData = this._data.pop();
			//新規格納処理 
			} else {
				_targetBit = this._packbit;
				_lastData = 0;
			}
			if(bitlen<_targetBit){
				this._data.push(_lastData|((_val > 0)?(_val<<(_targetBit-bitlen)):0));
				this._restbit = _targetBit-bitlen;
				bitlen = 0;
			} else {
				var _shift = bitlen-_targetBit;
				var _working = _val >> _shift;
				_val = _val ^ (_working<<_shift);
				this._data.push(_lastData|_working);
				bitlen -= _targetBit;
				this._restbit = 0;
			}
		}
		
	}; // push
	
};
