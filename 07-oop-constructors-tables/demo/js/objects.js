'use strict';

var car = {
  color: 'Blue',
  make: 'Tesla',
  model: 'Model 3',
  year: 2018,
  vin: 'ALKF5342ASkljASF31',

  honk: function() {
    console.log('honk!');
  },

  yearMakeModel: function() {
    return car.year + ' ' + car.make + ' ' + car.model;
  }
};

console.log(car);
car.honk();
console.log(car.yearMakeModel());

var minivan = {
  color: 'Tan',
  make: 'Honda',
  model: 'Odyssey',
  year: 2015,
  vin: 'who cares?',
  owners: ['Keith', 'Samantha'],
  serviceRecord: [],

  honk: function() {
    console.log(this.yearMakeModel() + ' says honk!');
  },

  yearMakeModel: function() {
    return this.year + ' ' + this.make + ' ' + this.model;
  }
};

minivan.vin = '1234ABCD';
minivan.owners.push('Jess');

console.log(minivan);
minivan.honk();
console.log(minivan.yearMakeModel());

var carList = [ car, minivan ];
console.log(carList);

var emptyObject = {};
var emptyArray = [];

emptyArray[0] = 'hello';
emptyArray.isAwesome = true;

console.log(emptyArray.isAwesome);

// Property get/set by "dot notation"
emptyObject.name = 'Keith';

// Property get/set by "bracket notation"
emptyObject['age'] = 42;

console.log(emptyObject);
console.log(emptyObject.name);
console.log(emptyObject['age']);

var propertyName = 'age';
console.log(emptyObject[propertyName]);
