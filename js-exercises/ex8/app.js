let balon = document.getElementById('balonik');
let cnt = 0
function bigger(){
    if (cnt < 10) {
        let style = window.getComputedStyle(balon, null).getPropertyValue('font-size');
        let fontSize = parseFloat(style)
        balon.style.fontSize =  20+fontSize + 'px';
        cnt += 1;
    }
    else {
        balon.innerHTML = '💥';
        cnt = -10;
        document.removeEventListener('keydown', create);
    }

}
function smaller(){
    if (cnt > 0){
        let style = window.getComputedStyle(balon, null).getPropertyValue('font-size');
        let fontSize = parseFloat(style)
        balon.style.fontSize =  fontSize-20 +'px';
        cnt -= 1
    }
}

function create(e) {
    switch (e.keyCode) {
        case 38:
            bigger();
            break
        case 40:
            smaller();
            break;
    }
}
document.addEventListener('keydown', create);

balon.addEventListener('contextmenu', e => {
    e.preventDefault();
});

function changeMod(event){
    if(event.ctrlKey){
        let contextElement = document.getElementById("context-menu");

        document.getElementById("item").innerHTML ='Napompowano: '+ cnt*10 + '%';
        if (cnt<0){
            document.getElementById("item").innerHTML ='Balon wystrzelił!';
        }

        contextElement.style.top = event.clientY + "px";
        contextElement.style.left = event.clientX + "px";
        contextElement.classList.add("active");
    }

}

function changeMenu(e){
    balon.addEventListener("auxclick",function(event){changeMod(event);});
    }


balon.addEventListener('mouseup', changeMenu);


window.addEventListener("click",function(e){
    document.getElementById("context-menu").classList.remove("active");
});