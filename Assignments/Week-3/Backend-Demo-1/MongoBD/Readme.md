### Create Database
    use db-name

### Read databases
    show databases

### Create Collections
    db.createCollection(collection-name)

### Document CURD operations
    1. Create document(s)
        > insertOne()           ex: db.users.insertOne({Name:"Vineel",Age:20,City:"Hyderabad"})
        > insertMany()          ex: db.users.insertMany([{Name:"Prince",Age:21,City:"Bengaluru"},{Name:"Sandeep",Age:25,City:"Anantapur"}])
    
    2. Read document(s)
        > findOne()     #single doc
        > find()        #all docs

    3. Update
        > updateOne(condition,update)       ex: db.users.updateOne({},{})   => db.users.updateOne({Name:"Vineel"},{$set:{Name:"Vineel Krishna"}})
        > updateMany(condition, update)

    4. Delete
        > deleteOne(condition)            ex: db.users.deleteOne({Name:"Prince"})
        > deleteMany(condition)


### Query Operators
    => {filed : {operator : value}}

    $eq -> equality comparision      ex: db.users.findOne({Name:{$eq:"Vineel Krishna"}})
    $gt -> greater than              ex: db.users.find({Age:{$gt:18}})
    $neq
    $gte
    $lt
    $lte
    $in
    $nin
    
### Query on Embedded/Nested documents

    "feild.nestedField"

### Array update operators
    $addtoSet       -> Add elements to an array if they do not already exist
    $push           
    $push &$each
    $pop
    $pull
    $pullAll
