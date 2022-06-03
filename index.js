async function chiamata(){
    try {
            const response = await fetch("http://localhost:3000/person");
            const data = await response.json();
            console.log(data);
            const table = document.querySelector('tbody');
            
            for (i=1;i<data.length;i++){
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
                        case 0: if (td.id=='td00'){
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
    }catch{
        throw new Error ("Errore");
    }
    
}

let deletePerson = async id => {
    try {
        let res = await fetch(`http://localhost:3000/person/${id}`, {
            header: {
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
    console.log('search');
    let tr = document.querySelectorAll('tr');
    console.log(tr);
    console.log(tr[1].childNodes[2].textContent);
    for (i=1;i<tr.length;i++){
        let surnameTarget = tr[i].childNodes[2].textContent+'';
        if (!surnameTarget.includes(text.value)){
            tr[i].style.display='none';
            console.log(text.value);
            let ciao = surnameTarget.includes(text.value);
            console.log(ciao);
        }else{
            tr[i].style.display='table-row';
        }
    }

}

document.addEventListener('DOMContentLoaded',function(){
    chiamata();
})