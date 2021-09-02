const Canvas = require('canvas');
const fetch = require('node-fetch');

async function createOnlinePlayersDisplay(serverResp){
    const space = 10,linethicc = 2,offset = 5;
    const canvas = Canvas.createCanvas(300 + 2*space,300 + 2*space),
        ctx = canvas.getContext('2d'),
        playerList = serverResp.samplePlayers;
    let nPlayes = 0;
    Canvas.registerFont(__dirname + "../../extra/Minecraft.ttf",{family:'Minecraft'});

    const height = (canvas.height - (space*2))/10,
        width = canvas.width/2 - space;

    ctx.fillStyle = 'white';
    ctx.font = '15px "Minecraft"';

    if(playerList == null){
        ctx.fillRect(space,space,width,height);
        ctx.clearRect(space + linethicc, space + linethicc, width - 2*linethicc, height - 2*linethicc);
    }
    else{
        for(let p in playerList){
            nPlayes++;
            const collum = nPlayes%2 == 0 ? 2 : 1,
            row = (nPlayes - collum)/2 + 1,
            collumPos = space + (collum-1)*(width) - linethicc*(collum-1),
            rowPos = space + (row-1)*(height) - linethicc*(row!=1?1:0);
            
            ctx.fillRect(collumPos, rowPos, width, height);
            ctx.clearRect(collumPos + linethicc, rowPos + linethicc, width - 2*linethicc, height - 2*linethicc);
            
            const skinHead = await Canvas.loadImage('https://crafatar.com/avatars/' + playerList[p].id);
            ctx.drawImage(skinHead, collumPos + offset, rowPos + offset, height - 2*offset, height - 2*offset);
            ctx.fillText(playerList[p].name, collumPos + height, rowPos + canvas.height/20 + offset, width - height);
        }
    }
    const img = new Canvas.Image(),
		newCanvasHeight = ((((nPlayes%2==0?0:1) + nPlayes)/2) * height) + 2*space,
		newCanvas = Canvas.createCanvas(canvas.width, newCanvasHeight == (2*space) ? height + (2*space) : newCanvasHeight),
		newCtx = newCanvas.getContext('2d');
    
    img.src = canvas.toDataURL();
    newCtx.drawImage(img,0,0);
    return newCanvas;
}

module.exports ={
    createOnlinePlayersDisplay
}