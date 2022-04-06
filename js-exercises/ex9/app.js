
const employee = [
    {
        id: 1,
        name: "Anna Nowak",
        job: "web designer",
        img:
            "./images/3.jpg",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae blanditiis cupiditate dicta, eligendi enim excepturi exercitationem fuga harum impedit in ipsa itaque libero maxime modi nisi, quasi quis, ratione repudiandae sapiente sit tempora velit voluptatibus? Accusamus accusantium aperiam architecto aspernatur atque commodi culpa deserunt, dolorem ea eum explicabo facere fuga illum impedit inventore iste itaque iusto labore mollitia non nostrum odit omnis placeat quo quos rerum sit sunt tempore vitae voluptatem? Doloremque, illum nihil pariatur quam quod saepe sequi veritatis."
    },
    {
        id: 2,
        name: "Tomasz Kowalski",
        job: "web developer",
        img:
            "./images/2.jpg",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae blanditiis cupiditate dicta, eligendi enim excepturi exercitationem fuga harum impedit in ipsa itaque libero maxime modi nisi, quasi quis, ratione repudiandae sapiente sit tempora velit voluptatibus? Accusamus accusantium aperiam architecto aspernatur atque commodi culpa deserunt, dolorem ea eum explicabo facere fuga illum impedit inventore iste itaque iusto labore mollitia non nostrum odit omnis placeat quo quos rerum sit sunt tempore vitae voluptatem? Doloremque, illum nihil pariatur quam quod saepe sequi veritatis. A alias eius explicabo nemo nihil nostrum quo ratione voluptate! Asperiores commodi consequatur consequuntur iste natus nesciunt, numquam omnis sunt?"
    },
    {
        id: 3,
        name: "Katarzyna Wiśniewska",
        job: "intern",
        img:
            "./images/1.jpg",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae blanditiis cupiditate dicta, eligendi enim excepturi exercitationem fuga harum impedit in ipsa itaque libero maxime modi nisi, quasi quis, ratione repudiandae sapiente sit tempora velit voluptatibus?"
    },
    {
        id: 4,
        name: "Zbigniew Wójcik",
        job: "the boss",
        img:
            "./images/4.jpg",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae blanditiis cupiditate dicta, eligendi enim excepturi exercitationem fuga harum impedit in ipsa itaque libero maxime modi nisi, quasi quis, ratione repudiandae sapiente sit tempora velit voluptatibus? Accusamus accusantium aperiam architecto aspernatur atque commodi culpa deserunt, dolorem ea eum explicabo facere fuga illum impedit inventore iste itaque iusto labore mollitia non nostrum odit omnis placeat quo quos rerum sit sunt tempore vitae voluptatem? Doloremque, illum nihil pariatur quam quod saepe sequi veritatis. A alias eius explicabo nemo nihil nostrum quo ratione voluptate! Asperiores commodi consequatur consequuntur iste natus nesciunt, numquam omnis sunt?"
    },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prevButton");
const nextBtn = document.querySelector(".nextButton");
const randomBtn = document.querySelector(".randomEmployee");


let currentItem = 0;


window.addEventListener("DOMContentLoaded", function () {
    const item = employee[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
});


function showPerson(person) {
    const item = employee[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

nextBtn.addEventListener("click", function () {
    currentItem++;
    if (currentItem > employee.length - 1) {
        currentItem = 0;
    }
    showPerson(currentItem);
});

prevBtn.addEventListener("click", function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = employee.length - 1;
    }
    showPerson(currentItem);
});

randomBtn.addEventListener("click", function () {
    currentItem = Math.floor(Math.random() * employee.length);
    showPerson(currentItem);
});