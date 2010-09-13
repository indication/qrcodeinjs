var bch_15_5 =  function (){
	this._trueCodes= [0x0,0x537,0xa6e,0xf59,0x11eb,0x14dc,0x1b85,0x1eb2
					,0x23d6,0x26e1,0x29b8,0x2c8f,0x323d,0x370a,0x3853,0x3d64
					,0x429b,0x47ac,0x48f5,0x4dc2,0x5370,0x5647,0x591e,0x5c29
					,0x614d,0x647a,0x6b23,0x6e14,0x70a6,0x7591,0x7ac8,0x7fff];
	this.encode = function (data){
		return this._trueCodes[data & 0x1f];
	};
	this.decode = function (data){
		data &= 0x7fff;
		/*
		 * 最小符号間距離が7であるので、ハミング距離が3以下の正規のコードを探す
		 * エラー訂正と検出の組み合わせは、以下の通り
		 *		訂正	検出
		 *		  3
		 *		  2		  4
		 *		  1		  5
		 */
		for(var i = 0; i < this._trueCodes.length; i++) {
			var code = this._trueCodes[i];
			if(this._calcDistance(data, code) <= 3) {
				return i;
			}
		}
		return -1;
	};
	this._calcDistance= function (c1, c2) {
		var n = 0;
		var wk = c1 ^ c2;
		while(wk != 0) {
			if((wk & 1) != 0) {
				n++;
			}
			wk >>= 1;
		}
		return n;
	};
};
/*
// 初期値の計算処理 
$(document).ready(function (){
	var GX = 0x137;
	function _slowEncode(data) {
		var wk = 0;
		data <<= 5;
		for(var i = 0; i < 5; i++) {
			wk <<= 1;
			data <<= 1;
			if(((wk ^ data) & 0x400) != 0) {
				wk ^= GX;
			}
		}
		return (data & 0x7c00) | (wk & 0x3ff);
	}
	function _bch_15_5Inits(){
		var trueCodes = new Array(32);
		for(var i = 0; i < trueCodes.length; i++) {
			trueCodes[i] = _slowEncode(i);
		}
		//return {exp:expTbl,log:logTbl};
		printEach(trueCodes,'#exportExpTbl');
	}
	
	function printEach(arr,tgt){
		$(tgt).html('[');
		for(var i=0;i<arr.length;i++){
			if(i!=0){$(tgt).append(',');}
			$(tgt).append('0x' + arr[i].toString(16));
			if(((i+1) % 8) == 0 && i != 0){
				$(tgt).append('<br />');
			}
		}
		$(tgt).append(']');
	}
	$('body').append('<div id="exportExpTbl"></div>');
	_bch_15_5Inits();
});
*/
