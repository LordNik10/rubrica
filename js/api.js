const apiBaseUrl = "http://localhost:3000/person";

async function getContactList(){
  const response = await fetch(apiBaseUrl);
  return response.json();
}

async function getContactById(id){
  const response = await fetch(`${apiBaseUrl}?id=${id}`);
  return response.json();
}
