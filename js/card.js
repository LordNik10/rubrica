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
        emailLink.textContent = personInformation.email;
        emailLink.href='mailto:niccolo.naso@bitrock.it';
        email.appendChild(emailLink);

        const tel = document.querySelector('#tel');
        const telLink = document.createElement('a');
        telLink.textContent = personInformation.tel;
        telLink.href='tel:499763';
        tel.appendChild(telLink);

        const imgprofile = document.querySelector('#imgprofilo');
        imgprofile.src=personInformation.fotoprofilo;

        const listHobbies = document.querySelector('#list-hobbies');
        personInformation.hobbies.forEach(hobbie => {
            const liHobbies = document.createElement('li');    
            liHobbies.textContent=hobbie;
            listHobbies.appendChild(liHobbies);
        });

        const favoriteVideo = document.querySelector('#favorite-video');
        favoriteVideo.src=personInformation.videoPreferito;
        
        const saluto = document.querySelector('#saluto');
        saluto.src=personInformation.saluto;
    
    } catch (error) {
        console.log(error);
    }
    
}

document.addEventListener('DOMContentLoaded',function(){
    buildCard();
});