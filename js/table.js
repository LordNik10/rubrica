function createRowContanct(contact){          
    const tr = document.createElement('tr');
    tr.className = 'contact-row-selected';
    tr.id = 'contact_' + contact.id;

    const idPerson = document.createElement('td');
    idPerson.id = 'contact-id';

    const contactLink = document.createElement('a');
    contactLink.className = 'contact-id-style';
    contactLink.href = `../page/card.html?id=${contact.id}`;
    contactLink.textContent = contact.id;

    idPerson.appendChild(contactLink);

    const namePerson = document.createElement('td');
    namePerson.textContent = contact.nome;

    const surnamePerson = document.createElement('td');
    surnamePerson.className = 'contact-surname';
    surnamePerson.textContent = contact.cognome;
    surnamePerson.innerHTML += `<button data-contact-id="${contact.id}"class='delete btn-icon'><i class='fas fa-trash'></i></button>`;

    tr.appendChild(idPerson);
    tr.appendChild(namePerson);
    tr.appendChild(surnamePerson);

    return tr;

}

function addFunctionDelete(){
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click',function(event){
            deleteClick(event,this);
        });
    });
}

let contactList;
async function buildTable(){
    try {
        contactList = await getContactList();
        const containerTable = document.querySelector('#contact-list-container');
        for (let i=0;i<contactList.length;i++){
            const contact = contactList[i];

            containerTable.appendChild(createRowContanct(contact));
        }

        addFunctionDelete();
        
        document.querySelector('#btn-add').addEventListener('click',addPerson);
        document.querySelector('#research').addEventListener('keyup',search);
    } catch {
        throw new Error('errore');
    }
}

function deleteClick(event,deleteButton){
    console.log(event);
    event.preventDefault();
    const id = deleteButton.getAttribute('data-contact-id');
    deletePerson(id);
}

async function deletePerson(id){
    try {
        if (!confirm('Sicuro di eliminare la persona selezionata?')){
            return;
        }
        const res = await fetch(`http://localhost:3000/person/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });
        if (res.ok) {
            let tr = document.querySelector('#contact_'+id);
            tr.remove();
        } else {
            throw new Error("Sorry. Couldn't delete.");
        }
    } catch (err) {
        console.error(err);
    }
};


function search(){
    console.log(contactList);
    let surname = document.querySelector('#research').value;
    let contactTargets = contactList.filter(contact => contact.cognome.toLowerCase().startsWith(surname.toLowerCase()));

    const contactRowsContainer = document.querySelector('#contact-list-container');
    contactRowsContainer.innerHTML="";
    contactTargets.forEach(contact => contactRowsContainer.appendChild(createRowContanct(contact)));
    
}

async function addPerson(){
    try{
        let id = document.querySelector('#number-id').value;
        let name = document.querySelector('#input-name').value;
        let surname = document.querySelector('#input-surname').value;
        if (id=="" || name=="" || surname==""){
            alert('Compilare tutti i campi');
            return;
        }
        const person = {
            id: id,
            nome: name,
            cognome: surname
        };
        let res = await insertNewContact(person);
        if (res.ok) {
            const containerRowsContacts = document.querySelector('#contact-list-container');
            containerRowsContacts.appendChild(createRowContanct(person));
            addFunctionDelete();          
            
        } else {
            throw new Error("Sorry. Couldn't Add Person.");
        }
    } catch (err) {
        console.error(err);
    }
    document.querySelector('#number-id').value="";
    document.querySelector('#input-name').value="";
    document.querySelector('#input-surname').value="";
}

document.addEventListener('DOMContentLoaded',function(){
    buildTable();
})