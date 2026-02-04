## We will learn mongo db commands here

## create database
    > use database_name
    * This command switches to the specified database. If the database does not exist, it will be created when you insert data.
## show databases
    > show dbs
    * This command lists all the databases on the MongoDB server.
## create collection (table)
    > db.createCollection("collection_name")
    * This command creates a new collection (similar to a table in relational databases) within the current database.
## show collections (tables)
    > show collections
    * This command lists all the collections in the current database.
## create document (row)
    > db.collection_name.insertOne({key1: "value1", key2: "value2"})
    * This command inserts a new document (similar to a row in relational databases) into the specified collection.
    > db.collection_name.insertMany([{key1: "value1"}, {key2: "value2"}])
    * This command inserts multiple documents into the specified collection.
## read documents or data
    > db.collection_name.find()
    * This command retrieves all documents from the specified collection.
    > db.collection_name.find({key: "value"})
    * This command retrieves documents that match the specified criteria.
    > db.collection_name.findOne({key: "value"})
    * This command retrieves a single document that matches the specified criteria.
## update document or data
    > db.collection_name.updateOne({key: "value"}, {$set: {key: "new_value"}})
    * This command updates a single document that matches the specified criteria.
    > db.collection_name.updateMany({key: "value"}, {$set: {key: "new_value"}})
    * This command updates multiple documents that match the specified criteria.

## Delete document or data
    > db.collection_name.deleteOne({key: "value"})
    * This command deletes a single document that matches the specified criteria.
    > db.collection_name.deleteMany({key: "value"})
    * This command deletes multiple documents that match the specified criteria.

## Upsert : this is the operation in which if the document is present it will update otherwise it will create a new document

# Query operators 
## Comparison Operators
    $eq : equal to
    $ne : not equal to
    $gt : greater than
    $gte : greater than or equal to
    $lt : less than
    $lte : less than or equal to
    $in : in array
    $nin : not in array
    $all : matches all values in an array

## Query on Embedded/Nested Documents
    > db.collection_name.find({"embedded_doc.key": "value"})
    * This command retrieves documents based on criteria within embedded documents.

### structure of a Nested document
    {
        key1: "value1",
        embedded_doc: {
            key2: "value2",
            key3: "value3"
        }
    }
## Difference between $in and $all
    $in : matches any value in the specified array
    $all : matches all values in the specified array



show collections
users
db.createCollection("emps")
{ ok: 1 }
show collections
emps
users
db.emps.insertOne({eno:100,name:"ravi",skill:["javascript","css","react"],address:{city:"hyderabad",pincode:500088}})
{
  acknowledged: true,
  insertedId: ObjectId('697d7ffe80992dfd14cde1b5')
}
db.emps.findOne()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}
db.emps.findOne({name:"ravi"})
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}
db.emps.findOne({address.city:"hyderabad"})
SyntaxError: Unexpected token, expected "," (1:24)

> 1 | db.emps.findOne({address.city:"hyderabad"})
    |                         ^
db.emps.findOne({"address.city:"hyderabad"})
SyntaxError: Unexpected token (1:32)

> 1 | db.emps.findOne({"address.city:"hyderabad"})
    |                                 ^
db.emps.findOne({"address.city":"hyderabad"})
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}
db.emps.find({"javascript":{$in :skill}})
ReferenceError: skill is not defined
db.emps.find({skill:{$in :"javascript"}})
MongoServerError[BadValue]: $in needs an array
db.emps.find({skill:"javascript"})
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}
db.emps.find({skill:{$in : ["javascript"]}})
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}
db.emps.find({skill:{$in : ["javascript","react"]}})
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}
db.emps.find({skill:{$all : ["javascript","react"]}})
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}

## Modify existing documents
db.emps.updateOne({eno:100},{$set:{name:"ravi kumar"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi kumar',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088
  }
}

db.emps.updateOne({eno:100},{$set:{"address.street":"uppal"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi kumar',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'hyderabad',
    pincode: 500088,
    street: 'uppal'
  }
}

db.emps.updateOne({eno:100},{$set:{"address.city":"vizag"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  name: 'ravi kumar',
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'vizag',
    pincode: 500088,
    street: 'uppal'
  }
}

## Delete documents or document fields

db.emps.updateOne({eno:100},{$unset:{name:""}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'vizag',
    pincode: 500088,
    street: 'uppal'
  }
}
db.emps.updateOne({eno:100},{$unset:{"address.pincode":""}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  }
}
db.emps.updateOne({eno:100},{$set:{firstName:"kiran"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran'
}

## Array update operators
    $push : to add an element to an array
    $pop : to remove an element from an array
    $addToSet : to add an element to an array only if it does not already exist in the array
    $push & $each : to add multiple elements to an array
    $pull : to remove all instances of a specific value from an array
    $pullAll : to remove all instances of multiple values from an array

db.emps.updateOne({eno:100},{$push:{skills:"angular"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran',
  skills: [
    'angular'
  ]
}
db.emps.updateOne({eno:100},{$push:{skill:"angular"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.updateOne({eno:100},{$unset:{skills:""}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react',
    'angular'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran'
}
db.emps.updateOne({eno:100},{$addToSet:{skill:"angular"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
db.emps.updateOne({eno:100},{$push:{$each:["nodejs","java"]}})
MongoServerError: The dollar ($) prefixed field '$each' in '$each' is not allowed in the context of an update's replacement document. Consider using an aggregation pipeline with $replaceWith.
db.emps.updateOne({eno:100},{$push:{skill:{$each:["nodejs","java"]}}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react',
    'angular',
    'nodejs',
    'java'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran'
}


db.emps.updateOne({eno:100},{$pop:{skill:1}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'javascript',
    'css',
    'react',
    'angular',
    'nodejs'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran'
}
db.emps.updateOne({eno:100},{$pop:{skill:-1}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'css',
    'react',
    'angular',
    'nodejs'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran'
}

db.emps.updateOne({eno:100},{$pull:{skill:"css"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.emps.find()
{
  _id: ObjectId('697d7ffe80992dfd14cde1b5'),
  eno: 100,
  skill: [
    'react',
    'angular',
    'nodejs'
  ],
  address: {
    city: 'vizag',
    street: 'uppal'
  },
  firstName: 'kiran'
}
