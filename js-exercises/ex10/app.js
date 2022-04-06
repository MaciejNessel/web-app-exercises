const main = document.querySelector('.main');

// Generate display from JSON data
function generateDisplay(data){
    const CategoryNames = data[0];
    const ProductNames = data[1];
    for(let categoryID in CategoryNames){

        //Add new category to menu section
        let liNew = document.createElement("li");
        liNew.id = CategoryNames[categoryID]+'Li';
        let array = document.createElement('div');
        array.classList.add('array');
        let inputNew = document.createElement("input");
        inputNew.type = 'checkbox';
        inputNew.id = CategoryNames[categoryID];
        let labelNew = document.createElement("label");
        labelNew.innerText = CategoryNames[categoryID];
        let ulNew = document.createElement("ul");
        liNew.appendChild(array);
        liNew.appendChild(inputNew);
        liNew.appendChild(labelNew);
        liNew.appendChild(ulNew);
        ulNew.classList.add('noneDisplay');

        // Add event to expand down values of category
        array.addEventListener('click', function (){
            if (ulNew.classList.toString() === 'noneDisplay'){
                ulNew.classList.remove('noneDisplay');
                array.classList.add('arrayActive');
            }
            else{
                ulNew.classList.add('noneDisplay');
                array.classList.remove('arrayActive');
            }

        })

        let unicIDFromCategory = 1;
        ProductNames[categoryID].forEach(function(productName){
            //Add new product to Category
            let productToDisplay = document.createElement('div');
            productToDisplay.innerText = productName;
            productToDisplay.className = 'noneDisplay';
            productToDisplay.id = "main"+CategoryNames[categoryID]+String(unicIDFromCategory);
            main.appendChild(productToDisplay);
            let liDownNew = document.createElement('li');
            let inputDownNew = document.createElement("input");
            inputDownNew.type = 'checkbox';
            inputDownNew.id = CategoryNames[categoryID]+String(unicIDFromCategory);

            // Add event to put the checked element on main section
            inputDownNew.addEventListener('click', function (){
                if(inputDownNew.checked){
                    productToDisplay.classList.remove('noneDisplay');
                }
                else{
                    productToDisplay.classList.add('noneDisplay');
                }
            })
            let newLabelDown = document.createElement("label");
            newLabelDown.innerText = productName;
            liDownNew.appendChild(inputDownNew);
            liDownNew.appendChild(newLabelDown);
            ulNew.appendChild(liDownNew);
            unicIDFromCategory += 1;
        })
        menuCheckboxes.appendChild(liNew);
    }
    // To manage display checboxes and put all items on main section
    manage();
}



//Obsługa JSON
function isIn(name, data){
    for(let i=0; i<data.length; i++){
        if (data[i] === name){
            return i;
        }
    }
    return null;
}

function addItems(products, insertList, position){
    for(let i=0;i<products.length; i++) {
        insertList[position].add(products[i]['nazwa']);
    }
    return insertList;
}

function returnListsFromJson(a, categoryName, productsOfCategory){
    for(let i in a){
        let val = a[i];
        for(let j in val){
            let currName = j;
            let currProducts = val[j];
            let isInInfo = isIn(currName, categoryName);
            if (isInInfo === null){
                categoryName.push(currName);
                productsOfCategory.push(new Set());
                productsOfCategory = addItems(currProducts, productsOfCategory, productsOfCategory.length - 1);
            }
            else{
                productsOfCategory = addItems(currProducts, productsOfCategory, isInInfo);
            }
        }
    }
    return [categoryName, productsOfCategory];
}
function generateData(a, b, c){
    a = a['ProduktyA'];
    b = b['ProduktyB'];
    c = c['ProduktyC'];
    let result = [[], []];
    result = returnListsFromJson(a, result[0], result[1]);
    result = returnListsFromJson(b, result[0], result[1]);
    result = returnListsFromJson(c, result[0], result[1]);

    return generateDisplay(result);
}
function manage(){
    const nodeArray = (selector, parent=document) => [].slice.call(parent.querySelectorAll(selector));

    const allThings = nodeArray('input');
        document.addEventListener('change', e => {
        let check = e.target;
        if(allThings.indexOf(check) === -1) return;
        const children = nodeArray('input', check.parentNode);

        let firstFlag = true;
        children.forEach(function(child){
            child.checked = check.checked
            if(child.checked && firstFlag===false){
                let className = "main"+child.id;
                let curr = document.getElementById(className);
                curr.classList.remove('noneDisplay');
            }
            if(!(child.checked) && firstFlag===false){
                let className = "main"+child.id;
                let curr = document.getElementById(className);
                curr.classList.add('noneDisplay');
            }
            firstFlag = false;
        });

        while(check){
            const parent   = (check.closest(['ul']).parentNode).querySelector('input');
            const siblings = nodeArray('input', parent.closest('li').querySelector(['ul']));
            const checkStatus = siblings.map(check => check.checked);
            const every  = checkStatus.every(Boolean);
            const some = checkStatus.some(Boolean);
            parent.checked = every;
            parent.indeterminate = !every && every !== some;
            check = check != parent ? parent : 0;
        }
    })
}



fetch('productsA.json')
    .then(a => a.json())
    .then(aRes => {
        fetch('productsB.json')
            .then(b => b.json())
            .then(bRes => {
                fetch('productsC.json')
                    .then(c => c.json())
                    .then(cRes=> {
                        document.querySelector('.loading').remove();
                        generateData(aRes, bRes, cRes);
                    });
            });
    });

