let blue_btn = document.querySelector('.blue');
let red_btn = document.querySelector('.red');
let yellow_btn = document.querySelector('.yellow');
let suma = document.getElementById('suma');
let text = document.getElementById('HeadText');
let changeMode = document.getElementById('changeMode');
let reset = document.getElementById('reset');
let cnt = 0;
suma.innerHTML = cnt;
let propagation = true;

function resetAll(){
    restartBtn();
    cnt = 0;
    suma.innerHTML = cnt;
}
reset.addEventListener('click', resetAll);

function checkValue(){
    if (cnt>30){
        red_btn.removeEventListener('click', add_2);
        red_btn.classList.add('disable');
    }
    if (cnt>50){
        yellow_btn.removeEventListener('click', add_5);
        yellow_btn.classList.add('disable');
    }
}

function restartBtn(){
    yellow_btn.classList.remove('disable');
    red_btn.classList.remove('disable');

    yellow_btn.addEventListener('click', add_5);
    blue_btn.addEventListener('click', add_1);
    red_btn.addEventListener('click', add_2);
}

function add_1(e){
    if(this ===e.target){
        text.innerHTML = 'nacisnąłeś niebieski o wartości 1';
    }
    if (propagation === false){
        if(this === e.target)
        {
            cnt += 1;
            suma.innerHTML = cnt;
            checkValue();
        }
    }
    else {
        cnt += 1;
        suma.innerHTML = cnt;
        checkValue();
    }
}

function add_2(e){
    if(this ===e.target){
        text.innerHTML = 'nacisnąłeś czerwony o wartości 2';
    }
    if (propagation === false){
        if(this === e.target)
        {
            cnt += 2;
            suma.innerHTML = cnt;
            checkValue();
        }
    }
    else {
        cnt += 2;
        suma.innerHTML = cnt;
        checkValue();
    }
}

function add_5(e){
    if(this ===e.target){
        text.innerHTML = 'nacisnąłeś żółty o wartości 5';
    }
    if (propagation === false){
        if(this === e.target)
        {
            cnt += 5;
            suma.innerHTML = cnt;
            checkValue();
        }
    }
    else {
        cnt += 5;
        suma.innerHTML = cnt;
        checkValue();
    }
}

changeMode.addEventListener('click', function (){
    if(propagation){
        changeMode.innerHTML = 'Włącz propagację';
    } else{
        changeMode.innerHTML = 'Wyłącz propagację';
    }
    propagation = !propagation;
})

restartBtn();

