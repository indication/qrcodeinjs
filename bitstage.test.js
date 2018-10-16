
	QUnit.module("BitStrage");
	QUnit.test("New test",function(assert){
		try{
			var _ins = new bitstrage(8);
			assert.ok( true, "New Instrance ok" );
		} catch(e) {
			assert.failed( false, "New Failed");
		}
	});
	QUnit.test("Bit add",function(assert){
		var _ins = new bitstrage(8);
		_ins.push(0x1,1);
		assert.deepEqual( _ins.get(), [0x80], "Multi add data" );
		assert.equal( _ins._restbit, 7, "Internal data check" );
		_ins.push(0x1,1);
		assert.deepEqual( _ins.get(), [0xC0], "Multi add data" );
		assert.equal( _ins._restbit, 6, "Internal data check" );
		_ins.push(0x1,1);
		assert.deepEqual( _ins.get(), [0xE0], "Multi add data" );
		assert.equal( _ins._restbit, 5, "Internal data check" );
		_ins.push(0x1,1);
		assert.deepEqual( _ins.get(), [0xF0], "Multi add data" );
		assert.equal( _ins._restbit, 4, "Internal data check" );
		_ins.push(0,4);
		assert.deepEqual( _ins.get(), [0xF0], "Multi add data" );
		assert.equal( _ins._restbit, 0, "Internal data check" );
		_ins.push(0xF,4);
		assert.deepEqual( _ins.get(), [0xF0,0xF0], "Multi add data" );
		_ins.push(0xF,4);
		assert.deepEqual( _ins.get(), [0xF0,0xFF], "Multi add data" );
		_ins.push(0xFFFF,16);
		assert.deepEqual( _ins.get(), [0xF0,0xFF,0xFF,0xFF], "Multi add data" );
	});
	QUnit.test("Bit unshift",function(assert){
		var _ins = new bitstrage(8);
		_ins.push(0x0F,8);
		assert.equal( _ins.unshiftbit(), false, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), false, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), false, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), false, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0x0F unshift bit" );
		assert.equal( _ins.unshiftbit(), null, "0x0F unshift bit" );
	});
	QUnit.test("Bit unshift",function(assert){
		var _ins = new bitstrage(8);
		_ins.push(0x0F,4);
		assert.equal( _ins.unshiftbit(), true, "0xF unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0xF unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0xF unshift bit" );
		assert.equal( _ins.unshiftbit(), true, "0xF unshift bit" );
		assert.equal( _ins.unshiftbit(), null, "0xF unshift bit" );
	});
