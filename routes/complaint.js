const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const model = require('../models/index');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');

const Storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, './public/images/');
	},
	filename(req, file, callback) {
		callback(null, `${Date.now()}_${file.originalname}`);
	}
});

const upload = multer({ storage: Storage });

router.get('/', async function(req, res, next) {
	let complaint = [];
	let user = await req.decoded;
	try {
		user.role_id !== 1
			? (complaint = await model.Complaint.findAll({
					where: {
						user_id: user.id
					},
					order: [ [ 'id', 'DESC' ] ],
					include: [ 'users' ]
				}))
			: (complaint = await model.Complaint.findAll({
					where: {
						status: null
					},
					order: [ [ 'id', 'DESC' ] ],
					include: [ 'users' ]
				}));

		return res.status(200).json({
			data: complaint
		});
	} catch (err) {
		return res.status(500).json({
			err: err.message
		});
	}
});

router.get('/on-going', async function(req, res, next) {
	const user = await req.decoded;
	try {
		const complaint = await model.Complaint.findAll({
			where: {
				user_id: user.id
			},
			include: 'categories',
			order: [ [ 'id', 'DESC' ] ]
		});

		// console.log(complaint);
		return res.status(200).json({
			mssg: 'on going complaint',
			data: complaint
		});
	} catch (err) {
		return res.status(500).json({
			err: err.message
		});
	}
});

router.post('/create', upload.single('foto', 3), async (req, res) => {
	console.log(req.decoded.id);
	const complaint = model.Complaint;

	try {
		const { description, isAnonym, address, category_id, latitude, longitude } = req.body;
		const { user_id } = req.decoded.id;
		const foto = req.file.filename;

		if (!req.file) {
			return res.status(402).json({
				status: 'err',
				mssg: 'no file received'
			});
		}

		if (description == '') {
			return res.status(402).json({
				status: 'err',
				mssg: 'invalid input',
				title: title
			});
		}

		const userId = await req.decoded.id;

		const data = await complaint.create({
			description,
			foto,
			user_id: userId,
			isAnonym,
			category_id,
			latitude,
			longitude,
			address
		});

		return res.status(201).json({
			mssg: 'success created data',
			data: data
		});
	} catch (err) {
		console.info(err);
		return res.status(500).json({
			mssg: err.message
		});
	}
});

router.patch('/:id/edit', async function(req, res, next) {
	try {
		const id = req.params.id;
		const { title, description, category_id, isAnonym } = req.body;

		const complaint = await model.Complaint.update(
			{
				title,
				description,
				isAnonym,
				category_id
			},
			{
				where: {
					id: id
				}
			}
		);

		if (complaint) {
			return res.status(201).json({
				mssg: 'success created data',
				data: complaint
			});
		}
	} catch (err) {
		return res.status(500).json({
			mssg: err.message
		});
	}
});

router.delete('/:id/delete', async function(req, res, next) {
	try {
		const complaint = await model.Complaint.findOne({
			where: {
				id: req.params.id
			}
		});

		fs.unlink(`./public/images/${complaint.foto}`, (err) => {
			if (err) {
				res.status(403).json({
					mssg: 'failed to unlink file',
					error: err.message
				});
			}
		});

		complaint.destroy({});

		if (complaint) {
			return res.status(202).json({
				mssg: 'success deleted data',
				data: complaint
			});
		}
	} catch (err) {
		return res.status(500).json({
			mssg: err.message
		});
	}
});

module.exports = router;
