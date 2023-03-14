import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ludo-grid',
  templateUrl: './ludo-grid.component.html',
  styleUrls: ['./ludo-grid.component.css']
})
export class LudoGridComponent {

clicked: boolean=false;
num: number=0;
ans:number=0;
NumOfpawn="";
currPawn:any;
currColor='';
currpos:any;
allcolor = ["red", "blue", "green", "yellow"];
pawnOut:any = {red:0,blue:0,green:0,yellow:0};
step:any = 49.5;

Stuck() {
  var text = document.getElementById('player');
  if (this.onboard[this.currPawn] == 0||this.currpos+this.num>44) {
      if (this.DontHaveOtherFree()||this.currpos+this.num>44) {
          var badtext = document.getElementById('badtext');
          badtext!.innerText = "Unfortunatlly you stuck";
          this.clicked = false;
          var dice = document.getElementById('dice');
          dice!.style.backgroundImage = "url(../assets/Images/dice.gif)";
          window.setTimeout(this.changeplayer, 1000);
      }
  }
}

changeplayer(){
  //console.log(this.num)
  var text;
  if(this.num!=6){
    text=document.getElementById("player");
    switch(text?.innerHTML){
      case "red":text.innerText=text.style.color="blue";break;
      case "blue":text.innerText=text.style.color="yellow";break;
      case "yellow":text.innerText=text.style.color="green";break;
      case "green":text.innerText=text.style.color="red";break;
    }
  }
    var badtext = document.getElementById('badtext');
    badtext!.innerText = "";
    console.log(text?.innerText);
    var dice=document.getElementById("dice");
    dice!.style.backgroundImage = "url(../assets/Images/dice.gif)";
}



// a:any=[1,2,3,4,5];
randomNum(){
  if(!this.clicked){
    this.num=Math.floor((Math.random()*6)+1);
    // this.num =this.a[ Math.floor((Math.random()*3)+1)];
    console.log(this.num);
    var dice=document.getElementById("dice");
    dice!.style.backgroundImage = "url(../assets/Images/"+this.num+".jpg)";
    this.clicked=true;
  }

  if(this.clicked){
    this.showplayer();
  }

  if(this.num!=6 && this.DontHaveOtherFree())
  {
    window.setTimeout(this.changeplayer, 1000);
    this.clicked = false;
  }

}

DontHaveOtherFree() {
  var text = document.getElementById('player');
  for (var i = 1; i <=4; i++) {
      if (this.onboard[text!.innerText + "pawn" + i] == 1 || this.positions[text!.innerText + "pawn" + i]+this.num>=44)
        return false;
  }
  return true;
}

ResetPawn(victim:any) {
  this.onboard[victim] = 0;
  this.positions[victim] = 0;
  var pawnToMove = document.getElementById(victim);
  switch (victim) {
      case "redpawn1": pawnToMove!.style.top = 149 + "px"; pawnToMove!.style.left = 442 + "px"; break;
      case "redpawn2": pawnToMove!.style.top = 102 + "px"; pawnToMove!.style.left = 395 + "px"; break;
      case "redpawn3": pawnToMove!.style.top = 55 + "px"; pawnToMove!.style.left = 442 + "px"; break;
      case "redpawn4": pawnToMove!.style.top = 102 + "px"; pawnToMove!.style.left = 490 + "px"; break;
      case "bluepawn1": pawnToMove!.style.top = 451 + "px"; pawnToMove!.style.left = 490 + "px"; break;
      case "bluepawn2": pawnToMove!.style.top = 451 + "px"; pawnToMove!.style.left = 395 + "px"; break;
      case "bluepawn3": pawnToMove!.style.top = 404 + "px"; pawnToMove!.style.left = 442 + "px"; break;
      case "bluepawn4": pawnToMove!.style.top = 498 + "px"; pawnToMove!.style.left = 442 + "px"; break;
      case "greenpawn1": pawnToMove!.style.top = 149 + "px"; pawnToMove!.style.left = 93 + "px"; break;
      case "greenpawn2": pawnToMove!.style.top = 102 + "px"; pawnToMove!.style.left = 140 + "px"; break;
      case "greenpawn3": pawnToMove!.style.top = 55 + "px"; pawnToMove!.style.left = 93 + "px"; break;
      case "greenpawn4": pawnToMove!.style.top = 102 + "px"; pawnToMove!.style.left = 47 + "px"; break;
      case "yellowpawn1": pawnToMove!.style.top = 451 + "px"; pawnToMove!.style.left = 47 + "px"; break;
      case "yellowpawn2": pawnToMove!.style.top = 451 + "px"; pawnToMove!.style.left = 140 + "px"; break;
      case "yellowpawn3": pawnToMove!.style.top = 404 + "px"; pawnToMove!.style.left = 93 + "px"; break;
      case "yellowpawn4": pawnToMove!.style.top = 498 + "px"; pawnToMove!.style.left = 93 + "px"; break;
  }
}

showplayer(){

  let sp = [[318+"px",28+"px"],[219+"px",523+"px"],[516+"px",325+"px"],[21+"px",226+"px"]]
  let flag=0;

  for(let i of Object.keys(this.onboard)){
    let k = document.getElementById("player")!.innerHTML
    if(i.startsWith(k)){
      let col = document.getElementById(i);
      col!.style.zIndex='10';
    }
    else{
      let col = document.getElementById(i);
      col!.style.zIndex='9';
    }
  }
}



HaveHover() {
  var count = 0;
  var x=0;
  var toKill = "";
  for (var i = 0; i < this.allcolor.length; i++) {
      for (var n = 1; n <= 4; n++) {
          var firstPawn = document.getElementById(this.allcolor[i] + "pawn" + n);
          var secondPawn=document.getElementById(this.currPawn);
          if (firstPawn!.style.top==secondPawn!.style.top&&firstPawn!.style.left==secondPawn!.style.left&&this.currColor!=this.allcolor[i]&&this.currpos+this.num<44) {
            if((secondPawn?.style.left==318+"px"&&secondPawn.style.top==28+"px")||
                (secondPawn?.style.left==219+"px"&&secondPawn.style.top==523+"px")||
                (secondPawn?.style.left==516+"px"&&secondPawn.style.top==325+"px")||
                (secondPawn?.style.left==21+"px"&&secondPawn.style.top==226+"px")
            ){
              x=1;
            }
            if(x==0)
            {
              count++;
              toKill = this.allcolor[i] + "pawn" + n;
              return toKill;
            }
          }
      }
  }
  return false;
}

CheckForWinner() {
  if (this.pawnOut[this.currColor] == 4) {
      var dice = document.getElementById("dice");
      var player = document.getElementById("player");
      var uselesstext1 = document.getElementById("uselesstext1");
      var uselesstext2 = document.getElementById("uselesstext2");
      dice!.innerText = "";
      dice!.style.visibility = "hidden";
      uselesstext1!.innerText = "";
      uselesstext2!.innerText = "";
      player!.innerText = "The Winner is the "+this.currColor+" player";
  }
}

randomMove(color: any,paw: any){

  var text=document.getElementById("player");
  this.NumOfpawn=paw;
  this.currColor=color;
  this.currPawn=this.currColor+"pawn"+this.NumOfpawn;
  this.currpos=this.positions[this.currPawn];
  console.log(this.currPawn);
  if (this.num + this.currpos > 44) {
    this.Stuck();
    console.log("185")
  }
  else if(this.num+this.currpos<=44){
    //console.log(this.clicked)
    if(this.clicked){
      var pos=this.currpos;
      if(text?.innerText==this.currColor){
        if(this.num==6  || this.onboard[this.currPawn]==1){
          if(this.onboard[this.currPawn]==0){
            var doc=document.getElementById(this.currPawn);
            switch(color){
              case "red":
                  // console.log("Switchcase REd");
                  doc!.style.left=318+"px";
                  doc!.style.top=28+"px";
                  break;
              case "yellow":
                  // console.log("Switchcase y");
                  doc!.style.left=219 + "px";
                  doc!.style.top=523 + "px";
                  break;

              case "blue":
                  // console.log("Switchcase b");
                  doc!.style.left= 516 + "px";
                  doc!.style.top= 325 + "px";
                  break;
              case "green":
                  // console.log("Switchcase g");
                  doc!.style.left=21+"px";
                  doc!.style.top=226+"px";
                  break;
            }
           this.onboard[this.currPawn]=1;
          }
          else{
            //console.log(pos,this.num,this.currpos);
            switch (color) {
              case "red":
                  for (var i = this.currpos; i < pos + this.num; i++) {
                        if(this.stepsRed[i]=="down")
                          this.moveRed("down");
                        else if(this.stepsRed[i]=="right")
                          this.moveRed("right")
                        else if(this.stepsRed[i]=="left")
                          this.moveRed("left")
                        else if(this.stepsRed[i]=="up")
                          this.moveRed("up")
                  }
                  //this.moveRed();
                  break;

              case "yellow":
                for (var i = this.currpos; i < pos + this.num; i++) {
                        if(this.stepsYellow[i]=="up")
                          this.moveYellow("up");
                        else if(this.stepsYellow[i]=="left")
                          this.moveYellow("left");
                        else if(this.stepsYellow[i]=="right")
                          this.moveYellow("right")
                        else if(this.stepsYellow[i]=="down")
                          this.moveYellow("down")
                  }
                  break;

              case "blue":
                for (var i = this.currpos; i < pos + this.num; i++) {
                        if(this.stepsBlue[i]=="up")
                          this.moveBlue("up");
                        else if(this.stepsBlue[i]=="left")
                          this.moveBlue("left");
                        else if(this.stepsBlue[i]=="right")
                          this.moveBlue("right")
                        else if(this.stepsBlue[i]=="down")
                          this.moveBlue("down")
                      }
                  break;

              case "green":
                for (var i = this.currpos; i < pos + this.num; i++){
                        if(this.stepsGreen[i]=="up")
                          this.moveGreen("up");
                        else if(this.stepsGreen[i]=="left")
                          this.moveGreen("left");
                        else if(this.stepsGreen[i]=="right")
                          this.moveGreen("right")
                        else if(this.stepsGreen[i]=="down")
                          this.moveGreen("down")
                  }
                  break;

            }
             // this.positions[this.currPawn]=this.currpos;
              //console.log(this.positions,this.currPawn,this.currpos);
              var victim = this.HaveHover();
              if (victim != false) {
                  this.ResetPawn(victim);
              }
              if (this.currpos == 44) {
                this.pawnOut[this.currColor]++;
                this.onboard[this.currPawn] = 0;
                this.positions[this.currPawn] = 0;
                document.getElementById(this.currPawn)!.style.visibility = "hidden";
              }
              this.CheckForWinner();
              if(victim==false)
                this.changeplayer();
          }
          this.num = 0;
          this.clicked = false;
          var dice = document.getElementById('dice');
          dice!.style.backgroundImage = "url(../assets/Images/dice.gif)";
        }
        else{
          this.Stuck();
          console.log("300")
        }
      }
    }
  }

}
positions:any = {
  redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
  bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
  greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
  yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
onboard:any = {
  redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
  bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
  greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
  yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};

stepDown(){
  var doc = document.getElementById(this.currColor + "pawn"+this.NumOfpawn);
  var curr = Number(doc!.style.top.replace(/[a-z]/g, ''));
  doc!.style.top = (curr+this.step)+'px';
  this.currpos++;
}
stepUp() {
  var doc = document.getElementById(this.currPawn);
  var curr = Number(doc!.style.top.replace(/[a-z]/g, ''));
  doc!.style.top = (curr - this.step) + 'px';
  this.currpos++;
}
 stepLeft() {
  var doc = document.getElementById(this.currPawn);
  var curr = Number(doc!.style.left.replace(/[a-z]/g, ''));
  doc!.style.left = (curr - this.step) + 'px';
  this.currpos++;
}
stepRight() {
  var doc = document.getElementById(this.currPawn);
  var curr = Number(doc!.style.left.replace(/[a-z]/g, ''));
  doc!.style.left = (curr + this.step) + 'px';
  this.currpos++;
}

stepsRed : any= ["down","down","down","down","right","right","right","right","down","down",
"left","left","left","left","down","down","down","down","left","left","up","up","up","up",
"left","left","left","left","up","up","right","right","right","right","up","up","up","up",
"right","down","down","down","down","down"];
stepsYellow:any= ["up","up","up","up","left","left","left","left","up","up","right","right",
"right","right","up","up","up","up","right","right","down","down","down","down","right","right",
"right","right","down","down","left","left","left","left","down","down","down","down",
"left","up","up","up","up","up"];
stepsBlue:any=["left","left","left","left","down","down","down","down","left","left",
"up","up","up","up","left","left","left","left","up","up","right","right","right",
"right","up","up","up","up","right","right","down","down","down","down","right","right",
"right","right","down","left","left","left","left","left"];
stepsGreen:any=["right","right","right","right","up","up","up","up","right","right",
"down","down","down","down","right","right","right","right","down","down","left","left",
"left","left","down","down","down","down","left","left","up","up","up","up","left","left",
"left","left","up","right","right","right","right","right"];



pushSteps(value:any, steps:any[], count:number){
    for (var i = 0; i < count; i++) {
      steps.push(value);
    };
    this.positions[this.currPawn] =this.currpos;
}



//Red pawns path
moveRed(c:any){
  if(this.positions[this.currPawn]<4 && c=="down")
    this.pushSteps(this.stepDown(),this.stepsRed,4);
  else if(this.positions[this.currPawn]>=4 && this.positions[this.currPawn]<8 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=8 && this.positions[this.currPawn]<10 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsRed,2)
  else if(this.positions[this.currPawn]>=10 && this.positions[this.currPawn]<14 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=14 && this.positions[this.currPawn]<18 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=18 && this.positions[this.currPawn]<20 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsRed,2);
  else if(this.positions[this.currPawn]>=20 && this.positions[this.currPawn]<24 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=24 && this.positions[this.currPawn]<28 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=28 && this.positions[this.currPawn]<30 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsRed,2);
  else if(this.positions[this.currPawn]>=30 && this.positions[this.currPawn]<34 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=34 && this.positions[this.currPawn]<38 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsRed,4);
  else if(this.positions[this.currPawn]>=38 && this.positions[this.currPawn]<39 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsRed,1);
  else if(this.positions[this.currPawn]>=39 && this.positions[this.currPawn]<44 && c=="down")
  {
      this.pushSteps(this.stepDown(), this.stepsRed,5);
  }

}



//Yellow pawn path
moveYellow(c:any){
  if(this.positions[this.currPawn]<4 && c=="up")
    this.pushSteps(this.stepUp(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=4 && this.positions[this.currPawn]<8 && c=="left")
    this.pushSteps(this.stepLeft(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=8 && this.positions[this.currPawn]<10 && c=="up")
    this.pushSteps(this.stepUp(),this.stepsYellow,2);
  else if(this.positions[this.currPawn]>=10 && this.positions[this.currPawn]<14 && c=="right")
    this.pushSteps(this.stepRight(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=14 && this.positions[this.currPawn]<18 && c=="up")
    this.pushSteps(this.stepUp(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=18 && this.positions[this.currPawn]<20 && c=="right")
    this.pushSteps(this.stepRight(),this.stepsYellow,2);
  else if(this.positions[this.currPawn]>=20 && this.positions[this.currPawn]<24 && c=="down")
    this.pushSteps(this.stepDown(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=24 && this.positions[this.currPawn]<28 && c=="right")
    this.pushSteps(this.stepRight(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=28 && this.positions[this.currPawn]<30 && c=="down")
    this.pushSteps(this.stepDown(),this.stepsYellow,2);
  else if(this.positions[this.currPawn]>=30 && this.positions[this.currPawn]<34 && c=="left")
    this.pushSteps(this.stepLeft(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=34 && this.positions[this.currPawn]<38 && c=="down")
    this.pushSteps(this.stepDown(),this.stepsYellow,4);
  else if(this.positions[this.currPawn]>=38 && this.positions[this.currPawn]<39 && c=="left")
    this.pushSteps(this.stepLeft(),this.stepsYellow,1);
  else if(this.positions[this.currPawn]>=39 && this.positions[this.currPawn]<44 && c=="up")
  {
      this.pushSteps(this.stepUp(),this.stepsYellow,5);
  }
}

//BluePawn Path
moveBlue(c:any){
  if(this.positions[this.currPawn]<4 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=4 && this.positions[this.currPawn]<8 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=8 && this.positions[this.currPawn]<10 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsBlue,2);
  else if(this.positions[this.currPawn]>=10 && this.positions[this.currPawn]<14 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=14 && this.positions[this.currPawn]<18 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=18 && this.positions[this.currPawn]<20 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsBlue,2);
  else if(this.positions[this.currPawn]>=20 && this.positions[this.currPawn]<24 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=24 && this.positions[this.currPawn]<28 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=28 && this.positions[this.currPawn]<30 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsBlue,2);
  else if(this.positions[this.currPawn]>=30 && this.positions[this.currPawn]<34 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=34 && this.positions[this.currPawn]<38 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsBlue,4);
  else if(this.positions[this.currPawn]>=38 && this.positions[this.currPawn]<39 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsBlue,1);
  else if(this.positions[this.currPawn]>=39 && this.positions[this.currPawn]<44 && c=="left")
  {
      this.pushSteps(this.stepLeft(), this.stepsBlue,5);
  }
}

//GreenPawn Path
moveGreen(c:any){
  if(this.positions[this.currPawn]<4 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=4 && this.positions[this.currPawn]<8 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=8 && this.positions[this.currPawn]<10 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsGreen,2);
  else if(this.positions[this.currPawn]>=10 && this.positions[this.currPawn]<14 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=14 && this.positions[this.currPawn]<18 && c=="right")
    this.pushSteps(this.stepRight(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=18 && this.positions[this.currPawn]<20 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsGreen,2);
  else if(this.positions[this.currPawn]>=20 && this.positions[this.currPawn]<24 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=24 && this.positions[this.currPawn]<28 && c=="down")
    this.pushSteps(this.stepDown(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=28 && this.positions[this.currPawn]<30 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsGreen,2);
  else if(this.positions[this.currPawn]>=30 && this.positions[this.currPawn]<34 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=34 && this.positions[this.currPawn]<38 && c=="left")
    this.pushSteps(this.stepLeft(), this.stepsGreen,4);
  else if(this.positions[this.currPawn]>=38 && this.positions[this.currPawn]<39 && c=="up")
    this.pushSteps(this.stepUp(), this.stepsGreen,1);
  else if(this.positions[this.currPawn]>=39 && this.positions[this.currPawn]<44 && c=="right")
  {
      this.pushSteps(this.stepRight(), this.stepsGreen, 5);
  }

}


}
