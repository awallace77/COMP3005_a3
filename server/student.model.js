class Student {
  constructor(fName, lName, email, enrollDate){
    this.fName = fName;
    this.lName = lName;
    this.email  = email ;
    this.enrollDate = enrollDate;
  }

  toArr(){
    return [this.fName, this.lName, this.email, this.enrollDate]
  }
}

module.exports = Student;