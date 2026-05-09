// === Constants ===

//declare a constant named base that stores the root URL of the API
//declare a constant named COHORT(isolates the user data from other cohorts)
//join base and cohort from the API and store them in 1 reusable constant
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2604-shara"; // Make sure to change this!
const API = BASE + COHORT;

// === State ===

//create an empty array to store the list of puppies from API
//create a variable to hold the currently clicked on puppy
//create an empty array to store the list of teams from API
let puppies = [];
let selectedPuppy;
let teams = [];

//define an asyncronous function named getPuppies
//implement try/catch to execute the code block and catch possible errors instead of crashing
//request the list of players from the API and await the response
//parse the response as JSON and await the result
//reassign puppies to the array of players from the API responses
//re-render the page
//catch any error within the try block
//log the error in the console
async function getPuppies() {
  try {
    const response = await fetch(API + "/players");
    const result = await response.json();
    puppies = result.data.players;
    render();
  } catch (woof) {
    console.error(woof);
  }
}

//i wasnt sure if i should be reusing/re explaining pseudocodes, but i did it just in case

//define an asyncronous function named getPuppy that fetches a specific id from the API
//implement try/catch to execute the code block and catch possible errors instead of crashing
//request the specific player id from the API await the response
//parse the response as JSON and await the result
//Reassign selectedPuppy to the player object from the API response
//re-render the page
//catch any error within the try block
//log the error in the console
async function getPuppy(id) {
  try {
    const response = await fetch(API + "/players/" + id);
    const result = await response.json();
    selectedPuppy = result.data.player;
    render();
  } catch (woof) {
    console.error(woof);
  }
}

//help, my friend said "if anyone gave that pseudocode to me to review id think they were insane"
//im standing my ground ദ്ദി ༎ຶ‿༎ຶ )

//define an asyncronous function named addPuppy that takes a puppy object as input
//implement try/catch to execute the code block and catch possible errors instead of crashing
//send a POST request using fetch to the players endpoint with the puppy data
//set the method to post(add new data)
//set the headers content type in JSON format
//convert the data (puppy object) into a JSON string
//parse the response as JSON and await the result
//log the result to the console for debugging
//wait for puppy list to get reloaded from the API
//catch any error within the try block
//log the error in the console
async function addPuppy(puppy) {
  try {
    const response = await fetch(API + "/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(puppy),
    });
    const result = await response.json();
    console.debug(result);
    await getPuppies();
  } catch (woof) {
    console.error(woof);
  }
}

//on second thought im gonna skip writing a pseudocode for try and catch over and over (•ᴗ•")
//i keep overthinking this T_T

//define an asyncronous function named removePuppy that takes an id as input
//send a delete request using fetch to players to remove the puppy
//set the method to delete
//reset the selected puppy that no longer exists to null
//wait for puppy list to get reloaded from API
async function removePuppy(id) {
  try {
    await fetch(API + "/players/" + id, {
      method: "DELETE",
    });
    selectedPuppy = null;
    await getPuppies();
  } catch (woof) {
    console.error(woof);
  }
}

//oh god it looks like im writing an essay
//IM SORRY ILL STOP

//define an asyncronous function named getTeams
//send a GET request using fetch to the teams and await the response
//parse the response as JSON and await the result
//reassign teams to the array of teams from the API responses
//re render the page
async function getTeams() {
  try {
    const response = await fetch(API + "/teams");
    const result = await response.json();
    teams = result.data.teams;
    render();
  } catch (woof) {
    console.error(woof);
  }
}

// === Components ===

//define a function named PuppyListItem that takes a puppy object as input
//create a new list document element ($li)
//write an if statement to check if this puppy is currently selected and add selected if true
//using innerHTML set a link to the puppys name and image
//add a click event listener that gets the puppys details using an arrow function/callback
//return the list document element
function PuppyListItem(puppy) {
  const li = document.createElement("li");

  if (puppy.id === selectedPuppy?.id) {
    li.classList.add("selected");
  }

  li.innerHTML = `
    <a href="#selected">
      <img alt="${puppy.name}" src="${puppy.imageUrl}" />
      ${puppy.name}
    </a>
    `;
  li.addEventListener("click", () => getPuppy(puppy.id));
  return li;
}

