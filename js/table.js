const contactList = [
  {
    'id': 1,
    'nome': 'Niccolò',
    'cognome': 'Naso',
    'hobbies': [],
    'favouriteVideo': 'https://youtube.com?v=12weklndasdk'
  },
  {
    'id': 3,
    'nome': 'Marika',
    'cognome': 'Fabiani'
  },
  {
    'id': 4,
    'nome': 'Daniel',
    'cognome': 'Zotti'
  },
  {
    'id': 5,
    'nome': 'Mario',
    'cognome': 'Rossi'
  },
  {
    'id': 6,
    'nome': 'Luigi',
    'cognome': 'Bianchi'
  },
  {
    'id': 7,
    'nome': 'Giovanna',
    'cognome': 'Verdi'
  },
  {
    'id': 8,
    'nome': 'Andrea',
    'cognome': 'Burlone'
  },
  {
    'id': 9,
    'nome': 'Elena',
    'cognome': 'Marchi'
  }
];

function createContactRow(contact) {
  const tr = document.createElement('tr');
  tr.className = 'contact-row'; // tr.className = 'highlights';
  tr.id = 'contact_' + contact.id;

  const cellId = document.createElement('td');
  cellId.className = 'contact-id';
  const contactLink = document.createElement('a');
  contactLink.href = `./card.html?id=${ contact.id }`;
  contactLink.textContent = contact.id;
  cellId.appendChild(contactLink);


  const cellName = document.createElement('td');
  cellName.className = 'contact-name';
  cellName.textContent = contact.nome;


  const cellSurname = document.createElement('td');
  cellSurname.className = 'contact-surname';
  cellSurname.textContent = contact.cognome;
  cellSurname.innerHTML += `<button data-contact-id="${ contact.id }" class="btn-icon contact-delete"><i class="fas fa-trash delete"></i></button>`;

  tr.appendChild(cellId);
  tr.appendChild(cellName);
  tr.appendChild(cellSurname);

  return tr;
}

async function buildTable() {
  try {
    const contactList = await getContactList();
    const rowsContainer = document.querySelector('#contact-rows-container');

    for(let i = 0; i < contactList.length; i++) {
      const contact = contactList[i];
      rowsContainer.appendChild(createContactRow(contact));
    }

    document.querySelectorAll('.contact-delete').forEach(deleteButton =>
      deleteButton.addEventListener('click', deleteContact)
    );
    document.querySelector('#research').addEventListener('keyup', search);
    document.querySelector('#btn-add').addEventListener('click', addPerson);
  } catch {
    throw new Error('Errore');
  }

}

function deleteContact(event) {
  event.preventDefault();
  const id = event.target.getAttribute('data-contact-id');
  deletePerson(id);
}

async function deletePerson(id) {
  console.log('entro dentro deletePerson');
  try {
    let res;
    if(confirm('Sicuro di eliminare la persona selezionata?')) {
      res = await fetch(`http://localhost:3000/person/${ id }`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
    } else {
      return;
    }

    if(res.ok) {
      let tr = document.querySelector(`#contact_${ id }`);
      tr.remove();
    } else {
      throw new Error('Sorry. Couldn\'t delete.');
    }
  } catch(err) {
    console.error(err);
  }
};

function search() {
  const searchText = document.querySelector('#research').value;
  const filteredContactList = contactList.filter(contact => contact.cognome?.toLowerCase().startsWith(searchText?.toLowerCase()));

  const contactRowsContainer = document.querySelector('#contact-rows-container');
  contactRowsContainer.innerHTML = '';
  filteredContactList.forEach(contact => contactRowsContainer.appendChild(createContactRow(contact)));
}

function searchOld() {
  let text = document.querySelector('#research');
  let contacts = document.querySelectorAll('.contact-row');

  for(let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    let surnameTarget = contact.childNodes[2].textContent + '';
    if(!surnameTarget.includes(text.value)) {
      contacts[i].style.display = 'none';
    } else {
      contacts[i].style.display = 'table-row';
    }


  }
}

async function addPerson() {
  let id = document.getElementById('number-id').value;
  let name = document.getElementById('input-name').value;
  let surname = document.getElementById('input-surname').value;
  if(id == '' || name == '' || surname == '') {
    alert('Compilare tutti i campi');
    return;
  }
  const person = {
    id: id,
    nome: name,
    cognome: surname
  };
  console.log(person);
  try {
    let res = await fetch(`http://localhost:3000/person`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(person),
    });
    if(res.ok) {
      const table = document.querySelector('tbody');
      const tr = document.createElement('tr');
      tr.className = 'highlights';
      tr.id = 'tr' + person.id;
      for(i = 0; i < 3; i++) {
        let td = document.createElement('td');
        td.id = 'td' + tr.id + '' + i;

        const a = document.createElement('a');
        switch(i) {
          case 0:
            a.href = '#';
            a.textContent = person.id;
            a.className = 'id';
            td.appendChild(a);
            break;
          case 1:
            td.textContent = person.nome;
            break;
          case 2:
            td.textContent = person.cognome;
            td.innerHTML += '<i class=\'fas fa-trash delete\'></i>';
            break;
        }
        tr.appendChild(td);
      }

      table.appendChild(tr);

      const deleteIcon = document.getElementsByTagName('i');
      deleteIcon[deleteIcon.length - 1].addEventListener('click', deletePerson.bind(null, person.id));

    } else {
      throw new Error('Sorry. Couldn\'t Add Person.');
    }
  } catch(err) {
    console.error(err);
  }
  document.getElementById('number-id').value = '';
  document.getElementById('input-name').value = '';
  document.getElementById('input-surname').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
  buildTable();
});
