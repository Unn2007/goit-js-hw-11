const sentinel= document.querySelector(".sentinel")
const options = {};
const observer = new IntersectionObserver(function(entires) {
entires.forEach(entry=>{
   if (entry.isIntersecting) {console.log(entry)}
    
})

},options); 
observer.observe(sentinel);