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

//define a asyncronous function named getPuppies
//implement try/catch to execute the code block and catch possible errors instead of crashing
//
async function getPuppies() {
  try {
    const response = await fetch(API + "/players");
    const result = await response.json();
    puppies = result.data;
    render();
  } catch (woof) {
    console.error(woof);
  }
}
