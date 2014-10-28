module.exports = function() {
  var mongoose = require('mongoose');
  var env_url = {
    "test": "mongodb://localhost/lista_test",
    'development': 'mongodb://localhost/lista'
  };

  var url = env_url[process.env.NODE_ENV || 'development'];
  return mongoose.connect(url);
};