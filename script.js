// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

//retrive user Ids from storage
const users = getUserIds();
console.log("users-->",users)

window.onload = function () {
  createDropdown(users);
};



//created a dropdown menu with user options. 
//when a user is selected, the form is displayed, and their data is loaded
function createDropdown(users) {
  const selectElement = document.getElementById("dropdown");
  
  for (let i = 0; i < users.length; i++) {
    const option = document.createElement("option");
    const optionId = option.id = i + 1;
    console.log(`option id for user ${users[i]} is ${optionId}`)
    option.textContent = `User ${users[i]}`;
    selectElement.appendChild(option);
  }

  console.log(selectElement)

  // event listener for dropdown selection
  selectElement.addEventListener("change", ()=>{
    //need function for form
    console.log("clicekd on user")
  } )

}


