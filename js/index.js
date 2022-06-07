async function buildTable(){
    try {
            const response = await fetch("http://localhost:3000/person");
            const data = await response.json();
            console.log(data);
            const table = document.querySelector('tbody');
            
            for (i=1;i<data.length+1;i++){
                const tr = document.createElement('tr');
                tr.className='highlights';
                tr.id='tr'+i;
                for (j=0;j<3;j++){
                    const td = document.createElement('td');
                    td.id='td'+i+j;
                    const a = document.createElement('a');
                    if(j==2){
                        td.classList.add='td-delete';
                    }
                    switch(j){
                        case 0: if (td.id=='td10'){
                                    a.href='./card.html';
                                }else{
                                    a.href='#';
                                }

                                a.textContent=data[i-1].id;
                                a.classList.add('id');
                                td.appendChild(a);
                                break;
                                
                        case 1: td.textContent=data[i-1].nome;
                                break;
                        case 2: td.textContent=data[i-1].cognome;
                                td.innerHTML+="<i class='fas fa-trash delete'></i>";
                                break;
                    }
                    tr.appendChild(td)
                }
                table.appendChild(tr);
            }
            let removeTr = document.getElementsByTagName('i');
            console.log(removeTr);
            for(i=0;i<removeTr.length;i++){
                removeTr[i].addEventListener('click',deletePerson.bind(null,data[i].id));
            }

            document.querySelector('#research').addEventListener('keyup',search);
            document.querySelector('#btn-add').addEventListener('click',addPerson);
    }catch{
        throw new Error ("Errore");
    }
    
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
            let tr = document.getElementById('tr'+id);
            tr.remove();
        } else {
            throw new Error("Sorry. Couldn't delete.");
        }
    } catch (err) {
        console.error(err);
    }
};

function search(){
    let text = document.querySelector('#research');
    let tr = document.querySelectorAll('tr');
    for (i=1;i<tr.length;i++){
        let surnameTarget = tr[i].childNodes[2].textContent+'';
           if (!surnameTarget.includes(text.value)){
                tr[i].style.display='none';
            }else{
                tr[i].style.display='table-row';
        } 
        
        
    }
}

async function addPerson(){
    const id = document.getElementById('number-id').value;
    const name = document.getElementById('input-name').value;
    const surname = document.getElementById('input-surname').value;
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
            tr.className='highlights';
            tr.id='tr'+person.id;
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
}

document.addEventListener('DOMContentLoaded',function(){
    buildTable();
})