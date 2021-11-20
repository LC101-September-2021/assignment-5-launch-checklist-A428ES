// Write your JavaScript code here!
window.addEventListener("load", function() {
    let formSubmit = document.querySelector("form");

    formSubmit.addEventListener("submit", function(event) {
        let stopSubmit = false; // for stopping form submission

        // put all form inputs in an array for mapping, and access
        let formArray = [formSubmit.pilotName.value, formSubmit.copilotName.value, formSubmit.fuelLevel.value, formSubmit.cargoMass.value]; 

        // run all inputs through validate 
        validArray = formArray.map(x => validateInput(x)); 

        // if Empty is located end the submission
        if(validArray.includes("Empty")){
            alert("All inputs are required!");

            stopSubmit = true;
        } else { 
            // if string requirements are not met, flag to end submit and alert user
            if(validArray[0] !== "Not a Number" || validArray[1] !== "Not a Number"){
                alert("Pilot and Co-Pilot entires must be a string.");

                stopSubmit = true;
            }

            // if numerical requirements are not met, flag to end submit and alert user
            if(validArray[2] !== "Is a Number" || validArray[2] !== "Is a Number"){
                alert("Fuel Level and Cargo Mass must be numbers.");

                stopSubmit = true;
            }
        }

        // if the stopSubmit flag has been raised, terminate the submission
        if(stopSubmit !== true){
			event.preventDefault();
			
            formSubmission(document, document.getElementById("faultyItems"), formArray[0], formArray[1], formArray[2], formArray[3]);
			
			 event.preventDefault();
        }

        event.preventDefault();
    });
    

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch().then();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        let thePlanet = listedPlanets[pickPlanet(listedPlanets)];
/*      "name": "Tatooine",
       "diameter": "10465 km",
       "star": "Tatoo I & Tatoo II",
       "distance": "43000 light years from galactic core",
       "image": "https://www.nasa.gov/sites/default/files/images/587837main_Kepler16_transit_art2_full.jpg",
       "moons": 3*/
        addDestinationInfo(document, thePlanet.name, thePlanet.diameter, thePlanet.star, thePlanet.distance, thePlanet.moons, thePlanet.image);
    })

});