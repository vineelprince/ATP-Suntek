//ASSIGNMENT 3

/*
Daily Temperature Analyzer
----------------------------------------
Scenario : You are analyzing daily temperatures recorded by a weather app.

Test data:
const temperatures = [32, 35, 28, 40, 38, 30, 42];

Tasks:
    1. filter() temperatures above 35
    2. map() to convert all temperatures from Celsius → Fahrenheit
    3. reduce() to calculate average temperature
    4. find() first temperature above 40
    5. findIndex() of temperature 28
 */

let temperatures = [32, 35, 28, 40, 38, 30, 42];

//Task1. filter() temperatures above 35
let tempabove35 = temperatures.filter(temperaturesobj => temperaturesobj > 35)
console.log("Temperature above 35 : ",tempabove35)

//Task2. map() to convert all temperatures from Celsius → Fahrenheit
let Fahrenheit = temperatures.map(temperatures=> temperatures* 2+30)
console.log("Celsius -> Fahrenheit :",Fahrenheit)

//Task3. reduce() to calculate average temperature
let avgTemp = temperatures.reduce((accumulator,temperatures) => accumulator+temperatures)
console.log("Average of Temperatures : ",avgTemp/temperatures.length)

//Task4. find() first temperature above 40
let above40 = temperatures.find(temperatures => temperatures>40)
console.log("Temperature > 40 : ",above40)

//Task5. findIndex() of temperature 28
let tempindex = temperatures.findIndex(ele => ele == 28)
console.log("Index of 28 temp : ",tempindex)
