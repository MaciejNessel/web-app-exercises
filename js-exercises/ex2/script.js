let img_array = ['./beach.jpg', "./mountains.jpg"];
let colors = ['blue', 'red'];
let cnt = 0;
let element = document.getElementById('changePhoto');
let photo = document.getElementById('photo')

function change(){
    photo.src = img_array[cnt%2];
    photo.style["border-color"] = colors[cnt%2];
    cnt+=1;
}

element.addEventListener('click', change);
