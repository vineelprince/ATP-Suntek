//ASSIGNMENT 5

/*
Assignment 3: Student Marks List
--------------------------------
Scenario : You receive marks from an exam system.

Test data:
const marks = [78, 92, 35, 88, 40, 67];

Tasks:
    1. filter() marks ≥ 40 (pass marks)
    2. map() to add 5 grace marks to each student
    3. reduce() to find highest mark
    4. find() first mark below 40
    5. findIndex() of mark 92

*/

let marks = [78, 92, 35, 88, 12,40, 67];

//Task1. filter() marks ≥ 40 (pass marks)
let res1 = marks.filter(element => element >= 40)
console.log("Marks > 40 : ", res1)

//Task2. map() to add 5 grace marks to each student
let res2 = marks.map(elementObj => elementObj+5 )
console.log("After adding grace mark : ",res2)

//Task3. reduce() to find highest mark
//here we are checking accumator value is greater or not 
// if accmulator value is greater then store accumulator is not changed 
// if accmulatoe value is not gerater then element is stroed in accumulator
let res3 = marks.reduce((accumulator,element)=> accumulator>element? accumulator:element)
console.log("Highest marks : ",res3)

//Task4. find() first mark below 40
let res4 = marks.find(element=>element< 40)
console.log("First element < 40 : ",res4)

//Task5. findIndex() of mark 92
let res5 = marks.findIndex(element => element === 92)
console.log("INdex of 92 : ",res5)