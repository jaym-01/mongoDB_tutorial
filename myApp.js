require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
    // default: ["carrots"]
  }
});

let Person;

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let p1 = new Person({
    name: "test1",
    age: 100,
    favoriteFoods: ["carrots", "cucumber"]
  });

  p1.save(function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

// let arrayOfPeople = [];

// for (let i = 0; i < 5; i++) {
//   arrayOfPeople.push({
//     name: "test" + i.toString(),
//     age: 100 + i,
//     favoriteFoods: ["carrots" + i.toString(), "cucumber" + i.toString()],
//   })
// }

const createManyPeople = (arrayOfPeople, done) => {
  // arrayOfPeople = [];

  // for (let i = 0; i < 5; i++) {
  //   arrayOfPeople.push({
  //     name: "test" + i.toString(),
  //     age: 100 + i,
  //     favoriteFoods: ["carrots" + i.toString(), "cucumber" + i.toString()],
  //   })
  // }

  Person.create(arrayOfPeople, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });

};


//on model.find() part
const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, (err, data)=>{
    if (err) done(err);
    else done(null, data);
  }).exec();
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=>{
    if (err) done(err);
    else done(null, data);
  }).exec();
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data){
    if (err) done(err);
    else done(null, data);
  }).exec();
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, data)=>{
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data)=>{
      if (err) done(err);
      else done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
