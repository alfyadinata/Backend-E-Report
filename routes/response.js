const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.post('/:id', async function(req, res, next) {
	try {
		const id = req.params.id;
		const { status, message } = req.body;

		const data = await model.Complaint.findOne({
			where: {
				id: id
			}
		});

		if (data == null) {
			return res.status(404).json({
				status: false,
				mssg: 'complaint not found'
			});
		}

		await data.update({
			status
		});

		const response = await model.Respon.create({
			message: message,
			user_id: data.user_id,
			complaint_id: data.id
		});

		return res.status(200).json({
			mssg: 'success',
			data: data
			// respon: response
		});
	} catch (err) {
		return res.status(500).json({
			mssg: err.mssg
		});
	}
});

module.exports = router;
