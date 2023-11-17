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
            addLocationsToDropdown();
        } else if (searchType.value === 'parkType') {
            displayParkType.style.display = 'block'
            addParkTypesDropdown();
        }
    };

    // onchange/onclick event everytime user picks a new state
    const locationList = document.getElementById('states');
    locationList.onchange = () => {
        clearParkList.innerHTML = '';
        clearDisplay.innerHTML = '';
        displayNationalParks.style.display = 'none'
    }
    const locationBtn = document.getElementById('locationBtn');
    locationBtn.onclick = () => {
        displayNationalParks.style.display = 'block'
        updateParksOnLocationSelect();
        searchLocation();

    }
    // onchange/onclick event for park types
    const parktypeList = document.getElementById('parktype')
    parktypeList.onchange = () => {
        clearParkList.innerHTML = '';
        clearDisplay.innerHTML = '';
        displayNationalParks.style.display = 'none'
    }
    const parktypeBtn = document.getElementById('parktypeBtn');
    parktypeBtn.onclick = () => {
        displayNationalParks.style.display = 'block'
        updateParksOnTypeSelect();
        searchByParkType();
    }
    // onchange event for when user selects a new park name
    const onParkChange = document.getElementById('nationalParks');
    onParkChange.onchange = () => {
        clearDisplay.innerHTML = ''
        displaySelectedParkName();
    }
    // when user clicks clear filter it will revert back to the original state
    const clearSearch = document.getElementById('clearSearchBtn');
    clearSearch.onclick = () => {
        clearAllFilters();
    }

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
//* end of loading dropdowns */


//* loops over nationalparksarray to check if object.state contains the state value */
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
            let updatedOptions = new Option(element.LocationName, element.LocationName)
            nationalParksList.appendChild(updatedOptions);
        }
    })
}

//* getParkNamesByType() loops over nationalParksArray with toLowerCase() method and returns new array with passed conditions  */
function getParkNamesByType() {
    const parktypeValue = document.getElementById('parktype').value;
    const lowerParkType = parktypeValue.toLowerCase();
    
    const newParkNames = nationalParksArray.filter((element) => element.LocationName.toLowerCase().includes(lowerParkType)); 
    
    return newParkNames;
};

//* updateParksOnTypeSelect() grabs the getParkNamesByType() array and appends new options to the parkNameList */
function updateParksOnTypeSelect() {
    const nationalParksList = document.getElementById('nationalParks');
    const parktypeNames = getParkNamesByType();
    
    parktypeNames.forEach((element) => {
        
        let parkNameOptions = new Option(element.LocationName, element.LocationName)
        nationalParksList.appendChild(parkNameOptions)
    })
};


function clearAllFilters() {

    const clearOutput = document.getElementById('myParks');
    const clearParkList = document.getElementById('nationalParks')
    const displayLocations = document.getElementById('stateSearch');
    const displayParkType = document.getElementById('parkTypeSearch');
    const displayNationalParks = document.getElementById('nationalParks');

    clearOutput.innerHTML = ''; 
    clearParkList.innerHTML = ''; 
    displayLocations.style.display = 'none';
    displayParkType.style.display = 'none';
    displayNationalParks.style.display = 'none';

    searchType.value = ''; 

};

function displaySelectedParkName() {

    const getParkName = document.getElementById('nationalParks').value;

    nationalParksArray.forEach((park) => {
        if (park.LocationName === getParkName) {
            document.getElementById('myParks').innerHTML = `
            <div class="card border shadow" style="width: 18rem; margin: 5px;">
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
        </div>`
        }
        else {
            return;
        }
    })
}
  
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

