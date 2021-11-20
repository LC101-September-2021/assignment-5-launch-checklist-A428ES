// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missTarget = document.getElementById("missionTarget");

            missTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;

}

function validateInput(testInput) {
    // check if empty input, string status, and number status
    if(testInput !== '' && testInput !== null){
         if(isNaN(testInput)){
             return "Not a Number";
         } else {
             return "Is a Number";
         }
    } else {
        return "Empty";
    }
 }
 /*
    ISSUE SEEMS TO BE SCRIPT IS PULLING THE PREVIOUS INPUTS 
*/
 

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let issueDetected = false;

    let launchStat = document.getElementById("launchStatus");
    list.querySelector("#fuelStatus").style.color = 'rgb(65, 159, 106)';
    list.querySelector("#cargoStatus").style.color = 'rgb(65, 159, 106)';
    
    if(Number(fuelLevel) < 10000){
        list.querySelector("#fuelStatus").textContent = `Fuel level too low for launch`;
        list.querySelector("#fuelStatus").style.color = 'rgb(199, 37, 78)';
        issueDetected = true;
    } else {
        list.querySelector('#fuelStatus').innerHTML = 'Fuel level high enough for launch';
    }
    
    if(10000 < Number(cargoLevel)){
        list.querySelector("#cargoStatus").innerHTML = "Cargo mass too heavy for launch";
        list.querySelector("#cargoStatus").style.color = 'rgb(199, 37, 78)';
        issueDetected = true;
    } else {
        list.querySelector('#cargoStatus').innerHTML = 'Cargo mass low enough for launch';
    }

    list.style.visibility = "visible";
    if(issueDetected === true){
        launchStat.style.color = 'rgb(199, 37, 78)';
        launchStat.innerHTML = "Shuttle Not Ready for Launch";
    } else {
        launchStat.style.color = 'rgb(65, 159, 106)';
        launchStat.innerHTML = "Shuttle is Ready for Launch";
    }

    list.querySelector("#pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    list.querySelector("#copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
}

async function myFetch() {
    let planetsReturned;
 
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(response =>  {
         return response.json().then(json => {
             return json;
        })
    });
    
    return planetsReturned;
}

function pickPlanet(planets) {
    return Math.floor(Math.random() * planets.length);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
