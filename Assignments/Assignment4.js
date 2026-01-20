//ASSIGNMENT 4

/*
Online Course Name Processor
------------------------------------------
Scenario : You are preparing a course list for display on a website.

Test data:
const courses = ["javascript", "react", "node", "mongodb", "express"];


Tasks:
    1. filter() courses with name length > 5
    2. map() to convert course names to uppercase
    3. reduce() to generate a single string:
              "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"

    4. find() the course "react"
    5. findIndex() of "node"
*/

let courses = ["javascript", "react", "node", "mongodb", "express"];

//Task1. filter() courses with name length > 5
let res1 = courses.filter(element => element.length > 5)
console.log("courses with name length > 5 : ", res1)

//Task2. map() to convert course names to uppercase
// to convert the lower case letters to uppercase we use syntax:obj.toUpperCase()
let res2 = courses.map(element => element.toUpperCase())
console.log("course names to uppercase : ",res2)

//Task3. reduce() to generate a single string:
//  "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"
let res3 = courses.reduce((accumulator,element)=>accumulator.toUpperCase()+' | '+element.toUpperCase())
console.log("Single string : ",res3)

//Task4. find() the course "react"
let res4 = courses.find(element => element==="react")
console.log("Serch for React : ",res4)

//Task5. findIndex() of "node"
let res5 = courses.findIndex(element => element === "node")
console.log("Index of 'node' : ",res5)