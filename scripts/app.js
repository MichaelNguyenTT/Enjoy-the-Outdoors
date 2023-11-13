"use strict";

window.onload = () => {
    //Initialize the functions
    updateParksOnLocationSelect();
    const locationList = document.getElementById('states');
    locationList.onchange = () => {
        const clearDisplay = document.getElementById('myParks');
        clearDisplay.innerHTML = '';

        const clearParksList = document.getElementById('nationalParks');
        clearParksList.innerHTML = '';
        updateParksOnLocationSelect();
    }
    const locationBtn = document.getElementById('locationBtn');
    locationBtn.onclick = () => {
        searchLocation();
    }


    const parktypeBtn = document.getElementById('parktypeBtn');
    parktypeBtn.onclick = () => {
        searchByParkType();
    }
    const parktypeList = document.getElementById('parktype')
    parktypeList.onchange = () => {
        const clearDisplay = document.getElementById('myParks');
        clearDisplay.innerHTML = '';

        const clearParksList = document.getElementById('nationalParks');
        clearParksList.innerHTML = '';
        updateParksOnTypeSelect();
    }
    
    // Load the dropdowns
    addLocationsToDropdown();
    addParkTypesDropdown();

};

function addLocationsToDropdown() {
    // Get the dropdown element by its ID
    const statesList = document.getElementById("states");
    
    // Use forEach to iterate over the array
    locationsArray.forEach(function (location) {
        // Create a new option element
        let optionStates = document.createElement("option");
        
        // Set the value and text content for the new option
        optionStates.value = location;
        optionStates.textContent = location;
        
        // Add the new option to the dropdown
        statesList.appendChild(optionStates);
    });
};

function addParkTypesDropdown() {
    const parkTypesList = document.getElementById('parktype');
    parkTypesList.appendChild(new Option('Search for a Park Type', ''))

    parkTypesArray.forEach((parkType) => {

        let optionParkTypes = new Option(parkType, parkType)

        parkTypesList.appendChild(optionParkTypes)
    });
};

function addNationalParkDropdown() {

    const nationalParkList = document.getElementById('nationalParks');
    nationalParkList.appendChild(new Option('Search for a National Park'))

    nationalParksArray.forEach(function (element) {

        let optionParkNames = new Option(element.LocationName, element.State);

        nationalParkList.appendChild(optionParkNames);
    })
}

//TODO function => get the users value from states and use filter method to output 
//TODO the national parks that contain the value 

function parksOnStateSelect() {

    const statesValue = document.getElementById('states').value;
    const filteredParkData = nationalParksArray.filter((key) => key.State.includes(statesValue));

    return filteredParkData;
}

function updateParksOnLocationSelect() {

    const nationalParksList = document.getElementById('nationalParks');
    const filteredParks = parksOnStateSelect();

    filteredParks.forEach((element) => {
        let updatedOptions = new Option(element.LocationName, element.State)
        nationalParksList.appendChild(updatedOptions);
    })
}


//TODO function => get user park type value to loop thru all nationParksArray.locationName
//TODO using case strings and have it display the parks

function getParkNamesByType() {
    const parktypeValue = document.getElementById('parktype').value;
    const lowerParkType = parktypeValue.toLowerCase();
 
    const newParkNames = nationalParksArray.filter((element) => element.LocationName.toLowerCase().includes(lowerParkType)); 
    return newParkNames;
};


function updateParksOnTypeSelect() {
    const statesValue = document.getElementById('states').value;
    const nationalParksList = document.getElementById('nationalParks');
    const parktypeNames = getParkNamesByType();

    parktypeNames.forEach((element) => {
        if (statesValue === element.State) {
            let parkNameOptions = new Option(element.LocationName, element.State)
            nationalParksList.appendChild(parkNameOptions)
        } else {
            console.log('not found');
        }
    })
}

function searchByParkType() {
    const statesValue = document.getElementById('states').value;
    const filteredParks = getParkNamesByType();

    filteredParks.forEach((item) => {
        if (statesValue === item.State) {
            //* Displays when search By Location button is clicked:
            let message = `${filteredParks.length} National Park to visit</h1><br><br>`;
          
            message += filteredParks.map(displayParks).join("");
          
            document.getElementById("myParks").innerHTML = message;
        } 
    })
}

function searchLocation() {
    const filteredParks = parksOnStateSelect();
    //* Displays when search By Location button is clicked:
    let message = `${filteredParks.length} National Park to visit</h1><br><br>`;
  
    message += filteredParks.map(displayParks).join("");
  
    document.getElementById("myParks").innerHTML = message;
  }
  
  function displayParks(park) {
    return `
          <div class="card" style="width: 18rem;">
          <img src="${park.Image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${park.LocationName}</h5>
              <p class="card-text">${park.State}.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
          </div>`;
  }
  