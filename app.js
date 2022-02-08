const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
var currPlayer ="A" //THE OTHER PLAYER IS B

//0,1,2
//3,4,5
//6,7,8
var field=["0","0","0" ,"0","0","0", "0","0","0"];

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

//3,4,5
io.on('connection',(socket)=>{
  console.log('connected');
  socket.on('disconnect',()=>{
    console.log('disconnect')
  })
})

io.on('connection',(socket)=>{
  socket.on('click',(identifier)=>{
    console.log(`i am ${identifier} and i am clicked`)
    var index = inputToField(identifier)
    console.log(index)

    if(currPlayer=="A" && field[inputToField(identifier)]=="0"){
      field[Number(index)]="A";
      io.emit('flip',identifier,currPlayer)
    }
    else if(currPlayer=="B" && field[inputToField(identifier)]=="0"){
      field[Number(index)]="B";
      io.emit('flip',identifier,currPlayer)
    }

    if(currPlayer==="A"){
      console.log("player flip to B")
      currPlayer="B"
    }
    else{
      console.log("player flip to A")
      currPlayer="A"
    }

    let winner=checkWin()
    if(winner=="A" || winner=="B"|| winner=="T"){
      setTimeout(()=>{
        io.emit('win',winner)
      },50)
    }

  })
})

function checkWin(){
  //check win horizontal
  for (let k=0;k<3;k++){
    if(field[k*3]=="A" && field[k*3+1]=="A" && field[k*3+2]=="A"){
      field=["0","0","0" ,"0","0","0", "0","0","0"];
      console.log("GAME OVER")
      return "A"
    }
    else if(field[k*3]=="B" && field[k*3+1]=="B" && field[k*3+2]=="B"){
      field=["0","0","0" ,"0","0","0", "0","0","0"];
      console.log("GAME OVER")
      return "B"
    }
    else{
      continue;
    }
  }
  //check win vertical
  for (let k=0;k<3;k++){
    if(field[k]=="A" && field[k+3]=="A" && field[k+6]=="A"){
      field=["0","0","0" ,"0","0","0", "0","0","0"];
      console.log("GAME OVER")
      return "A"
    }
    else if(field[k]=="B" && field[k+3]=="B" && field[k+6]=="B"){
      field=["0","0","0" ,"0","0","0", "0","0","0"];
      console.log("GAME OVER")
      return "B"
    }
    else{
      continue;
    }
  }
  //check win diag 048
  if(field[0]=="A" && field[4]=="A" && field[8]=="A"){
    field=["0","0","0" ,"0","0","0", "0","0","0"];
    console.log("GAME OVER")
    return "A"
  }
  else if(field[0]=="B" && field[4]=="B" && field[8]=="B"){
    field=["0","0","0" ,"0","0","0", "0","0","0"];
    console.log("GAME OVER")
    return "B"
  }
  //check win diag 246
  if(field[2]=="A" && field[4]=="A" && field[6]=="A"){
    field=["0","0","0" ,"0","0","0", "0","0","0"];
    console.log("GAME OVER")
    return "A"
  }
  else if(field[2]=="B" && field[4]=="B" && field[6]=="B"){
    field=["0","0","0" ,"0","0","0", "0","0","0"];
    console.log("GAME OVER")
    return "B"
  }
  //check tie
  if(field.includes("0")==false){
    field=["0","0","0" ,"0","0","0", "0","0","0"];
    console.log("GAME OVER")
    return "T"
  }
  return "0"
}

function inputToField(identifier){
  if(identifier=="g1")
  {
    return 0;
  }
  else if(identifier=="g2")
  {
    return 1;
  }
  else if(identifier=="g3")
  {
    return 2;
  }
  else if(identifier=="g4")
  {
    return 3;
  }
  else if(identifier=="g5")
  {
    return 4;
  }
  else if(identifier=="g6")
  {
    return 5;
  }
  else if(identifier=="g7")
  {
    return 6;
  }
  else if(identifier=="g8")
  {
    return 7;
  }
  else if(identifier=="g9")
  {
    return 8;
  }

}
server.listen(3000,() =>{
  console.log('listening on 3000')
})
