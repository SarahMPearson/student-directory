'use strict';

//var Mongo = require('mongodb');
var _ = require('lodash');

function Student(object){
  this.firstName  = object.firstName;
  this.lastName   = object.lastName;
  this.email      = object.email;
  this.blog       = object.blog;
  this.color      = object.color;
}

Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};

Student.findAll = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(object){
      return changePrototype(object);
    });
    cb(students);
  });
};

module.exports = Student;

//PRIVATE FUNCTIONS//
function changePrototype(object){
  return _.create(Student.prototype, object);
}
