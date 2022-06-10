async function buildCard(){
    try {
        let url = window.location.search;
        console.log(window);
        url = url.split('=');
        const id = url[1];
        console.log(url);
        const personInformation = await loadCard(id);
        console.log(personInformation);

        const nameCard = document.querySelector('#name-contact');
        nameCard.textContent = personInformation.nome+' '+personInformation.cognome;

        const email = document.querySelector('#email');
        const emailLink = document.createElement('a');
        emailLink.id='emailLink';
        emailLink.textContent = personInformation.email;
        emailLink.href='mailto:niccolo.naso@bitrock.it';
        email.appendChild(emailLink);

        const tel = document.querySelector('#tel');
        const telLink = document.createElement('a');
        telLink.id='telLink';
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

        const favoriteVideo = document.querySelector('#favorite-video');
        favoriteVideo.controls=true;
        favoriteVideo.width='250px';
        favoriteVideo.src=personInformation.videoPreferito;
        
        const saluto = document.querySelector('#saluto');
        saluto.src=personInformation.saluto;
    
        const btnChange = document.querySelector('#btn-modifica');
        btnChange.addEventListener('click',showMod);
        

    } catch (error) {
        console.log(error);
    }
    
}

function showMod(){
    const card = document.querySelector('#card');
    card.style.display='none';

    const container = document.querySelector('#container');

    const changePanel = document.createElement('div');
    changePanel.id='modForm';
    changePanel.className='modForm';

    const exit = document.createElement('img');
    exit.src='../media/times-solid.svg';
    exit.style.position='absolute';
    exit.style.top='0';
    exit.style.right='0';
    exit.style.padding='10px';
    exit.style.width='3%';

    const changePanelInfo = document.createElement('div');
    changePanelInfo.style.width='100%'
    changePanelInfo.style.display='flex';
    changePanelInfo.style.flexDirection='column';
    changePanelInfo.style.alignItems='center';
    changePanelInfo.style.marginTop='15%';

    const titleContact = document.createElement('h3');
    titleContact.textContent='Contatti';

    const imgprofile = document.createElement('img');
    imgprofile.src=document.querySelector('#imgprofilo').src;
    imgprofile.style.width='200px';
    imgprofile.style.height='auto';

    const titleHobbies = document.createElement('h3');
    titleHobbies.textContent='Hobbies';

    const allHobbies = document.querySelector('#list-hobbies');

    const favoriteVideo = document.createElement('video');
    favoriteVideo.controls=true;
    favoriteVideo.id='favorite-video-new';
    favoriteVideo.src=document.querySelector('#favorite-video').src;
    favoriteVideo.className='video-style';
    
    const saluto = document.createElement('audio');
    saluto.id='salutoNew';
    saluto.src=document.querySelector('#saluto').src;
    saluto.controls=true;

    const btnSaveChange = document.createElement('button');
    btnSaveChange.type='button';
    btnSaveChange.style.marginTop='2%';
    btnSaveChange.className='btn-modifica';
    btnSaveChange.textContent='Salva';
    btnSaveChange.style.content="";
    btnSaveChange.id='btn-save-change';
    btnSaveChange.addEventListener('click',saveMod);

    changePanelInfo.appendChild(createLabel('Nome e cognome'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#name-contact').textContent,'name-contact-new'));
    changePanelInfo.appendChild(imgprofile);
    changePanelInfo.appendChild(createInput('file','','imgProfileNew'));
    changePanelInfo.appendChild(titleContact);
    changePanelInfo.appendChild(createLabel('Email:'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#emailLink').textContent,'emailLinkNew'));
    changePanelInfo.appendChild(createLabel('Tel:'));
    changePanelInfo.appendChild(createInput('text',document.querySelector('#telLink').textContent,'telLinkNew'));
    changePanelInfo.appendChild(titleHobbies);
    for (let i=0;i<allHobbies.children.length;i++){
        const hobbie = allHobbies.children[i];
        changePanelInfo.appendChild(createInput('text',hobbie.outerText,'hobbie'+i+'new'));
    }
    changePanelInfo.appendChild(createLabel('Video preferito'));
    changePanelInfo.appendChild(favoriteVideo);
    changePanelInfo.appendChild(createLabel('Saluto'));
    changePanelInfo.appendChild(saluto);
    changePanelInfo.appendChild(btnSaveChange);



    changePanel.appendChild(exit);
    changePanel.appendChild(changePanelInfo);

    container.appendChild(changePanel);

}

function createInput(typeOfInput,content,id){
    const element = document.createElement('input');
    element.type=typeOfInput;
    element.style.width='30%';
    element.style.textAlign='center';
    element.id=id;
    element.style.marginBottom='1%';
    element.value= content;

    return element;
}

function createLabel (content){
    const element = document.createElement('label');
    element.textContent=content;
    return element;
}

function saveMod(){
    console.log('dentro saveMod');
    document.querySelector('#modForm').style.display='none';
    document.querySelector('#card').style.display='grid';
    
    const nameSurname = document.querySelector('#name-contact');
    nameSurname.textContent=document.querySelector('#name-contact-new').value;

    // const imgprofile = document.querySelector('#imgprofilo');
    // if (document.querySelector('#imgProfileNew').value!=""){
    //     console.log('sono dentro');
    //     console.log(imgprofile.src);
    //     console.log(document.querySelector('#imgProfileNew').webRelativePath);
    //     imgprofile.src=document.querySelector('#imgProfileNew').webkitdirectory;
    // }
    const allHobbies = document.querySelector('#list-hobbies');
    const numerHobbie = allHobbies.length;
    while (allHobbies.firstChild) {
    allHobbies.removeChild(allHobbies.firstChild);
}


    for (let i=0;i<numerHobbie;i++){
        const hobbie = document.createElement('li');
        hobbie.id='hobbie'+i;
        hobbie.textContent=document.querySelector('#hobbie'+i+'new').value;
        allHobbies.appendChild(hobbie);
    }
    
}


document.addEventListener('DOMContentLoaded',function(){
    buildCard();
});