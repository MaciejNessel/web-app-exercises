let element = document.getElementById('name');

function inputName(){
    let currentName = window.prompt("Name: ");

    if (currentName.charAt(currentName.length-1) !== 'a') {
        document.getElementById("resultName").innerHTML = "Witam pana: " + currentName;
    } else {
        document.getElementById("resultName").innerHTML = "Witam panią: " + currentName;

    }
}

element.addEventListener('click', inputName);
