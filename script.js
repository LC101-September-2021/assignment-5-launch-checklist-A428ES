// Write your JavaScript code here!
window.addEventListener("load", event => {
    document.getElementById("faultyItems").style.visibility = "hidden";
	let formSubmit = document.querySelector("form");
    
	formSubmit.addEventListener("submit", event => {
        let stopSubmit = false; // for stopping form submission

        // put all form inputs in an array for mapping, and access
        let formArray = [formSubmit.querySelector("input[name=pilotName]").value, formSubmit.querySelector("input[name=copilotName]").value, formSubmit.querySelector("input[name=fuelLevel]").value, formSubmit.querySelector("input[name=cargoMass]").value]; 

        // run all inputs through validate 
        let validArray = formArray.map(x => validateInput(x)); 

        // if Empty is located end the submission
        if(validArray.includes("Empty")){
            alert("All inputs are required!");

            stopSubmit = true;
        } else { 
            // if string requirements are not met, flag to end submit and alert user
            if(validArray[0] !== "Not a Number" || validArray[1] !== "Not a Number"){
                alert("Pilot and Co-Pilot entries must be a string.");

                stopSubmit = true;
            }

            // if numerical requirements are not met, flag to end submit and alert user
            if(validArray[2] !== "Is a Number" || validArray[3] !== "Is a Number"){
                alert("Fuel Level and Cargo Mass must be numbers.");

                stopSubmit = true;
            }
        }
        
        if(stopSubmit !== true){
            let list = document.getElementById("faultyItems");
            formSubmission(window.document, list, formArray[0], formArray[1], formArray[2], formArray[3]);
        }
		
		event.preventDefault();
    });
    

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        let thePlanet = pickPlanet(listedPlanets);
		
        addDestinationInfo(document, thePlanet.name, thePlanet.diameter, thePlanet.star, thePlanet.distance, thePlanet.moons, thePlanet.image);
    })

});
