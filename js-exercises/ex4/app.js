let test_btn = document.getElementById('test');
test_btn.disabled = true;
let add_btn = document.getElementById('add');
let delete_btn = document.getElementById('delete');

let cnt = 0;
document.getElementById('licznik').innerHTML = cnt;

function add_cnt(){
    cnt += 1;
    document.getElementById('licznik').innerHTML = cnt;
}

function disable_btn(){
    test_btn.disabled = true;
    cnt = 0;
    document.getElementById('licznik').innerHTML = cnt;
}

function enable_btn(){
    test_btn.disabled = false;
}

add_btn.addEventListener('click', enable_btn);
delete_btn.addEventListener('click', disable_btn);
test_btn.addEventListener('click', add_cnt);