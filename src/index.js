document.addEventListener('DOMContentLoaded', () => {
  console.log('ur page loaded')
  // DOM Elements
  const apartmentsDiv = document.getElementById('apartment')
  // Variables
  const endPoint = 'http://localhost:3000/api/v1/apartments'

  // Fetches and Event Listeners
  fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      apartmentsDiv.innerHTML = showApartments(json)
    });

    // HELPERS
    function showApartments(json) {
      return json.map((apt) => {
        return `<p>${apt.name}</p>
                <button>Edit</button>`
      }).join('')
    }








}) // end DOMContentLoaded
