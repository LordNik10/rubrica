function createRowContanct(contact){
            // const contactList = await getContactList();
            // console.log(contactList);
            // const contactContainer = document.querySelector('#contact-list-container');
            
            // for (i=0;i<contactList.length;i++){
                // const contact = contactList[i];
                
                const tr = document.createElement('tr');
                tr.className='contact-row-selected';
                tr.id='contact_'+contact.id;
                console.log(contact);
                
                const idPerson = document.createElement('td');
                idPerson.id='contact-id';
                const contactLink = document.createElement('a');
                contactLink.className='contact-id-style';
                contactLink.href=`../page/card.html?id=${contact.id}`;
                contactLink.textContent=contact.id;
                idPerson.appendChild(contactLink);
                
                const namePerson = document.createElement('td');
                namePerson.textContent=contact.nome;
                
                const surnamePerson = document.createElement('td');
                surnamePerson.className='contact-surname';
                surnamePerson.textContent=contact.cognome;
                console.log('eccomi');
                surnamePerson.innerHTML+=`<button data-contact-id="${ contact.id }"class='delete btn-icon'><i class='fas fa-trash'></i></button>`;
                
                tr.appendChild(idPerson);
                tr.appendChild(namePerson);
                tr.appendChild(surnamePerson);
                console.log(tr);
                // contactContainer.appendChild(tr);
            // }
            return tr;
            // let removeTr = document.getElementsByTagName('i');
            // console.log(removeTr);
            // for(i=0;i<removeTr.length;i++){
            //     removeTr[i].addEventListener('click',deletePerson.bind(null,contactList[i].id));
            // }

            // document.querySelector('#research').addEventListener('keyup',search);
            // document.querySelector('#btn-add').addEventListener('click',addPerson);
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

        const deleteButtons = document.querySelectorAll('.delete');
        console.log(deleteButtons);
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click',deleteClick);
        });

        document.querySelector('#research').addEventListener('keyup',search);
    } catch {
        throw new Error('errore');
    }
}

function deleteClick(event){
    console.log(event);
    event.preventDefault();
    const id = event.target.getAttribute('data-contact-id');
    console.log(id);
    deletePerson(id);
    // se clicco sul button funziona, se clicco sull'immagine no
}

async function deletePerson(id){
    console.log('entro dentro deletePerson');
    try {
        let res;
        if (confirm('Sicuro di eliminare la persona selezionata?')){
            res = await fetch(`http://localhost:3000/person/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });
        }else{
            return;
        }
        
        if (res.ok) {
            let tr = document.getElementById('contact_'+id);
            tr.remove();
        } else {
            throw new Error("Sorry. Couldn't delete.");
        }
    } catch (err) {
        console.error(err);
    }
};


function search(){
    let surname = document.querySelector('#research').value;
    let rowContact = document.querySelectorAll('tr');
    let contactTargets = contactList.filter(contact => contact.cognome.toLocaleLowerCase().startWith(surname.toLocaleLowerCase()));

    contactTargets.forEach(contact => createRowContanct(contact));
    
}

function searchOld(){
    let text = document.querySelector('#research');
    let tr = document.querySelectorAll('tr');
    for (i=1;i<tr.length;i++){
        let surnameTarget = tr[i].childNodes[2].textContent+'';
           if (!surnameTarget.toLocaleLowerCase().includes(text.value.toLocaleLowerCase())){
                tr[i].style.display='none';
                
            }else{
                tr[i].style.display='table-row';
        } 
    }
}

async function addPerson(){
    let id = document.getElementById('number-id').value;
    let name = document.getElementById('input-name').value;
    let surname = document.getElementById('input-surname').value;
    if (id=="" || name=="" || surname==""){
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
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(person),
        }); 
        if (res.ok) {
            const table = document.querySelector('tbody');
            const tr = document.createElement('tr');
            tr.className='contact-row-selected';
            tr.id='contact_'+person.id;
            for (i=0;i<3;i++){
              let td = document.createElement('td'); 
              td.id= 'td'+tr.id+''+i;

              const a = document.createElement('a');
              switch (i) {
                    case 0:
                        a.href='#'
                        a.textContent=person.id;
                        a.className='id';
                        td.appendChild(a);
                        break;
                    case 1:
                        td.textContent = person.nome;
                        break;
                    case 2:
                        td.textContent=person.cognome;
                        td.innerHTML+="<i class='fas fa-trash delete'></i>";
                        break;
              }
              tr.appendChild(td);
            }

            table.appendChild(tr);

            const deleteIcon = document.getElementsByTagName('i');
            deleteIcon[deleteIcon.length-1].addEventListener('click',deletePerson.bind(null,person.id));
            
        } else {
            throw new Error("Sorry. Couldn't Add Person.");
        }
    } catch (err) {
        console.error(err);
    }
    document.getElementById('number-id').value="";
    document.getElementById('input-name').value="";
    document.getElementById('input-surname').value="";
}

document.addEventListener('DOMContentLoaded',function(){
    buildTable();
})