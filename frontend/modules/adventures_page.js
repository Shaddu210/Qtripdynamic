
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
  const urlElement = new URLSearchParams(search);
  return urlElement.get("city");1
  

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const fecAdv = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    const response = await fecAdv.json();
    return response;
  } catch (err) {
      return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
 function addAdventureToDOM(adventures) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.map((e) => {
    const parent = document.getElementById("data");
    const contianer = document.createElement("div");
    contianer.setAttribute("class", "col-lg-3 col-6 mb-6 postion-relative");
    const aTag = document.createElement("a");
    aTag.setAttribute("id", e.id);
    aTag.setAttribute("href", `detail/?adventure=${e.id}`);

    const divElement = document.createElement("div");
    divElement.setAttribute("class", "activity-card");

    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", e.image);

    const div = document.createElement("div");
    div.setAttribute("class", "d-flex justify-content-between p-2");

    const nameElement = document.createElement("h6");
    nameElement.innerText = e.name;

    const cost = document.createElement("h6");
    nameElement.innerText = e.costPerHead + " " + e.currency;

    const div2 = document.createElement("div");
    div2.setAttribute("class", "d-flex justify-content-between p-2");

    const durationElement = document.createElement("h6");
    durationElement.innerText = "duration";

    const timeElement = document.createElement("h6");
    timeElement.innerText = e.duration + " Hours";

    const categoryElement = document.createElement("div");
    categoryElement.setAttribute("class", "category-banner");

    const textElement = document.createElement("span");
    textElement.innerText = e.category;

    categoryElement.appendChild(textElement);
    divElement.appendChild(categoryElement);

    div.appendChild(nameElement);
    div.appendChild(cost);
    div2.appendChild(durationElement);
    div2.appendChild(timeElement);

    divElement.appendChild(imgElement);
    divElement.appendChild(div);
    divElement.appendChild(div2);

    aTag.appendChild(divElement);
    contianer.appendChild(aTag);
    parent.appendChild(contianer);

  })

}
// function addAdventureToDOM(adventures) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM
//   adventures.forEach((key) => {
//       let ele = document.createElement("div");
//       ele.className = "col-6 col-lg-3 mb-4";
//       ele.innerHTML = `
//       <a href="detail/?adventure=${key.id}" id=${key.id}>
//           <div class="category-banner">${key.category}</div>
//             <div class="activity-card">

//               <img
//                 class="img-responsive"
//                 src=${key.image}
//               />

//               <div class="activity-card-text text-md-center w-100 mt-3">
//                   <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
//                     <h5 class="text-left">${key.name}</h5>
//                     <p>${key.costPerHead}</p>
//                   </div>
//                   <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
//                     <h5 class="text-left">Duration</h5>
//                     <p>${key.duration}Hours</p>
//                   </div>
//                 </div>
//             </div>
//         </a>`
//       ;
//       document.getElementById("data").appendChild(ele);
//   });
// }
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterDuration = list.filter((e) => {
    return (e.duration >= low && e.duration <= high);
  })

  console.log(filterDuration);
  return filterDuration;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((e) => {
    return categoryList.includes(e.category);
  })

  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist = [];
  let array = filters["duration"].split("-");
  if(filters["category"].length > 0 && filters["duration"].length > 0){
    filteredlist = filterByCategory(list, filters.category);
    filteredlist = filterByDuration(filteredlist, parseInt(array[0]), parseInt(array[1]));
  }
  else if(filters["category"].length > 0){
    filteredlist = filterByCategory(list, filters.category);
  }
  else if(filters["duration"].length > 0){
    filteredlist = filterByDuration(list, parseInt(array[0]), parseInt(array[1]));
  }
  else{
    return list;
  }
  
  // Place holder for functionality to work in the Stubs
  return filteredlist;


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  console.log(filters);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let getFilter = localStorage.getItem("filters");
  let localEle = JSON.parse(getFilter);
  return localEle;


  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let catEle = document.getElementById("category-list");

  filters.category.forEach(element => {
    
    let filelement = element;
    let divElement = document.createElement("div");
    divElement.setAttribute("class", "category-filter");
    divElement.innerText = element;
    catEle.append(divElement);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
