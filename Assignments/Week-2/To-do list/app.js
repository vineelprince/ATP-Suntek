/**
 * 
      iii. app.js - Main application
                  // TODO: Import task functions
                  // import { ... } from './task.js';
                  // Test your module system
                  // 1. Add some tasks
                  // 2. Display all tasks
                  // 3. Complete a task
                  // 4. Display all tasks again
 */


import{addTask,getAllTasks,completeTask}from"./task.js";

// 1. Add some tasks
addTask("Reading","medium","2026-1-31")
addTask("Walk the dog","high","2026-1-30 ")
addTask("Buy groceries","low","2026-1-25")
addTask("Workout","low","2026-01-30");

// 2. Display all tasks
console.log("All Tasks:",getAllTasks());

// 3. Complete a task
console.log(completeTask(2));

// 4. Display all tasks again
console.log("Updated Tasks:",getAllTasks());