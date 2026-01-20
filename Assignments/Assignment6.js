//ASSIGNMENT - 6
/*
You are building a shopping cart summary for an e-commerce website.

Test Data : 
const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

Tasks:
    
Use filter() to get only inStock products
Use map() to create a new array with:  { name, totalPrice }
Use reduce() to calculate grand total cart value
Use find() to get details of "Mouse"
Use findIndex() to find the position of "Keyboard"
*/

const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

// Use filter() to get only inStock products
//as the data is in the form of list of objs we use the syntax: obj.val
let res1=cart.filter(elementObj =>elementObj.inStock === true)
console.log("only inStock products:",res1)

// Use map() to create a new array with:  { name, totalPrice }
// map() is used for modification of elements of objs
let res2=cart.map(elementObj=>[elementObj.name,elementObj.price])
console.log(res2)

// Use reduce() to calculate grand total cart value
let res3=cart.reduce((acc,elementObj)=>(acc+(elementObj.price*elementObj.quantity)),0)
console.log("grand total cart value:",res3)

// Use find() to get details of "Mouse"
let res4=cart.find(elementObj =>elementObj.name==='Mouse')
console.log("Details of Mouse:",res4)

// Use findIndex() to find the position of "Keyboard"
let res5=cart.findIndex(elementObj=>elementObj.name==='Keyboard')
console.log("position of Keyboard:",res5)