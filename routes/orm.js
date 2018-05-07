var Sequelize = require('sequelize');
var userName = 'manager';
var password = 'hust2017';
var hostName = 'localhost';
var sampleDbName = 'DangKiTinChi';

// Initialize Sequelize to connect to sample DB
var sampleDb = new Sequelize(sampleDbName, userName, password, {
	dialect: 'mssql',
	host: hostName,
	port: 1433, // Default port
	logging: false, // disable logging; default: console.log

	dialectOptions: {
		requestTimeout: 30000 // timeout = 30 seconds
	}
});

let getSinhVien = function (MSSV) {
	let query;
	if (MSSV)
		query = 'Select * from manager.SinhVien where MSSV=' + MSSV;
	else
		query = 'Select * from manager.SinhVien';
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
};
let dangKiLop = function (MSSV, MaLop) {
	let query = 'Insert into manager.DangKiLop values (' + MSSV + ',\'' + MaLop + '\')';
	return sampleDb.query(query, { type: Sequelize.QueryTypes.INSERT });
}
let thoiKhoaBieu = function (MSSV) {
	let query = `Select DKL.MaLop,LH.MaMonHoc,Ngay,Tiet,Tuan,PhongHoc from 
	(((manager.DangKiLop as DKL left join manager.LopHoc as LH on
	DKL.MaLop = LH.MaLop) left join manager.ThoiKhoaBieu as TKB on
	DKL.MaLop = TKB.MaLop) left join manager.MonHoc as MH on LH.MaMonHoc = MH.MaMonHoc)
	where DKL.MSSV=${Number(MSSV)}`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let soTinChi = function (MSSV) {
	let query = `Select SUM(MH.SoTinChi) from 
		(Select * from DangKiLop as DKL where MSSV=${Number(MSSV)})t1 
	join 
		LopHoc as LH on t1.MaLop = LH.MaLop
	join 
		MonHoc as MH on LH.MaMonHoc = MH.MaMonHoc	
	;`
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let dsDangKi = function (MSSV) {
	let query = `Select t1.MaLop,LH.MaMonHoc,TenMonHoc,SoTinChi from 
		(Select * from DangKiLop as DKL where MSSV=${Number(MSSV)})t1 
	join 
		LopHoc as LH on t1.MaLop = LH.MaLop
	join 
		MonHoc as MH on LH.MaMonHoc = MH.MaMonHoc	
	;`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let monHoc = function (MaLop) {
	let query = `Select t1.MaLop, t1.MaMonHoc, TenMonHoc, SoTinChi from
	(Select * from LopHoc as LH where MaLop=${Number(MaLop)})t1
join
	MonHoc as MH on t1.MaMonHoc = MH.MaMonHoc;`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let huyDangKi = function (MSSV, MaLop) {
	let query = `Delete from DangKiLop where MSSV=${Number(MSSV)}
	and MaLop=${Number(MaLop)}`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.DELETE });
}
let dsLop1 = function () {
	let query = `Select LopHoc.MaLop,LopHoc.MaMonHoc,MonHoc.TenMonHoc, MonHoc.SoTinChi, LopHoc.ToiDa, t1.SoLuongDangKi from 
LopHoc left join MonHoc on LopHoc.MaMonHoc = MonHoc.MaMonHoc
	   left join (Select COUNT(MSSV) as SoLuongDangKi,MaLop from DangKiLop group by MaLop)t1 on LopHoc.MaLop = t1.MaLop
order by LopHoc.MaLop ASC;`
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let dsLop2 = function () {
	let query = `Select LopHoc.MaLop,ThoiKhoaBieu.Ngay, ThoiKhoaBieu.Tiet, ThoiKhoaBieu.Tuan, ThoiKhoaBieu.PhongHoc 
from LopHoc left join ThoiKhoaBieu on LopHoc.MaLop = ThoiKhoaBieu.MaLop;`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let qlDangKi = function () { // cua Admin
	let query = `Select * from DangKiLop`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let qlLopHoc = function () {
	let query = `Select * from LopHoc`;
	return sampleDb.query(query, { type: Sequelize.QueryTypes.SELECT });
}
let suaLopHoc = function (MaLop, MaMonHoc, GiangVien, ToiDa) {
	let query = `update LopHoc
		set  MaMonHoc = '${MaMonHoc}', GiangVien=N'${GiangVien}',ToiDa = ${Number(ToiDa)}
		where MaLop = ${Number(MaLop)};`
	return sampleDb.query(query, { type: Sequelize.QueryTypes.UPDATE });
}
let xoaLopHoc = function (MaLop) {
	let query = `Delete from LopHoc where MaLop = ${Number(MaLop)}`;
	return sampleDb.query(query, {type:Sequelize.QueryTypes.DELETE});
}
let taoLopHoc = function(MaLop, MaMonHoc, GiangVien, ToiDa) {
	let query = `insert into LopHoc values(${Number(MaLop)},'${MaMonHoc}',N'${GiangVien}',${Number(ToiDa)} )`
	return sampleDb.query(query, {type:Sequelize.QueryTypes.INSERT});
}
module.exports = {
	getSinhVien,
	dangKiLop,
	thoiKhoaBieu,
	dsDangKi,
	monHoc,
	huyDangKi,
	dsLop1,
	dsLop2,
	qlDangKi,
	qlLopHoc,
	suaLopHoc,
	xoaLopHoc,
	taoLopHoc
}

