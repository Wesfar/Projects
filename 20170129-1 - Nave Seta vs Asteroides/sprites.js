
var explosionImage = new Image(); // Cria nova Imagem
explosionImage.src = "Assets/explosion/Sprite Sheet/ExplosionA1.png"; //Vai buscar o ficheiro para esta imagem

var sprite = {
    countFrame: 0, // Contador de frames passadas
    partialFrame: 0, // Contador de sub frames do browser para carregar nova frame da sprite sheet
    thisFrameX: 0, // Coordenada x da frame a tirar da sprite sheet
    thisFrameY: 0, // Coordenada y da frame a tirar da sprite sheet
    totalColumns: 32, // Frames por fila da sprite sheet	
    totalRows: 1, // Filas de Frames da sprite sheet
    totalFrames: 32,// Total de frames na sprite sheet
};

function drawExplosionShip() {
    // Usar countFrame para identificar a frame a retirar da Sprite Sheet
    sprite.thisFrameX = (sprite.countFrame % sprite.totalColumns) * explosionImage.width / sprite.totalColumns; // x definido por countFrame modulus 12 (frames por linha) X width de cada frame
    sprite.thisFrameY = Math.floor(sprite.countFrame / sprite.totalColumns) * explosionImage.height / sprite.totalRows; // y definido por countFrame / 12 (frames por linha) X heigth de cada frame

    //desenhar a explosão
    context.drawImage( // Desenhar frame da sprite sheet
        explosionImage, // Imagem da sprites sheet toda
        sprite.thisFrameX, sprite.thisFrameY, // Coordenadas do canto sup esquerdo da frame a recortar da imagem
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows, // Largura e Altura da frame a recortar
        Ship_A.position.getX() - 55, Ship_A.position.getY() - 55, // Coordenadas do canto sup esquerdo destino no canvas
        explosionImage.width / sprite.totalColumns, explosionImage.height / sprite.totalRows // Largura e Altura da frame a desenhar
        );

    spriteTimer();         // avançar animação da explosão
};


function spriteTimer() {
    if (sprite.countFrame >= sprite.totalFrames - 1) { //conta se já deu a volta toda à sprite sheet
        GameWrapUp = true;
        console.log("Morreste!")
        return;                                        //se sim, acabar a execução do programa
    }
    else if (sprite.partialFrame > 1) {
        sprite.countFrame++;                       //avançar para frame seguinte da spreadsheet
        sprite.partialFrame = 0;                   //repor a contagem para passar a frame seguinte
    }
    else {
        sprite.partialFrame += 0.25;               //número de frames da spritesheet que passam por cada refresh do browser
    };
};
