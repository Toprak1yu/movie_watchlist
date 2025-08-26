const apiKey = "a80965fd";
let films = JSON.parse(localStorage.getItem("films")) || [];

const movieName = document.getElementById("movie-name")
const filmContainer = document.getElementById("film-container")
const firstText = document.getElementById("first-look")

document.querySelector("button").addEventListener("click", async () => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName.value}`);
    const data = await response.json();
    filmContainer.innerHTML = "";
    firstText.classList.add("disabled");
    if (data.Response === "False") {
        document.querySelectorAll(".not-found").forEach(el => el.remove());
        const notFoundMessage = document.createElement("p");
        notFoundMessage.classList.add("not-found");
        notFoundMessage.innerHTML = `Unable to find what you're looking for.<br> Please try a different search term.`;
        document.body.appendChild(notFoundMessage);
        return;
    } else {
        data.Search.forEach(async film => {
            document.querySelectorAll(".not-found").forEach(el => el.remove());
            const filmElement = document.createElement("div");
            filmElement.classList.add("film");
            const detailedInfo = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${film.imdbID}`);
            const detailedData = await detailedInfo.json();
            filmElement.innerHTML = `
                <img src="${film.Poster}" alt="${film.Title}" />
                <h2>${film.Title} ⭐ ${detailedData.imdbRating}</h2>
                <p>${detailedData.Runtime} - <span>${detailedData.Genre}</span></p>
                <button id="add-to-watchlist"></button><span>Watchlist</span>
                <p>${detailedData.Plot}</p>
            `;
            filmElement.querySelector("#add-to-watchlist").addEventListener("click", () => {
                if (!films.some(f => f.imdbID === detailedData.imdbID)) {
                    films.unshift(detailedData);
                    localStorage.setItem("films", JSON.stringify(films));
                }
            });
            filmContainer.appendChild(filmElement);
        });
    }
});