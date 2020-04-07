// this middleware can used by all role
const jwt = require('jsonwebtoken');
require('dotenv/config');

async function superAdmin(req, res, next) {
	try {
		const token = await req.headers.authorization;
		const key = process.env.JWTKEY;

		await jwt.verify(token, key, (err, decoded) => {
			if (err !== null) {
				return res.status(401).json({
					mssg: err.message
				});
			}
			if (decoded.role_id == 1) {
				req.decoded = decoded;
				return next();
			}
		});
	} catch (err) {
		return res.json({
			status: 'error',
			mssg: err.message
		});
	}
}

module.exports = superAdmin;
