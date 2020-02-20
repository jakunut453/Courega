const fs = require('fs');

var newUser = {
    "user":"id3",
    "pass":"321",
    courses:[]};

fs.readFile('testdata.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
    student.push(newUser);
    let wdata = JSON.stringify(student, null, 2);
    fs.writeFile('testdata.json', wdata, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});
