var admin = require('firebase-admin');

var serviceAccount = require('./servicenew.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://ecomplaint-1026a.firebaseio.com'
});

module.exports.admin = admin;
