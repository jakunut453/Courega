const fs = require('fs');
var lodash = require('lodash');


function removeEmptyValueFunc(input_record){
    var record ={};
    for(item in input_record){
        if(input_record[item]!='')
            record[item] = input_record[item];
    }
    return record;
}

function addStudentEntryFunc(record){
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        student.push(record);
        let wdata = JSON.stringify(student, null, 2);
        fs.writeFile('data/students.json', wdata, (err) => {
            if (err) throw err;
            console.log('student '+record['RegNo']+' added to database');
        });
    });
}


function addCourseEntryFunc(record){
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        let courses = JSON.parse(data);
        courses.push(record);
        let wdata = JSON.stringify(courses, null, 2);
        fs.writeFile('data/courses.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course '+record['Code']+' added to database');
        });
    });
}

function addRegistrationStudentEntryFunc(record){
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        let selected = lodash.filter(student,removeEmptyValueFunc(record));
        fs.readFile('data/cache.json', (err, data) => {
            if (err) throw err;
            let temp = JSON.parse(data);
            selected.forEach((element) => {
                temp.Students.push(element);
            })
            let wdata = JSON.stringify(temp, null, 2);
            fs.writeFile('data/cache.json', wdata, (err) => {
                if (err) throw err;
                console.log('student of type '+removeEmptyValueFunc(record)+' added to tempList');
            });
        })
    });
}

function addRegistrationCourseEntryFunc(record){
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        let courses = JSON.parse(data);
        let selected = lodash.filter(courses,removeEmptyValueFunc(record));
        fs.readFile('data/cache.json', (err, data) => {
            if (err) throw err;
            let temp = JSON.parse(data);
            selected.forEach((element) => {
                temp.Courses.push(element);
            })
            let wdata = JSON.stringify(temp, null, 2);
            fs.writeFile('data/cache.json', wdata, (err) => {
                if (err) throw err;
                console.log('Course of type '+removeEmptyValueFunc(record)+' added to tempList');
            });
        })
    });
}

function addRegistrationEntryFunc(){
    fs.readFile('data/cache.json', (err,data) =>{
        if (err) throw err;
        let tempList = JSON.parse(data);
        let entries = [];
        tempList.Courses.forEach((course)=>{
            tempList.Students.forEach((student)=>{
                let entry = {};
                entry['Code'] = course.Code;
                entry['RegNo'] = student.RegNo;
                entries.push(entry);
            })
        })
        fs.readFile('data/registrations.json', (err,data) =>{
            if (err) throw err;
            let registrations = JSON.parse(data);
            entries.forEach( (element) =>{
                registrations.push(element)
            })
            let wdata = JSON.stringify(registrations, null, 2);
            fs.writeFile('data/registrations.json',wdata,(err)=>{
                if(err) throw err;
                console.log('Registrations added');
            })
        })
        tempList.Courses = [];
        tempList.Students = [];
        let wdata2 = JSON.stringify(tempList, null, 2);
        fs.writeFile('data/cache.json', wdata2, (err) =>{
            if(err) throw err;
            console.log('Cleared tempList');
        })
    })
}

function deleteStudentEntryFunc(record){
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        lodash.remove(student,record);
        let wdata = JSON.stringify(student, null, 2);
        fs.writeFile('data/students.json', wdata, (err) => {
            if (err) throw err;
            console.log('student of type'+JSON.stringify(record)+' removed from database');
        });
    });
}

function deleteCourseEntryFunc(record){
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        let courses = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        lodash.remove(courses,record);
        let wdata = JSON.stringify(courses, null, 2);
        fs.writeFile('data/courses.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course of type'+JSON.stringify(record)+' removed from database');
        });
    });
}

function deleteRegistrationStudentEntryFunc(record){
    fs.readFile('data/cache.json', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        lodash.remove(temp.Students,record);
        let wdata = JSON.stringify(temp, null, 2);
        fs.writeFile('data/cache.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course of type '+JSON.stringify(record)+' removed from tempList');
        });
    });
}

function deleteRegistrationCourseEntryFunc(record){
    fs.readFile('data/cache.json', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        lodash.remove(temp.Courses,record);
        let wdata = JSON.stringify(temp, null, 2);
        fs.writeFile('data/cache.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course of type'+JSON.stringify(record)+' removed from tempList');
        });
    });
}

function deleteRegistrationEntryFunc(record){
    fs.readFile('data/registrations.json', (err, data) => {
        if (err) throw err;
        let registrations = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        lodash.remove(registrations,record);
        let wdata = JSON.stringify(registrations, null, 2);
        fs.writeFile('data/registrations.json', wdata, (err) => {
            if (err) throw err;
            console.log('Registration of type'+JSON.stringify(record)+' removed from database');
        });
    });
}



module.exports = {
                    addStudentEntryFunc, 
                    deleteStudentEntryFunc,
                    addCourseEntryFunc, 
                    deleteCourseEntryFunc,
                    removeEmptyValueFunc,
                    addRegistrationStudentEntryFunc,
                    addRegistrationCourseEntryFunc,
                    deleteRegistrationStudentEntryFunc,
                    deleteRegistrationCourseEntryFunc,
                    addRegistrationEntryFunc,
                    deleteRegistrationEntryFunc,
                }