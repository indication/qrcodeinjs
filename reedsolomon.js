/**
 * Galois.java
 * @author Masayuki Miyazaki
 * @see http://sourceforge.jp/projects/reedsolomon/
 */

var galois = {
	_expTbl:[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76
			,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157
			,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70
			,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95
			,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253
			,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217
			,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129
			,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133
			,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168
			,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230
			,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227
			,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130
			,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81
			,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18
			,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44
			,88,176,125,250,233,207,131,27,54,108,216,173,71,142,1,2
			,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152
			,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39
			,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140
			,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190
			,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231
			,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175
			,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31
			,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23
			,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77
			,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209
			,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219
			,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25
			,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162
			,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36
			,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88
			,176,125,250,233,207,131,27,54,108,216,173,71,142]
	,_logTbl:[0,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4
			,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5
			,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29
			,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6
			,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54
			,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30
			,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202
			,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7
			,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227
			,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55
			,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242
			,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31
			,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108
			,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203
			,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79
			,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175],
	/**
	 * スカラー -> ベクター変換
	 *
	 * @param a int
	 * @return int
	 */
	toExp: function (a){		return this._expTbl[a];},
	/**
	 * ベクター -> スカラー変換
	 *
	 * @param a int
	 * @return int
	 */
	toLog:	function (a){		return this._logTbl[a];},
	/**
	 * 誤り位置インデックスの計算
	 *
	 * @param len int	データ長
	 * @param a int		誤り位置ベクター
	 * @return int		誤り位置インデックス
	 */
	toPos:	function (len,a){	return len - 1 - this._logTbl[a];},
	/**
	 * 掛け算
	 *
	 * @param a int
	 * @param b int
	 * @return int		= a * b
	 */
	mul:	function (a,b){		return (a == 0 || b == 0)? 0 : this.toExp(this.toLog(a) + this.toLog(b));},
	/**
	 * 掛け算
	 *
	 * @param a int
	 * @param b int
	 * @return int		= a * α^b
	 */
	 mulExp:function (a,b){		return (a == 0)? 0 : this.toExp(this.toLog(a) + b);},
	/**
	 * 割り算
	 *
	 * @param a int
	 * @param b int
	 * @return int		= a / b
	 */
	div:	function (a,b){		return (a == 0)? 0 : this.toExp(this.toLog(a) - this.toLog(b) + 255);},
	/**
	 * 割り算
	 *
	 * @param a int
	 * @param b int
	 * @return int		= a / α^b
	 */
	divExp:function (a,b){		return (a == 0)? 0 : this.toExp(this.toLog(a) - b + 255);},
	/**
	 * 逆数
	 *
	 * @param a int
	 * @return int		= 1/a
	 */
	inv:	function (a){		return this.toExp(255 - this.toLog(a));},
	/**
	 * 数式の掛け算
	 *
	 * @param seki int[]		seki = a * b
	 * @param a int[]
	 * @param b int[]
	 */
	 mulPoly: function (seki,a,b){
		var lenb = b.length;
		var lenseki = seki.length;
		for(var i=0;i<lenseki;i++){seki[i]=0;}
		for(var ia = 0; ia < a.length; ia++) {
			if(a[ia] == 0) {continue;}
			var ib2 = Math.min(lenb, lenseki - ia);
			for(var ib = 0; ib < ib2; ib++) {
				if(b[ib] == 0) {continue;}
				seki[ia + ib] ^= this.mul(a[ia],b[ib]);	// = a[ia] * b[ib]
			}
		}
	 },
	/**
	 * シンドロームの計算
	 * @param data int[]	入力データ配列
	 * @param len int	データ長
	 * @param syn int[]		(x - α^0) (x - α^1) (x - α^2) ...のシンドローム
	 * @return boolean		true: シンドロームは総て0
	 */
	 calcSyndrome:function (data,len,syn) {
		var hasErr = 0;
		var synlen =  syn.length;
		for(var i = 0; i < synlen;  i++) {
			var wk = 0;
			for(var idx = 0; idx < len; idx++) {
				 wk = data[idx] ^ ((wk == 0)? 0 : this.mulExp(wk,i));		// wk = data + wk * α^i
			}
			syn[i] = wk;
			hasErr |= wk;
		}
		return (hasErr == 0);
	 }
};

/**
 * タイトル: RSコード・エンコーダ
 *
 * @author Masayuki Miyazaki
 * http://sourceforge.jp/projects/reedsolomon/
 */
rsEncode = function (npar){
	this.parity = function (npar){
		if(!npar){
			return this.npar;
		}
		if(this.npar == npar){
			return this;
		}
		this.npar = npar;
		this.encodeGx = new Array(npar);
		this.encodeGx[npar - 1] = 1;
		for(var kou = 0; kou < npar; kou++) {
			var ex = galois.toExp(kou);			// ex = α^kou
			// (x + α^kou)を掛る
			for(var i = 0; i < npar - 1; i++) {
				// 現在の項 * α^kou + 一つ下の次数の項
				this.encodeGx[i] = galois.mul(this.encodeGx[i], ex) ^ this.encodeGx[i + 1];
			}
			this.encodeGx[npar - 1] = galois.mul(this.encodeGx[npar - 1], ex);		// 最下位項の計算
		}
		return this;
	}
	this.encode = function (data,len){
		if(!len){
			len = data.length;
		}
		if(len < 0 || len + this.npar > 255) {
			return [];
		}
		var wr = new Array(this.npar);
		for(var idx = 0; idx < len; idx++) {
			var code = data[idx];
			var  ib = wr[0] ^ code;
			for(var i = 0; i < npar - 1; i++) {
				wr[i] = wr[i + 1] ^ galois.mul(ib, this.encodeGx[i]);
			}
			wr[npar - 1] = galois.mul(ib, this.encodeGx[npar - 1]);
		}
		return wr;
	}
	// コンストラクタをコール 
	this.parity(npar);
};
/*
// 初期値の計算処理 
$(document).ready(function (){
	function _galoisInits(){
		var expTbl = new Array(255 * 2);
		var logTbl = new Array(255 + 1);
		var POLYNOMIAL = 0x1d;
		var  d = 1;
		for(var i = 0; i < 255; i++) {
			expTbl[i] = expTbl[255 + i] = d;
			logTbl[d] = i;
			d <<= 1;
			if((d & 0x100) != 0) {
				d = (d ^ POLYNOMIAL) & 0xff;
			}
		}
		//return {exp:expTbl,log:logTbl};
		printEach(expTbl,'#exportExpTbl');
		printEach(logTbl,'#exportLogTbl');
	}
	function printEach(arr,tgt){
		$(tgt).html('[');
		for(var i=0;i<arr.length;i++){
			$(tgt).append(',' + arr[i]);
			if((i % 16) == 0 && i != 0){
				$(tgt).append('<br />');
			}
		}
		$(tgt).append(']');
	}
	_galoisInits();
});


//<div id="exportExpTbl"></div><div id="exportLogTbl"></div>
*/


