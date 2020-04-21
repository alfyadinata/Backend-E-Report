const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Model = require('../models/index');

const User = {
	index: async (req, res) => {
		let data = await Model.User.findAll({
			order: [ [ 'id', 'DESC' ] ]
		});

		return res.json({
			msg: 'data users',
			data: data
		});
	},
	store: async (req, res) => {
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
	},
	edit: async (req, res) => {
		let id = await req.params.id;

		const user = await Model.update({
			where: {
				id: id
			}
		});
	},
	delete: async (req, res) => {
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
	}
};
