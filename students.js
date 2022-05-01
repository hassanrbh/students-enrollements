// Phase 6: Students enrollements;
function Students(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.courses = [];
}

Students.prototype.name = function() {
    return `${this.firstName} ${this.lastName}`
}

Students.prototype.enroll = function(course) {
    if (!this.courses.includes(course)) {
        this.courses.forEach(crs => {
            if (crs.conflictWith(course)) {
                throw "course conflict";
            }
        });
    }
    this.courses.push(course);
    course.addStudents(this);
    return course;
}

Students.prototype.courseload = function() {
    _expected = new Object();
    this.courses.map((course) => {
        _expected[course.department] = course.number_of_credits;
    })
    return _expected;
}

function Course(name, department, number_of_credits, days, block) {
    this.name = name;
    this.department = department;
    this.number_of_credits = number_of_credits;
    this.students = [];
    this.days = days;
    this.block = block;
}

Course.prototype.addStudents = function(student) {
    this.students.push(student);
    return student;
}

// in the first it checks if the other course block is the same as the current course then it checks
// if the other course days is the same as the current course 
Course.prototype.conflictWith = function(other_course) {
    if (this.block !== other_course.block) {
        return false;
    } else {
        return this.days.some(day => other_course.days.indexOf(day) !== -1);
    }
}

// let hassan = new Students("hassan", "tarif");
// let programming = new Course('programming is easy',
//     "department of computer science",
//     1999, ['mon'], 1);

// let math = new Course("math is easy",
//     "department of math",
//     3000, ['mon', 'wed', 'fri'], 1);

// hassan.enroll(programming);
// // hassan.enroll(math);
// console.log(hassan.courseload())
// console.log(programming.conflictWith(math));
