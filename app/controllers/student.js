'use strict';

var Student = require('../models/student');

exports.index = function(req, res){
  res.render('home/index');
};

exports.init = function(req, res){
  res.render('student/init');
};

exports.create = function(req, res){
  var student = new Student(req.body);
  student.save(function(){
    res.redirect('/students');
  });
};

exports.index = function(req, res){
  Student.findAll(function(students){
    res.render('student/index', {students:students});
  });
};
