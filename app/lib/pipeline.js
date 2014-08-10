'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var student = require('../controllers/student');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));

  //app.get('/', home.index);

  app.get('/students/new', student.init);
  app.post('/students', student.create);
  app.get('/students', student.index);

  console.log('Pipeline Configured');
};

