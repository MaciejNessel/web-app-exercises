let addButton = document.getElementById('add');
let removeButton = document.getElementById('remove');
let myList = ["<li>Item 1</li>","<li>Item 2</li>", "<li>Item 3</li>", "<li>Item 4</li>", "<li>Item 5</li>"];
document.getElementById('lista').innerHTML ="Aktualna zawartość listy: " + myList.toString().replaceAll(",","");

function addElement(){
    const input = "<li>Item " + (myList.length + 1) + "</li>";
    myList.push(input);
    document.getElementById('lista').innerHTML ="Aktualna zawartość listy: "+ myList.toString().replaceAll(",","");
    }

function removeElement(){
    myList.shift();
    document.getElementById('lista').innerHTML ="Aktualna zawartość listy: "+ myList.toString().replaceAll(",","");
}

addButton.addEventListener('click', addElement);
removeButton.addEventListener('click', removeElement);