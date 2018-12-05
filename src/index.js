document.addEventListener('DOMContentLoaded', () => {


  // DOM Elements
  const apartmentDiv = document.getElementById("apartment-div")
    // console.log(apartmentDiv);
  const showDiv = document.getElementById("show-div")
console.log(showDiv);

  // Variables
  const endPoint = 'http://localhost:3000/api/v1/apartments'

  let dataStore = []

  // Fetches and Event Listeners
  fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      dataStore = json
      // console.log(dataStore);
      apartmentDiv.innerHTML = showApartment(dataStore)
    });

    // console.log(dataStore);

    // HELPERS
    function showApartment(dataStore) {
      return dataStore.map((apt) => {
        return `<center><h1>${apt.name}</h1>
        <label>Address: </label>
        <span>${apt.address}</span><br><br>
        <button id='landlord-button'>Landlord Information</button>
        <button id='necessities-button'>Things We Need</button>`
      }).join('')
    }



    document.addEventListener('click', (event) => {
      showDiv.innerHTML = ""
      if(event.target.id === 'landlord-button') {
        let landlordInfo =
        `<p>Our landlord is ${dataStore[0].landlord_name}</p>
        <p> Phone Number: ${dataStore[0].landlord_contact}</p>`
        showDiv.innerHTML = landlordInfo
      }//if event for landlord button
      else if(event.target.id === 'necessities-button'){
        console.log('yerrrr');
        let necArray = Array.from(dataStore[0].necessities)
        let necJoin = necArray.split("")
        console.log(necJoin);
        // necArray.forEach((nec) => {
        //   showDiv.innerHTML = `We need ${nec}`
        // })
        // let necInfo =
        // `We need ${dataStore[0].necessities.split()}`
      }//end of else if
    })//end of click event listener







}) // end DOMContentLoaded
