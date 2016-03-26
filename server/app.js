'use strict';
let koa = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	serve = require('koa-static'),
	bodyParser = require('koa-bodyparser'),
	rawBody = require('raw-body'),
	request = require('co-request'),
	path = require('path'),
	app = koa();

// Handle errors
app.use(function *(next) {
	try {
		yield next;
	} catch (err) {
		this.status = err.status || 500;
		this.body = err.message;
		this.app.emit('error', err, this);
	}
});

// Add middleware
app.use(logger());

// Serve static files
app.use(serve(path.join(__dirname, '../dist')));

router.post('/subscribe/email', function *() {
	let raw = yield rawBody(this.req);
	// console.log(request);
	let response = yield request({
		method: 'POST',
		uri: 'https://lists.virginia.edu/sympa',
		rejectUnauthorized: false,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: raw
	});
	this.body = JSON.stringify({
		success: response.body.indexOf('You requested a subscription to list cnsuva.') > -1,
		subscribed: response.body.indexOf('You are already subscriber of list cnsuva.') > -1
	});
});

router.post('/subscribe/verify', function *() {
	let raw = yield rawBody(this.req);
	let response = yield request({
		method: 'POST',
		uri: 'https://lists.virginia.edu/sympa',
		rejectUnauthorized: false,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: raw
	});
	this.body = JSON.stringify({
		success: response.body.indexOf('subscribe: action completed') > -1,
		mismatch: response.body.indexOf('Provided password is incorrect') > -1
	})
});

app.use(router.routes());

module.exports = app;
