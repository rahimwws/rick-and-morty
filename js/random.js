"use strict";

let img = document.querySelector("#random-image");
let id = document.querySelector("#random-id");
let name = document.querySelector("#random-name");

let favBtn = document.querySelector("#add-to-fav");
let randomBtn = document.querySelector("#get-random");

let currentCharacters = null;

const getNumber = () => Math.floor(Math.random() * (826 - 1 + 1) + 1);
const getCharacters = () =>
  fetch(`https://rickandmortyapi.com/api/character/${getNumber()}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((parsedData) => {
      currentCharacters = parsedData;
      img.src = parsedData.image;
      id.textContent = parsedData.id;
      name.textContent = parsedData.name;
    });
getCharacters();

randomBtn.onclick = () => getCharacters();

favBtn.onclick = () => {
  let favCharacters = localStorage.getItem("favorite-characters");
  if (favCharacters) {
    console.log(favCharacters );
    let parsedCharacters = JSON.parse(favCharacters);
    if (!parsedCharacters.includes(currentCharacters.id)) {
      parsedCharacters.push(currentCharacters.id);
    }
    localStorage.setItem(
      "favorite-characters",
      JSON.stringify(parsedCharacters)
    );
  } else {
    let characterArray = JSON.stringify([currentCharacters.id]);
    localStorage.setItem("favorite-characters", characterArray);
  }
};
