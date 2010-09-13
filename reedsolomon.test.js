
		try{
$(document).ready(function (){
	module("ReedSolomon");
	var _rsencode = rsEncode;
	test("New test",function(){
		try{
			var _ins = new _rsencode(8);
			ok( true, "New Instrance ok" );
			equals(_ins.parity(),8,"Get parity count");
		} catch(e) {
			failed( false, "New Failed" );
		}
	});
	test("Calc rsEncode",function(){
		var data = [32, 65, 205, 69, 41, 220, 46, 128, 236];
		enc = new _rsencode(17);
		parity = enc.encode(data);
		same(parity,[42, 159, 74, 221, 244, 169, 239, 150, 138, 70, 237, 85, 224, 96, 74, 219, 61],'parity data');

	});
});
		} catch(e) {}
