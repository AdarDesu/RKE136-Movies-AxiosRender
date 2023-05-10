const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    
    let url = "https://api.themoviedb.org/3/movie/394326?api_key=4ca94f8b470d7e34bd3f59c3914295c8";
    axios.get(url)
    .then(response => {

        let data = response.data;
        let releaseDate = new Date(data.release_date).getFullYear();
        let genres = "";

        data.genres.forEach(genre => {
            genres = genres + `${genre.name}, `;
        });
        
        let genresUpdated = genres.slice(0, -2) + ".";
        moviePoster = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
        let currentYear = new Date().getFullYear();

        movieCard = `linear-gradient(to right, #000000ee, 
            #000000bb 40%, #00000080 100%), url("https://www.themoviedb.org/t/p/original/${data.backdrop_path}");`

        res.render("index", {
            movieData: data, 
            releaseDate: releaseDate, 
            genres: genresUpdated, 
            poster: moviePoster, 
            year: currentYear,
            card: movieCard
        });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running.");
});