//define a function named PuppyList
//create a new unordered document list element ($ul)
//add the puppies class to the list for styling in css
//create a PuppyListItem for each puppy by using map to create a new array
//replace the children of $ul with the array of PuppyListItems
//return the unordered list element
function PuppyList() {
  const ul = document.createElement("ul");
  ul.classList.add("puppies");

  const puppyItems = puppies.map(PuppyListItem);
  ul.replaceChildren(...puppyItems);

  return ul;
}
//i removed $ for this block, i'm still not sure if i like it with or without
//i'll be more consistent in the future

//define a function named SelectedPuppy
//if no puppy is selected, create a paragraph(p) that asks user to select one and return it
function SelectedPuppy() {
  if (!selectedPuppy) {
    const p = document.createElement("p");
    p.textContent = "Please select a puppy to learn more.";
    return p;
  }

  //find the team that this puppy belongs to
  //if no team was found, default to unassigned
  //create a new element called section that holds the puppys details
  //show the name, id, image,breed,status,team and a remove button using innerHTML
  //add a button and a click event listener that removes puppy using its id
  //return the section element
  const team = teams.find((t) => t.id === selectedPuppy.teamId);
  const teamName = team ? team.name : "Unassigned";
  const puppy = document.createElement("section");
  puppy.innerHTML = `
    <h3>${selectedPuppy.name} #${selectedPuppy.id}</h3>
    <figure>
      <img alt="${selectedPuppy.name}" src="${selectedPuppy.imageUrl}" />
    </figure>
    <p><strong>Breed:</strong> ${selectedPuppy.breed}</p>
    <p><strong>Status:</strong> ${selectedPuppy.status}</p>
    <p><strong>Team:</strong> ${teamName}</p>
    <button>Remove from roster</button>
  `;

  const button = puppy.querySelector("button");
  button.addEventListener("click", () => {
    removePuppy(selectedPuppy.id);
  });

  return puppy;
}

//define a function named NewPuppyForm
//create a new form element to collect user input
//set the innerHTML to include name, breed input, and a submit button
//add a submit event listener to the form
//add an event to prevent default page load behavior
//using the data variable collect the formData
//build a puppy object with name and breed from formData
//send the new puppy to the API by using addPuppy
//return the puppy form element

function NewPuppyForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <label>
      Name
      <input name="name" required />
    </label>
    <label>
      Breed
      <input name="breed" required />
    </label>
    <button>Add puppy</button>
  `;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const puppy = {
      name: data.get("name"),
      breed: data.get("breed"),
    };
    addPuppy(puppy);
  });

  return form;
}

// === Render ===

//define the render function that builds the UI
//select the app element from the DOM
//set the innerHTML with the page layout
//replace all placeholder tags with the component output
//define an asyncronous initialize function so that we can start the app
//get all puppies from the API using await
//get all teams from the API using await
//render the page
//initialize the app
function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1>Puppy Bowl</h1>
    <main>
      <section>
        <h2>Listed Puppies</h2>
        <PuppyList></PuppyList>
        <h3>Add a new puppy</h3>
        <NewPuppyForm></NewPuppyForm>
      </section>
      <section id="selected">
        <h2>Puppy Details</h2>
        <SelectedPuppy></SelectedPuppy>
      </section>
    </main>
  `;

  app.querySelector("PuppyList").replaceWith(PuppyList());
  app.querySelector("NewPuppyForm").replaceWith(NewPuppyForm());
  app.querySelector("SelectedPuppy").replaceWith(SelectedPuppy());
}

async function init() {
  await getPuppies();
  await getTeams();
  render();
}

init();
