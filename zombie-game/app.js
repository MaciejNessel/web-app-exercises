// Access to HTML elements
const mainBoard = document.querySelector(".board");
const zombieContainer = document.querySelector(".zombieContainer");
const gunPoint = document.querySelector(".mousePointer");
const currScore = document.querySelector(".currentScore");
const endingResult = document.querySelector(".resultsRanking");
const startingField  = document.querySelector(".startingField");
const endingField = document.querySelector(".endingField");
const endingScore = document.getElementById('endingScore');
const nickError = document.getElementById('nickError');
const startingElem = document.querySelector(".starting");
const life = document.querySelector(".life");
const hits = document.querySelector(".hitsRow");

// Buttons
const restartButton = document.getElementById('restartButton');
const sendNickButton = document.getElementById('sendNickButton');
const newGameButton = document.getElementById('newGameButton');
const currentNick = document.querySelector('.currentNick');
let renew = 0;

let audio1 = new Howl({
      src: ['1.mp3'],
      volume: 0.05,
    });
let audio2 = new Howl({
      src: ['2.mp3'],
      volume: 0.05,
    });
let audio3 = new Howl({
      src: ['3.mp3'],
      volume: 0.1,
    });


// Main config
let score = 0;
let missingZombie = 0;
let hitsInRow = 0;


// Point management
function addScore(s) {
	audio1.play();
    score += s;
	hitsInRow += 1;
	hitsChange(hitsInRow);
	if(hitsInRow === 5){
		hitsInRow = 0;
		hitsChange(hitsInRow);
		if(missingZombie>0 && renew<3){
			missingZombie-=1;
			lifeChange(3-missingZombie);
			renew+=1;
		}
		else{
			score+=20;
		}
	}
    if (score<0){
        let curr = -score;
        currScore.innerText = "-" + curr.toString().padStart(5, "0");
    }
    else{
        currScore.innerText = score.toString().padStart(5, "0");
    }
}

function subtractScore(e){
	if(this===e.target){
		hitsInRow = 0;
		hitsChange(0);
    	score -= 6;
        score = Math.max(score, 0);
		audio2.play();
	}
    if (score<0){
        let curr = -score;
        currScore.innerText = "-" + curr.toString().padStart(5, "0");
    }
    else{
        currScore.innerText = score.toString().padStart(5, "0");
    }
}

//Mouse-Pointer-Style
function newMouse(e){
    document.querySelector("html").classList.add("HidePointer");
    gunPoint.style.zIndex= 20000;
    gunPoint.style.left = e.pageX + "px";
    gunPoint.style.top = e.pageY + "px";
}

function restoreMouse(){
    document.querySelector("html").classList.remove("HidePointer");
    document.removeEventListener("mousemove", newMouse);
}

// Buttons functions
restartButton.addEventListener('click', function(){
    console.log('start again');
    activateGame().then(r => {});
});

sendNickButton.addEventListener('click', function(){
    currNick = document.getElementById('InsertNickName').value;
    getNick();
});

newGameButton.addEventListener('click', function (){
    startingField.classList.add('active');
    endingField.classList.remove('active');
} )

// When 3 zombies will run away -> end game
function getResults(){

    // Restore default mouse pointer
    restoreMouse();
    gunPoint.style.zIndex= -1;
    mainBoard.removeEventListener('mousedown', subtractScore);

    // Delete the remaining zombies
    zombieContainer.innerHTML = '';

    // Activate ending board
    endingField.classList.add('active');
    currentNick.innerText = currNick;
    endingScore.innerHTML = score;

    // Download data with results
    fetch('https://jsonblob.com/api/jsonBlob/915335700191395840')
        .then(x => x.json())
        .then(y => generateRank(y.scores, score, currNick));
}

