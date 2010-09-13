var bitstrage =  function(_packbits){
		this._data= [];
		this._restbit= 0;
		this._packbit= _packbits;
		this.getData = function () {return this._data;};
		this.pushData= function (_val,bitlen){
			//エラーチェックが必要 
			//残処理
			if(this._restbit>0 && this._data.length > 0){
				if(bitlen<this._restbit){
					this._data.push(this._data.pop()|((_val > 0)?(_val<<(this._restbit-bitlen)):0));
					this._restbit = this._restbit-bitlen;
					bitlen = 0;
				} else {
					var _shift = bitlen-this._restbit;
					var _working = _val >> _shift;
					_val = _val ^ (_working<<_shift);
					this._data.push(this._data.pop()|_working);
					bitlen -= this._restbit;
					this._restbit = 0;
				}
			}
			//新規格納処理 
			while(bitlen>0){
				if(bitlen<this._packbit){
					this._data.push(((_val > 0)?(_val<<(this._packbit-bitlen)):0));
					this._restbit = this._packbit-bitlen;
					bitlen = 0;
				} else {
					var _shift = bitlen-this._packbit;
					var _working = _val >> _shift;
					_val = _val ^ (_working<<_shift);
					this._data.push(_working);
					bitlen -= this._packbit;
					this._restbit = 0;
				}
			}
			
		};
	};
