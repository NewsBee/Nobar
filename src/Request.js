const api_key = 'fa0f028c2f1c5b9c5ec2050550883dbf';

const requests = {
    reqPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=id&page=1&append_to_response=videos`,
    reqTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}&language=id`,
    reqAction: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=id&with_genres=28`,
    reqUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=id&page=1`,
    reqToprated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=id&page=1`,
    reqHor: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=id&page=1&with_genres=28`,
    reqHorror: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=horror&page=1&include_adult=false`,
    reqRomance: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=romance&page=1&include_adult=false`,
    reqRomansa: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=id&page=1&with_genres28`,
};

export default requests; 