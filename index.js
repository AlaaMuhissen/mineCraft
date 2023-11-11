


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
const rookNum = document.querySelector("#rook-counter");
const woodNum = document.querySelector("#wood-counter");
const grassNum = document.querySelector("#grass-counter");
const soilNum = document.querySelector("#soil-counter");

const leafButton = document.querySelector("#leaf");
const rookButton = document.querySelector("#rook");
const woodButton = document.querySelector("#wood-counter");
const grassButton = document.querySelector("#grass-counter");
const soilButton = document.querySelector("#soil-counter");


const groundImg = "assets/img/ground.png";
const surfaceImg = "assets/img/surface.png";
const woodImg = "assets/img/wood.png";
const rockImg = "assets/img/rock.png";
const leafImg = "assets/img/grass.png";

const inventory = {
    leaf :0,
    wood :0,
    rock :0,
    surface:0,
    ground: 0
};



function createCells(i ,j){
    const cell = document.createElement("div");
    cell.className = "grid-item";
    cell.id= `cell-${i}-${j}`;
    document.querySelector(".grid-container").appendChild(cell);
}

function createTable(width , height){
    grid.style.gridTemplateColumns = `repeat(${height}, 100px)`;
    grid.style.gridTemplateRows = `repeat(${width}, 100px)`;
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

function buildGround(){
   paint(16,25,0,25, null , groundImg);
   paint(15,16 , 0,25, null , surfaceImg)
}
function buildTrees(){
  paint(12,15,5,6, null , woodImg);
  paint(11,15,17,18, null , woodImg);
  
  paint(10,11,17 ,18 , null ,leafImg);
  paint(6,10,15,20 , null ,leafImg);

  paint(9,12,4 ,7 , null ,leafImg);
  paint(8,9,5,6 , null ,leafImg);
}



const tools = document.querySelectorAll(".tools");
let selectedTool = null; 

const inventoryButtons = document.querySelectorAll(".inventory");
let selectedSquare = null; 


// Event listener for tools
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
        console.log("hi!");
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
        if (backgroundImage.includes(groundImg)) {
            inventory.ground += 1;
            soilNum.textContent = inventory.ground;
            cell.style.backgroundImage = 'none';
        }

        if (backgroundImage.includes(surfaceImg)) {
            inventory.surface += 1;
            grassNum.textContent = inventory.surface;
            cell.style.backgroundImage = 'none';
        }
    }
}



function build(cell, square) {
    
    
    const backgroundImage = getComputedStyle(cell).backgroundImage;
    if((backgroundImage != 'none') || (cell.style.background === 'rgb(255, 255, 255)') ) {
        return;
    }
    console.log(backgroundImage);
    console.log(cell.style.background);
 
    const coordinates = getCoordinates(cell);
    const i = coordinates[0];
    const j = coordinates[1];

    if ((square === "leaf") && (inventory.leaf > 0)) {
         inventory.leaf-- ;
         leafNum.textContent = inventory.leaf;
         setImg(i , j , leafImg );
    }
    if ((square === "rook") && (inventory.rock > 0)) {
        inventory.rock-- ;
        rookNum.textContent = inventory.rock;
        setImg(i , j , rockImg );
   }
   if ((square === "wood") && (inventory.wood > 0)) {
        inventory.wood-- ;
        woodNum.textContent = inventory.wood;
        setImg(i , j , woodImg );
    }
    if ((square === "grass") && (inventory.surface > 0)) {
        inventory.surface-- ;
        grassNum.textContent = inventory.surface;
        setImg(i , j , surfaceImg );
    }
    if ((square === "soil") && (inventory.ground > 0)) {
        inventory.ground-- ;
        soilNum.textContent = inventory.ground;
        setImg(i , j , groundImg );
    }

}


function getCoordinates(cell){
    let c = cell.id;
    let x = c.slice(5);
    let y=  x.split('-');
    
    return y;

}

function startGame(){
    grid.innerHTML = "";
    createTable(25, 25);
    paint(0 ,25,0,25 , "rgb(93, 172, 251)" , null);
    buildCloud();
    buildGround();
    buildTrees();
    inventory.ground =0 ;
    inventory.leaf =0;
    inventory.rock = 0;
    inventory.surface = 0;
    inventory.wood = 0;
    leafNum.textContent = inventory.leaf;
    rookNum.textContent = inventory.rock;
    woodNum.textContent = inventory.wood;
    grassNum.textContent = inventory.surface;
    soilNum.textContent = inventory.ground;

}

resetGameButton.addEventListener("click", function (event) {
    startGame();
})

startGame();