var dog, happyDog,database,foodS,foodStock


function preload()
{
  dog = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  Dog = createSprite(250,250,25,25);
  Dog.addImage(dog)
  Dog.scale=0.2
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
}

function draw() { 
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    Dog.addImage(happyDog)
  }
  fill("white")
  drawSprites();
  text("Press UP ARROW to feed dog milk",25,50)
  text("Food remaining : " + foodS,200,100)
  
}

function readStock (data){
  foodS=data.val()
}

function writeStock(x){
  
  if(x<=0){
    x=20;
    
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}


