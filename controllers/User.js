const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Model = require('../models/index');

module.exports = index = async (req, res, next) => {
	let { per_page, page } = req.query;

	try {
		let data = await Model.User.paginate({
			page: parseInt(page),
			paginate: parseInt(per_page),
			order: [ [ 'id', 'DESC' ] ]
		});

		return res.json({
			msg: 'data users',
			per_page: parseInt(per_page),
			page: parseInt(page),
			data: data
		});
	} catch (err) {
		return res.status(500).json({
			mssg: err.message
		});
	}
};
