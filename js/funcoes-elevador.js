function painelElevador(andar_solicitado){
	moveElevador(andar_solicitado);
}

//Variaveis 
var canvas, ctx, altura, largura, frames = 0, img; //Variaveis Canvas.
var parada = 0;  // andar onde esta o elevador
var AFD = "Y00X"; // armazenamento da palavra
var porta = 1;	// status da porta aberto ou fechada
var chego = false; 

//Variavel Chão
var terreo = {
	y: 550, 
	x: 50,
	
	desenha: function(px,py){
		ctx.fillStyle = "#000066";
		ctx.fillRect(px , py, largura, 25);
	}
};

//***************************************************************************************************

var andar = {
	y: 550, 
	x: 50,
	
	desenha: function(px,py){
		ctx.fillStyle = "#000066";
		ctx.fillRect(px , py, 850, 25);
	}
};

//Variavel com dados do elevador incluindo função
var elevador = {
	x: 851,
	y: 550,

	velocidade: 5,

	descer: function(){
		this.y += this.velocidade;  // responsavel por descer o elevador no canvas
	},

	subir: function(){
		this.y -= this.velocidade; // responsavel por Subir o elevador no canvas
	},

	elevadorAberto: function(){
	         elevadorAberto.desenha(this.x, this.y);
	},

	elevadorFechado: function(){
	         elevadorFechado.desenha(this.x, this.y);
	}
};


// Função responsavel por identificar as teclas para alterar posição do elevador na function desenha.

function moveElevador(andar_solicitado) {

	var palavra = new Array("Y", 1, 2, "X");

	switch(elevador.y) {
		case 50:
			palavra[1] = "5";
			break;
		case 150:
			palavra[1] = "4";
			break;
		case 250:
			palavra[1] = "3";
			break;
		case 350:
			palavra[1] = "2";
			break;
		case 450:
			palavra[1] = "1";
			break;
		case 550:
			palavra[1] = "0";
			break;
	}

	if(andar_solicitado == 0){
		palavra[2] = andar_solicitado;
		AFD = palavra[0]+palavra[1]+palavra[2]+palavra[3];							//Atualizando Palavra a ser executada pelo AFD
		chego = false;							//Alterado status do elevador para ainda não chegou
	} else if(andar_solicitado ==  1){
		palavra[2] = andar_solicitado;
		AFD = palavra[0]+palavra[1]+palavra[2]+palavra[3];							//Atualizando Palavra a ser executada pelo AFD
		chego = false;							//Alterado status do elevador para ainda não chegou
	} else if(andar_solicitado == 2){
		palavra[2] = andar_solicitado;
		AFD = palavra[0]+palavra[1]+palavra[2]+palavra[3];							//Atualizando Palavra a ser executada pelo AFD
		chego = false;							//Alterado status do elevador para ainda não chegou
	} else if(andar_solicitado == 3){
		palavra[2] = andar_solicitado;
		AFD = palavra[0]+palavra[1]+palavra[2]+palavra[3];							//Atualizando Palavra a ser executada pelo AFD
		chego = false;							//Alterado status do elevador para ainda não chegou
	} else if(andar_solicitado == 4){
		palavra[2] = andar_solicitado;
		AFD = palavra[0]+palavra[1]+palavra[2]+palavra[3];							//Atualizando Palavra a ser executada pelo AFD
		chego = false;							//Alterado status do elevador para ainda não chegou
	} else if(andar_solicitado == 5){
		palavra[2] = andar_solicitado;
		AFD = palavra[0]+palavra[1]+palavra[2]+palavra[3];							//Atualizando Palavra a ser executada pelo AFD
		chego = false;							//Alterado status do elevador para ainda não chegou
	}
	abrePorta();
	$('#palavra-elevador').html(AFD);
};

function maquinaDoce(){

	$.confirm({
		theme: 'material',
		animation: 'zoom',
		closeAnimation: 'scale',
		title: '<i class="fa fa-shopping-cart"></i> Máquina de Doces',
		animationBounce: 1.5,
		content: '<i>Você está no <strong>terceiro andar</strong>.</i><br>Deseja utilizar a <strong>Máquina de Doces</strong>?',
		
		buttons: {
			Sim: {
				btnClass: 'btn-success',
				action: function(){
					if($('#modal-md').click()){
						$('#limpar').click();
						$('.maquina-resultado').html("");
					}
				}
			},
			Não: {
				btnClass: 'btn-red'
			}
		}
	});

}

