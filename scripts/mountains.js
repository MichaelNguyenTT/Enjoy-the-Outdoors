'use strict'

window.onload = () => {
  displayAllMountains();
  loadMountainList();
  
  const displayBtn = document.getElementById('displayMountainsBtn');
  displayBtn.onclick = () => {
    displayMountainInfo();
  }
    
  const onMountainSelect = document.getElementById('mountain');
  onMountainSelect.onchange = () => {
    displayMountainInfo();
  }
}

function loadMountainList() {
  const mountainSelect = document.getElementById('mountain');

  const preSelect = document.getElementById('mountain');
  preSelect.appendChild(new Option('Choose A Mountain..', null));

  mountainsArray.forEach((item) => {
    let mountainOptions = new Option(item.name, item.name);
    mountainSelect.appendChild(mountainOptions);
  })
};

function getMountainInfo() {

  const mountainSelect = document.getElementById('mountain').value;
  const findMountain = mountainsArray.find((item) => item.name.includes(mountainSelect));

  return findMountain;
};

function displayAllMountains() {
  let displayMountains = ''

  mountainsArray.forEach((mountain) => {
    
    displayMountains += `
    <div class="card" style="width: 15rem; margin: 15px;">
    <img src="/images/${mountain.img}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${mountain.name}</h5>
    <p class="card-text">${mountain.desc}</p>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Elevation:</strong> ${mountain.elevation}</li>
    <li class="list-group-item"><strong>Effort:</strong> <em>${mountain.effort}</em></li>
    <li class="list-group-item">
    <strong>Latitude:</strong> ${mountain.coords.lat} <strong>Longitude:</strong> ${mountain.coords.lng}</li>
    </ul>
    </div>`
  })

  const mountainCards = document.getElementById('displayAllMountains');
  mountainCards.innerHTML = displayMountains;
}


function displayMountainInfo() {
  const mountainValue = document.getElementById('mountain').value;
  const getMountain = getMountainInfo();

  if (mountainValue === null) {
      return;
  } else {
    document.getElementById('mountains').innerHTML =
    `
    <div class="modal fade" id="mountainModal" tabindex="-1" aria-labelledby="mountainModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      <img src="/images/${getMountain.img}" class="card-img-top" alt="...">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="mountainModalLabel">${getMountain.name}</h1>
        </div>
        <div class="modal-body">
          <p>${getMountain.desc}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Elevation:</strong> ${getMountain.elevation}</li>
            <li class="list-group-item"><strong>Effort:</strong> <em>${getMountain.effort}</em></li>
            <li class="list-group-item">
            Latitude: ${getMountain.coords.lat} Longitude: ${getMountain.coords.lng}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    `
  }
};
