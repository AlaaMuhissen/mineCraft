


const grid = document.querySelector(".grid-container");
let gridItem = null;

document.addEventListener("DOMContentLoaded", function () {
    gridItem =document.querySelectorAll(".grid-item");
});

const resetGameButton = document.querySelector("#resetButton");
const axeTool = document.querySelector("#axe");
const pickaxeTool = document.querySelector("#pickaxe");
const shovelTool = document.querySelector("#shovel");


const leafNum = document.querySelector("#leaf-counter");
const rockNum = document.querySelector("#rock-counter");
const woodNum = document.querySelector("#wood-counter");
const grassNum = document.querySelector("#grass-counter");
const soilNum = document.querySelector("#soil-counter");

const leafButton = document.querySelector("#leaf");
const rockButton = document.querySelector("#rock");
const woodButton = document.querySelector("#wood-counter");
const grassButton = document.querySelector("#grass-counter");
const soilButton = document.querySelector("#soil-counter");


const soilImg = "assets/img/soil.png";
const grassImg = "assets/img/grass.png";
const woodImg = "assets/img/wood.png";
const rockImg = "assets/img/rock.png";
const leafImg = "assets/img/leaf.png";

const inventory = {
    leaf :0,
    wood :0,
    rock :0,
    grass:0,
    soil: 0
};


const tools = document.querySelectorAll(".tools");
let selectedTool = null; 

const inventoryButtons = document.querySelectorAll(".inventory");
let selectedSquare = null; 


function createCells(i ,j){
    const cell = document.createElement("div");
    cell.className = "grid-item";
    cell.id= `cell-${i}-${j}`;
    document.querySelector(".grid-container").appendChild(cell);
}

function createTable(width , height){
    grid.style.gridTemplateColumns = `repeat(${height}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${width}, 20px)`;
    for (let i =0 ; i < width ; i++){
        for(let j = 0 ; j < height ; j++){
            createCells(i ,j);
        }
    }
}

function addColor(i ,j,color){
   const cell = document.getElementById(`cell-${i}-${j}`);
   cell.style.background = color;
}
function setImg(i ,j,img){
    const cell = document.getElementById(`cell-${i}-${j}`);
    cell.style.backgroundImage = `url(${img})`;

    cell.style.backgroundRepeat = 'no-repeat';
    cell.style.backgroundPosition = 'center';
    cell.style.backgroundSize = 'cover';
 }

function paint(startRow , endRow , startColumns,endColumns  ,color ,img){
  for(let i = startRow ; i < endRow ; i++){
      for (let j = startColumns; j < endColumns; j++) {
        if(!color){
            setImg(i ,j,img);
        }
        else{
            addColor(i,j , color);
        }
      }
  }
}

function buildCloud(){
    paint(0,1,5,8 , "#fff" ,null);
    paint(1,2, 4,9 , "#fff",null);
}

function buildSoil(){
   paint(16,25,0,25, null , soilImg);
   paint(15,16 , 0,25, null , grassImg)
}
function buildTrees(){
  paint(12,15,5,6, null , woodImg);
  paint(11,15,17,18, null , woodImg);
  
  paint(10,11,17 ,18 , null ,leafImg);
  paint(6,10,15,20 , null ,leafImg);

  paint(9,12,4 ,7 , null ,leafImg);
  paint(8,9,5,6 , null ,leafImg);
}




tools.forEach((tool) => {
    tool.addEventListener("click", (e) => {
        selectedTool = e.target.id;
        selectedSquare = null;
    });
});

inventoryButtons.forEach((square) => {
    square.addEventListener("click", (e) => {
        selectedSquare = e.target.id;
        selectedTool = null;
    });
});



grid.addEventListener("click", function (event) {
    if (selectedTool) {
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        cut(cell, selectedTool);
    }
    if(selectedSquare){
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        build(cell, selectedSquare);
    }
});

function cut(cell, toolName) {
    const backgroundImage = getComputedStyle(cell).backgroundImage;

    if (toolName === "axe") {
    
        if (backgroundImage.includes(leafImg)) {
            inventory.leaf += 1;
            leafNum.textContent = inventory.leaf;
            cell.style.backgroundImage = 'none';
        }
        if (backgroundImage.includes(woodImg)) {
            inventory.wood += 1;
            woodNum.textContent = inventory.wood;
            cell.style.backgroundImage = 'none';
        }
    }
    if (toolName === "pickaxe") {
        if (backgroundImage.includes(rockImg)) {
            inventory.rock += 1;
            rockNum.textContent = inventory.rock;
            cell.style.backgroundImage = 'none';
        }
    }
    if (toolName === "shovel") {
        if (backgroundImage.includes(soilImg)) {
            inventory.soil += 1;
            soilNum.textContent = inventory.soil;
            cell.style.backgroundImage = 'none';
        }

        if (backgroundImage.includes(grassImg)) {
            inventory.grass += 1;
            grassNum.textContent = inventory.grass;
            cell.style.backgroundImage = 'none';
        }
    }
}



function build(cell, square) {
    
    
    const backgroundImage = getComputedStyle(cell).backgroundImage;
    if((backgroundImage != 'none') || (cell.style.background === 'rgb(255, 255, 255)') ) {
        return;
    }

    const coordinates = getCoordinates(cell);
    const i = coordinates[0];
    const j = coordinates[1];

    if ((square === "leaf") && (inventory.leaf > 0)) {
         inventory.leaf-- ;
         leafNum.textContent = inventory.leaf;
         setImg(i , j , leafImg );
    }
    if ((square === "rock") && (inventory.rock > 0)) {
        inventory.rock-- ;
        rockNum.textContent = inventory.rock;
        setImg(i , j , rockImg );
   }
   if ((square === "wood") && (inventory.wood > 0)) {
        inventory.wood-- ;
        woodNum.textContent = inventory.wood;
        setImg(i , j , woodImg );
    }
    if ((square === "grass") && (inventory.grass > 0)) {
        inventory.grass-- ;
        grassNum.textContent = inventory.grass;
        setImg(i , j , grassImg );
    }
    if ((square === "soil") && (inventory.soil > 0)) {
        inventory.soil-- ;
        soilNum.textContent = inventory.soil;
        setImg(i , j , soilImg );
    }

}


function getCoordinates(cell){
    let cellId = cell.id;
    let subCell = cellId.slice(5);
    let coordinates=  subCell.split('-');
    
    return coordinates;

}

function startGame(){
    grid.innerHTML = "";
    createTable(25, 25);
    paint(0 ,25,0,25 , "rgb(93, 172, 251)" , null);
    buildCloud();
    buildSoil();
    buildTrees();
    inventory.soil =0 ;
    inventory.leaf =0;
    inventory.rock = 0;
    inventory.grass = 0;
    inventory.wood = 0;
    leafNum.textContent = inventory.leaf;
    rockNum.textContent = inventory.rock;
    woodNum.textContent = inventory.wood;
    grassNum.textContent = inventory.grass;
    soilNum.textContent = inventory.soil;

}

resetGameButton.addEventListener("click", function (event) {
    startGame();
})

startGame();