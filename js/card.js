let id;

async function buildCard(){
    try {
        let url = window.location.search;
        console.log(window);
        url = url.split('=');
        id = url[1];
        console.log(url);
        const personInformation = await loadCard(id);
        console.log(personInformation);

        const nameCard = document.querySelector('#name-contact');
        nameCard.textContent = personInformation.nome+' '+personInformation.cognome;

        const email = document.querySelector('#email');
        const emailLink = document.createElement('a');
        emailLink.id='emailLink';
        emailLink.className='label-a-generic';
        emailLink.textContent = personInformation.email;
        emailLink.href='mailto:niccolo.naso@bitrock.it';
        email.appendChild(emailLink);

        const tel = document.querySelector('#tel');
        const telLink = document.createElement('a');
        telLink.id='telLink';
        telLink.className='label-a-generic';
        telLink.textContent = personInformation.tel;
        telLink.href='tel:499763';
        tel.appendChild(telLink);

        const imgprofile = document.querySelector('#imgprofilo');
        imgprofile.src=personInformation.fotoprofilo;

        const listHobbies = document.querySelector('#list-hobbies');
        let i = 0;
        personInformation.hobbies.forEach(hobbie => {
            const liHobbies = document.createElement('li');    
            liHobbies.textContent=hobbie;
            liHobbies.id='hobbie'+i;
            listHobbies.appendChild(liHobbies);
            i++;
        });
        const favoriteVideo = document.querySelector('#video');
        console.log(favoriteVideo);
        const sourceFavoriteVideo = document.createElement('source');
        // sourceFavoriteVideo.src='../media/CassanoChapeau.mp4';
        sourceFavoriteVideo.setAttribute('src','../media/CassanoChapeau.mp4');
        sourceFavoriteVideo.id='video-source';
        sourceFavoriteVideo.setAttribute("type", "video/mp4");
        favoriteVideo.appendChild(sourceFavoriteVideo);
        // favoriteVideo.controls=true;
        // favoriteVideo.width='250px';
        // favoriteVideo.src=personInformation.videoPreferito;

        // let video = document.getElementById("video__container").firstElementChild;
        // let source = document.createElement("source");
        // source.setAttribute("src", "../assets/videos/sample.mp4");
        // source.setAttribute("type", "video/mp4");
        // video.appendChild(source);
        
        const saluto = document.querySelector('#saluto');
        saluto.src=personInformation.saluto;
    
        const btnChange = document.querySelector('#btn-modifica');
        btnChange.addEventListener('click',showMod);
        

    } catch (error) {
        console.log(error);
    }
    
}
let nHobbie=0;
function showMod(){
    const card = document.querySelector('#card');
    card.style.display='none';

    if (document.querySelector('#modForm')){
        document.querySelector('#modForm').style.display='block';
        return;
    }

    const container = document.querySelector('#container');

    const modForm = document.createElement('div');
    modForm.id='modForm';
    modForm.className='modForm';

    const exit = document.createElement('img');
    exit.src='../media/times-solid.svg';
    exit.id='close';
    exit.className='close';
    exit.addEventListener('click',closeMod);

    const changePanelInfo = document.createElement('div');
    changePanelInfo.id='modForm-body';
    changePanelInfo.className='modForm-body';

    const titleContact = document.createElement('h3');
    titleContact.textContent='Contatti';
    titleContact.className='label-a-generic';

    const imgprofile = document.createElement('img');
    imgprofile.src=document.querySelector('#imgprofilo').src;
    imgprofile.className='imgprofilo';

    const titleHobbies = document.createElement('h3');
    titleHobbies.textContent='Hobbies';
    titleHobbies.className='label-a-generic';

    const allHobbies = document.querySelector('#list-hobbies');

    const favoriteVideo = document.createElement('video');
    favoriteVideo.controls=true;
    favoriteVideo.id='favorite-video-new';
    favoriteVideo.src=document.querySelector('#video-source').src;
    favoriteVideo.className='video-style';
    
    const saluto = document.createElement('audio');
    saluto.id='salutoNew';
    saluto.src=document.querySelector('#saluto').src;
    saluto.controls=true;

    const btnSaveChange = document.createElement('button');
    btnSaveChange.type='button';
    btnSaveChange.style.marginTop='2%';
    btnSaveChange.className='btn-generic';
    btnSaveChange.textContent='Salva';
    btnSaveChange.id='btn-save-change';
    btnSaveChange.addEventListener('click',saveMod);

    const hobbiesContainer = document.createElement('div');
    hobbiesContainer.id='hobbies-container';
    hobbiesContainer.className='hobbies-container';

    const addHobbie = document.createElement('button');
    addHobbie.id='add-hobbie';
    addHobbie.className='btn-generic';
    addHobbie.textContent='Aggiungi hobbie';
    addHobbie.style.marginBottom='3%';
    addHobbie.addEventListener('click',addNewHobbie);

    changePanelInfo.appendChild(createLabel('Nome e cognome'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#name-contact').textContent,'name-contact-new'));
    changePanelInfo.appendChild(imgprofile);
    // changePanelInfo.appendChild(createInput('file','','imgProfileNew'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#imgprofilo').src,'imgProfileNew'));
    changePanelInfo.appendChild(titleContact);
    changePanelInfo.appendChild(createLabel('Email:'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#emailLink').textContent,'emailLinkNew'));
    changePanelInfo.appendChild(createLabel('Tel:'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#telLink').textContent,'telLinkNew'));
    changePanelInfo.appendChild(titleHobbies);
    changePanelInfo.appendChild(hobbiesContainer);
    for (let i=0;i<allHobbies.children.length;i++){
        const hobbie = allHobbies.children[i];
        hobbiesContainer.appendChild(createInput('text',hobbie.outerText,'hobbie'+i+'new'));
        nHobbie++;
    }
    changePanelInfo.appendChild(addHobbie);
    changePanelInfo.appendChild(createLabel('Video preferito'));
    changePanelInfo.appendChild(favoriteVideo);
    changePanelInfo.appendChild(createLabel('Saluto'));
    changePanelInfo.appendChild(saluto);
    changePanelInfo.appendChild(btnSaveChange);

    modForm.appendChild(exit);
    modForm.appendChild(changePanelInfo);

    container.appendChild(modForm);

}

function createInput(typeOfInput,content,id){
    const element = document.createElement('input');
    element.type=typeOfInput;
    element.className='input-modForm';
    element.id=id;
    element.value= content;
    return element;
}

function createLabel (content){
    const element = document.createElement('label');
    element.textContent=content;
    element.className='label-a-generic';
    return element;
}

function saveMod(){
    let newPerson = {
        id: id,
        hobbies: [],
    };

    document.querySelector('#modForm').style.display='none';
    document.querySelector('#card').style.display='grid';
    
    const nameSurname = document.querySelector('#name-contact');
    nameSurname.textContent=document.querySelector('#name-contact-new').value;
    let nomeCognome = nameSurname.textContent.split(" ");
    newPerson.nome=nomeCognome[0];
    newPerson.cognome=nomeCognome[1];

    const email = document.querySelector('#emailLink');
    email.textContent=document.querySelector('#emailLinkNew').value;
    newPerson.email=email.textContent;

    const tel = document.querySelector('#telLink');
    tel.textContent=document.querySelector('#telLinkNew').value;
    newPerson.tel=tel.textContent;

    const imgprofile = document.querySelector('#imgprofilo');
    imgprofile.src=document.querySelector('#imgProfileNew').value;
    

    newPerson.fotoprofilo=document.querySelector('#imgprofilo').src;

    const allHobbies = document.querySelector('#list-hobbies');
    console.log(allHobbies.childElementCount);
    const numerHobbie = allHobbies.childElementCount;
    console.log(numerHobbie);
    while (allHobbies.firstChild) {
        console.log('dentro while');
    allHobbies.removeChild(allHobbies.firstChild);
    }
    console.log(numerHobbie);

    for (let i=0;i<nHobbie;i++){
        if (document.querySelector('#hobbie'+i+'new').value!=""){
            const hobbie = document.createElement('li');
            hobbie.id='hobbie'+i;
            hobbie.textContent=document.querySelector('#hobbie'+i+'new').value;
            allHobbies.appendChild(hobbie);
            newPerson.hobbies[i]=hobbie.textContent;
        }
        
    }

    newPerson.residenza="Pontedera(PI)";
    newPerson.videoPreferito=document.querySelector('#favorite-video-new').src;
    newPerson.saluto=document.querySelector('#salutoNew').src;

    changeCard(id,newPerson);
    
}

function closeMod(){
    document.querySelector('#modForm').style.display='none';
    document.querySelector('#card').style.display='grid';
}

function addNewHobbie(){
    const newHobbie = createInput('text',"",'hobbie'+nHobbie+'new');
    document.querySelector('#hobbies-container').appendChild(newHobbie);
    nHobbie++;
}



document.addEventListener('DOMContentLoaded',function(){
    buildCard();
});