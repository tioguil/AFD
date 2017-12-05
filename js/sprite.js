function Sprite(x, y, largura, altura) {
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	this.desenha = function(xCanvas, yCanvas) {
		ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
	}
}

var elevadorAberto = new Sprite(1024, 1, 67, 75),
elevadorFechado = new Sprite(1024, 78, 67, 75),
bg = new Sprite(0, 0, 1024, 649);