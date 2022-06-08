const apiUrl = "http://localhost:3000/person";

async function getContactList (){
    const response = await fetch(apiUrl);
    return response.json();
}