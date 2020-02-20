# Courega
A Course registration portal to be used by Administrators. The application was built using Nodejs, HTML, CSS, EJS as a templating language and uses JSON files as a database. It allows a user to manage a database of students, courses and the registrations of students. Additionally the user can also see the profile of an individual course or student, where all their detatils are mentioned.

## Getting started
### Prerequisites
The application requires Nodejs to be installed and can be downloaded from this [link](https://nodejs.org/en/).
### Installation
Once Nodejs is setup go to the directory where the files are present and run the command `npm install` which uses npm to download all the required packages mentioned in  `packages.json`.

## Nodejs Concepts used in making the application

* Modules - used exports to increase readability of code.
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

![Image of Homepage](/screenshots/students.PNG)

* Add students - they can add students by filling the form and clicking add.
* Search students - they can search students by filling any of the fields in the form and clicking search. Any students matching the description are displayed.
* Delete students - they can delete students by filling any of the fields and clicking the delete button. Any students matching he description are removed from the database.
