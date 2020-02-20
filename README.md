# Courega
A Course registration portal to be used by Administrators. The application was built using Nodejs, HTML, CSS, EJS as a templating language and uses JSON files as a database. It allows a user to manage a database of students, courses and the registrations of students. Additionally the user can also see the profile of an individual course or student, where all their detatils are mentioned.

## Getting started
### Prerequisites
The application requires Nodejs to be installed and can be downloaded from this [link](https://nodejs.org/en/).
### Installation
Once Nodejs is setup go to the directory where the files are present and run the command `npm install` which uses npm to download all the required packages mentioned in  `packages.json`.

## Nodejs Concepts used in making the application

* Modules - used exports to increase readability of code. functions are defined in `utility.js` which are used in `server.js`
* Comments - Correct amount of comments are written to increase readability.
* Files - used file read and writes to manage the database.
* Lodash - The databases where stored as JSON arrays. Used Lodash to manipulate data and Add, Delete, Search entries.
* Express - To handle all GET and POST requests made to the Nodejs server.
* Promises - Used promises to make code more concise and avoid callback hell.
* Callback functions - To handle requests.
* EJS - as the templating language for the views.
* CSS - to improve the look of the application

## Usage

To start the application go to directory and using a Terminal type the command `node server.js`. This command starts the server and makes it listen on port 3000. You can open the application by opening `http://localhost:3000/` in any browser.

### Homepage
Once opened you will be redirected to the homepage `/index`. From here you can choose to manage a database by clicking on any of the buttons, or view a profile by entering a registration number, course code in the search bar.

![Image of Homepage](/screenshots/homePage.PNG)

### Student and Course Database
On clicking on the student option the user is redirected to `/addStudent` where they can manage the student database

![Image of Student database](/screenshots/students.PNG)

* Add students - they can add students by filling the form and clicking add.
* Search students - they can search students by filling any of the fields in the form and clicking search. Any students matching the description are displayed.
* Delete students - they can delete students by filling any of the fields and clicking the delete button. Any students matching he description are removed from the database.

Similarly on clicking the course option the user is redirected to `/addCourse` where they can manage the course database in a manner similar to that of the student database.

![Image of Course database](/screenshots/courses.PNG)

### Registrations
The registrations page `/addRegistrations` works differently from the student and course database page. It consist of a temporary list of students and courses which is on the left of the page. 
* The user can add or delete from each temporary list in a similar manner as explained above. 
* Once satisfied with the tempList the user can click the `add Registration` button on the bottom of the screen to register all the students to all the courses specified. Each student in the student temporary list is registered for each course in the course temporary list.

![Registration image](/screenshots/registrations1.PNG)

The user can then delete registrations using the form on the right. Any registrations matching the search query will be deleted.
![Registration image](/screenshots/registrations2.PNG)

### User and Course Profile
From the homepage the user can provide a registration number of a student or a course code to the profile of the particular item. All details will be displayed on the profile page for example a students profile has all the courses they have enrolled in. 

![User Profile](/screenshots/userProfile.PNG)

From here the user can choose to view a different profile or go back.

![Course Profile](/screenshots/courseProfile.PNG)
