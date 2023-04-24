import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try { 
    const result = await fetch(config.backendEndpoint + "/reservations"); 
    const data = await result.json(); 
    return data; 
  } catch (err) { 
    return null; 
  } 


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length > 0) { 
    document.getElementById("no-reservation-banner").style.display = "none"; 
    document.getElementById("reservation-table-parent").style.display = "block"; 
  } else { 
    document.getElementById("no-reservation-banner").style.display = "block"; 
    document.getElementById("reservation-table-parent").style.display = "none"; 
  } 

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    let tbody = document.getElementById('reservation-table'); 
    reservations.map((obj, i) => { 
      const {date, person, name, adventureName, time, price,id,adventure}=obj; 
      let rowdate = new Date(time); 
      const formatDate = rowdate.toLocaleString("en-IN", {dateStyle : "long", timeStyle : "medium"}).replace(" at",","); 
      let newTr = document.createElement('tr'); 
      newTr.innerHTML = ` 
      <td scope='col'>${id}</td> 
        <td scope='col'>${name}</td> 
        <td scope='col'>${adventureName}</td> 
        <td scope='col'>${person}</td> 
        <td scope='col'>${new Date(date).toLocaleDateString('en-IN')}</td> 
        <td scope='col'>${price}</td> 
        <td scope='col'>${formatDate}</td> 
        <td id=${id} scope='col'> 
        <a href=../detail/?adventure=${adventure} class='reservation-visit-button'> Visit Adventure</a> 
        </td> 
      ` 
      tbody.append(newTr); 
    }); 
    

}

export { fetchReservations, addReservationToTable };