function acessarQuarto(){

	$.confirm({
		theme: 'material',
		animation: 'zoom',
		closeAnimation: 'scale',
		title: '<i class="fa fa-bed"></i> Quarto',
		animationBounce: 1.5,
		content: '<i>Você está no <strong>quinto andar</strong>.</i><br>Deseja entrar no <strong>quarto</strong>?',
		
		buttons: {
			Sim: {
				btnClass: 'btn-success',
				action: function(){
					if($('#modal-fechadura').click()){
						$('#senha-quarto').val("");
						if($('#cadeado-fechadura').hasClass('fa-unlock')){
							$('#cadeado-fechadura').removeClass('fa-unlock');
							$('#cadeado-fechadura').addClass('fa-lock');
						}
					}
				}
			},
			Não: {
				btnClass: 'btn-red'
			}
		}
	});

}

// *****************    Inicio AFD     ********************************

// A = Aberto; F = Fechado; numerais = andares

function inicio(palavra){

	i = 0;
	if(palavra.charAt(i) == "Y" ){				// Verificando primeira letra da palavra 
		fechaPorta(palavra, i);
	}

}


function abrePorta(){
	porta = 1;	// Status da porta como Aberto;
}

function fechaPorta(palavra, i){
	porta = 0; 	//Alterando status da porta para Fechada

	i++;
					 
	if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
		andar0(palavra, i);
	}else if("1" == palavra.charAt(i)){
		andar1(palavra, i);
	}else if("2" == palavra.charAt(i)){
		andar2(palavra, i);
	}else if("3" == palavra.charAt(i)){
		andar3(palavra, i);
	}else if("4" == palavra.charAt(i)){
		andar4(palavra, i);
	}else if("5" == palavra.charAt(i)){
		andar5(palavra, i);
	}
}

// Função responsavel por alterar o andar do elevador.

function andar0(palavra, i){
	parada = 0;

	i++;

	if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
		andar0(palavra, i);
	}else if("1" == palavra.charAt(i)){		
		andar1(palavra, i);
	}else if("2" == palavra.charAt(i)){
		andar2(palavra, i);
	}else if("3" == palavra.charAt(i)){
		andar3(palavra, i);
	}else if("4" == palavra.charAt(i)){
		andar4(palavra, i);
	}else if("5" == palavra.charAt(i)){
		andar5(palavra, i);
	}

	if("X" == palavra.charAt(i) && elevador.y == 550){		// Verificando ultima letra da Palavra - Quarta Letra
		abrePorta();
	}

}

function andar1(palavra, i){
		parada = 1;

		i++;

		if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
			andar0(palavra, i);
		}else if("1" == palavra.charAt(i)){
			andar1(palavra, i);
		}else if("2" == palavra.charAt(i)){
			andar2(palavra, i);
		}else if("3" == palavra.charAt(i)){
			andar3(palavra, i);
		}else if("4" == palavra.charAt(i)){
			andar4(palavra, i);
		}else if("5" == palavra.charAt(i)){
			andar5(palavra, i);
		}

		if("X" == palavra.charAt(i) && elevador.y == 450 ){		// Verificando ultima letra da Palavra - Quarta Letra
			abrePorta();
		}

}

function andar2(palavra, i){
		parada = 2;

		i++;

		
		if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
			andar0(palavra, i);
		}else if("1" == palavra.charAt(i)){
			andar1(palavra, i);
		}else if("2" == palavra.charAt(i)){
			andar2(palavra, i);
		}else if("3" == palavra.charAt(i)){
			andar3(palavra, i);
		}else if("4" == palavra.charAt(i)){
			andar4(palavra, i);
		}else if("5" == palavra.charAt(i)){
			andar5(palavra, i);
		}

		if("X" == palavra.charAt(i) && elevador.y == 350){		// Verificando ultima letra da Palavra - Quarta Letra
			
			abrePorta();
		}

}

