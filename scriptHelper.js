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
 

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let issueDetected = false;
    let launchStat = document.getElementById("launchStatus");
    list.querySelector("#fuelStatus").style.color = 'green';
    list.querySelector("#cargoStatus").style.color = 'green';
    
    if(fuelLevel < 10000){
        list.querySelector("#fuelStatus").innerHTML = "Fuel level too low";
        list.querySelector("#fuelStatus").style.color = 'red';
        issueDetected = true;
    }
    
    if(cargoLevel > 10000){
        list.querySelector("#cargoStatus").innerHTML = "Cargo level too high";
        list.querySelector("#cargoStatus").style.color = 'red';
        issueDetected = true;
    }
    
    if(issueDetected === true){
        launchStat.innerHTML = "Shuttle is Not Ready for launch";
        list.style.visibility = "visible";
    } else {
        launchStat.innerHTML = "Shuttle is Ready for launch";
        list.style.visibility = "hidden";
    }

    list.querySelector("#pilotStatus").innerHTML.innerHTML = `Pilot ${pilot} is ready for launch.`;
    list.querySelector("#copilotStatus").innerHTML.innerHTML = `Co-pilot ${copilot} is ready for launch`;
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