import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from "./photo-api-service.js";
const photocollection = new PhotoApiService();





photocollection.query="cat";
 
photocollection.getPhotoCollection().then((data)=>console.log(data.hits));


  