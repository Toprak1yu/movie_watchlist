let films = JSON.parse(localStorage.getItem("films")) || [];
const filmContainer = document.getElementById("film-container");
const emptyMessage = document.createElement("p");
emptyMessage.classList.add("not-found");
emptyMessage.innerHTML = `Your watchlist is empty.<br> Start adding films to your watchlist!`;

if (films.length === 0) {
    document.body.appendChild(emptyMessage);
} else {
    films.forEach(film => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("film");
        filmElement.innerHTML = `
            <img src="${film.Poster}" alt="${film.Title}" />
            <h2>${film.Title} ⭐ ${film.imdbRating}</h2>
            <p>${film.Runtime} - <span>${film.Genre}</span></p>
            <button id="remove-from-watchlist"></button><span>Remove</span>
            <p>${film.Plot}</p>
        `;
        filmElement.querySelector("#remove-from-watchlist").addEventListener("click", () => {
            films.splice(films.indexOf(film), 1);
            localStorage.setItem("films", JSON.stringify(films));
            filmContainer.removeChild(filmElement);
            if (films.length === 0) {
                document.body.appendChild(emptyMessage);
            }
        });
        filmContainer.appendChild(filmElement);
    });
}
