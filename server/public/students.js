const PORT = 3000;
const url = `http://localhost:${PORT}`;
let students = []; //holds students retrieved from "Get all students"

/*
* Function: getAllStudents
* Purpose: responsible for getting all the students via GET request and build the results
*/
async function getAllStudents(){
  try {
    const res = await fetch(`${url}/students`);
    const data = await res.json();
    students = [...data];
    stuListBuilder(students);
  } catch (error) {
    console.log(error) 
  }
}

/*
* Function: addStudent 
* Purpose: responsible for adding a single student via POST request
*/
async function addStudent(e){
  e.preventDefault();
  let fName = document.getElementById('add-student-fName').value;
  let lName = document.getElementById('add-student-lName').value;
  let email = document.getElementById('add-student-email').value;
  let enrollDate = document.getElementById('add-student-enrollDate').value;
  
  try {
    const res = await fetch(`${url}/addStudent`, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify({
        fName: fName,
        lName: lName,
        email : email,
        enrollDate: enrollDate
      })
    });
    
    const resData = await res.json();
    
    /* Update status message */
    let statusMsg = document.getElementById('add-student-status-message');
    statusMsg.textContent = '';
    statusMsg.textContent = resData.message;
    resData.data ? addSuccessStyling('add-student-status-message') : addErrorStyling('add-student-status-message');
  } catch (error) {
    console.log('hit error block ')
    console.log(error);   
  }
}

/*
* Function: updateStudentById
* Purpose: checks if the student exists via id and if so, update the email with the new email
*/
async function updateStudentById(e){
  e.preventDefault();
  let id = document.getElementById('update-student-by-id-id').value;
  let newEmail = document.getElementById('update-student-by-id-new-email').value;
  let statusMsg = document.getElementById('update-student-by-id-status-message');

  try {
    const res = await fetch(`${url}/student/${id}`);
    const resData = await res.json();
    
    console.log(resData.message)
    console.log(JSON.stringify(resData))
    if(resData.data){ //user exists
      console.log(`User exists and updating data`)
      let res = await fetch(`${url}/student/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({
          id: id,
          newEmail: newEmail,
        })
      });
      const updateData = await res.json();
      console.log(updateData)
      res.status === 200 ? addSuccessStyling('update-student-by-id-status-message') : addErrorStyling('update-student-by-id-status-message');
      statusMsg.textContent = '';
      statusMsg.textContent = updateData['message'];
    }else{
      addErrorStyling('update-student-by-id-status-message');
      statusMsg.textContent = '';
      statusMsg.textContent = resData['message'];
    }
  } catch (error) {
    console.log(error);
  }
}

/* 
* Function: deleteStudent
* Purpose: responsible for deleting a student with a given id
*/
async function deleteStudent(e){
  e.preventDefault();
  let id = document.getElementById('delete-student-id').value;
  let statusMsg = document.getElementById('delete-student-status-message');
  try {
    let res = await fetch(`${url}/student/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    });
    let resData = await res.json();
    resData.data ? addSuccessStyling('delete-student-status-message') : addErrorStyling('delete-student-status-message');
    statusMsg.textContent = '';
    statusMsg.textContent = resData.message;
  } catch (error) {
    console.log(error)
  }
}

/* Helper Functions */
function stuListBuilder(arr){
  const stuTableBody = document.getElementById('student-table-body');
  stuTableBody.innerHTML = '';//clear the list
  for(let i = 0; i < arr.length; i++){
    let row = document.createElement('tr');

    /* Build the row */
    let id = document.createElement('td');
    id.innerText = students[i]['student_id'];
    let fName = document.createElement('td');
    fName.innerText = students[i]['first_name'];
    let lName = document.createElement('td');
    lName.innerText = students[i]['last_name'];
    let email = document.createElement('td');
    email.innerText = students[i]['email'];
    let enrollDate = document.createElement('td');
    enrollDate.innerText = students[i]['enrollment_date'];
    
    row.append(id, fName, lName, email, enrollDate);
    stuTableBody.append(row);
  }
}

function addErrorStyling(id){
  let statusMsg = document.getElementById(id); 
  if(statusMsg){
    statusMsg.classList.remove('success-message');
    statusMsg.classList.add('error-message');
  }
}

function addSuccessStyling(id){
  let statusMsg = document.getElementById(id); 
  if(statusMsg){
    statusMsg.classList.add('success-message');
    statusMsg.classList.remove('error-message');
  }
}
