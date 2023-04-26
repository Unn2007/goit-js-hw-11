const axios = require('axios/dist/browser/axios.cjs');
export default class photoApiService {
    constructor() {
        this.query =""
        this.page=1
    };
   
async  getPhotoCollection() {
  const query = this.query;
  const page = this.page;
    const searchParams = new URLSearchParams({
  key:"35759118-aa5f76bc84c3135be08c1161d",
  q:query,
  image_type:"photo",
  orientation: "horizontal",
  safesearch: true,
  per_page:40,
  page:page
  });
  
  
  try {
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    const data = await response.data;
    this.page+=1;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
          
   
  }
  resetPage() {
    this.page=1;
  }
}