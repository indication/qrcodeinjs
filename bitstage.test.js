
		try{
$(document).ready(function (){
	module("BitStrage");
	var _bitstrage = bitstrage;
	test("New test",function(){
		try{
			var _ins = new _bitstrage(8);
			ok( true, "New Instrance ok" );
		} catch(e) {
			failed( false, "New Failed" );
		}
	});
	test("Bit add",function(){
		var _ins = new _bitstrage(8);
		_ins.push(0x1,1);
		same( _ins.get(), [0x80], "Multi add data" );
		same( _ins._restbit, 7, "Internal data check" );
		_ins.push(0x1,1);
		same( _ins.get(), [0xC0], "Multi add data" );
		same( _ins._restbit, 6, "Internal data check" );
		_ins.push(0x1,1);
		same( _ins.get(), [0xE0], "Multi add data" );
		same( _ins._restbit, 5, "Internal data check" );
		_ins.push(0x1,1);
		same( _ins.get(), [0xF0], "Multi add data" );
		same( _ins._restbit, 4, "Internal data check" );
		_ins.push(0,4);
		same( _ins.get(), [0xF0], "Multi add data" );
		same( _ins._restbit, 0, "Internal data check" );
		_ins.push(0xF,4);
		same( _ins.get(), [0xF0,0xF0], "Multi add data" );
		_ins.push(0xF,4);
		same( _ins.get(), [0xF0,0xFF], "Multi add data" );
		_ins.push(0xFFFF,16);
		same( _ins.get(), [0xF0,0xFF,0xFF,0xFF], "Multi add data" );
	});
});
		} catch(e) {}
