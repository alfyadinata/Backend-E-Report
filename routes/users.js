const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Model = require('../models/index');

router.get('/', async function(req, res, next) {
	try {
		let data = await Model.User.findAll({
			order: [ [ 'id', 'DESC' ] ]
		});

		return res.json({
			msg: 'data users',
			data: data
		});
	} catch (err) {
		return res.status(500).json({
			mssg: err.message
		});
	}
});

router.post('/create', async function(req, res, next) {
	try {
		const { name, email, nik, password, role_id } = req.body;

		let user = new Model.User({
			name,
			email,
			nik,
			password,
			role_id
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(nik, salt);
		await user.save();

		return res.status(201).json({
			mssg: 'success created data',
			data: user
		});
	} catch (err) {
		console.info(err);
		return res.status(500).json({
			mssg: err.message
		});
	}
});

router.patch('/edit/:id', async function(req, res, next) {
	try {
		let id = await req.params.id;

		const user = await Model.update({
			where: {
				id: id
			}
		});
	} catch (err) {}
});

router.delete('/:id/delete', async function(req, res, next) {
	try {
		const user = await Model.User.destroy({
			where: {
				id: req.params.id
			}
		});

		if (user) {
			return res.status(202).json({
				mssg: 'success deleted data',
				data: user
			});
		}
	} catch (err) {
		return res.status(500).json({
			mssg: err.message
		});
	}
});

router.post(
	'/signup',
	[
		check('name', 'Please Enter a Valid name').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a valid password').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const { name, email, password } = req.body;

		try {
			let user = await Model.User.findOne({
				email
			});

			const salt = await bcrypt.genSalt(10);

			req.body.password = await bcrypt.hash(password, salt);

			if (user) {
				return res.status(400).json({
					msg: 'User Already Exists'
				});
			}

			user = await Model.User.create({
				name,
				email,
				password
			});

			return res.json({
				msg: 'success created account',
				data: user
			});
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Error in Saving');
		}
	}
);

module.exports = router;
