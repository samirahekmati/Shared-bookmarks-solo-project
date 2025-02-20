import { getUserIds, getData, setData, clearData } from "./storage.js";

window.onload = function () {
  createDropdown(userIds);
  setupDropdownListener();
};

//retrive user Ids from storage
const userIds = getUserIds();
console.log("users IDs-->", userIds);

//created a dropdown menu with user options

export function createDropdown(userIds) {
  const selectElement = document.getElementById("dropdown");

  for (let i = 0; i < userIds.length; i++) {
    const option = document.createElement("option");
    option.textContent = `User ${userIds[i]}`;
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
  bookmarks.forEach((bookmark, index) => {
    //create a div for each element
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.id = `bookmark-${index}`; // Unique Id for each bookmark for styling purposes
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

  addBookmark(selectedUser, newBookmark);
});

function addBookmark(userId, bookmark) {
  let bookmarks = getData(userId) || [];

  //add the new bookmark to the array
  bookmarks.push(bookmark);

  //store the updated bookmarks back to the local storage
  setData(userId, bookmarks);

  //refsh the display bookmarks
  displayBookmarks(userId);
}
