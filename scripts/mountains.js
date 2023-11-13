'use strict'

window.onload = () => {

  const displayBtn = document.getElementById('displayMountainsBtn');
  displayBtn.onclick = () => {
    displayMountainInfo();
  }

  const onMountainSelect = document.getElementById('mountain');
  onMountainSelect.onchange = () => {
    document.getElementById('mountains').innerHTML = ''

  }
  loadMountainList();
}

function loadMountainList() {
  const mountainSelect = document.getElementById('mountain');

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


function displayMountainInfo() {

  const getMountain = getMountainInfo();

  document.getElementById('mountains').innerHTML = `
  <div class="card" style="width: 18rem;">
  <img src="/images/${getMountain.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${getMountain.name}</h5>
    <p class="card-text">${getMountain.desc}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Elevation: ${getMountain.elevation}</li>
    <li class="list-group-item">Effort: ${getMountain.effort}</li>
    <li class="list-group-item">Coordinates:\n 
    Latitude: ${getMountain.coords.lat} Longitude: ${getMountain.coords.lng}</li>
  </ul>
</div>`
};















// async function getSunsetForMountain(lat, lng) {
//   let response = await fetch(
//     `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
//   );
//   let data = await response.json();
//   return data;
// }

// function loadData() {
//   var down = document.getElementById("mountain");
//   for (let i = 0; i < mountainsArray.length; i++) {
//     var optn = mountainsArray[i];
//     var el = document.createElement("option");
//     el.textContent = optn;
//     el.value = optn;
//     down.appendChild(el);
//   }
//   down.innerHTML = "Elements Added";
// }
