import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios/dist/browser/axios.cjs');

const searchParams = new URLSearchParams({
  key:"35759118-aa5f76bc84c3135be08c1161d",
  q:"fish",
  image_type:"photo",
  orientation: "horizontal",
  safesearch: true,
  per_page:40,
  page:2
  });


  async function getUser() {
          const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
          return await response.data;
   
  }
  getUser().then((data)=>console.log(data));


  