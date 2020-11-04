(function () {
    'use strict';

    class Student {

        constructor(first, last, age, grade) {
            this.firstName = first;
            this.lastName = last;
            this.age = age;
            this.grade = grade;
        }

    }

    function printStudents(first, ...students) {
        let firstName;
        let lastName;
        for (let i = 0; i < students.length; i++) {
            ({ firstName, lastName } = students[i]);
            if (!first) {
                let temp = lastName;
                lastName = firstName;
                firstName = temp;
            }
            console.log(`${firstName} ${lastName} is ${students[i].age} years old and has a final grade of ${students[i].grade}`);
        }
    }

    function jumbleName(student) {
        let { firstName, lastName, ...rest } = student;
        return new Student(lastName, firstName, rest.age, rest.grade);
    }

    let student1 = new Student('Joe', 'Smith', 15, 80);
    let student2 = new Student('Jim', 'Jones', 19, 72);
    let student3 = new Student('Jerry', 'Whatever', 13, 96);
    let student4 = new Student('John', 'Blob', 14, 89);
    let student5 = new Student('Jack', 'Kugel', 16, 92);
    let studentList = [student1, student2, student3, student4, student5];

    printStudents(false, ...studentList);
    printStudents(true, ...studentList);
    console.log(jumbleName(student1));
    console.log(jumbleName(student2));
    let student6 = jumbleName(student3);
    console.log(student6);

}());
