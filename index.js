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
