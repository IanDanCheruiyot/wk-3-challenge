document.addEventListener("DOMContentLoaded", () => {
    const movieDetails = document.getElementById("movie-details");
    const filmList = document.getElementById("films");
    const buyTicketButton = document.getElementById("buy-ticket");

    // Fetch movie data from the server
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            const movies = data.films;
            displayMovieDetails(movies[0]);
            populateFilmList(movies);
        });

    function displayMovieDetails(movie) {
        const poster = document.getElementById("poster");
        const title = document.getElementById("title");
        const runtime = document.getElementById("runtime");
        const showtime = document.getElementById("showtime");
        const availableTickets = document.getElementById("available-tickets");

        poster.src = movie.poster;
        title.textContent = movie.title;
        runtime.textContent = movie.runtime;
        showtime.textContent = movie.showtime;
        availableTickets.textContent = movie.capacity - movie.tickets_sold;

        buyTicketButton.onclick = () => {
            let ticketsAvailable = movie.capacity - movie.tickets_sold;
            if (ticketsAvailable > 0) {
                movie.tickets_sold++;
                availableTickets.textContent = ticketsAvailable - 1;
            } else {
                alert("Sorry, We are currently sold out!");
            }
        };
    }

    function populateFilmList(movies) {
        filmList.innerHTML = "";
        movies.forEach(movie => {
            const li = document.createElement("li");
            li.className = "film item";
            li.innerHTML = `<img src="${movie.poster}" alt="${movie.title}"><span>${movie.title}</span>`;
            li.onclick = () => displayMovieDetails(movie);
            filmList.appendChild(li);
        });
    }
});