// Generate result score board
function generateRank(x, s, n){
    // Clear previous data
    endingResult.innerHTML = ''
    let now = new Date();
    let flag = false;

    // Check if the nick is already in the database -> if so, replace the result if it is better
    for (let j = 0; j<x.length; j++){
        if(x[j].nick === n){
            flag = true;
            if(s>x[j].score){
                x[j].score = String(s);
                x[j].date =  now.toLocaleString();
                break
            }
            break;
        }
    }

    // If new nick -> add score
    if (flag===false){
        x.push({ "nick": String(n), "score": String(s), "date": now.toLocaleString()});
    }

    //Sort and remove the lowest score
    x.sort(function (a, b){ return b.score - a.score});
    while (x.length>7){
        x.pop();
    }

    //Create result board
    let nickDiv = document.createElement("div");
    nickDiv.innerHTML = 'Nick';
    endingResult.appendChild(nickDiv);
    let scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = 'Score';
    endingResult.appendChild(scoreDiv);
    let dateDiv = document.createElement("div");
    dateDiv.innerHTML = 'Date';
    endingResult.appendChild(dateDiv);

    // Add 7 best scores
    for(let i = 0; i<Math.min(7, x.length); i++){
        let nickDiv = document.createElement("div");
        nickDiv.innerHTML = x[i].nick ;
        endingResult.appendChild(nickDiv);

        let scoreDiv = document.createElement("div");
        scoreDiv.innerHTML = x[i].score ;
        endingResult.appendChild(scoreDiv);

        let dateDiv = document.createElement("div");
        dateDiv.innerHTML = x[i].date;
        endingResult.appendChild(dateDiv);
    }

    //Update database scores
    const data = '{ "scores" :' + JSON.stringify(x)+ '}'
    fetch('https://jsonblob.com/api/jsonBlob/915335700191395840', {
        method: "put",
        headers: {
            "Content-type" : "application/json",
            "Accept": "application/json",
        },
        body: data
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
}

// Starting 3..2..1
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleeping() {
  startingElem.innerText = '3';
  await sleep(700);
  startingElem.innerText = '2';
  await sleep(700);
  startingElem.innerText = '1';
  await sleep(700);
  startingElem.innerText = '';
  }

//Manage life emoticon
function lifeChange(num){
	if(num===3){
		life.innerHTML= '❤️❤️❤️';
	}
		if(num===2){
		life.innerHTML= '❤️❤️';
	}
		if(num===1){
		life.innerHTML= '❤️';
	}
		if(num===0){
		life.innerHTML= '';
	}
}

//Manage hits
function hitsChange(num){
    switch (num){
        case 0:
            hits.innerHTML='';
            break
        case 1:
            hits.innerHTML='💥';
            break
        case 2:
            hits.innerHTML='💥💥';
            break
        case 3:
            hits.innerHTML='💥💥💥';
            break
        case 4:
            hits.innerHTML='💥💥💥💥';
            break
        case 5:
            hits.innerHTML='💥💥💥💥💥';
            break
    }
}


// If the nickname was entered -> start the game
async function activateGame(){
	lifeChange(3);

    //Activate new mouse pointer and subtract function
    document.addEventListener("mousemove", newMouse);
    endingField.classList.remove('active');
    mainBoard.addEventListener('mousedown', subtractScore);
	await sleeping();

    //Restore Default Settings
    score = 0;
    currScore.innerText = "00000";
    missingZombie = 0;
	hitsInRow = 0;
	renew = 0;

    //Start creating zombie while number of missing < 3
    let start = setInterval(function (){
        const zombieElement = document.createElement("div");
        zombieElement.classList.add("zombie");

        //Set random position
        const position = Math.floor(Math.random()*(40)+1);
        zombieElement.style.bottom = position + "vh";
        zombieElement.style.zIndex = 40 - position;

		//Set random speed by actual score
		let speed = Math.floor(Math.random()*(6)+1);
		if (score<100){
			speed =Math.max(4, Math.floor(Math.random()*(6)+1));
		}
		if (score>250){
			speed = Math.floor(Math.random()*(5)+1);
		}
		if (score>500){
			speed = Math.floor(Math.random()*(4)+1);
		}
		if (score>1500){
			speed = Math.floor(Math.random()*(2)+1);
		}
       	zombieElement.style.animationDuration = `0.5s, ${speed}s`

		//If zombie will run away -> counter +=1 and check if continue
        zombieElement.addEventListener("animationend", function() {
			audio3.play();
            missingZombie += 1;
			lifeChange(3-missingZombie);
            if (missingZombie > 2){
				hitsChange(0);
                clearInterval(start);
                zombieContainer.innerHTML = '';
                return getResults();
            }
            this.remove();
        })

        //Set random scale
		const scaleMinus = Math.random();
        let scale = Math.max(0.7, 1.5 - scaleMinus);
		if (score>500){
			scale = Math.max(0.5, 1.3 - scaleMinus) ;
		}
		if (score>1000){
			scale = Math.max(0.35, 1 - scaleMinus) ;
		}

        zombieElement.style.transform = `scale(${scale})`;

        zombieElement.addEventListener("mousedown", function() {
            this.remove();
			const adding = Math.floor((2*(9-speed) + (1.5-scale)*5));
            addScore(adding);
			console.log(adding);
        })
        zombieContainer.appendChild(zombieElement);
		
    }, 800);
}

// Get a nickname
function getNick(){
    if (currNick!==''){
        nickError.innerText = '';
        currentNick.innerText = currNick;
        activateGame();
        startingField.classList.remove('active');
    }
    else{
        nickError.innerText = "Nick not inserted";
    }
}

// START GAME
startingField.classList.add('active');
gunPoint.style.zIndex= -1;

