const dataInput = "cities.json";


function addCity(currCity, pos){
    const name = document.createElement("div");
    name.innerText = currCity['name'];
    pos.appendChild(name);

    const township = document.createElement("div");
    township.innerText = currCity['township'];
    pos.appendChild(township);

    const province = document.createElement("div");
    province.innerText = currCity['province'];
    pos.appendChild(province);

    const area = document.createElement("div");
    area.innerText = currCity['area'];
    pos.appendChild(area);

    const people = document.createElement("div");
    people.innerText = currCity['people'];
    pos.appendChild(people);

    const dentensity = document.createElement("div");
    dentensity.innerText = currCity['dentensity'];
    pos.appendChild(dentensity);
}

//a). wyświetli na stronie tylko miasta z województwa małopolskiego
fetch("cities.json")
    .then(x => x.json())
    .then(y => {
        y = y['cities'];
        const pos = document.getElementById('a');
        for(const item in y){
            const currCity = y[item];
            if (currCity['province'] === "małopolskie"){
                addCity(currCity, pos);
            }
        }
    });

// b). wyświetli miasta które w swojej nazwie posiadają dwa znaki ‘a’
fetch(dataInput)
    .then(x => x.json())
    .then(y => {
        y = y['cities'];
        const pos = document.getElementById('b');
        for(const item in y){
            const currCity = y[item];
            let cnt = 0;
            for(let i in currCity['name']){
                if (currCity['name'][i] === "a" || currCity['name'][i] ==="A"){
                    cnt += 1
                }
            }
            if (cnt===2){
                addCity(currCity, pos);
            }
        }
    });


// c). wyświetli piate pod kątem gęstości zaludnienia miasto w Polsce.

fetch(dataInput)
    .then(x => x.json())
    .then(y => {
        y = y['cities'];
        const pos = document.getElementById('c');
        y.sort(function (a, b){ return b.dentensity - a.dentensity})
        console.log(y);
        const currCity = y[4];
        addCity(currCity, pos);
    });

// d). dla wszystkich miast powyżej 100000 dodać ( na końcu) city do nazwy.
fetch(dataInput)
    .then(x => x.json())
    .then(y => {
        y = y['cities'];
        const pos = document.getElementById('d');
        for(const item in y){
            const currCity = y[item];
            if (currCity['people'] > 100000){
                const name = document.createElement("div");
                name.innerText = currCity['name'] + " city";
                pos.appendChild(name);

                const township = document.createElement("div");
                township.innerText = currCity['township'];
                pos.appendChild(township);

                const province = document.createElement("div");
                province.innerText = currCity['province'];
                pos.appendChild(province);

                const area = document.createElement("div");
                area.innerText = currCity['area'];
                pos.appendChild(area);

                const people = document.createElement("div");
                people.innerText = currCity['people'];
                pos.appendChild(people);

                const dentensity = document.createElement("div");
                dentensity.innerText = currCity['dentensity'];
                pos.appendChild(dentensity);
            }
            else addCity(currCity, pos);
        }
    });

// e) wyliczyć czy więcej jest miast powyżej 80000 mieszkańców czy poniżej wraz z informacją o
// ich liczbie.
fetch(dataInput)
    .then(x => x.json())
    .then(y => {
        y = y['cities'];
        const pos = document.getElementById('e');
        let below = 0;
        let above = 0;
        for(const item in y){
            const currCity = y[item];
            if (currCity['people'] >= 80000){
                above +=1;
            }
            else{
                below += 1
            }
        }
        pos.style.display = 'flex';
        if (below>above){
            pos.innerText = "Więcej jest miast poniżej 80000 mieszkańców. Wynik: poniżej: " + String(below) + " / powyżej: " + String(above);
        }
        else{
            pos.innerText = "Więcej jest miast powyżej 80000 mieszkańców. Wynik: poniżej: " + String(below) + " / powyżej: " + String(above);
        }
    });

// f). jaka jest średnia powierzchnia miast z powiatów zaczynających się na literkę „P”
fetch(dataInput)
    .then(x => x.json())
    .then(y => {
        y = y['cities'];
        const pos = document.getElementById('f');
        let counterCities = 0;
        let sumArea = 0;
        for(const item in y){
            const currCity = y[item];
            if (currCity['township'].match(/^P.*$/) || currCity['township'].match(/^p.*$/)){
                counterCities += 1;
                sumArea += currCity['area'];
            }
        }
        pos.style.display = 'flex';
        if(counterCities!==0){
            pos.innerText = "Średnia powierzchnia wynosi: " + String(sumArea / counterCities);
        }
        else{
            pos.innerText = "Brak takich miast";
        }
    });