function andar3(palavra, i){
		parada = 3;

		i++;

		if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
			andar0(palavra, i);
		}else if("1" == palavra.charAt(i)){
			andar1(palavra, i);
		}else if("2" == palavra.charAt(i)){
			andar2(palavra, i);
		}else if("3" == palavra.charAt(i)){
			andar3(palavra, i);
		}else if("4" == palavra.charAt(i)){
			andar4(palavra, i);
		}else if("5" == palavra.charAt(i)){
			andar5(palavra, i);
		}

		if("X" == palavra.charAt(i) && elevador.y == 250){		// Verificando ultima letra da Palavra - Quarta Letra
			
			abrePorta();
		}

}

function andar4(palavra, i){
		parada = 4;

		i++;

		if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
			andar0(palavra, i);
		}else if("1" == palavra.charAt(i)){
			andar1(palavra, i);
		}else if("2" == palavra.charAt(i)){
			andar2(palavra, i);
		}else if("3" == palavra.charAt(i)){
			andar3(palavra, i);
		}else if("4" == palavra.charAt(i)){
			andar4(palavra, i);
		}else if("5" == palavra.charAt(i)){
			andar5(palavra, i);
		}

		if("X" == palavra.charAt(i) && elevador.y == 150){		// Verificando ultima letra da Palavra - Quarta Letra
			
			abrePorta();
		}

}

function andar5(palavra, i){
		parada = 5;

		i++;

		if("0" == palavra.charAt(i)){			// Verificando 3 Letra da Palavra; os andares
			andar0(palavra, i);
		}else if("1" == palavra.charAt(i)){
			andar1(palavra, i);
		}else if("2" == palavra.charAt(i)){
			andar2(palavra, i);
		}else if("3" == palavra.charAt(i)){
			andar3(palavra, i);
		}else if("4" == palavra.charAt(i)){
			andar4(palavra, i);
		}else if("5" == palavra.charAt(i)){
			andar5(palavra, i);
		}

		if("X" == palavra.charAt(i) && elevador.y == 50 ){		// Verificando ultima letra da Palavra - Quarta Letra
			abrePorta();
		}
}

//****************Main*******************
function main(){

	//Desenhando o Canvas
	altura = window.innerHeight;
	largura = window.innerWidth;

	if(largura >= 500){
		largura = 1021;
		altura = 649;
	}

	canvas = document.createElement("canvas");
	canvas.width = largura;
	canvas.height = altura;
	canvas.style.border = "1px solid black";
	$(canvas).addClass("canvas-elevador");
	$(canvas).html("Seu navegador não suporta a tag canvas do HTML5.");


	ctx =  canvas.getContext("2d");
	document.body.appendChild(canvas);

//*******Definindo Imagem a ser desenhada
	img = new Image(); 
	img.src = "img/elevador/Imagem.png";

	loop();
}


// Function resposavel pelo Loop
function loop(){
	atualizar();
	desenha();
	window.requestAnimationFrame(loop);
}

function atualizar() {
	frames++;
}


