var bitstrage =  function(_packbits){
		this._data= [];
		this._restbit= 0;
		this._packbit= _packbits;
		this.get = function () {return this._data;};
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
