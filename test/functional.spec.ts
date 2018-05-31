// functional.spec.ts

import * as http from "http";
process.env.NODE_ENV = 'test';

var app = require('../server');
var Browser:any  = require('zombie');
var assert: any = require('assert');

describe('Functional test', function() {

	var server: any, browser: any;

	before(() => {
		server = http.createServer(app).listen(5000);
		browser = new Browser({site: 'http://localhost:5000'});
	});

	before((done) => {
		browser.visit('/', done);
	});

	it('should open the page properly', () => {
		assert.ok(browser.success);
		assert.equal(browser.text('body'), 'Hello World!');
	});

	after((done) => {
		server.close(done);
	});
});