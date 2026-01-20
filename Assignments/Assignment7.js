/*
Student Performance Dashboard

You are working on a college result analysis system.

Test Data:
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

Tasks:
    
filter() students who passed (marks ≥ 40)
map() to add a grade field
        ≥90 → A
        ≥75 → B
        ≥60 → C
        else → D

   
reduce() to calculate average marks
find() the student who scored 92
findIndex() of student "Kiran"
*/

const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

// filtering the students who passed (marks ≥ 40)
let res1=students.filter(elementObj=>(elementObj.marks>=40))
console.log("Details who passed:",res1)

let res2=students.map(elementObj =>{
    if(elementObj.marks>=90){
        elementObj.grade='A'
    }
    else if(elementObj.marks>=75){
        elementObj.grade='B'
    }
    else if(elementObj.marks>=60){
        elementObj.grade='C'
    }
    else{
        elementObj.grade='D'
    }
    return elementObj
})
console.log(res2) //Printing the student details with grades according to marks

// reduce() to calculate average marks
let res3=students.reduce((acc,elementObj)=>(acc+elementObj.marks),0)
console.log("Average marks of students:",res3/students.length)

// find() the student who scored 92
let res4=students.find(elementObj =>elementObj.marks===92)
console.log("Details of student how scored 92:",res4)

// findIndex() of student "Kiran"
let res5=students.findIndex(elementObj => elementObj.name==='Kiran')
console.log("Index of the student kiran is :",res5)