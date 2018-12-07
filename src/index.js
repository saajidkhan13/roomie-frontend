document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const apartmentDiv = document.getElementById("apartment-div")
  const showDiv = document.getElementById("show-div")
  const aptStuff = document.getElementById('apt-stuff')
  const roommates = document.getElementById('roommates-div')
  const formDiv = document.getElementById("form-div")
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
      roommates.innerHTML += showRoommates(users).join(' ')

    });


    // HELPERS
    function showApartment(dataStore) {
      return dataStore.map((apt) => {
        return `<center><div data-id=${apt.id} id="apt-stuff">
        <span id="apt-name">${apt.name}</span><br><br>
        <br><label class="header-style">Address: </label>
        <span class="header-style">${apt.address}</span><br><br></div></center>`
      }).join('')
    }//end of showApartment

    function showRoommates(users) {
      return users.map((user) => {
        return `<p uk-margin><button class="uk-button uk-button-danger" data-id=${user.id} id='user-name'>${user.name}</button></p><br>`
      })
    }


    document.addEventListener('click', (event) => {

      let billObjects = dataStore[0].bills
      let userObjects = dataStore[0].users
      // showDiv.innerHTML = ""
      if(event.target.id === 'landlord-button') {
        let landlordInfo =
        `<br><br><div uk-grid>
        <div class='uk-width-1-3'>
        <p>Our landlord is: <h4>${dataStore[0].landlord_name}</h4></p>
        <p> Phone Number: ${dataStore[0].landlord_contact}</p>
        <span class= ".uk-text-primary">Great Building Management</span>
        </div>
        <div class="uk-width-1-3">
        <img src='http://blog.namava.ir/wp-content/uploads/2017/11/Rowan-Atkinson.jpg'>
        </div>
        </div>`
        showDiv.innerHTML = landlordInfo
      }//if event for landlord button
      else if(event.target.id === 'necessities-button'){
        let necInfo =
        `<p>We need to buy ${dataStore[0].necessities}</p>`
        showDiv.innerHTML = necInfo
      }//end of else
      else if(event.target.id === 'bills-button'){
        showDiv.innerHTML = `<table class="uk-table">
          <center><caption></caption><center>
          <thead>
          <tr>
            <th>Type</th>
            <th>Amount ($)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td id="bill-${billObjects[0].id}">${billObjects[0].name}</td>
            <td id="amt-${billObjects[0].id}">$${billObjects[0].amount}</td>
            <td><button id=${billObjects[0].id} class="uk-button uk-button-default uk-button-small">Edit</button></td>
        </tr>
        <tr>
          <td id="bill-${billObjects[1].id}">${billObjects[1].name}</td>
          <td id="amt-${billObjects[1].id}">$${billObjects[1].amount}</td>
            <td><button id=${billObjects[1].id} class="uk-button uk-button-default uk-button-small">Edit</button></td>
        </tr>
        <tr>
          <td id="bill-${billObjects[2].id}">${billObjects[2].name}</td>
          <td id="amt-${billObjects[2].id}">$${billObjects[2].amount}</td>
          <td><button id=${billObjects[2].id} class="uk-button uk-button-default uk-button-small">Edit</button></td>
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
      else if(event.target.id === 'user-name'){
        let clickedUserId = parseInt(event.target.dataset.id)
        let selectedUser = userObjects.find((user) => { return user.id === clickedUserId})
        showDiv.innerHTML = `<div uk-grid>
        <div id='name-and-visitors'
        <br><br><br><br>
        <h1>${selectedUser.name}</h1><br>
        <label>Visitors:</label>
        <span>${selectedUser.associates}</span>
        </div>

        <div id='image-profile-pic'>
        <br><br><br><br>
        <img width="100" src=${selectedUser.image}>
        </div>
        </div>`
    }//end of elseif for username
    else if(event.target.id === 'chores-button') {
      let choresString = dataStore[0].chores
      let choresArray = choresString.split(',')
      let choreTags = choresArray.map((chore) => {
        return `<li>${chore}</li>`
      }).join('')
      showDiv.innerHTML = `<ul id='chore-list'>${choreTags}</ul>`
    }//end of elseif for chores-button
      else if (event.target.id === 'new-chore-btn') {
        let choresString = dataStore[0].chores
        let choresArray = choresString.split(', ')
        let choreTags = choresArray.map((chore) => {
          return `<li>${chore}</li>`
        }).join('')
        let form = `<br><br><br><div id='new-form-div'><center>
        <form id='new-chore-form'>New Chore:<br>
        <input type="text" name="chore" id="chore-input">
        <button id='new-chore' class='uk-button-primary'>Add Chore </button><center>
        </form>
        </div>
        <div id='all-chores'>
        <ul id='chore-list'>${choreTags}</ul>
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
          fetch('http://localhost:3000/api/v1/apartments/33', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              "chores": sendToServer
            })
          })
          .then(response => response.json())
          .then(data => {
            apartmentDiv.innerHTML = showApartment(dataStore)
            // showDiv.innerHTML = `${dataStore[0].chores}`
          })
          e.target.reset()
        })
    }//end of new chore form button
    else if (event.target.id === 'events-button') {
      let eventsString = dataStore[0].events
      let eventsArray = eventsString.split(', ')
      let eventsTags = eventsArray.map((event) => {
        return `<li>${event}</li>`
      }).join('')
        // want to show a calendar
        showDiv.innerHTML = `<form id="new-event-form">
        <input id="event-input" type="text" placeholder="event...">
        <button id="new-event-button">Add A New Event</button>
        </form>`
        let eventInput = document.getElementById('event-input')
        showDiv.innerHTML += `<ul id='event-list'>
        <li>${eventsTags}</li>
        </ul>`
      let newEventForm = document.getElementById('new-event-form')
      showDiv.addEventListener('click', (event) => {
        event.preventDefault()
        if(event.target.id === 'new-event-button') {
          showDiv.innerHTML += `<ul><li>${event.target.parentElement.querySelector('input').value}</li></ul>`
          let sendToServer = dataStore[0].events + ', ' + event.target.parentElement.querySelector('input').value
          dataStore[0].events = sendToServer
          fetch('http://localhost:3000/api/v1/apartments/34', {
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
