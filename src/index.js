document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements
  const apartmentDiv = document.getElementById("apartment-div")
  const aptStuff = document.getElementById('apt-stuff')
  const roommates = document.getElementById('roommates-div')
  const formDiv = document.getElementById("form-div")
  const apartmentNav = document.getElementById("apartment-nav")
  const appDOM = document.getElementById('app-dom')
  const background = document.getElementById('background-wallpaper')

  // Variables
  const endPoint = 'http://localhost:3000/api/v1/apartments'
  let dataStore = [];
  let apartmentInfo = []
  let users= [];





  // Fetches and Event Listeners
  fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      dataStore = json
      console.log(dataStore);
      // apartmentDiv.innerHTML = showApartment(dataStore)
      // roommates.innerHTML = x.join('')
      users = dataStore[0].users
      apartmentInfo = dataStore[0]
      console.log(apartmentInfo);
      appDOM.innerHTML = showLanding()
      background.innerHTML += showVideo()
    });


    // HELPERS

    function showNavBar(){
      return `<ul class="navbar">
        <li id="dropdown">
          <a id="new-chore-btn" href="#">Chores</a>
        </li>
        <div id="apartment-nav">
        <li><a id="bills-button" href="#">Bills</a></li>
        <li><a id="events-button" href="#">Events</a></li>
        <li><a id="landlord-button" href="#">Landlord Info</a></li>
        </div>
        <div id="room8-logo">
          <li style="float:right">
            <a class="active" href="#">
              room8
            </a>
          </li>
          </div>
      </ul>`
    }

    function showLanding(){
      return `<div id="landing-div">
              <p>Welcome to room8</p>
              <form>
              <input type="login" placeholder="Username"/>
              <br/>
              <input type="login" placeholder="Password"/>
              <br/><br/>
              <button class="button" id="login-button"><span>Login </span></button>
              </form>
              </div>`
    }

    function showPostLanding(){
      return `<div class="post-landing">
              <h1>hello</h1>
              </div>`
    }

    function showAppDOM(){
      return `<div id="navigation-bar">
              </div>

              <div class="app-grid">

              <div id="show-div">

              </div>

              <div id="form-div" >
              </div>

             </div>`
    }

    function showApartmentInfo(value){
      return `<li>
                <div style="float:right">
                  <a id="apartment-address">
                    ${value}
                  </a>
                </div>
              </li>`
    }

    function showRoommates(users) {
      return users.map((user) => {
        return `<p uk-margin>
                  <center>
                  <button
                  class="user-button"
                  data-id=${user.id}
                  id='name-button'>
                  ${user.name}
                  </button>
                  </center>
                  </p>
                  <br>`
      })
    }

    function showVideo(){
      return `<video autoplay loop id="video-background" muted plays-inline>
        <source src="http://video2.ignitemotion.com/files/mp4/RetroMove.mp4" type="video/mp4">
      </video>`
    }



    document.addEventListener('click', (event) => {

      let billObjects = dataStore[0].bills
      let userObjects = dataStore[0].users

      // Landing Page Submit
      if(event.target.id == 'login-button'){
        event.preventDefault();
        console.log('lalalala');
        users = dataStore[0].users
        apartmentInfo = dataStore[0]
        appDOM.innerHTML = showAppDOM()
        let showDiv = document.getElementById('show-div')
        const navigationBar = document.getElementById('navigation-bar')
        const navList = document.getElementById('apartment-nav')

        
        showDiv.innerHTML = showPostLanding()
        navigationBar.innerHTML = showNavBar()
        navList.innerHTML += showApartmentInfo(apartmentInfo.address)
      }

      //Nav-Landlord
      else if(event.target.id === 'landlord-button') {
        console.log('yerr');
        let showDiv = document.getElementById('show-div')
        let landlordInfo =
        `<br><br>
        <div>
        <div class=''>
        <p>Our landlord is: <h4>${dataStore[0].landlord_name}</h4></p>
        <p> Phone Number: ${dataStore[0].landlord_contact}</p>
        <span class= ".uk-text-primary">Great Building Management</span>
        </div>
        </div>`
        showDiv.innerHTML = landlordInfo
      }

      //Nav-Necessities
      else if(event.target.id === 'necessities-button'){
        let necInfo =
        `<p>We need to buy ${dataStore[0].necessities}</p>`
        showDiv.innerHTML = necInfo
      }//end of else


      else if(event.target.id === 'bills-button'){
        let showDiv = document.getElementById('show-div')
        showDiv.innerHTML = `<table class="bills-table">
          <table style="width:100%">
          <tr>
            <th>Type</th>
            <th>Amount ($)</th>
        </tr>
        <tbody>
        <tr>
            <td id="bill-${billObjects[0].id}">${billObjects[0].name}</td>
            <td id="amt-${billObjects[0].id}">$${billObjects[0].amount}</td>
            <td><button id=${billObjects[0].id} class="bill-button">Edit</button></td>
        </tr>
        <tr>
          <td id="bill-${billObjects[1].id}">${billObjects[1].name}</td>
          <td id="amt-${billObjects[1].id}">$${billObjects[1].amount}</td>
            <td><button id=${billObjects[1].id} class="bill-button">Edit</button></td>
        </tr>
        <tr>
          <td id="bill-${billObjects[2].id}">${billObjects[2].name}</td>
          <td id="amt-${billObjects[2].id}">$${billObjects[2].amount}</td>
          <td><button id=${billObjects[2].id} class="bill-button">Edit</button></td>
        </tr>
    </tbody>
</table>
<br>
<h3>Bill Calculator</h3>
<form id='bill-calc-form'><br>
<label>$</label>
<input type="text" name="amount" id="amount-input" placeholder="1200">
<label>Number of Roommates</label>
<input type="text" name="number-of-roommates" id="roommmate-input" placeholder="4">
<button id='calculate' class='uk-button-primary'>Calculate Money Owed per Person </button><center>
<br>
<center><input type="text" name="answer" id="answer-input" placeholder="300">
<label>Owed Per Person</label></center>
</form>`

      }
      else if(event.target.id === 'name-button'){
        let showDiv = document.getElementById('show-div')
        let clickedUserId = parseInt(event.target.dataset.id)
        let selectedUser = userObjects.find((user) => { return user.id === clickedUserId})
        showDiv.innerHTML = `<div class="user-grid" align="center">
        <div id='image-profile-pic'>
        <div id=''>
        <img width="300" src=${selectedUser.image}>
        </div>

        <h1>${selectedUser.name}</h1><br>
        <label>Visitors:</label>
        <span>${selectedUser.associates}</span>
        </div>

        </div>`
    }//end of elseif for username
    else if(event.target.id === 'chores-button') {
      let choresString = dataStore[0].chores
      let showDiv = document.getElementById('show-div')
      let choresArray = choresString.split(',')
      let choreTags = choresArray.map((chore) => {
        return `<li>${chore}</li>`
      }).join('')
      showDiv.innerHTML = `<ul id='chore-list'>${choreTags}</ul>`
    }//end of elseif for chores-button
      else if (event.target.id === 'new-chore-btn') {
        let showDiv = document.getElementById('show-div')
        let choresString = dataStore[0].chores
        let choresArray = choresString.split(', ')
        let choreTags = choresArray.map((chore) => {
          return `<li>${chore}</li><br/>`
        }).join('')
        let form = `<br><br><br><div id='new-form-div'><center>
        <form id='new-chore-form'>New Chore:<br>
        <input autocomplete="off" type="text" name="chore" id="chore-input">
        <button id='new-chore' class='uk-button-primary'>Add Chore </button><center>
        </form>
        </div>
        <div id='all-chores'>
        <ul id='chore-list'>
          <li>${choreTags}</li>
        </ul>
        </div><br>`
        showDiv.innerHTML = form
        let newChoreForm = document.getElementById('new-chore-form')
        newChoreForm.addEventListener('submit', (e) => {
          e.preventDefault()
          let newChore = document.getElementById('chore-input').value // getting value of new chore
          let choreList = document.getElementById('chore-list')
          choreList.innerHTML += `<li>${newChore}</li>`
          let sendToServer = dataStore[0].chores + ', ' + newChore
          // update the data store
          dataStore[0].chores = sendToServer

          // Now POST to back end to persist new chore
          fetch('http://localhost:3000/api/v1/apartments/1', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              "chores": sendToServer
            })
          })
          e.target.reset()
        })

    }//end of new chore form button
    else if (event.target.id === 'events-button') {
      // billsEditForm.hidden = true
      let showDiv = document.getElementById('show-div')
      let eventsString = dataStore[0].events
      let eventsArray = eventsString.split(', ')
      let eventsTags = eventsArray.map((event) => {
        return `<ul id="event-list">
                <li>${event}</li>
                </ul>`
      }).join('')
        // want to show a calendar
        showDiv.innerHTML = `<form id="new-event-form">
        <input autocomplete="off" id="event-input" type="text" placeholder="event...">
        <button id="new-event-button">Add A New Event</button>
        </form>`
        let eventInput = document.getElementById('event-input')
        showDiv.innerHTML += `<ul id='event-list'>
        ${eventsTags}
        </ul>`
      let newEventForm = document.getElementById('new-event-form')
      showDiv.addEventListener('click', (event) => {
        event.preventDefault()
        if(event.target.id === 'new-event-button') {
          showDiv.innerHTML += `<ul><li>${event.target.parentElement.querySelector('input').value}</li></ul>`
          let sendToServer = dataStore[0].events + ', ' + event.target.parentElement.querySelector('input').value
          dataStore[0].events = sendToServer
          fetch('http://localhost:3000/api/v1/apartments/1', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              "events": sendToServer
            })
          })
        }
      })

    }//end of else if for new event

  })//end of click event listener


  // click event on bill edit button
  showDiv.addEventListener('click', (e) => {
    if (e.target.innerText === 'EDIT') {
      formDiv.innerHTML = `<form id="bills-edit-form" method="post">
        <label for="">Type:</label>
        <input id="bill-type" type="text" name="" placeholder="type of bill...">
        <label for="">Amount:</label>
        <input id="bill-amount" name="" placeholder="amount...">
        <button>Update Bill</button>
      </form>`
      let clickedBillID = e.target.id
      formDiv.dataset.id = e.target.id
      // pre fill edit form
      document.getElementById('bill-type').value = document.getElementById(`bill-${clickedBillID}`).innerText
      document.getElementById('bill-amount').value = document.getElementById(`amt-${clickedBillID}`).innerText
    }
    const billsEditForm = document.getElementById("bills-edit-form")
    billsEditForm.addEventListener('submit', e => {
      e.preventDefault()
      // formDiv.dataset.id is the id of the bill we're patching to
      let newType = document.getElementById('bill-type').value
      let newAmt = document.getElementById('bill-amount').value
      let foundBill = dataStore[0].bills.find((bill) => {
        return bill.id == formDiv.dataset.id
      })
      foundBill.name = newType
      foundBill.amount = newAmt
      fetch(`http://localhost:3000/api/v1/bills/${formDiv.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', Accept: 'application/json'
        },
        body: JSON.stringify({
          "name": newType,
          "amount": newAmt
        })
      })
      .then(r => r.json())
      .then(updatedBillObject => {
        document.getElementById(`bill-${formDiv.dataset.id}`).innerText = updatedBillObject.name
        document.getElementById(`amt-${formDiv.dataset.id}`).innerText = updatedBillObject.amount
      })
    })
  })

  showDiv.addEventListener('click', (event) => {
    if(event.target.id === 'calculate'){
      event.preventDefault()
      console.log('yerr');
      let roommateAmount = parseInt(event.target.parentElement.querySelector('#roommmate-input').value)
      let billAmount = parseInt(event.target.parentElement.querySelector('#amount-input').value)
      console.log(roommateAmount, billAmount);
      let amountOwed = event.target.parentElement.querySelector('#answer-input')
      amountOwed.value = billAmount / roommateAmount

    }
  })




}) // end DOMContentLoaded
