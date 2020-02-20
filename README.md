# Courega
A Course registration portal to be used by Administrators. The application was built using Nodejs, HTML, CSS, ejs as a templating language and uses JSON files as a database. It allows a user to manage a database of students, courses and the registrations of students. Additionally the user can also see the profile of an individual course or student, where all their detatils are mentioned.

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

