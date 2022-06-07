async function chiamata(){
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
            // document.getElementById('input-name').addEventListener('blur',debug);
    }catch{
        throw new Error ("Errore");
    }
    
}

let deletePerson = async id => {
    try {
        let res = await fetch(`http://localhost:3000/person/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });
        if (res.ok) {
            window.location.href = "http://localhost:8080/page/table.html";
        } else {
            throw new Error("Sorry. Couldn't delete.");
        }
    } catch (err) {
        console.error(err);
    }
};

let search = () => {
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

// let debug = () =>{
//     let name = document.getElementById('input-name').value;
//     let surname = document.getElementById('input-surname').value;
//     let id = document.getElementById('number-id').value;
//     console.log(name);
//     console.log(surname);
//     let person = {
//         id:id,
//         nome:name,
//         cognome:surname
//     };
//     console.log(person);
// }

let addPerson = async () =>{
    let id = document.getElementById('number-id').value;
    let name = document.getElementById('input-name').value;
    let surname = document.getElementById('input-surname').value;
    let person = {
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
            window.location.href = "http://localhost:8080/page/table.html";
        } else {
            throw new Error("Sorry. Couldn't Add Person.");
        }
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded',function(){
    chiamata();
})