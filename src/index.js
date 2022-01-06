import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


import './sass/main.scss';
const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input[name=searchQuery]'),
    button: document.querySelector('button'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    body : document.querySelector('body')
}


const KEY = '25099977-05a832f59cefe7e3a7990f935'
const BASE_URL = 'https://pixabay.com/api/'
const PARAMS_SEARCH = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
refs.form.addEventListener('submit', render)

// refs.loadMore.addEventListener('click',loadMore )
let page = 1;
let qwe = 0;
let totalPage = null;
let asd = 0;
    
let lightbox = new SimpleLightbox('.gallery a');


async function render(e) {
    
    e.preventDefault(); 
    window.addEventListener("scroll", (() => {
         e.preventDefault(); 
        let contentHeight = refs.gallery.offsetHeight;
        let yOffset = window.pageYOffset;
        let window_height = window.innerHeight;
        let y = yOffset + window_height;
        if (y >= contentHeight) {
            page += 1
            takeBack(page)
            lightbox.refresh();
        }
    })
    )
    // refs.loadMore.classList.add('visible')
    // refs.gallery.addEventListener('click', ((e) => { 
    // e.preventDefault();  
    refs.gallery.innerHTML = ""
    takeBack()  
    page = 1
    // }))
           
}
//let lightbox = new SimpleLightbox('.photo-card a')

 //   refs.loadMore.classList.remove('invis')


// function loadMore() { 
//         page+=1
//         takeBack()   
    
// }
async function takeBack(page) { 
   
    

        await axios.get(`${BASE_URL}?key=${KEY}&q=${refs.input.value}&${PARAMS_SEARCH}&page=${page}`)
            .then((value) => {
                totalPage = Math.ceil(value.data.totalHits / 40)
                qwe = value.data.totalHits
                asd = value.data.hits.length
               
                if (page === undefined   && value.data.hits.length > 0) {
                    setTimeout(() => Notiflix.Notify.success(`Hoorey! We found ${qwe} images`), 500)
                   // lightbox.refresh();
                    
                }
                if (page >= totalPage+1) {
                            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                    return;
                        }
                    if (value.data.hits.length < 1) {
                        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                        return;
                        }                                 
                    const Arr = value.data.hits.map((e) => {
                        return `<div class="photo-card">
                   <a href = ${e.largeImageURL}> <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" width = 640 height = 460 /> </a>
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
              //  let lightbox = new SimpleLightbox('.photo-card a');
              //  lightbox.close();
                lightbox.refresh();
                    })
    }
//
