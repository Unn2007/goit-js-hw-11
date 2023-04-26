import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from "./photo-api-service.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import "./io.js"
const refs = {
    searchForm:document.querySelector(".search-form"),
    divGallery:document.querySelector(".gallery"),
    sentinel: document.querySelector(".sentinel")

};
const instance = new SimpleLightbox(".gallery a", {
  captionsData: "title",
  
});

const optionsIntersection = {rootMargin:"300px"};
const observer = new IntersectionObserver(onIntersection,optionsIntersection); 
const photocollection = new PhotoApiService();
observer.observe(refs.sentinel);
refs.searchForm.addEventListener("submit", onSubmit);
function onSubmit(event) {
    event.preventDefault();
    refs.divGallery.innerHTML="";
    photocollection.query=event.currentTarget.elements.searchQuery.value;
    photocollection.resetPage();
    photocollection.getPhotoCollection().then((data)=>{
        if (data.hits.length===0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        };
        refs.divGallery.innerHTML=CreateCardMarkup(data.hits);
        photocollection.pageIncrement();
        instance.refresh();
        
        })
    .catch((error)=>{
        console.log(error);
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    });
    
}; 

function onIntersection(entires) {
  entires.forEach(entry=>{
    if (entry.isIntersecting&photocollection.query!==""&photocollection.page>1) {
      photocollection.getPhotoCollection().then((data)=>{
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.divGallery.insertAdjacentHTML("beforeend", CreateCardMarkup(data.hits));
        
        photocollection.pageIncrement();
        instance.refresh();
        })
        .catch((error)=>{
          console.log(error);
          Notify.failure('We are sorry, but you have reached the end of search results.');
      });
      
      }
     
 })
};





function CreateCardMarkup(collectionPhoto) {


  return markup = collectionPhoto.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>{
return `
<div class="photo-card">
<a href="${largeImageURL}"><img src="${webformatURL}" alt="" title="${tags}" loading="lazy" /></a>
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    ${likes}
  </p>
  <p class="info-item">
    <b>Views</b>
    ${views}
  </p>
  <p class="info-item">
    <b>Comments</b>
    ${comments}
  </p>
  <p class="info-item">
    <b>Downloads</b>
    ${downloads}
  </p>
</div>
</div>`}).join(""); 
    

};






 
  