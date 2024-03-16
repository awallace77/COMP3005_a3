/* Responsible for attaching event listeners */
document.getElementById('getAllStudentsButton').addEventListener('click', () => getAllStudents());
document.getElementById('create-student-form').addEventListener('submit', e => addStudent(e));
// document.getElementById('update-student-form').addEventListener('submit', e => updateStudentByEmail(e));
document.getElementById('update-student-by-id-form').addEventListener('submit', e => updateStudentById(e));
document.getElementById('delete-student-form').addEventListener('submit', e => deleteStudent(e));