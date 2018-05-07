var express = require('express');
var router = express.Router();
var orm = require('./orm');
var bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const SaltedPwd = "$2a$10$NoGVEgdiVBBveUM.NtTJde5IE0OqO31i0ea5b7MHfwBJr.lmBVIqC"; //1234
router.post('/api/info', function (req, res, next) {
	orm.getSinhVien(req.body.MSSV)
		.then(result => { res.json(result) });
});
router.post('/api/reg', function (req, res, next) {
	orm.dangKiLop(req.body.MSSV, req.body.MaLop).then(result => {
		res.json("Success");
	});
})
router.post('/api/login', function (req, res) {
	orm.getSinhVien(req.body.MSSV).then(result => {
		if (req.body.MSSV === req.body.password && result.length == 1) {
			res.json({ isLoggedIn: true, MSSV: req.body.MSSV })
		}
		else {
			res.json({ isLoggedIn: false, MSSV: "" })
		}
	})
})
router.post('/api/timetable', function (req, res) {
	orm.thoiKhoaBieu(req.body.MSSV).then(result => { res.json(result) });
})
router.post('/api/list', function (req, res) {
	orm.dsDangKi(req.body.MSSV).then(result => { res.json(result) });
})
router.post('/api/class', function (req, res) {
	orm.monHoc(req.body.MaLop).then(result => { res.json(result) });
})
router.post('/api/unreg', function (req, res) {
	orm.huyDangKi(req.body.MSSV, req.body.MaLop).then(result => { console.log(result); res.json("Success") });
})
router.get('/api/list1', function (req, res) {
	orm.dsLop1().then(result => { res.json(result) });
})
router.get('/api/list2', function (req, res) {
	orm.dsLop2().then(result => { res.json(result) });
})
router.post('/api/adminauth',function(req,res){
	if(bcrypt.compareSync(req.body.password,SaltedPwd)) {
		res.json({isAdmin:true});
	}
	else res.json({isAdmin:false});
})
router.get('/api/reglist',function(req,res){
	orm.qlDangKi().then(result=>res.json(result));
})
router.get('/api/classlist',function(req,res){
	orm.qlLopHoc().then(result=>res.json(result));
})
router.post('/api/editclass',function(req,res){
	orm.suaLopHoc(req.body.MaLop,req.body.MaMonHoc,req.body.GiangVien,req.body.ToiDa)
	.then(result => res.json(`Success`))
	.catch(e=>res.json('Failure'));
})
router.post('/api/delclass',function(req,res){
	orm.xoaLopHoc(req.body.MaLop)
	.then(result => res.json(`Success`))
	.catch(e=>res.json('Failure'));
})
router.post('/api/createclass',function(req,res){
	orm.taoLopHoc(req.body.MaLop,req.body.MaMonHoc,req.body.GiangVien,req.body.ToiDa)
	.then(result => res.json(`Success`))
	.catch(e=>res.json('Failure'));
})
// End of demo app
module.exports = router;
