// const assert = require('assert');
// const fs = require('fs');

// describe('Site Generation', function() {
//     it('should generate an index.liquid file', function(done) {
//       fs.access('dist/index.html', fs.constants.F_OK, (err) => {
//         assert.strictEqual(err, null);
//         done();
//       });
//     });

//   // This test will fail unless nonexistent.html file created in dist
//   // This test will allow me to test if the Github actions are working correctly by easily making this fail. 
//   it('should not find a nonexistent.html file', function(done) {
//     fs.access('dist/nonexistent.html', fs.constants.F_OK, (err) => {
//       assert.ok(err, 'File nonexistent.html should not exist');
//       done();
//     });
//   });
// });