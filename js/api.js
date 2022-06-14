const apiUrl = 'http://localhost:3000/person';

async function getContactList() {
  const response = await fetch(apiUrl);
  return response.json();
}

async function insertNewContact(person) {
  return fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(person),
  });
}


async function deleteContact(id) {
  return fetch(`${ apiUrl }/${ id }`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

async function loadCard(id) {
  const response = await fetch(`${ apiUrl }/${ id }`);
  return response.json();
}

async function changeCard(id, person) {
  return fetch(`${ apiUrl }/${ id }`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(person),
  });
}
