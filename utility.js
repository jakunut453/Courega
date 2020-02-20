const fs = require('fs');
var lodash = require('lodash');

// Note:
// All data stored in json files as JSON arrays

// remove items from JSON object where the value is ''
function removeEmptyValueFunc(input_record){
    var record ={};
    for(item in input_record){
        if(input_record[item]!='')
            record[item] = input_record[item];
    }
    return record;
}

// add students to the student database
function addStudentEntryFunc(record){
    // read the student database stored in the JSON file
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        // add the record to the JSON array
        student.push(record);
        // remove duplicate entries make sure registration number is unique
        student = lodash.uniqBy(student, "RegNo");
        // write the data back into the JSON file
        let wdata = JSON.stringify(student, null, 2);
        fs.writeFile('data/students.json', wdata, (err) => {
            if (err) throw err;
            console.log('student '+record['RegNo']+' added to database');
        });
    });
}

// add courses to the course database
function addCourseEntryFunc(record){
    // read the course database stored in the JSON file
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        // add the record to the JSON array
        let courses = JSON.parse(data);
        courses.push(record);
        // remove duplicate courses - same course code
        courses = lodash.uniqBy(courses,"Code");
        // write the updated array into the JSON file
        let wdata = JSON.stringify(courses, null, 2);
        fs.writeFile('data/courses.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course '+record['Code']+' added to database');
        });
    });
}

// add students to the temporary student registration list
function addRegistrationStudentEntryFunc(record){
    // read the student and tempList database
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        let selected = lodash.filter(student,removeEmptyValueFunc(record));
        fs.readFile('data/cache.json', (err, data) => {
            if (err) throw err;
            let temp = JSON.parse(data);
            // add all selected students to the student tempList
            selected.forEach((element) => {
                temp.Students.push(element);
            })
            // write back into the tempList
            // remove duplicate students - same RegNo
            temp.Students = lodash.uniqBy(temp.Students,"RegNo");
            let wdata = JSON.stringify(temp, null, 2);
            fs.writeFile('data/cache.json', wdata, (err) => {
                if (err) throw err;
                console.log('student of type '+removeEmptyValueFunc(record)+' added to tempList');
            });
        })
    });
}

// add courses to the temporary courses registration list
function addRegistrationCourseEntryFunc(record){
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        // read the courses and tempList database
        let courses = JSON.parse(data);
        let selected = lodash.filter(courses,removeEmptyValueFunc(record));
        fs.readFile('data/cache.json', (err, data) => {
            if (err) throw err;
            let temp = JSON.parse(data);
            // add all selected courses to the course tempList
            selected.forEach((element) => {
                temp.Courses.push(element);
            })
            // write back into the tempList
            // remove duplicate courses - same course code
            temp.Courses = lodash.uniqBy(temp.Courses,"Code");
            let wdata = JSON.stringify(temp, null, 2);
            fs.writeFile('data/cache.json', wdata, (err) => {
                if (err) throw err;
                console.log('Course of type '+removeEmptyValueFunc(record)+' added to tempList');
            });
        })
    });
}

// add registrations from the tempList to the registration database
function addRegistrationEntryFunc(){
    fs.readFile('data/cache.json', (err,data) =>{
        if (err) throw err;
        let tempList = JSON.parse(data);
        // create entries for each pair of students,courses in the tempList
        let entries = [];
        tempList.Courses.forEach((course)=>{
            tempList.Students.forEach((student)=>{
                let entry = {};
                entry['Code'] = course.Code;
                entry['RegNo'] = student.RegNo;
                entries.push(entry);
            })
        })
        // write all the entries into the registration database
        fs.readFile('data/registrations.json', (err,data) =>{
            if (err) throw err;
            let registrations = JSON.parse(data);
            entries.forEach( (element) =>{
                registrations.push(element)
            })
            // remove duplicate registrations 
            registrations = lodash.uniqWith(registrations, lodash.isEqual);
            let wdata = JSON.stringify(registrations, null, 2);
            fs.writeFile('data/registrations.json',wdata,(err)=>{
                if(err) throw err;
                console.log('Registrations added');
            })
        })
        // clear the tempList
        tempList.Courses = [];
        tempList.Students = [];
        let wdata2 = JSON.stringify(tempList, null, 2);
        fs.writeFile('data/cache.json', wdata2, (err) =>{
            if(err) throw err;
            console.log('Cleared tempList');
        })
    })
}

// delete matching students from the students tempList
function deleteRegistrationStudentEntryFunc(record){ 
    fs.readFile('data/cache.json', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        // remove students matching the record 
        lodash.remove(temp.Students,record);
        // write the changes back into the file
        let wdata = JSON.stringify(temp, null, 2);
        fs.writeFile('data/cache.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course of type '+JSON.stringify(record)+' removed from tempList');
        });
    });
}

// delete matching courses from the courses tempList
function deleteRegistrationCourseEntryFunc(record){
    fs.readFile('data/cache.json', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        // remove courses matching the record 
        record = removeEmptyValueFunc(record);
        lodash.remove(temp.Courses,record);
        let wdata = JSON.stringify(temp, null, 2);
        // write the changes back into the file
        fs.writeFile('data/cache.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course of type'+JSON.stringify(record)+' removed from tempList');
        });
    });
}

// delete registrations from the registration database
function deleteRegistrationEntryFunc(record){
    // read the file 
    fs.readFile('data/registrations.json', (err, data) => {
        if (err) throw err;
        let registrations = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        // remove entries matching the search parameters
        lodash.remove(registrations,record);
        let wdata = JSON.stringify(registrations, null, 2);
        // write back into the file
        fs.writeFile('data/registrations.json', wdata, (err) => {
            if (err) throw err;
            console.log('Registration of type'+JSON.stringify(record)+' removed from database');
        });
    });
}

// delete students from the student database
function deleteStudentEntryFunc(record){
    // read the student database
    fs.readFile('data/students.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        // remove the students matching the search parameters
        var removed = lodash.remove(student,record);
        // remove all registrations of removed students
        removed.forEach((element) => {
            deleteRegistrationEntryFunc({"RegNo":element.RegNo});
        })
        // write back into the student database
        let wdata = JSON.stringify(student, null, 2);
        fs.writeFile('data/students.json', wdata, (err) => {
            if (err) throw err;
            console.log('student of type'+JSON.stringify(record)+' removed from database');
        });
    });
}

// delete courses from the course database based on search parameters
function deleteCourseEntryFunc(record){
    // read the course database
    fs.readFile('data/courses.json', (err, data) => {
        if (err) throw err;
        // stored as a JSON array
        let courses = JSON.parse(data);
        record = removeEmptyValueFunc(record);
        // remove entries matching the 
        var removed = lodash.remove(courses,record);
        // remove all registrations of removed students
        removed.forEach((element) => {
            deleteRegistrationEntryFunc({"Code":element.Code});
        })
        let wdata = JSON.stringify(courses, null, 2);
        fs.writeFile('data/courses.json', wdata, (err) => {
            if (err) throw err;
            console.log('Course of type'+JSON.stringify(record)+' removed from database');
        });
    });
}


// export all the functions 
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