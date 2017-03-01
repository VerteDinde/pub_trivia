'use strict';

// store all users
var allUsers = [];

// create constructor for new user
function User(name, drink) {
  this.name = name;
  this.drink = 'images/' + drink;
  this.score = 0;
}

// Store All User Data to localStorage
function loadData(load) {
  if (localStorage['userData']) {
    var userDataLSString = localStorage['userData'];
    load = JSON.parse(userDataLSString);
  } else {
    console.log('loadData() :: no userData key found in localStorage object');
  }
}

function storeData(store) {
  var userDataJSON = JSON.stringify(allUsers);
  localStorage.setItem(store, userDataJSON);
  console.log('storeData() :: storing data<' + store + '>');
}

// Gather User Data //
// add event listener to the user submission form
var userForm = document.getElementById('user-form');
userForm.addEventListener('submit', generateUser);

// generate a new user from the event handler
function generateUser(event) {
  console.log('generateUser() :: ***fired***');
  event.preventDefault();
  loadData(allUsers);
  var userName = event.target.username.value;
  var radios = event.target.avatar;

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked === true) {
      var drinkSelected = (radios[i].value);
    }
  }
  var userDrink = drinkSelected;

  // check to see if user already exists, overwrite if so
  var newUser = new User(userName, userDrink);
  var userNameConflict = false;
  for (var j = 0; j < allUsers.length; j++) {
    if (allUsers[j].name === newUser.name) {
      allUsers[j] = newUser;
      userNameConflict = true;
      console.log('generateUser() :: name already exists; overwriting user object at index ' + i + ' of allUsers'); // consider giving user-visible feedback
      break;
    }
  }
  if (userNameConflict === false) {
    allUsers.push(newUser);
    console.log('generateUser() :: pushing newUser<' + newUser + '> to allUsers');
  }
  event.target.username.value = '';
  console.log('generateUser() :: allUsers is: ' + allUsers);
  storeData('userData');
  resetIcon();
  generateUsers();
}

// Generate user displays
function generateUsers() {
  // Add user information
  var userFooter = document.getElementById('users');
  userFooter.textContent = '';  // necessary to blow away old generated users
  for (var j = 0; j < allUsers.length; j++) {
    var userBlock = document.createElement('div');
    userBlock.id = 'user-block';
    userFooter.appendChild(userBlock);
    var uName = document.createElement('div');
    uName.textContent = allUsers[j].name;
    userBlock.appendChild(uName);

    var uDrink = document.createElement('img');
    uDrink.setAttribute('src', allUsers[j].drink);
    userBlock.appendChild(uDrink);

    var uScore = document.createElement('div');
    uScore.textContent = allUsers[j].score;
    userBlock.appendChild(uScore);
  }
}

// Start Game and Retrieve Data
var startButton = document.getElementById('play');
startButton.addEventListener('click', loadGame);

function loadGame(event) {
  event.preventDefault();
  window.location.replace('category.html');
}


//Reset drink icons after user selection
function resetIcon() {
  var resetCocktail = document.getElementById('cocktail');
  var resetTea = document.getElementById('tea');
  var resetWine = document.getElementById('wine-glass');
  var resetBeer = document.getElementById('beer-mug');
  resetCocktail.checked = false;
  resetTea.checked = false;
  resetWine.checked = false;
  resetBeer.checked = false;
}

//Finding 1st 2nd 3rd etc User
var winnerCircle = [];

function winners() {
  var winnerScore = [];
  for (var i = 0; i < allUsers.length; i++) {
    winnerScore.push(allUsers[i].score);
  }
  winnerScore.sort();
  for (var j = 0; j < winnerScore.length; j++) {
    if (winnerScore[j] === allUsers[j].score) {
      winnerCircle.push(allUsers[j]);
    }
  }
}

//Display Results in Table
var tableName = document.getElementById('table-name');
var tableResults = document.getElementById('table-points');

function onFinal() {
  for (var i = 0; i < winnersCircle.length; i++) {
    var winnerName = document.createElement('td');
    winnerName.textContent = winnerCircle[i].name;
    tableName.appendChild(winnerName);
    var winnerPoints = document.getElementById('table-points');
    winnerPoints.textContent = winnerCircle[i].score;
    tableResults.appendChild(winnerPoints);
  }
}