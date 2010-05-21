minitest = require("./lib/minitest");

for (var k in minitest) {
  exports[k] = minitest[k];
}
