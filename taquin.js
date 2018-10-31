let currentArray = [];
let base = [1,2,3,4,5,6,7,8," "];
let final = [1,2,3,4,5,6,7,8," "];
let arrayTest = [1," ",3,2,4,5,7,8,6];

let solution = [];
let bestSolution = [];
let bestDepth = 50;


const direction = {
    H : -3,
    D : 1,
    B : 3,
    G : -1

};

function randomInt(mini, maxi) {
    let nb = mini + (maxi +1 - mini) * Math.random();
    return Math.floor(nb);
}

Array.prototype.shuffle = function (n) {
    if(!n)
        n = this.length;
    if(n > 1)
    {
        let i = randomInt(0, n-1);
        let tmp = this[i];
        this[i] = this[n-1];
        this[n-1] = tmp;
        this.shuffle(n-1);
    }
};

function validity(data){
    let score = 0;
    for (let a=0; a<data.length; a++)
    {
        if (data[a] !== " ") {
            let b = a + 1;
            for (b; b < data.length; b++) {
                if (data[b] !== " ") {
                    if (data[a] > data[b]) {
                        score++;
                    }
                }
            }
        }
    }
    console.log(score);
    return score;
}

function validityBool(data) {
    return validity(data) % 2 === 0;
}

function displayResult(data) {
    for(let j = 0; j < data.length; j++){
        let elem = document.getElementById(j.toString());
        elem.innerHTML = data[j].toString();
    }
}

function insertTab() {
    let ready = false;
    while(ready !== true){
        base.shuffle();
        ready = validityBool(base);
    }
    currentArray = base.concat();
    // currentArray = arrayTest.concat();
    displayResult(currentArray);
    console.log(currentArray);
}

function isEqual(data) {
    for (let i = 0; i<data.length; i++){
        if(data[i] !== final[i]){
            return false;
        }
    }
    return true;
}

function swap(i, j, data){
    let temp = data[i];
    data[i] = data[j];
    data[j] = temp;
}

function dfs(position, depth, oldPosition){

    if (depth >= bestDepth) return;

    if(depth !== 0) solution[depth-1]=position;

    if (isEqual(currentArray)){
        console.log('solution trouvé avec ' + depth +' étapes');
        bestDepth = depth;
        for (let i = 0; i<depth; i++){
            bestSolution[i] = solution[i];
        }
        return;
    }

    let pH = position + direction.H;
    let pD = position + direction.D;
    let pB = position + direction.B;
    let pG = position + direction.G;

    if (pH === oldPosition) pH = -1;
    if (pD === oldPosition) pD = -1;
    if (pB === oldPosition) pB = -1;
    if (pG === oldPosition) pG = -1;

    if(pH >= 0 && (position !== 0 && position !== 1 && position !== 2)){
        swap(position, pH, currentArray);
        dfs(pH, depth+1, position);
        swap(pH, position, currentArray);
    }

    if(pD >= 0 && (position !== 2 && position !== 5 && position !== 8)){
        swap(position, pD, currentArray);
        dfs(pD, depth+1, position);
        swap(pD, position, currentArray);
    }

    if(pB >= 0 && (position !== 6 && position !== 7 && position !== 8)){
        swap(position, pB, currentArray);
        dfs(pB, depth+1, position);
        swap(pB, position, currentArray);
    }

    if(pG >= 0 && (position !== 0 && position !== 3 && position !== 6)){
        swap(position, pG, currentArray);
        dfs(pG, depth+1, position);
        swap(pG, position, currentArray);
    }

}

function myTimer(position, currentArray, bestSolution, i) {
        swap(position, bestSolution[i], currentArray);
        displayResult(currentArray);
}

function test(){
    let position = currentArray.indexOf(" ");
    console.log("Lancement du test");
    dfs(position, 0, -1);
    let i = 0;
    let myVar = setInterval(function() {
        console.log('movement ' + i + ' = case ' + bestSolution[i]);
        if(i === bestDepth-1) clearInterval(myVar);
        myTimer(position, currentArray, bestSolution, i);
        position = bestSolution[i];
        i++;
        }
    , 1000);
}

insertTab();

let buttNew = document.getElementById('newButt');
let buttNext = document.getElementById('next');


buttNew.onclick = insertTab;
buttNext.onclick = test;





