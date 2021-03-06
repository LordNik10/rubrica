const apiUrl = "http://localhost:3000/person";

async function getContactList (){
    const response = await fetch(apiUrl);
    return response.json();
}

async function insertNewContact(person){
    let res = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(person),
    });
    return res;
}


async function deleteContact(id){
    const res = await fetch(`${apiUrl}/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });

    return res;
}