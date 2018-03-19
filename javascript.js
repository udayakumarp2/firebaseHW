$(document).ready(function(){
//  Initialize Firebase
 var config = {
    apiKey: "AIzaSyC0dyPNSTdsbR49AFSmDRBxThoOjfL8bFo",
    authDomain: "train-schedule-f85d7.firebaseapp.com",
    databaseURL: "https://train-schedule-f85d7.firebaseio.com",
    projectId: "train-schedule-f85d7",
    storageBucket: "",
    messagingSenderId: "994537767606"
  };
  firebase.initializeApp(config);
// Create a variable for database
  var database= firebase.database();

// Button for adding appending a train schedule
$('#addTrainButton').on('click',function(event){
  event.preventDefault();

var trainName =$("#trainNameInput").val().trim();
var trainDest =$("#destinationInput").val().trim();
var trainArriv =$("#arrivalInput").val().trim();
var trainFreq =$("#freqInput").val().trim();


// local object for storing train data
var addTrain = {
    name: trainName,
    destination: trainDest,
    start: trainArriv,
    frequency:trainFreq
};

// Uploads to database
database.ref().push(addTrain);

// Alert
alert("Train has been added!");

// Clears text boxes
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#arrivalInput").val("");
$("#freqInput").val("");
});

// create a firebase object to save on the server

database.ref().on("child_added",function(childSnapshot,prevChildKey){
    console.log(childSnapshot.val());


// Store onto firebase objects using the variables created earlier. 
var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainArriv = childSnapshot.val().start;
var trainFreq = childSnapshot.val().frequency;

// Declare variable 
var trainFreq;

var startTime= 0;

var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
console.log(startTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


// Difference between the times
var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + timeDiff);


// Time apart (remainder)
var tRemaining = timeDiff % trainFreq;
console.log(tRemaining);

// Minute Until Train
var trainMinutes = trainFreq - tRemaining;
console.log("MINUTES TILL TRAIN: " + trainMinutes);


// Next Train
var nextTrain = moment().add(trainMinutes, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));



// Add each train's data into the table
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
"</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trainMinutes + "</td></tr>");
});

});