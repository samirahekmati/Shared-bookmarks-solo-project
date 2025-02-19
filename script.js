// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

//retrive user Ids from storage
const users = getUserIds();
console.log("users-->", users);

window.onload = function () {
  createDropdown(users);
  setupDropdownListener();
};

//created a dropdown menu with user options

export function createDropdown(users) {
  const selectElement = document.getElementById("dropdown");

  for (let i = 0; i < users.length; i++) {
    const option = document.createElement("option");
    const optionValue = users[i]; //we can retrieve the correct user ID
    console.log("option value-->", optionValue);
    option.textContent = `User ${users[i]}`;
    selectElement.appendChild(option);
  }

  console.log(selectElement);
}

// event listener for dropdown selection
function setupDropdownListener() {
  const selectElement = document.getElementById("dropdown");

  selectElement.addEventListener("change", () => {
    const selectedUser = selectElement.value;
    console.log("selected user-->", selectedUser);
    if (selectedUser) {
      displayBookmarks(selectedUser);
    }
  });
}

function displayBookmarks(userId) {
  let bookmarks = getData(userId); //fetch the array of bookmarks for the selected user
  console.log("bookmarks type-->", typeof bookmarks);
  console.log(`bookmarks for ${userId}-->`, bookmarks);
  //select the bookmark container
  const bookmarksContainer = document.getElementById("bookmarks-container");
  bookmarksContainer.textContent = ""; //clear previous bookmarks
  //check if bookmarks exist
  if (!bookmarks || bookmarks.length === 0) {
    bookmarksContainer.textContent = `No bookmarks available for ${userId}`;
    return;
  }
  //sort bookmarks in reverse chronological order. Bookmarks should be displayed newest first
  //if each bookmark object has a createdAt timestamp, use sort()
  bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  //loop through bookmarks and create elements
  bookmarks.forEach((bookmark) => {
    //create a div for each element
    const bookmarkDiv = document.createElement("div");
    //create a title(clickable link)
    const titleLink = document.createElement("a");
    titleLink.href = bookmark.url;
    titleLink.textContent = bookmark.title;
    titleLink.target = "_blank"; //opem in new tab

    //create p for description
    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = bookmark.description;

    //create timestamp
    const timestamp = document.createElement("small");
    timestamp.textContent = `Created at: ${new Date(
      bookmark.createdAt
    ).toLocaleString()}`;

    //append elemnts to bookmark div
    bookmarkDiv.appendChild(titleLink);
    bookmarkDiv.appendChild(descriptionPara);
    bookmarkDiv.appendChild(timestamp);

    //append bookmark div to the container
    bookmarksContainer.appendChild(bookmarkDiv);
  });

  console.log("bookmarks-->", bookmarks);
}

//Select Form Elements
const form = document.getElementById("bookmark-form");
const inputTitle = document.getElementById("form-title");
const inputDescription = document.getElementById("form-description");
const inputLink = document.getElementById("form-link");

//const submitButton = document.getElementById("form-submit-button");

//Attach an Event Listener to the Form
form.addEventListener("submit", function (event) {
  event.preventDefault(); //to prevent page reload
  //get the selected user
  const selectElement = document.getElementById("dropdown");
  const selectedUser = selectElement.value;
  console.log(selectedUser);

  if (!selectedUser) {
    alert("Please select a user.");
    return;
  }

  //create a bookmark object with a timestamp
  const newBookmark = {
    title: inputTitle.value,
    description: inputDescription.value,
    url: inputLink.value,
    createdAt: new Date().toISOString(), // Store timestamp
  };



  addBookmark(selectedUser,newBookmark)
});

function addBookmark(selectedUser, newBookmark){
  let bookmarks = getData(selectedUser) || [];

  //add the new bookmark to the array
  bookmarks.push(newBookmark);

  //store the updated bookmarks back to the local storage
  setData(selectedUser, bookmarks);

  //refsh the display bookmarks
  displayBookmarks(selectedUser)
}
