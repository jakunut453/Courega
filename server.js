const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const utility = require('./utility.js');
var lodash = require('lodash');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

app.use(bodyParser.urlencoded({extended: true}))
// set embedded js as the templating engine
app.set('view engine','ejs')

// search a student entry given matching parameters
app.post('/searchStudentEntry', function(req,res){
    console.log(req.body);
    var record = utility.removeEmptyValueFunc(req.body);
    // using promises
    // read the file and process to find entries that match the search parameters
    // render the result page with retreived data
    readFilePromise('data/students.json','utf-8')
        .then((data)=>JSON.parse(data))
        .then((data)=>lodash.filter(data,record))
        .then((data)=>res.render('addStudent.ejs',{
            students:data
        }))
        .catch((err)=>console.log(err))
        .finally(()=>{console.log('Search Students done')});
})

// search a course entry given matching parameters
app.post('/searchCourseEntry', function(req,res){
    console.log(req.body);
    var record = utility.removeEmptyValueFunc(req.body);
    // using promises
    // read the file and process to find entries that match the search parameters
    // render the result page with retreived data
    readFilePromise('data/courses.json','utf-8')
        .then((data)=>JSON.parse(data))
        .then((data)=>lodash.filter(data,record))
        .then((data)=>res.render('addCourse.ejs',{
            courses:data
        }))
        .catch((err)=>console.log(err))
        .finally(()=>{console.log('Search Students done')});
})

// handles adding a student into the student database
app.post('/addStudentEntry', function(req,res){
    console.log(req.body);
    utility.addStudentEntryFunc(req.body);
    res.redirect('/addStudent');
})

// handles adding a Course into the Course database
app.post('/addCourseEntry', function(req,res){
    console.log(req.body)
    utility.addCourseEntryFunc(req.body);
    res.redirect('/addCourse');
})

// handles adding a student into the temporary registration list
app.post('/addRegistrationStudentEntry', function(req,res){
    console.log(req.body)
    utility.addRegistrationStudentEntryFunc(req.body);
    res.redirect('/addRegistration');
})

// handles adding a course into the temporary registration list
app.post('/addRegistrationCourseEntry', function(req,res){
    console.log(req.body)
    utility.addRegistrationCourseEntryFunc(req.body);
    res.redirect('/addRegistration');
})

// handles adding registration from the tempList to the registration database
app.post('/addRegistrationEntry', function(req,res){
    utility.addRegistrationEntryFunc();
    res.redirect('/addRegistration');
})

// remove students from the student database
app.post('/deleteStudentEntry', function(req,res){
    console.log(req.body)
    utility.deleteStudentEntryFunc(req.body);
    utility.deleteRegistrationEntryFunc(req.body);
    res.redirect('/addStudent')
})

// remove courses from the student database
app.post('/deleteCourseEntry', function(req,res){
    console.log(req.body)
    utility.deleteCourseEntryFunc(req.body);
    res.redirect('/addCourse')
})

// remove students from the Registration tempList
app.post('/deleteRegistrationStudentEntry', function(req, res){
    console.log(req.body)
    utility.deleteRegistrationStudentEntryFunc(req.body);
    res.redirect('/addRegistration');
})

// remove courses from the Registration tempList
app.post('/deleteRegistrationCourseEntry', function(req, res){
    console.log(req.body)
    utility.deleteRegistrationCourseEntryFunc(req.body);
    res.redirect('/addRegistration');
})

// remove registrations from the registration database
app.post('/deleteRegistrationEntry', function(req,res){
    console.log(req.body);
    utility.deleteRegistrationEntryFunc(req.body);
    res.redirect('/addRegistration');
})

// render the addStudent page for managing the student database
app.get('/addStudent',function(req,res){
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        res.render('addStudent.ejs',{
            students:result
        });
    });
})

// render the addCourse page for managing the course database
app.get('/addCourse',function(req,res){
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        res.render('addCourse.ejs',{
            courses:result
        });
    });
})

// render the addRegistration page for managing the registration database
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

// render a specific userProfile given a query RegNo
app.post('/userProfile', function(req,res){
    record = req.body;
    // read all files 
    fs.readFile('data/students.json', (err,data1)=>{
        if(err) throw err;
        fs.readFile('data/courses.json', (err,data2)=>{
            if(err) throw err;
            fs.readFile('data/registrations.json', (err,data3)=>{
                if(err) throw err;
                result ={};
                // identify the student of interest find all his registrations
                // find the course details for his registrations 
                // render the page with the retreived data
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

// render a specific course profile given a query course code
app.post('/courseProfile', function(req,res){
    record = req.body;
    // read all three databases 
    fs.readFile('data/students.json', (err,data1)=>{
        if(err) throw err;
        fs.readFile('data/courses.json', (err,data2)=>{
            if(err) throw err;
            fs.readFile('data/registrations.json', (err,data3)=>{
                if(err) throw err;
                result ={};
                // identify the course of interest and find the students registered 
                // display the profile page with the retreived data
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

// given a invalid page render the homepage as default
app.get('/*',function(req,res){
    res.render('index.ejs',{});
})

// the port number the app is listening on
// change to use on a different port
app.listen(3000);