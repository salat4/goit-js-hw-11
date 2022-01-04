import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './sass/main.scss';
const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input[name=searchQuery]'),
    button: document.querySelector('button'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    simpleLightbox: document.querySelector('.simple-lightbox'),
    body : document.querySelector('body')
}


const KEY = '25099977-05a832f59cefe7e3a7990f935'
const BASE_URL = 'https://pixabay.com/api/'
const PARAMS_SEARCH = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
refs.form.addEventListener('submit', render)
// refs.loadMore.addEventListener('click',loadMore )
let page = 1;
let qwe = 0;
// let count = 1;
function render(e) {
    window.addEventListener("scroll", (()=>{     
                let contentHeight = refs.gallery.offsetHeight;  
                let yOffset       = window.pageYOffset;
                let window_height = window.innerHeight;
                let y             = yOffset + window_height;
                if(y >= contentHeight)
                {
                    page+=1
                    takeBack(page)

                    console.log(page)
                }
                // return;
    })
    )
    // refs.loadMore.classList.add('visible')
    refs.gallery.innerHTML = ""
    e.preventDefault();
    takeBack() 
    setTimeout(() => {Notiflix.Notify.success(`Hooray! We found ${qwe} images `) },500)
 //   refs.loadMore.classList.remove('invis')
}

// function loadMore() { 
//         page+=1
//         takeBack()
    
// }
async function takeBack(page) { 
  //  console.log(count)
await axios.get(`${BASE_URL}?key=${KEY}&q=${refs.input.value}&${PARAMS_SEARCH}&page=${page}`)
    .then((value) => {
        qwe = value.data.totalHits
        //  console.log(value)
        console.log("length:", value.data.hits.length);
        console.log(page)
        if (value.data.hits.length < 1) {
            // console.log(value.data.hits.length)
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`)               
        }
        else {
            
               const Arr = value.data.hits.map((e) => {
                return `<div class="photo-card">
                   <a href = ${e.largeImageURL}> <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /> </a>
                    <div class="info">
                    <p class="info-item">
                    <b>Likes:${e.likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views:${e.views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments:${e.comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads:${e.downloads}</b>
                    </p>
                    </div>
                    </div>`
            })
        
        refs.gallery.insertAdjacentHTML("beforeend", Arr.join(""))
               
    }
         
         let lightbox = new SimpleLightbox('.gallery a')
            
        })
        .catch((error) => { 
            console.log(error)
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        })
    
}
    