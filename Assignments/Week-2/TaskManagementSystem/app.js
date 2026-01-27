// iii. app.js - Main application
// TODO: Import task functions
// import { ... } from './task.js';
// Test your module system
// 1. Add some tasks
// 2. Display all tasks
// 3. Complete a task
// 4. Display all tasks again
import { addTask, getAllTasks, completeTask } from './task.js';
import {validateDueDate,validatePriority,validateTitle} from "./validator"

// Adding tasks
console.log(addTask("Finish project", "High", "2024-12-01"));
console.log(addTask("Buy groceries", "Medium", "2024-11-15"));  
console.log(addTask("Walk the dog", "Low", "2024-11-10"));
console.log(addTask("", "Low", "2024-11-10")); // Invalid title example
// Display all tasks
console.log("All Tasks:", getAllTasks()); 


// Complete a task
console.log(completeTask(2)); // Mark task with id 2 as complete   


// Display all tasks again
console.log("All Tasks after completion:", getAllTasks());