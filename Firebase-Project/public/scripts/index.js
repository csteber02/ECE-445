const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");
const enterTime = document.querySelector("#enter-time");
const addButton = document.querySelector("#add-button");
const wifiSymbol = document.querySelector("#wifi-status");
const firstTime = document.querySelector("#first-time");
const secondTime = document.querySelector("#second-time");
const thirdTime = document.querySelector("#third-time");
const fourthTime = document.querySelector("#fourth-time");


// Elements for GPIO states
const stateElement1 = document.getElementById("state1");
// const hourOne = document.getElementById("hour1");
// const minOne = document.getElementById("min1");
// const hourTwo = document.getElementById("hour2");
// const minTwo = document.getElementById("min2");
// const hourThree = document.getElementById("hour3");
// const minThree = document.getElementById("min3");
// const hourFour = document.getElementById("hour4");
// const minFour = document.getElementById("min4");


// const stateElement2 = document.getElementById("state2");

// Button Elements
const btn1On = document.getElementById('btn1On');
const calButton = document.getElementById('cal-btn');
// const btn1Off = document.getElementById('btn1Off');

// Database path for GPIO states
var dbPathOutput0 = 'board1/outputs/digital/0';   // Wifi
var dbPathOutput1 = 'board1/outputs/digital/45';  // Motor
var dbPathOutput2 = 'board1/outputs/digital/1';   // Hour 1
var dbPathOutput3 = 'board1/outputs/digital/11';  // Min 1
var dbPathOutput4 = 'board1/outputs/digital/2';   // Hour 2
var dbPathOutput5 = 'board1/outputs/digital/22';  // Min 2
var dbPathOutput6 = 'board1/outputs/digital/3';   // Hour 3
var dbPathOutput7 = 'board1/outputs/digital/33';  // Min 3
var dbPathOutput8 = 'board1/outputs/digital/4';   // Hour 4
var dbPathOutput9 = 'board1/outputs/digital/44';  // Min 4
var dbPathOutput10 = 'board1/outputs/digital/50'; // Camera
var dbPathOutput11 = 'board1/outputs/digital/60'; // Food Percentage
var dbPathOutput12 = 'board1/outputs/digital/61'; // Calibration
var dbPathOutput13 = 'board1/outputs/digital/70'; // Feeding


// Database references
var dbRefOutput0 = firebase.database().ref().child(dbPathOutput0);
var dbRefOutput1 = firebase.database().ref().child(dbPathOutput1);
var dbRefOutput2 = firebase.database().ref().child(dbPathOutput2);
var dbRefOutput3 = firebase.database().ref().child(dbPathOutput3);
var dbRefOutput4 = firebase.database().ref().child(dbPathOutput4);
var dbRefOutput5 = firebase.database().ref().child(dbPathOutput5);
var dbRefOutput6 = firebase.database().ref().child(dbPathOutput6);
var dbRefOutput7 = firebase.database().ref().child(dbPathOutput7);
var dbRefOutput8 = firebase.database().ref().child(dbPathOutput8);
var dbRefOutput9 = firebase.database().ref().child(dbPathOutput9);
var dbRefOutput10 = firebase.database().ref().child(dbPathOutput10);
var dbRefOutput11 = firebase.database().ref().child(dbPathOutput11);
var dbRefOutput12 = firebase.database().ref().child(dbPathOutput12);
var dbRefOutput13 = firebase.database().ref().child(dbPathOutput13);

var numTimes = 0;

firstTime.style.display ='none';
secondTime.style.display ='none';
thirdTime.style.display ='none';
fourthTime.style.display ='none';


// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // Update states depending on the database value
    dbRefOutput13.on('value', snap => {
        if(snap.val()==1) {
            stateElement1.innerText="Feeding";
        }
        else{
            stateElement1.innerText="Standby";
            alert("Feeding Complete!");
        }
    });

    // Display WiFi Symbol
    dbRefOutput0.on('value', snap => {
        if(snap.val()==1) {
          wifiSymbol.style.display = 'block';
        }
        else{
          wifiSymbol.style.display = 'none';
        }
    });

    // Update database uppon button click
    btn1On.onclick = () =>{
      console.log("btn1On clicked");
      dbRefOutput1.set(0);
      dbRefOutput1.set(1);
    }
    // btn1Off.onclick = () =>{
    //     dbRefOutput1.set(1);
    // }

    // Update database uppon button click
    calButton.onclick = () =>{
      console.log("calButton clicked");
      dbRefOutput12.set(1);
    }

    // Add button
    document.getElementById("add-button").onclick = function() {
      console.log("add-button clicked");
      if (numTimes == 0) {
        const hourOne = document.getElementById("hour1");
        const minOne = document.getElementById("min1");
        let inputTime = document.getElementById("input-time").value;
        if (!inputTime) {
          alert("Please select a valid time!");
          return;
        }
        let [fHour, fMin] = inputTime.split(":");
        let firstHour = parseInt(fHour);
        let firstMin = parseInt(fMin);
        dbRefOutput2.set(firstHour);
        dbRefOutput3.set(firstMin);
        console.log("Setting dbRefOutput2:", firstHour);
        console.log("Setting dbRefOutput3:", firstMin);
        numTimes = 1;
        dbRefOutput2.on('value', snap => {
          if(snap.val() == 0) {
            hourOne.innerText="0";
          } else {
            hourOne.innerText=snap.val();
          }
        });
        dbRefOutput3.on('value', snap => {
          if(snap.val() < 10) {
            minOne.innerText="0"+snap.val();
          } else {
            minOne.innerText=snap.val();
          }
        });
        firstTime.style.display = 'block';
      } else if (numTimes == 1) {
        const hourTwo = document.getElementById("hour2");
        const minTwo = document.getElementById("min2");
        let inputTime = document.getElementById("input-time").value;
        if (!inputTime) {
          alert("Please select a valid time!");
          return;
        }
        let [sHour, sMin] = inputTime.split(":");
        let secondHour = parseInt(sHour);
        let secondMin = parseInt(sMin);
        dbRefOutput4.set(secondHour);
        dbRefOutput5.set(secondMin);
        console.log("Setting dbRefOutput4:", secondHour);
        console.log("Setting dbRefOutput5:", secondMin);
        numTimes = 2;
        dbRefOutput4.on('value', snap => {
          if(snap.val() == 0) {
            hourTwo.innerText="0";
          } else {
            hourTwo.innerText=snap.val();
          }
        });
        dbRefOutput5.on('value', snap => {
          if(snap.val() < 10) {
            minTwo.innerText="0"+snap.val();
          } else {
            minTwo.innerText=snap.val();
          }
        });
        secondTime.style.display = 'block';
      } else if (numTimes == 2) {
        const hourThree = document.getElementById("hour3");
        const minThree = document.getElementById("min3");
        let inputTime = document.getElementById("input-time").value;
        if (!inputTime) {
          alert("Please select a valid time!");
          return;
        }
        let [tHour, tMin] = inputTime.split(":");
        let thirdHour = parseInt(tHour);
        let thirdMin = parseInt(tMin);
        dbRefOutput6.set(thirdHour);
        dbRefOutput7.set(thirdMin);
        console.log("Setting dbRefOutput6:", thirdHour);
        console.log("Setting dbRefOutput7:", thirdMin);
        numTimes = 3;
        dbRefOutput6.on('value', snap => {
          if(snap.val() == 0) {
            hourThree.innerText="0";
          } else {
            hourThree.innerText=snap.val();
          }
        });
        dbRefOutput7.on('value', snap => {
          if(snap.val() < 10) {
            minThree.innerText="0"+snap.val();
          } else {
            minThree.innerText=snap.val();
          }
        });
        thirdTime.style.display = 'block';
      } else if (numTimes == 3) {
        const hourFour = document.getElementById("hour4");
        const minFour = document.getElementById("min4");
        let inputTime = document.getElementById("input-time").value;
        if (!inputTime) {
          alert("Please select a valid time!");
          return;
        }
        let [foHour, foMin] = inputTime.split(":");
        let fourthHour = parseInt(foHour);
        let fourthMin = parseInt(foMin);
        dbRefOutput8.set(fourthHour);
        dbRefOutput9.set(fourthMin);
        console.log("Setting dbRefOutput8:", fourthHour);
        console.log("Setting dbRefOutput9:", fourthMin);
        numTimes = 4;
        dbRefOutput8.on('value', snap => {
          if(snap.val() == 0) {
            hourFour.innerText="0";
          } else {
            hourFour.innerText=snap.val();
          }
        });
        dbRefOutput9.on('value', snap => {
          if(snap.val() < 10) {
            minFour.innerText="0"+snap.val();
          } else {
            minFour.innerText=snap.val();
          }
        });
        fourthTime.style.display = 'block';
        enterTime.style.display = 'none';
      }
    }

    document.getElementById("rem-first").onclick = function() {
      if (numTimes == 4) {
        dbRefOutput2.set(secondHour);
        dbRefOutput3.set(secondMin);
        hourFirst.innerText="secondHour";
        minFirst.innerText="secondMin";
        dbRefOutput4.set(thirdHour);
        dbRefOutput5.set(thirdMin);
        hourTwo.innerText="thirdHour";
        minTwo.innerText="thirdMin";
        dbRefOutput6.set(fourthHour);
        dbRefOutput7.set(fourthMin);
        hourThree.innerText="fourthHour";
        minThree.innerText="fourthMin";
        dbRefOutput8.set(25);
        dbRefOutput9.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'block';
        thirdTime.style.display = 'block';
        fourthTime.style.display = 'none';
      } else if (numTimes == 3) {
        dbRefOutput2.set(secondHour);
        dbRefOutput3.set(secondMin);
        hourFirst.innerText="secondHour";
        minFirst.innerText="secondMin";
        dbRefOutput4.set(thirdHour);
        dbRefOutput5.set(thirdMin);
        hourTwo.innerText="thirdHour";
        minTwo.innerText="thirdMin";
        dbRefOutput6.set(25);
        dbRefOutput7.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'block';
        thirdTime.style.display = 'none';
      } else if (numTimes == 2) {
        dbRefOutput2.set(secondHour);
        dbRefOutput3.set(secondMin);
        hourFirst.innerText="secondHour";
        minFirst.innerText="secondMin";
        dbRefOutput4.set(25);
        dbRefOutput5.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'none';
      } else {
        dbRefOutput2.set(25);
        dbRefOutput3.set(25);
        firstTime.style.display = 'none';
      }
      numTimes--;
    }

    document.getElementById("rem-second").onclick = function() {
      if (numTimes == 4) {
        dbRefOutput4.set(thirdHour);
        dbRefOutput5.set(thirdMin);
        hourTwo.innerText="thirdHour";
        minTwo.innerText="thirdMin";
        dbRefOutput6.set(fourthHour);
        dbRefOutput7.set(fourthMin);
        hourThree.innerText="fourthHour";
        minThree.innerText="fourthMin";
        dbRefOutput8.set(25);
        dbRefOutput9.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'block';
        thirdTime.style.display = 'block';
        fourthTime.style.display = 'none';
      } else if (numTimes == 3) {
        dbRefOutput4.set(thirdHour);
        dbRefOutput5.set(thirdMin);
        hourTwo.innerText="thirdHour";
        minTwo.innerText="thirdMin";
        dbRefOutput6.set(25);
        dbRefOutput7.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'block';
        thirdTime.style.display = 'none';
      } else {
        dbRefOutput4.set(25);
        dbRefOutput5.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'none';
      }
      numTimes--;
    }

    document.getElementById("rem-third").onclick = function() {
      if (numTimes == 4) {
        dbRefOutput6.set(fourthHour);
        dbRefOutput7.set(fourthMin);
        hourThree.innerText="fourthHour";
        minThree.innerText="fourthMin";
        dbRefOutput8.set(25);
        dbRefOutput9.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'block';
        thirdTime.style.display = 'block';
        fourthTime.style.display = 'none';
      } else {
        dbRefOutput6.set(25);
        dbRefOutput7.set(25);
        firstTime.style.display = 'block';
        secondTime.style.display = 'block';
        thirdTime.style.display = 'none';
      }
      numTimes--;
    }

    document.getElementById("rem-fourth").onclick = function() {
      dbRefOutput8.set(25);
      dbRefOutput9.set(25);
      firstTime.style.display = 'block';
      secondTime.style.display = 'block';
      thirdTime.style.display = 'block';
      fourthTime.style.display = 'none';
      numTimes--;
      enterTime.style.display = 'block';
    }

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}