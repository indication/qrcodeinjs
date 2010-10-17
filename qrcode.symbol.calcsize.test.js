
		try{
$(document).ready(function (){
	module("QR Code Symbol Byte length");
	test("QR Code Symbol Byte length check",function(){
		var _getByteCount = qrcode.symbol.calcsize;
		same(_getByteCount(1) ,26,'bytes per version');
		same(_getByteCount(2) ,44,'bytes per version');
		same(_getByteCount(3) ,70,'bytes per version');
		same(_getByteCount(4) ,100,'bytes per version');
		same(_getByteCount(5) ,134,'bytes per version');
		same(_getByteCount(6) ,172,'bytes per version');
		same(_getByteCount(7) ,196,'bytes per version');
		same(_getByteCount(8) ,242,'bytes per version');
		same(_getByteCount(9) ,292,'bytes per version');
		same(_getByteCount(10),346,'bytes per version');
		same(_getByteCount(11),404,'bytes per version');
		same(_getByteCount(12),466,'bytes per version');
		same(_getByteCount(13),532,'bytes per version');
		same(_getByteCount(14),581,'bytes per version');
		same(_getByteCount(15),655,'bytes per version');
		same(_getByteCount(16),733,'bytes per version');
		same(_getByteCount(17),815,'bytes per version');
		same(_getByteCount(18),901,'bytes per version');
		same(_getByteCount(19),991,'bytes per version');
		same(_getByteCount(20),1085,'bytes per version');
		same(_getByteCount(21),1156,'bytes per version');
		same(_getByteCount(22),1258,'bytes per version');
		same(_getByteCount(23),1364,'bytes per version');
		same(_getByteCount(24),1474,'bytes per version');
		same(_getByteCount(25),1588,'bytes per version');
		same(_getByteCount(26),1706,'bytes per version');
		same(_getByteCount(27),1828,'bytes per version');
		same(_getByteCount(28),1921,'bytes per version');
		same(_getByteCount(29),2051,'bytes per version');
		same(_getByteCount(30),2185,'bytes per version');
		same(_getByteCount(31),2323,'bytes per version');
		same(_getByteCount(32),2465,'bytes per version');
		same(_getByteCount(33),2611,'bytes per version');
		same(_getByteCount(34),2761,'bytes per version');
		same(_getByteCount(35),2876,'bytes per version');
		same(_getByteCount(36),3034,'bytes per version');
		same(_getByteCount(37),3196,'bytes per version');
		same(_getByteCount(38),3362,'bytes per version');
		same(_getByteCount(39),3532,'bytes per version');
		same(_getByteCount(40),3706,'bytes per version');
	});
});
		} catch(e) {}
