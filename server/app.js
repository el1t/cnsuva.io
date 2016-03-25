'use strict';
let koa = require('koa'),
	router = require('koa-router')(),
	logger = require('koa-logger'),
	serve = require('koa-static'),
	bodyParser = require('koa-bodyparser'),
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
app.use(bodyParser());

// Serve static files
app.use(serve(path.join(__dirname, '../dist')));

// router.get('/', function *() {
// 	this.body = 'Hey there';
// });

// app.use(router.routes());

module.exports = app;
