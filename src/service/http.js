const http = (
    pathName, method = 'GET', body = {}, callback,
    callbackError = () => {}) => {
<<<<<<< HEAD
    let _url = `http://upctp3-des02.azurewebsites.net/${pathName}`;
    //let _url = `https://upctp3-des.azurewebsites.net/${pathName}`;
=======
    //let _url = `http://25.3.69.136/${pathName}`;
    let _url = `https://upctp3-des.azurewebsites.net/${pathName}`;
>>>>>>> 81ee7eccf5a4607468a13af06dd6a37664bcdba8

  if (method === 'GET') {
    _url = new URL(_url);
    Object.keys(body).forEach(key => _url.searchParams.append(key, body[key]));
  }

  let myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

  let myInit = {
    method: method,
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  };

  if (method === 'POST') {
    myInit.body = JSON.stringify(body);
  }

  fetch(_url, myInit)
  .then( response => response.json() )
  .then(function(response) {
    callback(response);
  }).catch((e) => {
    console.error(e);
    callbackError(e);
  });
};

export default http;