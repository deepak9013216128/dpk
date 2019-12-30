const autocompleteConfig = {
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A'? '': movie.Poster;
        return `
            <img src="${imgSrc}">
            ${movie.Title} (${movie.Year})
        `
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchItems(serchTerm){
        const response = await axios.get('http://www.omdbapi.com/',{
            params: {
                apikey: '7e315230',
                s: serchTerm
            }
        });
        if(response.data.Error){
            return [];
        }
        return response.data.Search;
    }
};
createAutocomplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelet(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie,document.querySelector('#left-summery'),'left');
    }
});
createAutocomplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelet(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie,document.querySelector('#right-summery'),'right');
    }
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie,summeryElement,side) =>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '7e315230',
            i: movie.imdbID
        }
    });
    summeryElement.innerHTML = movieTemplate(response.data);

    if(side === 'left'){
        leftMovie = response.data;
    }else{
        rightMovie = response.data;
    }
    if(leftMovie && rightMovie){
        runComparison();
    }
};
const runComparison = ()=>{
    const leftSideStatus = document.querySelectorAll('#left-summery .notification');
    const rightSideStatus = document.querySelectorAll('#right-summery .notification');

    leftSideStatus.forEach((leftStat , index)=>{
        const rightStat = rightSideStatus[index];
        const leftSideValue = parseFloat(leftStat.dataset.value);
        const rightSideValue = parseFloat(rightStat.dataset.value);
        if(leftSideValue < rightSideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        }else if(leftSideValue > rightSideValue){
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    })
}


const movieTemplate = (movieDetail)=>{
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g,''));
    const awards = movieDetail.Awards.split(' ').reduce((prev,word)=>{
        const value = parseInt(word)
        if(isNaN(value)){
            return prev;
        }else{
            return prev+value;
        }
    },0);
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value = '${awards}' class='notification is-primary'>
            <p class='title'>${movieDetail.Awards}</p>
            <p class='subtitle'>Awards</p>
        </article>
        <article data-value = '${dollars}' class='notification is-primary'>
            <p class='title'>${movieDetail.BoxOffice}</p>
            <p class='subtitle'>BoxOffice</p>
        </article>
        <article data-value = '${metascore}' class='notification is-primary'>
            <p class='title'>${movieDetail.Metascore}</p>
            <p class='subtitle'>Metascore</p>
        </article>
        <article data-value = '${imdbRating}' class='notification is-primary'>
            <p class='title'>${movieDetail.imdbRating}</p>
            <p class='subtitle'>IMDB Rating</p>
        </article>
        <article data-value = '${imdbVotes}' class='notification is-primary'>
            <p class='title'>${movieDetail.imdbVotes}</p>
            <p class='subtitle'>IMDB Votes</p>
        </article>
    `
}

