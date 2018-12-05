document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const apartmentDiv = document.getElementById("apartment-div")
  const showDiv = document.getElementById("show-div")
  const aptStuff = document.getElementById('apt-stuff')
  const roommates = document.getElementById('roommates-div')
  console.log(roommates);

  // Variables
  const endPoint = 'http://localhost:3000/api/v1/apartments'
  let dataStore = []
  let users= [];


  // Fetches and Event Listeners
  fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      dataStore = json
      // console.log(dataStore);
      apartmentDiv.innerHTML = showApartment(dataStore)
      // roommates.innerHTML = x.join('')
      users = dataStore[0].users
      console.log(users);
      roommates.innerHTML = showRoommates(users).join(' ')

    });


    // HELPERS
    function showApartment(dataStore) {
      return dataStore.map((apt) => {
        return `<center><div id="apt-stuff">
        <h1>${apt.name}</h1>
        <img src='https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=673&q=80>'<br>
        <br><label>Address: </label>
        <span>${apt.address}</span><br><br></div></center>`
      }).join('')
    }//end of showApartment

    function showRoommates(users) {
      return users.map((user) => {
        return `<center><span>${user.name}</span><br><br><center>`
      })
    }
    //
    // function showBills(billObjects) {
    //   return billObjects.map((bill) => {
    //     return
    //     `<p>${bill.name}</p>
    //     <p>${bill.amount}</p>`
    //   })
    // }

    document.addEventListener('click', (event) => {
      // debugger
      let billObjects = dataStore[0].bills
      console.log(billObjects);
      showDiv.innerHTML = ""
      if(event.target.id === 'landlord-button') {
        let landlordInfo =
        `<p>Our landlord is ${dataStore[0].landlord_name}</p>
        <p> Phone Number: ${dataStore[0].landlord_contact}</p>`
        showDiv.innerHTML = landlordInfo
      }//if event for landlord button
      else if(event.target.id === 'necessities-button'){
        let necInfo =
        `<p>We need to buy ${dataStore[0].necessities}</p>`
        showDiv.innerHTML = necInfo
      }//end of else
      else if(event.target.id === 'bills-button'){
        let billTags = billObjects.map((bill) => {
          return `<p>${bill.name}</p>
          <p>${bill.amount}</p>
          <img src=${bill.image}>`
        }).join('')

        showDiv.innerHTML = billTags
      }
    })//end of click event listener







}) // end DOMContentLoaded
