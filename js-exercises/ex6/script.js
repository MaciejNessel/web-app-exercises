let numberList = document.getElementById('numberList');
let addButton = document.getElementById('add');
let errorField = document.getElementById('errorField');

function addNew() {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');

    /*validation*/
    if (name.value === ''){
        errorField.innerHTML = 'Podaj imię i nazwisko';
        return false;
    }
    if (phone.value === ''){
        errorField.innerHTML = 'Podaj numer telefonu';
        return false;
    }
    if (phone.value.length <9){
        errorField.innerHTML = 'Zbyt krótki numer telefonu';
        return false;
    }
    if (phone.value.length >9){
        errorField.innerHTML = 'Zbyt długi numer telefonu';
        return false;
    }
    if (name.value.match(/^[a-z]+[' '][a-z]+$/) || name.value.match(/^[a-z]+$/) || name.value.match(/^[A-z]+[' '][a-z]+$/) || name.value.match(/^[a-z]+[' '][A-z]+$/)){
        errorField.innerHTML = 'Imię i nazwisko powinno zaczynać się z dużej litery';
        return false;
    }
    if (name.value.match(/^[A-Z][a-z]+[A-Z][a-z]+$/)){
        errorField.innerHTML = 'Brakuje odstępu pomiędzy imieniem i nazwiskiem';
        return false;
    }

    if (!name.value.match(/^[A-Z][a-z]+[' '][A-Z][a-z]+$/)){
        errorField.innerHTML = 'Podaj poprawnie imię i nazwisko';
        return false;
    }

    if (!phone.value.match(/^[0-9]+$/)){
        errorField.innerHTML = 'Podaj poprawnie numer telefonu';
        return false;
    }
    errorField.innerHTML = '';
    let newElement = document.createElement('div');
    newElement.className = 'item';
    newElement.innerHTML= '<p>'+ name.value.bold() +"<br><br>" + phone.value + '</p>';

    let deleteBtn = document.createElement('div');
    deleteBtn.className = 'deleteBtn';

    let img = new Image(25, 25);
    img.src = 'bin.png';
    img.className = 'imgBtn'

    numberList.appendChild(newElement);
    deleteBtn.appendChild(img);
    newElement.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function (){ newElement.remove()});

    name.value = '';
    phone.value = '';
}

addButton.addEventListener('click', addNew);