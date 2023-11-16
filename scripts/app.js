"use strict";

window.onload = () => {
    //input variables
    const clearDisplay = document.getElementById('myParks');
    const clearParkList = document.getElementById('nationalParks')
    const searchType = document.getElementById('searchType');
    const displayLocations = document.getElementById('stateSearch');
    const displayParkType = document.getElementById('parkTypeSearch');
    const displayNationalParks = document.getElementById('nationalParks');

    // onchange event for search type
    searchType.onchange = () => {

        displayLocations.style.display = 'none';
        displayParkType.style.display = 'none';
        
        clearDisplay.innerHTML = '';
        
        // checks searchtype value to display location or park type dropdown 
        if (searchType.value === 'locations') {
            displayLocations.style.display = 'block';
            displayNationalParks.style.display = 'block'
            addLocationsToDropdown();
        } else if (searchType.value === 'parkType') {
            displayParkType.style.display = 'block'
            displayNationalParks.style.display = 'block'
            addParkTypesDropdown();
        }
    };
    
    // onchange event everytime user picks a new state
    const locationList = document.getElementById('states');
    locationList.onchange = () => {
        clearParkList.innerHTML = '';
        clearDisplay.innerHTML = '';
        updateParksOnLocationSelect();
    }
    const locationBtn = document.getElementById('locationBtn');
    locationBtn.onclick = () => {
        searchLocation();

    }

    const parktypeList = document.getElementById('parktype')
    parktypeList.onchange = () => {
        clearParkList.innerHTML = '';
        clearDisplay.innerHTML = '';
        updateParksOnTypeSelect();
    }
    const parktypeBtn = document.getElementById('parktypeBtn');
    parktypeBtn.onclick = () => {
        searchByParkType();
    }

    const parkNames = document.getElementById('nationalParks');
    parkNames.onchange = () => {
        clearDisplay.innerHTML = ''
        displaySelectedParkName();
    }

    //load nationalparks
    addNationalParkDropdown();
};
// ** functions to load dropdowns ** //
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
    parkTypesArray.forEach((parkType) => {

        let optionParkTypes = new Option(parkType, parkType)

        parkTypesList.appendChild(optionParkTypes)
    });
};

function addNationalParkDropdown() {

    const nationalParkList = document.getElementById('nationalParks');

    nationalParksArray.forEach(function (element) {

        let optionParkNames = new Option(element.LocationName, element.State);

        nationalParkList.appendChild(optionParkNames);
    })
}
// ** END OF LOADING ** //

function findPark() {
    const selectedParkName = document.getElementById('nationalParks').value;

    const foundParkName = nationalParksArray.find((mountain) => mountain.State.includes(selectedParkName));

    return foundParkName;
}

function displaySelectedParkName() {

    const park = findPark();

    document.getElementById('myParks').innerHTML = `
    <div class="card border shadow" style="width: 18rem; margin: 5px;">
    <div class="card-body">
    <h5 class="card-title"><strong> ${park.LocationName}</strong></h5>
    <p class="card-text"> ${park.Address}</p>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>City:</strong> ${park.City}</li>
    <li class="list-group-item"><strong>State:</strong> ${park.State}</li>
    <li class="list-group-item"><strong>Phone:</strong> ${park.Phone}</li>
    </ul>
</div>`
}

function parksOnStateSelect() {

    const statesValue = document.getElementById('states').value;
    // loops thru every element that includes to check if statesValue in object.State is true;
    const filteredParkData = nationalParksArray.filter((key) => key.State.includes(statesValue));

    return filteredParkData; // output: new array of objects that passed the condition
}

// function used to update available park names every time state changes
function updateParksOnLocationSelect() {
    const stateSelectValue = document.getElementById('states').value;
    const nationalParksList = document.getElementById('nationalParks');
    // grab the new parks array and store in variable to loop 
    const filteredParks = parksOnStateSelect();

    // appends a new option of every locationName
    filteredParks.forEach((element) => {
        if (stateSelectValue === element.State) {
            let updatedOptions = new Option(element.LocationName, element.State)
            nationalParksList.appendChild(updatedOptions);
        }
    })
}

function getParkNamesByType() {
    const parktypeValue = document.getElementById('parktype').value;
    const lowerParkType = parktypeValue.toLowerCase();
 
    const newParkNames = nationalParksArray.filter((element) => element.LocationName.toLowerCase().includes(lowerParkType)); 
    return newParkNames;
};


function updateParksOnTypeSelect() {
    const nationalParksList = document.getElementById('nationalParks');
    const parktypeNames = getParkNamesByType();

    parktypeNames.forEach((element) => {

        let parkNameOptions = new Option(element.LocationName, element.State)
        nationalParksList.appendChild(parkNameOptions)
    })
};

function searchByParkType() {

    const filteredParks = getParkNamesByType();

    //* Displays when search By Location button is clicked:
    let message = `<h1 class="text-center mt-2" style="font-size: 1rem"><strong><em>${filteredParks.length} National Park to visit...</em></strong></h1><br><br>`;
    
    message += filteredParks.map(displayParks).join("");
    
    document.getElementById("myParks").innerHTML = message;

}

function searchLocation() {
    const filteredParks = parksOnStateSelect();
    //* Displays when search By Location button is clicked:
    let message = `<h1 class="text-center mt-2" style="font-size: 1rem"><strong><em>${filteredParks.length} National Park to visit...</em></strong></h1><br><br>`;
  
    message += filteredParks.map(displayParks).join("");
  
    document.getElementById("myParks").innerHTML = message;
  }
  
  function displayParks(park) {
    return `
        <div class="card border shadow" style="width: 18rem; margin: 15px;">
        <div class="card-body">
        <h5 class="card-title"><strong> ${park.LocationName}</strong></h5>
        <p class="card-text"> ${park.Address}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>City:</strong> ${park.City}</li>
        <li class="list-group-item"><strong>State:</strong> ${park.State}</li>
        <li class="list-group-item"><strong>Latitude</strong> ${park.Latitude}</li>
        <li class="list-group-item"><strong>Longitude</strong> ${park.Longitude}</li>
        </ul>
    </div>
`;

}

