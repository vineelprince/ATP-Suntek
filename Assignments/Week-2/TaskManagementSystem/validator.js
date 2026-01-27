// 1. Validate task title (not empty, min 3 chars)
 function validateTitle(title) {
    if(title.length ===0){
        return "title is empty"
    }
    if(title.length < 3){
        return "title should have min of 3 chars"
    }
    return true
}
                      
// 2. Validate priority (must be: low, medium, high)
 function validatePriority(priority) {
    if(priority == 'low' || priority == 'medium' || priority == 'high'){
        return true
    }
    return false
}
// 3. Validate due date (must be future date)
 function validateDueDate(date) {
    if(new Date(date) > new Date()){
        return true
    }
    return false
}
export {validateDueDate,validatePriority,validateTitle}