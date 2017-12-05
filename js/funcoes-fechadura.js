/*
** Função que armazena a senha digitada na página HTML.
*/
function teclaFechadura(tecla){
    // Armazena o valor atual na página HTML.
	senha_atual = $('#senha-quarto').val();

    // Verifica se a senha atingiu o máximo de 4 caracteres.
	if (senha_atual.length < 4){
		$('#senha-quarto').val(senha_atual+tecla);
	}

    // Quando a senha tiver 4 caracteres, chamará a primeira função.
	if (senha_atual.length == 3 || senha_atual.length == 4){
		checaDigitoSenha($('#senha-quarto').val(), 0);
	}
}

/*
** ------//------ Início do AFD - Primeira função - Estado Inicial ------//------
** Senha do quarto: 1337
*/
function checaDigitoSenha(valor, i){

    // substring utilizado para pegar a primeira letra da palavra (senha) recebida.
    senha = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o valor é inválido.
    if(senha != '1'){
        // Envia a palavra para o Estado Final incorreto.
        senhaIncorreta(valor);
    }

    // Verifica se, na palavra recebida, foi informado o valor correto.
    if(senha == '1'){
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a segunda função.
        checaDigitoSenha2(valor, i);
    }

}

/*
**    Segunda Função/Estado
*/
function checaDigitoSenha2(valor, i){

    // substring utilizado para pegar a primeira letra da palavra (senha) recebida.
    senha = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o valor é inválido.
    if(senha != '3'){
        // Envia a palavra para o Estado Final incorreto.
        senhaIncorreta(valor);
    }

    // Verifica se, na palavra recebida, foi informado o valor correto.
    if(senha == '3'){
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a terceira função.
        checaDigitoSenha3(valor, i);
    }
}

/*
**    Terceira Função/Estado
*/
function checaDigitoSenha3(valor, i){

    // substring utilizado para pegar a primeira letra da palavra (senha) recebida.
    senha = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o valor é inválido.
    if(senha != '3'){
        // Envia a palavra para o Estado Final incorreto.
        senhaIncorreta(valor);
    }

    // Verifica se, na palavra recebida, foi informado o valor correto.
    if(senha == '3'){
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a quarta função.
        checaDigitoSenha4(valor, i);
    }
}

/*
**    Quarta e última função/Estado Final correto.
*/
function checaDigitoSenha4(valor, i){

    // substring utilizado para pegar a primeira letra da palavra (senha) recebida.
    senha = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o valor é inválido.
    if(senha != '7'){
        // Envia a palavra para o Estado Final incorreto.
        senhaIncorreta(valor);
    }

    // Verifica se, na palavra recebida, foi informado o valor correto.
    if(senha == '7'){
        // Remove o cadeado trancado.
        $('#cadeado-fechadura').removeClass('fa-lock');
        // Adiciona o cadeado destrancado.
        $('#cadeado-fechadura').addClass('fa-unlock');

        // Exibe o alerta de senha correta.
        $.alert({
            title: false,
            content: '<div class="text-center"><strong>Acesso liberado!</strong></div>',
            buttons: {
                X: {
                    btnClass: 'btn-green'
                }
            }
        });
    }
}

/*
**    Função de senha incorreta/Estado Final incorreto.
*/
function senhaIncorreta(valor){

    // Verifica se o cadeado está destrancado.
    if ($('#cadeado-fechadura').hasClass('fa-unlock')){
        // Remove o cadeado destrancado.
        $('#cadeado-fechadura').removeClass('fa-unlock');
        // Adiciona o cadeado trancado.
        $('#cadeado-fechadura').addClass('fa-lock');
    }

    // Exibe o alerta de senha incorreta.
    $.alert({
        title: false,
        content: '<div class="text-center"><strong>Senha incorreta!</strong></div>',
        buttons: {
            X: {
                btnClass: 'btn-red',
                action: function(){
                    // Zera o campo da senha na página HTML.
                    $('#senha-quarto').val("");
                }
            }
        }
    });
}