let size = 5;
let x_z_box_db = [];
let s = [];
let gameOver = false;
let box_int = 0;
let x_box = 2;
let z_box = 2;
let cameraX=0;
let cameraZ=500;
let fok = 0;
let list = [];
let image1;
let image2;
let rad = 0.017453292519943;
let num = 0;
let d;
let win_num;
let myFont;

function setup() {
    createCanvas(800, 800,WEBGL);
    for(let i =0;i!=size;i++){
      x_z_box_db[i] = [];
      list[i] = [];
    }
    for(let i =0;i!=size;i++){
      for(let j = 0;j!=size;j++){
          x_z_box_db[i][j]=0;
          list[i][j] = [];
      }
    }
    for(let i = 0;i!=size;i++){
      for(let j = 0;j!=size;j++){
        for(let k = 0;k!=size;k++){
          list[i][j][k] = 0;
          //print(i+" "+j+" "+k);
          //print(list[i][j][k]);
        }
      }
    }
    smooth();
    s.push(new box_down(55));
    d = new box_lines();
}





function preload() {
  image1=loadImage('Addons/Iranytu_falmatrica.png');
  image2=loadImage('Addons/irany.png');
  myFont = loadFont('Addons/AvenirNextLTPro-Demi.otf');
}

function draw() {
  frameRate(30);
  background(125,125,125);
if(gameOver){
  push();
  translate(0,-100,-50);
  textFont(myFont);
  textSize(44);
  if(box_int%2==0){
    fill('#FFF600');
    text('Sárga játékos nyert', -200, 0);
  }else{
    fill('#0CFF00');
    text('Zöld játékos nyert', -200, 0);
  }

  pop();

}

push();
//  if(!gameOver){
    if(keyIsDown(68)){
      fok+=1;
      cameraX = 500*Math.sin(fok*PI/180)
      cameraZ = 500*Math.cos(fok*PI/180)
    }else if(keyIsDown(65)){
      fok-=1;
      cameraX = 500*Math.sin(fok*PI/180)
      cameraZ = 500*Math.cos(fok*PI/180)
    }
//  }

  camera(cameraX, -300, cameraZ, 0, 0, 0, 0, 1, 0);
  push();
    fill(90,0,90);
    translate(0,310,0);
    box(310,5,310);
  pop();
    let asd = 0;
    do{
      try {
        switch (num) {
          case -1:
            if(asd%2==0){s[asd].show(100);}else{s[asd].show(255);}
            break;
          case 0:
              s[asd].show(255);
            break;
          case 1:
            if(asd%2==1){s[asd].show(100);}else{s[asd].show(255);}

            break;
          default:

        }

      } catch (e) {}
      asd++;
    }while (asd!=box_int+1);
    d.show();
pop();
    push();
      translate(320,320,0);
      imageMode(CENTER);
      image(image1,0,0,150,150);
      rotateZ(rad*(fok-90));
      image(image2, 0, 0,50,50);
    pop();
}

function keyPressed() {
  if(keyCode == 87){//w
    num = -1;
  }else if(keyCode == 83){//s
    num = 0;
  }else if(keyCode == 88){//x
    num = 1;
  }else if(keyCode == UP_ARROW && !gameOver){
    if(s[box_int].z>-120){
    s[box_int].z -= 60;x_box--;d.z-=60;}
  } else if(keyCode == DOWN_ARROW  && !gameOver){
    if(s[box_int].z<120){
    s[box_int].z += 60;x_box++;d.z+=60;}
  } else if(keyCode == LEFT_ARROW  && !gameOver){
    if(s[box_int].x>-120){
    s[box_int].x -= 60;z_box--;d.x-=60;}
  } else if(keyCode == RIGHT_ARROW  && !gameOver){
    if(s[box_int].x<120){
    s[box_int].x += 60;z_box++;d.x+=60;}
  } else if(keyCode == ENTER && !gameOver && x_z_box_db[x_box][z_box]!=5){
    switch (x_z_box_db[x_box][z_box]) {
      case 0:
        s[box_int].y = 280;
        break;
      case 1:
        s[box_int].y = 220;
        break;
      case 2:
        s[box_int].y = 160;
        break;
      case 3:
        s[box_int].y = 100;
        break;
      case 4:
        s[box_int].y = 40;
        break;
      default:
        break;
    }
    box_int++;
    if(box_int%2==0){
      s.push(new box_down(55));
      //print(x_box+" "+x_z_box_db[x_box][z_box]+" "+z_box);
      list[x_box][x_z_box_db[x_box][z_box]][z_box] = 1;
    }else{
      s.push(new box_down(255));
      //print(x_box+" "+x_z_box_db[x_box][z_box]+" "+z_box);
      list[x_box][x_z_box_db[x_box][z_box]][z_box] = 2;
    }
    win_num = win(x_box,x_z_box_db[x_box][z_box],z_box);
    print(win_num);
    x_z_box_db[x_box][z_box]++;
    x_box = 2;
    z_box = 2;
    d.x=0;
    d.z=0;
  }
}

function win(x,y,z){
  if(list[x][y][1] == list[x][y][2] && list[x][y][2] == list[x][y][3] && list[x][y][2] != 0){
    if(list[x][y][2] == list[x][y][0] || list[x][y][2] == list[x][y][4]){
      print('111');gameOver = true;
      return 1;
    }
  }else if(list[x][1][z] == list[x][2][z] && list[x][2][z] == list[x][3][z] && list[x][2][z] != 0){
    if(list[x][2][z] == list[x][0][z] || list[x][2][z] == list[x][4][z]){
      print('222');gameOver = true;
      return 1;
    }
  }else if(list[1][y][z] == list[2][y][z] && list[2][y][z] == list[3][y][z] && list[2][y][z] != 0){
    if(list[2][y][z] == list[0][y][z] || list[2][y][z] == list[4][y][z]){
      print('333');gameOver = true;
      return 1;
    }
  }
  return 0;
}

function box_down(color){
  this.x = 0;
  this.y = -280;
  this.z = 0;

  this.show = function show(atlatszo){
    push();
      fill(color,230,0,atlatszo);
      translate(this.x,this.y,this.z);
      box(50,50,50);
    pop();
  }
}

function box_lines(){
  this.x = 0;
  this.y = 320;
  this.z = 0;

  this.show = function show(){
    this.x2 = this.x;
    this.y2 = -this.y;
    this.z2 = this.z;
    if(!gameOver){
      push();
      line(this.x-25,this.y,this.z-25,this.x2-25,this.y2,this.z2-25);
      line(this.x-25,this.y,this.z+25,this.x2-25,this.y2,this.z2+25);
      line(this.x+25,this.y,this.z-25,this.x2+25,this.y2,this.z2-25);
      line(this.x+25,this.y,this.z+25,this.x2+25,this.y2,this.z2+25);
      pop();

    }
  }
}
