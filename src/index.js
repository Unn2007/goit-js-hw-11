import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios/dist/browser/axios.cjs');
console.log(axios);
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });


// function fetchUsers() {
//     return axios.get('https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name')
//   .then(function (response) {
//     if (!response.ok) {
//               throw new Error(response.status);
//             }
//             return response.json();
   
//   })
  
// };
// fetchUsers().then((users) => console.log(users))
//     .catch((error) => console.log(error));

// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", () => {
//   fetchUsers()
//     .then((users) => renderUserList(users))
//     .catch((error) => console.log(error));
// });

// function fetchUsers() {
//   return fetch(
//     "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name"
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(users) {
//   const markup = users
//     .map((user) => {
//       return `
//           <li>
//             <p><b>Name</b>: ${user.name}</p>
//             <p><b>Email</b>: ${user.email}</p>
//             <p><b>Company</b>: ${user.company.name}</p>
//           </li>
//       `;
//     })
//     .join("");
//   userList.innerHTML = markup;
// }

// Resources