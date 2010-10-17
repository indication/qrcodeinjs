
qrcode.symbol.mapNew = function (ver){
	var matrix = 17 + (4 * ver);
	var _mx = new Array(matrix);
	for(var i=0;i<matrix;i++){
		var _line = new Array(matrix);
		_mx[i] = _line;
	}
	// タイミングパターン
	for(var i=7;i<matrix;i++){
		_mx[6][i] = _mx[i][6] = ((i%2)==0?3:2);
	}
	this.mapBigPoints(ver,_mx,matrix);
	this.mapSmallPoints(ver,_mx);
	return _mx;
};
qrcode.symbol.mapBigPoints = function (ver,_mx,matrix){
	// 目玉の描画 
	// 上部
	this._mapArea(_mx,7,0,7,7,2);	//縦
	this._mapArea(_mx,0,7,7,7,2);	//横
	this._mapSymbolBig(_mx,0			,0			);
	// 右部
	this._mapArea(_mx,matrix-8,0,matrix-8,7,2);	//縦
	this._mapArea(_mx,matrix-7,7,matrix  ,7,2);	//横
	this._mapSymbolBig(_mx,matrix-7	,0			);
	// 下部
	this._mapArea(_mx,7,matrix-7,7,matrix  ,2);	//縦
	this._mapArea(_mx,0,matrix-8,7,matrix-8,2);	//横
	this._mapSymbolBig(_mx,0			,matrix-7	);
	this._mapPoint(_mx,9,matrix-7,3);
};
qrcode.symbol.mapSmallPoints = function (ver,matrix){
	// 小さい目玉の描画 
	var _areas = [
		 {small:[16,16]}
		,{small:[20,20]}
		,{small:[24,24]}
		,{small:[28,28]}
		,{small:[32,32]}
		//v7
		,{small:[4,20,	20,4,	20,20,	20,36,	36,20,	36,36]}
		,{small:[4,22,	22,4,	22,22,	22,40,	40,22,	40,40]}
		,{small:[4,24,	24,4,	24,24,	24,44,	44,24,	44,44]}
		,{small:[4,26,	26,4,	26,26,	26,48,	48,26,	48,48]}
		,{small:[4,28,	28,4,	28,28,	28,52,	52,28,	52,52]}
		,{small:[4,30,	30,4,	30,30,	30,56,	56,30,	56,56]}
		,{small:[4,32,	32,4,	32,32,	32,60,	60,32,	60,60]}
		//v14
		
	];
	if(ver>=2 && (ver-2)<_areas.length){
		var smallmaps = _areas[ver-2].small;
		for(var i=0;i<smallmaps.length;i+=2){
			this._mapSymbolSmall(matrix,smallmaps[i],smallmaps[i+1]);
		}
	}
};
qrcode.symbol._mapSymbolBig = function (matrix,posx,posy){
	this._mapArea(matrix,posx  ,posy  ,posx+6,posy+6,3); //全体
	this._mapArea(matrix,posx+1,posy+1,posx+5,posy+1,2); //上
	this._mapArea(matrix,posx+1,posy+2,posx+1,posy+5,2); //左
	this._mapArea(matrix,posx+5,posy+2,posx+5,posy+5,2); //右
	this._mapArea(matrix,posx+2,posy+5,posx+5,posy+5,2); //下
};
qrcode.symbol._mapSymbolSmall = function (matrix,posx,posy){
	this._mapArea(matrix,posx  ,posy  ,posx+4,posy+4,3); //全体
	this._mapArea(matrix,posx+1,posy+1,posx+3,posy+1,2); //上
	this._mapArea(matrix,posx+1,posy+2,posx+1,posy+3,2); //左
	this._mapArea(matrix,posx+3,posy+2,posx+3,posy+3,2); //右
	this._mapArea(matrix,posx+2,posy+3,posx+3,posy+3,2); //下
};
qrcode.symbol._mapPoint = function (matrix,posx,posy,mask,cbfunc){
	if(cbfunc){
		matrix[posy][posx] = cbfunc(posx,posy,mask);
	} else if(mask === null) {
		var _val = matrix[posy][posx];
		return _val;
	} else {
		if(matrix.length<=posy){
			//alert(posy);
			return;
		}
		if(matrix[posy].length<=posx){
			//alert(posx);
			return;
		}
		matrix[posy][posx] = mask;
	}
};
qrcode.symbol._mapArea = function (matrix,fromx,fromy,tox,toy,mask,cbfunc){
	for(valx=fromx;valx<=tox;valx++){
		for(valy=fromy;valy<=toy;valy++){
			this._mapPoint(matrix,valx,valy,mask,cbfunc);
		}
	}
};
qrcode.symbol.draw = function (ver){
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