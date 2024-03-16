
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const CRUD = require('./crud');
const PORT = process.env.PORT || 3000;
const Student = require('./student.model');
const ROOT_DIR = '/public' //root directory for our static pages

//middleware
app.use(cors({
  origin: '*' // allow request from any domain
}));

app.use(express.json()); // gives us access to request.body to get json data

app.use((req, res, next) => { // for seeing each request
  console.log('-------------------------------')
  console.log('req.path: ', req.path)
  console.log('serving:' + __dirname + ROOT_DIR + req.path)
  next(); //allow next route or middleware to run
})

/* Routes */
/* Create a new student */
app.post('/addStudent', async(req, res) => {
  try {
    const {fName, lName, email, enrollDate} = req.body;
    const date = !isNaN(new Date(enrollDate)) ? new Date(enrollDate) : new Date(); //if no date is provided or invalid, set to current date
    const newStudent = new Student(fName, lName, email, date);
    const qResult = await pool.query(CRUD.CREATE_STUDENT, newStudent.toArr());
    res.json({ message:`SUCCESS: Student "${fName} ${lName}" was added`, data: qResult.rows[0] });
  }catch(err) {
    console.log(err);
    if(err['code'] == '23505'){ //user already exists
      res.status(400).json({ message: `ERROR: ${err['detail']}`, data: ''});
    }else{ // general error
      res.status(500).json({ message: `ERROR: Student could not be added`, data: ''});
    }
  } 
});

/* Get all students */
app.get('/students', async(req, res) => {
  try {
    const allStu = await pool.query(CRUD.GET_ALL_STUDENTS);
    res.json(allStu.rows);
  } catch (err) {
   res.status(500).json({message: "Could not get all students", data: ''});
  }
});

/* Get one student by id */
app.get('/student/:id', async(req, res) => {
  try {
    const student = await pool.query(CRUD.GET_STUDENT, [req.params['id']]);
    res.json(student.rows.length > 0 ? {message: 'Student found', data: student.rows[0]} : {message: `No students found with id "${req.params['id']}"`, data: ''});
  } catch (error) {
    res.status(500).json({message: 'Could not get student', data: ''});
  }
});

/* Update a student by id*/
app.put('/student/:id', async(req, res) => {
  try {
    const id = req.params['id'];
    const newEmail = req.body['newEmail'];
    const updateStu = await pool.query(CRUD.UPDATE_STUDENT_BY_ID, [newEmail, id]);
    
    updateStu.rows.length > 0 ? res.json({message: `Student with id "${id}" email has been changed to "${newEmail}" :)`, data: updateStu.rows[0]}) : res.status(400).json({message: `ERROR: Student with id "${id}" could not be updated :(`, data: ''}); 
  } catch (err) { 
    console.log(err) 
    if(err['code'] == '23505')//user already exists
      res.json({ message: `ERROR: ${err.detail}`, data: ''});
    else
    res.status(500).json({message: 'There was an error processing request', data: ''});
  }
});

/* Delete a student */
app.delete('/student/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const deletedStu = await pool.query(CRUD.DELETE_STUDENT, [id]);
    console.log(deletedStu)
    res.json(deletedStu.rows.length > 0 ? {message: `STUDENT with id: ${id} was deleted`, data: deletedStu.rows[0]} : {message: `STUDENT with id: ${id} was not found`, data: ''});
  } catch (err) {
    res.status(500).json({message: 'There was an error deleting the student', data: ''});
  }
});

app.use(express.static(__dirname + ROOT_DIR)) //provide static server
app.use((req,res)=>{ // to handle any invalid requests
   res.status(404).send('404: Page not found')
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
  console.log('To test');
  console.log(`http://localhost:${PORT}`)
});
