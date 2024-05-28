#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    courseEnrolled;
    feesAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
// if you buy course yes
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
// All student store thatswhy create array
let students = [];
// do while loop for continue enrollment
// and two options for user to select
do {
    let action = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });
    // if select option Enroll a student than
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            name: "ans",
            type: "input",
            message: "Please Enter your name:"
        });
        //     if student name in space than show error
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        //     store student name in array and double student name show error
        let studentNameCheck = students.map(obj => obj.name);
        //     if student name is empty than show error        
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            //      if student name enter
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                // print account created                
                console.log("\n\tYour account has been created");
                console.log(`Welcome, ${trimmedStudentName}! `);
                //        then show course name
                let course = await inquirer.prompt({
                    name: "ans",
                    type: "list",
                    message: "Please select a course",
                    choices: ["IT", "BSC", "BCOM", "BA"]
                });
                //        if user select course than show course fees     
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "BSC":
                        courseFees = 4000;
                        break;
                    case "BCOM":
                        courseFees = 3000;
                        break;
                    case "BA":
                        courseFees = 2000;
                        break;
                }
                //         confirm course answer 
                let courseConfirm = await inquirer.prompt({
                    name: "ans",
                    type: "confirm",
                    message: `Are you sure you want to enroll in ${course.ans} course?`
                });
                //           if course confirm answer true then                
                if (courseConfirm.ans === true) {
                    //            if any answer push in student
                    let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("\n\tYour enrollment has been completed");
                }
            }
            else {
                console.log(" invalid Name");
            }
        }
        else {
            console.log("this name is already exists");
        }
    }
    //           if select option Show student status than    
    else if (action.ans == "Show student status") {
        //           Select student name than show student information
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "Please select name",
                choices: studentNameCheck
            });
            //        if found student than show student data            
            let foundstudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log("Student information");
            console.log(foundstudent);
            console.log("\n");
            //       if student not found than print these            
        }
        else {
            console.log("Record is empty");
        }
    }
    //       user answer confirmation
    let userConfirm = await inquirer.prompt({
        name: "ans",
        type: "confirm",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
