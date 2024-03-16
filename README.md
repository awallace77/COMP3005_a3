# COMP3005 Assignment 3
Andrew Wallace - 101210291 <br/>
March 16th, 2024

## Purpose
Implement a PostgreSQL database using the provided schema and write an application in your language of choice that connects to this database to perform specific CRUD (Create, Read, Update, Delete) operations.The purpose of this assignment is to create.

## Overview
This program is built using express, node.js, and PostgreSQL client. The front end is simple vanilla JavaScript, HTML, and CSS. <br/>
A custom API was created with express so that the client can make HTTP requests to interact with the database. Upon launching the server and visiting the page, you will be presented with an accordion drop down of the various operations you can do on the database. This includes: 
- Getting all students
- Creating a new student
- Updating a student based on their id
- Deleting a student based on their id

## Getting started
### Prerequisites
- ensure that you have node.js installed
- ensure that you have pgAdmin installed
- create a fresh database in pgAdmin

### Step 1: Setting up the app 
- start by downlaoding (and unzipping) or cloning the repository into a new directory
- open a console and navigate to /server
- run `npm install` to install the necessary packages.
- create a `.env` file within the /server directory
- add the following (replacing <> tags with the necessary information): <br/>
DATABASE_USER=\<username\><br/>
DATABASE_PASSWORD=\<user password\><br/>
DATABASE_HOST=localhost<br/>
DATABASE_PORT=\<database port number\><br/>
DATABASE_NAME=\<database name\><br/>
PORT=3000

### Step 2: Creating the table
- navigate to /server
- open the `database.sql` file
- copy everything in the sql file
- navigate to pg admin, navigate to your database and open a new sql query by right clicking on your database and select 'Query Tool'
- within the query editor, paste the sql query
- click the `execute` button or `f5` on your keyboard to execute the query
- now run a new query `SELECT * FROM Students` to confirm
- the query should return a table of the three students

### Step 3: Launching the app
- navigate to /server directory in your console
- within the console run the command `node server.js`
- open a browser and navigate to: 
http://localhost:3000/index.html

- you should see a page with the student CRUD accordion menu

Congratulations, you have successfully setup the app!

## Testing the App
From the main index.html page you should be able to complete the following operations in their respective tabs: 
1. View a table of all the current students
2. Create a student
3. Update a student's email by entering their student id and new email
4. Delete a student by entering their id

## Video Demonstration
Visit https://youtu.be/AR5-y8znDaY for the full demonstration and code walkthrough.

## Closing Remarks
Thank you for checking out the app!!
