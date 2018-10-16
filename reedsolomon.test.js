
	QUnit.module("ReedSolomon");
	QUnit.test("New test",function(assert){
		try{
			var _ins = new rsEncode(8);
			assert.ok( true, "New Instrance ok" );
			assert.equal(_ins.parity(),8,"Get parity count");
		} catch(e) {
			assert.failed( false, "New Failed" );
		}
	});
	QUnit.test("Calc rsEncode",function(assert){
		var data = [32, 65, 205, 69, 41, 220, 46, 128, 236];
		var enc = new rsEncode(17);
		var parity = enc.encode(data);
		assert.deepEqual(parity,[42, 159, 74, 221, 244, 169, 239, 150, 138, 70, 237, 85, 224, 96, 74, 219, 61],'parity data');

	});
