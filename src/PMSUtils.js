var API_DOMAIN = "";//Development purposes mostly

function deleteAndRedirect(deleteURL, redirectURL){
  console.log("Deleting and redirecting");
  fetch(API_DOMAIN +  deleteURL, {method: "DELETE"}).then(r => {
    window.location = redirectURL;
  });
}

function postAndCallback(url, body, callback){
  fetch(API_DOMAIN + url, {
      mode: "cors",
      method: 'POST',
      body: body,
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }}).then(response => response.json()).then(data => {
      callback(data);
  });
}

function convertKeysToCamel(obj){
  var newObj = {};
  for(var key in obj){
    var camel = key.replace(/([-_]\w)/g, g => g[1].toUpperCase());
    newObj[camel] = obj[key];
  }
  return newObj;
}

export default {deleteAndRedirect, postAndCallback, convertKeysToCamel, API_DOMAIN}
