// ii. task.js - Task operations


import{validateTitle,validatePriority,validateDueDate}from"./validator.js";

const tasks=[];

// 1. Add new task
function addTask(title,priority,dueDate){
  if(!validateTitle(title)){
    return "Invalid title";
  }
  if(!validatePriority(priority)){
    return "Invalid priority";
  }
  if(!validateDueDate(dueDate)){
    return "Invalid due date";
  }

  const task={
    id:tasks.length+1,
    title:title,
    priority:priority,
    dueDate:dueDate,
    completed:false
  };

  tasks.push(task);
  return "Task added successfully";
}

// 2. Get all tasks
function getAllTasks(){
  return tasks;
}

// 3. Mark task as complete
function completeTask(taskId){
  const task=tasks.find(t=>t.id===taskId);
  if(task){
    task.completed=true;
    return "Task completed";
  }
  return "Task not found";
}

export{addTask,getAllTasks,completeTask};