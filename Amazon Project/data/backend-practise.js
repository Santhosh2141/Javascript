const xhr = new XMLHttpRequest(); // sends a HTTP req
xhr.open('GET', 'https://supersimplebackend.dev');    // GET is get info from backened, 2nd tells where to send the msg

// only ceratin URL paths will be supported which will be enabled backend.
// if not allowed itll throw error
xhr.addEventListener('load', () =>{   //load waits for loading the response.
  console.log(xhr.response);
})

xhr.send();   // it is asynchornous code

// If you check network tab after openeing page nothing will happen
// so you shuld go to network tab and then refresh page again to see the backend reqs
// list of all URL paths supported is BACKEND API
// typing url on browser sends a GET request to the backend