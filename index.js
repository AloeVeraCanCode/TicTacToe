var canInsert=true;
var ttt=new Array(10,false);
var cross=[],circle=[];
var available=9;
var won=0,draw=0,lost=0;
$(".para").click((event)=>{
    if(canInsert&&available){
    const id=event.target.attributes.id.nodeValue;
    // console.log("#"+id);
    if(ttt[id])return;
    $("#"+id).text("X");
    console.log("HERE")
    ttt[id]=true;available--;
    cross.push(parseInt(id));
    canInsert=false;
    checkGameStatus();
    if(!canInsert)
    computer();
    }
});
function computer(){
    if(!available)return;
    var ran=1;
    do{
         ran=1+Math.floor((Math.random()*9));
    } while(ttt[ran]&&available);
    available--;ttt[ran]=true;
    $("#"+ran).text("O");
    circle.push(ran);
    checkGameStatus();
    canInsert=true;
}
function checkGameStatus(){
    cross.sort();circle.sort();
    console.log(cross);
    console.log(circle);
    var cr=false,ci=false;
    var i=0,j=0;
    for(i=0;i<3;i++)
    {
        var temph=true,tempv=true;
        for(j=0;j<3;j++)
        {
            temph&=cross.includes(3*i+j+1);
            tempv&=cross.includes(i+3*j+1);
        }
        if(temph||tempv){cr=true;break;}
    }
    for(i=0;i<3;i++)
    {
        var temph=true,tempv=true;
        for(j=0;j<3;j++)
        {
            temph&=circle.includes(3*i+j+1);
            tempv&=circle.includes(i+3*j+1);
        }
        if(temph||tempv){ci=true;break;}
    }
    var temph=true,tempv=true;
    for(i=0;i<3;i++)
    {
        temph&=circle.includes((3*i+i+1));
        tempv&=circle.includes((2-i)+3*i+1);
    }
    if(temph||tempv){ci=true;}
    temph=true;tempv=true;
    for(i=0;i<3;i++)
    {
        temph&=cross.includes(3*i+i+1);
        tempv&=cross.includes((2-i)+3*i+1);
    }
    if(temph||tempv){cr=true;}
    console.log(""+cr+ci);
    if(cr||ci)
    {
        circle.splice(0, circle.length);cross.splice(0, cross.length);
        canInsert=true;
        if(cr)won++;else if(ci)lost++;update();
        refresh();
    }
    if(!available)
    {
        draw++;update();refresh();
    }
    else return;
}

function update()
{
    $(".won").text("WON:"+won);$(".draw").text("DRAW:"+draw);$(".lost").text("LOST:"+lost);
}
function refresh()
{
    // $("#"+j).text("");
    // setTimeout("Here",10000);
    alert("Click Ok to start new game!!!")
    for(var j=1;j<=9;j++)
    {
        ttt[j]=false;available=9;canInsert=true;
        $("#"+j).text("");
    }
}