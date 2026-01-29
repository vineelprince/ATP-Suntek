/*Assignment 1: 
-------------
Task Management System (ToDo App Modules):
     Building a task manager like Todoist

Requirements:
     Create a modular todo app with 3 separate files:

       
          
        i. validator.js - Input validation
                      // TODO: Export these validation functions
                      
                      // 1. Validate task title (not empty, min 3 chars)
                      function validateTitle(title) {
                        // Your code here
                      }
                      
                      // 2. Validate priority (must be: low, medium, high)
                      function validatePriority(priority) {
                        // Your code here
                      }
                      
                      // 3. Validate due date (must be future date)
                      function validateDueDate(date) {
                        // Your code here
                      }
 */

// 1. Validate task title (not empty, min 3 chars)
function validateTitle(title){
  if(!title || title.length<3){
    return false;
  }
  return true;
}

// 2. Validate priority (must be: low, medium, high)
function validatePriority(priority){
  if(priority==="low"||priority==="medium"||priority==="high"){
    return true;
  }
  return false;
}

// 3. Validate due date (must be future date)
function validateDueDate(date){
  const today=new Date();
  const due=new Date(date);
  if(due>today){
    return true;
  }
  return false;
}

export{validateTitle,validatePriority,validateDueDate};