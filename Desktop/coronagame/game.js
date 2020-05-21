function load_images()
{
    virus_image=new Image;
    virus_image.src="images/v1.png";
    player_img = new Image;
    player_img.src = "images/superhero.png";
    gem_img = new Image;
	gem_img.src = "images/gemm.png";
}

function init()
{
    console.log("canvas")
    canvas=document.getElementById("mycanvas");
    H=700;
    W=2000;
    canvas.width=W
    canvas.height=H
//WORKING WITH CANVAS WITH PEN
pen=canvas.getContext('2d');
score=0;
game_over=false;
//creating jason objects for enemy
e1={
    x:80,
    y:100,
    w:60,
    h:60,
    speed:20
};

e2={
    x:290,
    y:70,
    w:60,
    h:60,
    speed:40
};

e3={
    x:490,
    y:550,
    w:60,
    h:60,
    speed:10
};

e4={
    x:690,
    y:220,
    w:60,
    h:60,
    speed:50
};


e5={
    x:890,
    y:330,
    w:60,
    h:60,
    speed:30
};


e6={
    x:1190,
    y:90,
    w:60,
    h:60,
    speed:20
};


e7={
    x:1390,
    y:10,
    w:60,
    h:60,
    speed:20
};
enemy=[e1,e2,e3,e4,e5,e6,e7];

player={

    x:20,
    y:H/2,
    w:60,
    h:60,
    speed:20,
    moving : "false",
};



gem = {
    x : W-100,
    y : H/2,
    w : 60,
    h : 60,
}

canvas.addEventListener('mousedown',function(){
    player.moving="true";
})

canvas.addEventListener('mouseup',function(){
    player.moving="false";
})


}

//GAME LOOP
function draw(){
    //for claering screen
    pen.clearRect(0,0,W,H);
    //pen.fillStyle="red";
    for(let i=0;i<enemy.length;i++){
    pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h,);
    pen.drawImage(player_img,player.x,player.y,player.h,player.w);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);

}

pen.fillStyle="white";
pen.fillText("Score " + score,10,10);

}


function colliding(b1,b2)
{
if(Math.abs(b1.x-b2.x)<=30 && Math.abs(b1.y-b2.y)<=30 ){
    return true;

}
return false;
}


function update()
{


 //PLAYER STATE   
if(player.moving=="true")
{
player.x +=player.speed;
score+=20;

}
//loop for colloiding CORONA AND PLAYE
for(let i=0;i<enemy.length;i++)
{
if(colliding(enemy[i],player)){

    score -= i*100;
    if(score<0)
    {
        game_over=true;
        alert("BETTER LUCK NEXT TIME GAME OVER");
    }
}
}

//colloiding gem and player
if(colliding(gem,player))
{
    game_over=true;
     draw();
    //
    alert("you won" +score);
    
    //breaking game loop
}

for(let i=0;i<enemy.length;i++)
{
  enemy[i].y +=enemy[i].speed;  
  if(enemy[i].y>H - enemy[i].h || enemy[i].y<0)
  {
      enemy[i].speed *= -1;
  }
}
}

function gameloop()
{
    if(game_over==true){
		clearInterval(f);
	}
draw();
update();
}

//starting game

init();
load_images();
//repeted gameloop call
var f = setInterval(gameloop,100);

 