import {validateDueDate,validatePriority,validateTitle} from "./validator"
// ii. task.js - Task operations
// TODO: Import validator functions
// import { ... } from './validator.js';

let tasks = [];

// 1. Add new task
function addTask(title, priority, dueDate) {
  // Validate using imported functions
  let isTitleValid = validateTitle(title);
  let isPriorityValid = validatePriority(priority);
  let isDueDateValid = validateDueDate(dueDate);
  // If valid, add to tasks array
  if (isTitleValid && isPriorityValid && isDueDateValid) {
    let newTask = {
      id: tasks.length + 1,
      title,
      priority,
      dueDate,
      completed: false
    };
    tasks.push(newTask);
    return "Task added successfully"
  } 
  else {
    return "Invalid task data"
  }
  // Return success/error message
}



// 2. Get all tasks
function getAllTasks() {
  // Return all tasks
  return tasks;
}



// 3. Mark task as complete
function completeTask(taskId) {
  // Find task and mark as complete
  let task = tasks.find(obj => obj.id === taskId);
  if (task) {
    task.completed = true;
    return "Task marked as complete" 
  } else {
    return "Task not found" 
  }
}

// Export functions
export { addTask, getAllTasks, completeTask };
