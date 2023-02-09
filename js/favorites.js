"use strict";

const url = "https://rickandmortyapi.com/api/character/";
let favCards = document.querySelector(".fav-card");
let favorites = localStorage.getItem("favorite-characters");

let parseFav = JSON.parse(favorites);

let characterArray = [...new Set(parseFav)];


const createCard = (character) => {
  let favCharacter = document.createElement("div");
  favCharacter.classList.add('favorite-card')
  favCharacter.dataset.favCard = character.id;
  
  let favImg = document.createElement("img");
  favImg.src = character.image; 
 
  let favName = document.createElement("h1");
  favName.textContent = character.name;
  favName.classList.add('random-name')
  let removeButton = document.createElement("button");
  removeButton.dataset.favId = character.id;
  removeButton.dataset.action = "remove"
  removeButton.textContent = "Remove from favorites";
  removeButton.classList.add("remove-from-fav");
  removeButton.addEventListener("click", removeItem);

  favCharacter.appendChild(favImg);
  favCharacter.appendChild(favName);
  favCharacter.appendChild(removeButton);

  favCharacter.classList.add("favorite-character");
  favCards.appendChild(favCharacter);
};

fetch(`${url}${characterArray.join(",")}`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((parseData) => {
    if (characterArray.length === 1) {
      createCard(parseData);
    } else {
      parseData.forEach((character) => {
        createCard(character);
      });
    }
  });

function removeItem(event) {
  const localFavs = localStorage.getItem("favorite-characters");
  const parsed = JSON.parse(localFavs);
  
  if (localFavs !== null) {
    const filteredArray = parsed.filter((id) => {
      const buttonId = Number(event.target.dataset.favId);
      if (id !== buttonId) return id;
    });
    
    localStorage.setItem("favorite-characters", JSON.stringify(filteredArray));
  }
  const answer = include(parsed, Number(event.target.dataset.favId));

  if (answer === true) {
    if (event.target.dataset.action === "remove") {
      event.target.closest(".favorite-character").remove();
    }
  }
  function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  }
}
