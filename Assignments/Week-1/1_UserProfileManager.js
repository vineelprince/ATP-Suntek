//ASSIGNMENT 1
//USER PROFILE MANAGER

let emp =
{
    eno: 101,
    name: 'Ravi',
    email: 'ravi@gmail.com',
    role: 'Student',
    isActive: true
};

// Read and print the user’s name and email
console.log("User Name: ", emp.name);
console.log("User Email: ", emp.email);

//adding new prop
emp.lastLogin = "2026-01-01"

//update prop
emp.role = 'Admin'

//deleting prop
delete emp.isActive
console.log(emp);

// Use Object.keys() to list all remaining fields
console.log(Object.keys(emp))
