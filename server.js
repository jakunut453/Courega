const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const utility = require('./utility.js');
var lodash = require('lodash');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')

app.post('/addStudentEntry', function(req,res){
    console.log(req.body);
    utility.addStudentEntryFunc(req.body);
    res.redirect('/addStudent');
})

app.post('/addCourseEntry', function(req,res){
    console.log(req.body)
    utility.addCourseEntryFunc(req.body);
    res.redirect('/addCourse');
})

app.post('/addRegistrationStudentEntry', function(req,res){
    console.log(req.body)
    utility.addRegistrationStudentEntryFunc(req.body);
    res.redirect('/addRegistration');
})

app.post('/addRegistrationCourseEntry', function(req,res){
    console.log(req.body)
    utility.addRegistrationCourseEntryFunc(req.body);
    res.redirect('/addRegistration');
})

app.post('/addRegistrationEntry', function(req,res){
    utility.addRegistrationEntryFunc();
    res.redirect('/addRegistration');
})

app.post('/deleteStudentEntry', function(req,res){
    console.log(req.body)
    utility.deleteStudentEntryFunc(req.body);
    utility.deleteRegistrationEntryFunc(req.body);
    res.redirect('/addStudent')
})

app.post('/deleteCourseEntry', function(req,res){
    console.log(req.body)
    utility.deleteCourseEntryFunc(req.body);
    res.redirect('/addCourse')
})

app.post('/deleteRegistrationStudentEntry', function(req, res){
    console.log(req.body)
    utility.deleteRegistrationStudentEntryFunc(req.body);
    res.redirect('/addRegistration');
})

app.post('/deleteRegistrationCourseEntry', function(req, res){
    console.log(req.body)
    utility.deleteRegistrationCourseEntryFunc(req.body);
    res.redirect('/addRegistration');
})

app.post('/deleteRegistrationEntry', function(req,res){
    console.log(req.body);
    utility.deleteRegistrationEntryFunc(req.body);
    res.redirect('/addRegistration');
})

app.get('/addStudent',function(req,res){
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        res.render('addStudent.ejs',{
            students:result
        });
    });
})

app.get('/addCourse',function(req,res){
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        res.render('addCourse.ejs',{
            courses:result
        });
    });
})

app.get('/addRegistration',function(req,res){
    fs.readFile('data/cache.json', (err, data) => {
        if (err) throw err;
        let result1 = JSON.parse(data);
        fs.readFile('data/registrations.json', (err, data) => {
            if(err) throw err;
            let result2 = JSON.parse(data);
            res.render('addRegistration.ejs',{
                tempList:result1,
                registrations:result2
            });
        })
    });
})


app.post('/userProfile', function(req,res){
    record = req.body;
    fs.readFile('data/students.json', (err,data1)=>{
        if(err) throw err;
        fs.readFile('data/courses.json', (err,data2)=>{
            if(err) throw err;
            fs.readFile('data/registrations.json', (err,data3)=>{
                if(err) throw err;
                result ={};
                var students = JSON.parse(data1);
                student = lodash.filter(students,record)[0];
                result['student'] = student;
                result['courses'] = []; 
                var registrations = JSON.parse(data3);
                registrations = lodash.filter(registrations,record);
                var courses = JSON.parse(data2);
                courses.forEach((element1) =>{
                    registrations.forEach( (element2) =>{
                        if(element1.Code == element2.Code)
                            result['courses'].push(element1);
                    })
                })
                res.render('userProfile.ejs',result);
            })
        })
    })
})

app.post('/courseProfile', function(req,res){
    record = req.body;
    fs.readFile('data/students.json', (err,data1)=>{
        if(err) throw err;
        fs.readFile('data/courses.json', (err,data2)=>{
            if(err) throw err;
            fs.readFile('data/registrations.json', (err,data3)=>{
                if(err) throw err;
                result ={};
                var courses = JSON.parse(data2);
                course = lodash.filter(courses,record)[0];
                result['course'] = course;
                result['students'] = []; 
                var registrations = JSON.parse(data3);
                registrations = lodash.filter(registrations,record);
                var students = JSON.parse(data1);
                students.forEach((element1) =>{
                    registrations.forEach( (element2) =>{
                        if(element1.RegNo == element2.RegNo)
                            result['students'].push(element1);
                    })
                })
                res.render('courseProfile.ejs',result);
            })
        })
    })
})

app.post('/searchStudentEntry', function(req,res){
    console.log(req.body);
    var record = utility.removeEmptyValueFunc(req.body);
    readFilePromise('data/students.json','utf-8')
        .then((data)=>JSON.parse(data))
        .then((data)=>lodash.filter(data,record))
        .then((data)=>res.render('addStudent.ejs',{
            students:data
        }))
        .catch((err)=>console.log(err))
        .finally(()=>{console.log('Search Students done')});
})

app.post('/searchCourseEntry', function(req,res){
    console.log(req.body);
    var record = utility.removeEmptyValueFunc(req.body);
    readFilePromise('data/courses.json','utf-8')
        .then((data)=>JSON.parse(data))
        .then((data)=>lodash.filter(data,record))
        .then((data)=>res.render('addCourse.ejs',{
            courses:data
        }))
        .catch((err)=>console.log(err))
        .finally(()=>{console.log('Search Students done')});
})

app.get('/*',function(req,res){
    res.render('index.ejs',{});
})

app.listen(3000);