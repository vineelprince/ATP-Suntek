//ASSIGNMENT 2

//EXAM RESULT SUMMARY

let marks=
{
    maths: 78,
    physics: 65,
    chemistry: 82,
    english: 55,
};

//Calculate total marks
let totalMarks = 0;

gettotalMarks = function() {
    for (let subject in marks) {
        totalMarks += marks[subject];
    }
    return totalMarks;
}

//Calculate average marks
getAverage = function() {
    let average = totalMarks/Object.keys(marks).length
    return average;
}

//Find the highest scoring subject
getHighestMarks = function(){
    let highest = 0
    for(subject in marks)
    {
        if(marks[subject]> highest)
        {
            highest = marks[subject]
        }
    }
    return highest;
}

//Add a new subject computer: 90

marks.computers= 90

console.log("Total Marks: " + gettotalMarks());
console.log("Average Marks: " + getAverage());
console.log("Highest Marks: " + getHighestMarks());
console.log("Updated Marks: ", marks);