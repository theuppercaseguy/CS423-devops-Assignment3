var assert = require('assert').strict;
var app = require('./index.js');
var request = require('supertest')(app);

// To hit production AWS!
// var request = require('supertest')('https://www.mydomain.com/');

// run locally, like in vscode debugger and test against that
// var request = require('supertest')('http://localhost:3000');


// Note that we launch the test as follows
// "test-API": "jest --runInBand --testTimeout 999999 --collectCoverage true api_endpoint.test.js",
// --runInBand tells Jest to run the tests serially in the current process rather than creating a
// worker pool and parallelizing the tests across several workers.
// This might only be needed such as in the case where the first test loggs in and gets a JWT
// token that is then later used, or one test in some way getting any type of data ready
// for later tests

// Note: Would keep the endpoint as is, to hit, but would mock out the database.

describe('Load testing operations', function () {
  // Wait until the database is up and connected to.
  // beforeAll(function (done) {
  // 	setTimeout(function () {
  // 		done();
  // 	}, 7000);
  // });

  // Shut everything down gracefully
  afterAll(function (done) {
    // app.db.client.close();
    app.close();
    done();
  });

  // An example of how to log in, if that were available
  // test("should allow registered user to login", function (done) {
  //   request.post("/api/sessions")
  //     .send({
  //       email: 'test@sample.com',
  //       password: 'jklfyei'
  //     })
  //     .end(function (err, res) {
  //       token = res.body.token;
  //       userId = res.body.userId;
  //       assert.strictEqual(res.status, 201);
  //       assert.strictEqual(res.body.msg, "Authorized", "Message should be Authorized");
  //       done();
  //     });
  // });

  test("should get a valid cart", function (done) {
    request.get(`/api/carts/777`)
      // .set('x-auth', token)
      .end(function (err, res) {
        assert.strictEqual(res.status, 200);
        done();
      });
  });

  test("should error if cart id is not valid", function (done) {
    request.get(`/api/carts/0`)
      // .set('x-auth', token)
      .end(function (err, res) {
        assert.strictEqual(res.status, 404);
        done();
      });
  });
});
