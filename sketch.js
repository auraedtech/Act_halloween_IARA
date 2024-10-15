var hands = new HandRecognizer();
var btnBack=true;
var selectedColor;
var myPicker;
var distance;

function preload(){
  pumpkinImg = loadImage("calabaza1.png");
  skullImg = loadImage("calavera.png");
  frankImg = loadImage("fktn.png");
  back = loadImage("fondo.png");
  logo = loadImage("Logo2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  editor();
  options();
  frameRate(100);
  
}

function draw() {
  hands.predict();
  //Almacena en la variable "selectedColor" la opción elegida de la gama de colores
  selectedColor = myPicker.color();
  //Define el color del trazo de cuerdo a la opción previamente elegida
  stroke(selectedColor);
  var thumbTip = hands.getRightLandmark(Landmarks.Thumb_Tip);
  var pointerTip =  hands.getRightLandmark(Landmarks.Pointer_Tip);
  

  if (hands.rightHandVisible()){
    distance = dist(thumbTip.x, thumbTip.y, pointerTip.x, pointerTip.y);
  }
  
  
  if (distance <=50) {    
    strokeWeight(10);
    line(thumbTip.x,thumbTip.y,thumbTip.x,thumbTip.y);
  } 
  
  hands.drawLandmarks(false);
}

function options(){
  background(back);
  textSize(22);
  fill("white");
  noStroke();
  text("Selecciona una figura para decorar:",windowWidth/5,windowHeight/7);
  parche = createImg("parche.png");
  parche.position(windowWidth/2+180,windowHeight/10);
  parche.size(85,50);
  parche1 = createImg("parche1.png");
  parche1.position(windowWidth/2+190,windowHeight/2+100);
  parche1.size(80,80);
  button1 = createImg("b-calabaza.png");
  button1.position(windowWidth/2-200, windowHeight/3+20);
  button1.size(130,130);
  button1.mousePressed(pumpkin);
  button2 = createImg("b-frank.png");
  button2.position(windowWidth/2-50, windowHeight/3+20);
  button2.size(130,130);
  button2.mousePressed(frank);
  button3 = createImg("b-craneo.png");
  button3.position(windowWidth/2+100, windowHeight/3+20);
  button3.size(130,130);
  button3.mousePressed(skull);
}

function pumpkin(){
  removeBtns();
  instrucciones();
  background("white")
  image(logo,windowWidth/2+180,windowHeight/13,90,90);
  image(pumpkinImg,windowWidth/5,windowHeight/7,380,380);
  backBtn();
  
}

function frank(){
  removeBtns();
  instrucciones();
  background("white")
  image(logo,windowWidth/2+180,windowHeight/13,90,90);
  image(frankImg,windowWidth/4,windowHeight/10,450,450);
  backBtn();
}

function skull(){
  removeBtns();
  instrucciones();
  background("white")
  image(logo,windowWidth/2+180,windowHeight/13,90,90);
  image(skullImg,windowWidth/4,windowHeight/12,450,450);
  backBtn();
}

function removeBtns(){
  button1.remove();
  button2.remove();
  button3.remove();
  parche.remove();
  parche1.remove();
  btnBack=true;
}

function backBtn(){
  btnBack = createImg("volver.png");
  btnBack.position(windowWidth/10,windowHeight/12);
  btnBack.mousePressed(backRemove);
}

function backRemove(){
  btnBack.remove();
  btnBack=false;
  if(btnBack == false){
     options();
     }
}

function editor(){
  //Almacena en la variable "myPicker" el selector de color
  myPicker = createColorPicker('deeppink');  
  //Establece la posición del selector de color en el lienzo
  myPicker.position(windowWidth/2+180,windowHeight/10);
  myPicker.size(85,50);
  
  //Crea un botón y almacénalo en la variable "button"
  button = createImg("download.png");
  //Establece la posición del botón en el lienzo.
  button.position(windowWidth/2+190,windowHeight/2+100);
  //Ajusta el tamaño del botón
  button.size(80,80);
  //Crea un evento al presionar el botón
  button.mousePressed(picture);
}

//Crea una función llamada "picture()"
function picture(){
  //Dentro de la función: guarda en el ordenador los trazos realizados sobre el lienzo con el nombre y extensión "miDibujo.png"
  saveCanvas("miDibujo.png");
}

function instrucciones(){
  inst = createImg("instrucciones.png");
  inst.position(windowWidth/7+15, windowHeight/10);
  inst.size(400,400);
  inst.mousePressed(function(){inst.remove()});
}
