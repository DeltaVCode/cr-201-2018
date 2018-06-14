function Customer(name, address, city, state, custYears) {
  this.name = name;
  this.address = address;
  this.city = city;
  this.state = state;
  this.custYears = +custYears; // force to number

  // Add this new customer to the catalog
  Customer.all.push(this);
  console.log('all customers', Customer.all);
}

// Add catalog of all customers
Customer.all = [];
Customer.renderAll = function() {
  // First, empty out the existing customer list
  var customersUL = document.getElementById('customers');
  customersUL.innerHTML = '';
  console.log("Customer list cleared!");

  // Then, render each customer
  for (var i = 0; i < Customer.all.length; i++) {
    Customer.all[i].render();
  }
};

Customer.prototype.toString = function () {
  return this.name + ' (' + this.custYears + ' years)';
};

Customer.prototype.render = function() {
  var customersUL = document.getElementById('customers');

  /*
  var li = document.createElement('li');
  li.textContent = this.toString();
  customersUL.appendChild(li);
  */
  appendNewElement('li', this.toString(), customersUL);
};

function appendNewElement(tagName, textContent, parent) {
  var el = document.createElement(tagName);
  el.textContent = textContent;
  parent.appendChild(el);
}

var keith = new Customer('Keith', '415 12th Ave SE', 'Cedar Rapids', 'IA', 5);
keith.render();

function handleSubmit(event) {
  event.preventDefault();

  console.log(event);

  var name = event.target.name.value;
  var address = event.target.address.value;
  var city = event.target.city.value;
  var state = event.target.state.value;
  var custYears = event.target.custYears.value;

  // convert string to number:
  // parseInt
  // parseFloat (decimal)
  // +value returns value as a number

  var newCustomer = new Customer( name, address, state, city, custYears );
  console.log(newCustomer);

  Customer.renderAll();
}

var form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
