/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/student');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var bob, sarah, dakota, jessica;

describe('Student', function(){
  before(function(done){
    dbConnect('student-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Student.collection.remove(function(){
      var s1 = {firstName: 'Bob', lastName: 'Smith', email:'bob@aol.com', blog: 'medium.com/@bob', color: 'coral'};
      var s2 = {firstName: 'Sarah', lastName: 'Jones', email:'sarah@aol.com', blog: 'medium.com/@sarah', color: 'yellow'};
      var s3 = {firstName: 'Dakota', lastName: 'Jane', email:'dakota@aol.com', blog: 'medium.com/@dakota', color: 'red'};
      var s4 = {firstName: 'Jessica', lastName: 'Faith', email:'jessica@aol.com', blog: 'medium.com/@jessica', color: 'green'};
      bob = new Student(s1);
      sarah = new Student(s2);
      dakota = new Student(s3);
      jessica = new Student(s4);

      bob.save(function(){
        sarah.save(function(){
          dakota.save(function(){
            jessica.save(function(){
              done();
            });
          });
        });
      });
    });
  });

  describe('constructor', function(){
    it('should create a new student', function(){
      var object = {firstName: 'Bob', lastName: 'Smith', email:'bob@aol.com', blog: 'medium.com/@bob', color: 'coral'};
      var s1 = new Student(object);
      expect(s1).to.be.instanceof(Student);
      expect(s1.firstName).to.equal('Bob');
      expect(s1.lastName).to.equal('Smith');
      expect(s1.email).to.equal('bob@aol.com');
      expect(s1.blog).to.equal('medium.com/@bob');
      expect(s1.color).to.equal('coral');
    });
  });

  describe('#save', function(){
    it('should save a new student in the database', function(done){
      var object = {firstName: 'Bob', lastName: 'Smith', email:'bob@aol.com', blog: 'medium.com/@bob', color: 'coral'};
      var s1 = new Student(object);
      s1.save(function(){
        expect(s1._id).to.be instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all the students in the database', function(done){
      Student.findAll(function(students){
        expect(students).to.have.length(4);
        expect(students[0]).to.be.instanceof(Student);
        expect(students[0].firstName).to.equal('Bob');
        done();
      });
    });
  });
});// last bracket
