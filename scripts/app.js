"use strict";

window.onload = () => {
    //input variables
    const clearDisplay = document.getElementById('myParks');
    const clearParkList = document.getElementById('nationalParks')
    const searchType = document.getElementById('searchType');

    searchType.onchange = () => {
        const displayLocations = document.getElementById('stateSearch');
        const displayParkType = document.getElementById('parkTypeSearch');
        const displayNationalParks = document.getElementById('nationalParks');
        displayLocations.style.display = 'none';
        displayParkType.style.display = 'none';
        
        clearDisplay.innerHTML = '';
        
        const preSelectLocation = document.getElementById('states');
        preSelectLocation.appendChild(new Option('Choose A Location', ''))
    
        const preSelectParkType = document.getElementById('parktype');
        preSelectParkType.appendChild(new Option('Choose Park Type', ''))

        if (searchType.value === 'state') {
            displayLocations.style.display = 'block';
            displayNationalParks.style.display = 'block'
            addLocationsToDropdown();
        } else if (searchType.value === 'parkType') {
            displayParkType.style.display = 'block'
            displayNationalParks.style.display = 'block'
            addParkTypesDropdown();
        }
    };
    
    
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

    //load nationalparks
    addNationalParkDropdown();
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

//TODO function => get the users value from states and use filter method to output 
//TODO the national parks that contain the value 

function parksOnStateSelect() {

    const statesValue = document.getElementById('states').value;
    const filteredParkData = nationalParksArray.filter((key) => key.State.includes(statesValue));

    return filteredParkData;
}

function updateParksOnLocationSelect() {
    const stateSelectValue = document.getElementById('states').value;
    const nationalParksList = document.getElementById('nationalParks');
    const filteredParks = parksOnStateSelect();

    filteredParks.forEach((element) => {
        if (stateSelectValue === element.State) {
            let updatedOptions = new Option(element.LocationName, element.State)
            nationalParksList.appendChild(updatedOptions);
        }
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
    let message = `${filteredParks.length} National Park to visit</h1><br><br>`;
    
    message += filteredParks.map(displayParks).join("");
    
    document.getElementById("myParks").innerHTML = message;

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
          <div class="card" style="width: 18rem; margin: 10px;">
          <img src="${park.Image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${park.LocationName}</h5>
              <p class="card-text">${park.State}.</p>
          </div>
          </div>
          `;
  }
  