// Função onde é incluido imagens no canvas.
function desenha(){
	
	ctx.fillStyle = "#CCC";
	ctx.fillRect(0, 0, largura, altura);

	bg.desenha(0, 0);	// Desenhando o fundo 

	//Desenha elevador com porta aberta ou fechada
	if( porta == 1 ){
		elevador.elevadorAberto();
	}else{
		elevador.elevadorFechado();
	}
	
	// Atualizando o elevador no Canvas
	moveElevador();
	inicio(AFD);
	
// Definindo criterio de parada do elevador no canvas	
	if(parada == 0){			// andar 0 
		if(elevador.y < 550){
			elevador.descer();
			if(elevador.y == 550){
				chego = true;
				if (elevador.y == 550 && chego == true){
					$('#0').addClass('disabled disabled-elevador');
					$('#0').prop('disabled', true);
					$('#andar-elevador').html("Térreo");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(4).id == '0'){
							$('#0').addClass('disabled disabled-elevador');
							$('#0').prop('disabled', true);
						}
					}
				}
			}
		}
	}else if(parada == 1){		// andar 1	
		if(elevador.y > 450){
			elevador.subir();
			if(elevador.y == 450){
				chego = true;
				if (elevador.y == 450 && chego == true){
					$('#1').addClass('disabled disabled-elevador');
					$('#1').prop('disabled', true);
					$('#andar-elevador').html("1º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(5).id == '1'){
							$('#1').addClass('disabled disabled-elevador');
							$('#1').prop('disabled', true);
						}
					}
				}
			}
		}else if(elevador.y < 450){
			elevador.descer();
			if(elevador.y == 450){
				chego = true;
				if (elevador.y == 450 && chego == true){
					$('#1').addClass('disabled disabled-elevador');
					$('#1').prop('disabled', true);
					$('#andar-elevador').html("1º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(5).id == '1'){
							$('#1').addClass('disabled disabled-elevador');
							$('#1').prop('disabled', true);
						}
					}
				}
			}
		}		
	}else if(parada == 2){		// andar 2
		if(elevador.y > 350){
			elevador.subir();
			if(elevador.y == 350){
				chego = true;
				if (elevador.y == 350 && chego == true){
					$('#2').addClass('disabled disabled-elevador');
					$('#2').prop('disabled', true);
					$('#andar-elevador').html("2º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(2).id == '2'){
							$('#2').addClass('disabled disabled-elevador');
							$('#2').prop('disabled', true);
						}
					}
				}
			}
		}else if(elevador.y < 350){
			elevador.descer();
			if(elevador.y == 350){
				chego = true;
				if (elevador.y == 350 && chego == true){
					$('#2').addClass('disabled disabled-elevador');
					$('#2').prop('disabled', true);
					$('#andar-elevador').html("2º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(2).id == '2'){
							$('#2').addClass('disabled disabled-elevador');
							$('#2').prop('disabled', true);
						}
					}
				}
			}
		}		
	}else if(parada == 3){		// andar 3
		if(elevador.y > 250){
			elevador.subir();
			if(elevador.y == 250){
				chego = true;
				if (elevador.y == 250 && chego == true){
					$('#3').addClass('disabled disabled-elevador');
					$('#3').prop('disabled', true);
					$('#btn-md').css('visibility', 'visible');
					$('#andar-elevador').html("3º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(3).id == '3'){
							$('#3').addClass('disabled disabled-elevador');
							$('#3').prop('disabled', true);
							$('#btn-md').css('visibility', 'visible');
						}
					}
				}
				maquinaDoce();
			}
		}else if(elevador.y < 250){
			elevador.descer();
			if(elevador.y == 250){
				chego = true;
				if (elevador.y == 250 && chego == true){
					$('#3').addClass('disabled disabled-elevador');
					$('#3').prop('disabled', true);
					$('#btn-md').css('visibility', 'visible');
					$('#andar-elevador').html("3º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(3).id == '3'){
							$('#3').addClass('disabled disabled-elevador');
							$('#3').prop('disabled', true);
							$('#btn-md').css('visibility', 'visible');
						}
					}
				}
				maquinaDoce();
			}
		}		
	}else if(parada == 4){			// andar 4
		if(elevador.y > 150){
			elevador.subir();
			if(elevador.y == 150){
				chego = true;
				if (elevador.y == 150 && chego == true){
					$('#4').addClass('disabled disabled-elevador');
					$('#4').prop('disabled', true);
					$('#andar-elevador').html("4º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(0).id == '4'){
							$('#4').addClass('disabled disabled-elevador');
							$('#4').prop('disabled', true);
						}
					}
				}
			}
		}else if(elevador.y < 150){
			elevador.descer();
			if(elevador.y == 150){
				chego = true;
				if (elevador.y == 150 && chego == true){
					$('#4').addClass('disabled disabled-elevador');
					$('#4').prop('disabled', true);
					$('#andar-elevador').html("4º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(0).id == '4'){
							$('#4').addClass('disabled disabled-elevador');
							$('#4').prop('disabled', true);
						}
					}
				}
			}
		}		
	}else if(parada == 5){			// andar 5
		if(elevador.y > 50){
			elevador.subir();
			if(elevador.y == 50){
				chego = true;
				if (elevador.y == 50 && chego == true){
					$('#5').addClass('disabled disabled-elevador');
					$('#5').prop('disabled', true);
					$('#andar-elevador').html("5º Andar");
					if($('.btn-elevador').hasClass('disabled disabled-elevador')){
						$('#btn-md').css('visibility', 'hidden');
						$('.btn-elevador').removeClass('disabled disabled-elevador');
						$('.btn-elevador').prop('disabled', false);
						if($('.btn-elevador').get(1).id == '5'){
							$('#5').addClass('disabled disabled-elevador');
							$('#5').prop('disabled', true);
						}
					}
				}
				acessarQuarto();
			}
		}
	}
}