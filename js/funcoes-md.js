// Declaração da váriavel global a ser utilizada para verificação da compra.
var compraEfetuada = false;

// Função para limpar todos os campos e remover os doces e/ou troco.
function limparCampos(){
    // Zera o uso da máquina.
    compraEfetuada = false;
    // Limpa os campos da máquina.
    $('.maquina-resultado').html('');
    $('#total_dinheiro').val('0');
    $('#total_palavra').val('');
    $('#troco').css('visibility', 'hidden');
    $('#retirada-ruffles').css('visibility', 'hidden');
    $('#retirada-hersheys').css('visibility', 'hidden');
    $('#retirada-doritos').css('visibility', 'hidden');
}

/* 
** Função para mostrar e armazenar na página HTML as palavras e os dinheiros inseridas na máquina.
** A variável 'dinheiro_selecionado' recebe o valor dos índices dos dinheiros selecionados para serem alocados posteriormente no array 'palavra'.
*/
function calculaTotal(dinheiro_selecionado){
    // Verifica se a máquina já foi utilizada, se sim, bloqueia a escolha (inserção) do dinheiro.
    if(compraEfetuada == true){
        $.alert({
            title: false,
            content: 'Você utilizou a Máquina de Doce, deseja utilizar novamente?',
            buttons: {
            Sim: {
                btnClass: 'btn-success',
                backgroundDismiss: true,
                action: function(){
                    limparCampos();
                }
            },
            Não: {
                btnClass: 'btn-red'
            }
        }
        });
        return false;
    }
    // Recebe e armazena o valor atual no campo 'id="total_dinheiro"' na página HTML.
    var valor1 = parseFloat($('#total_dinheiro').val());

    // Recebe e armazena o valor de cada dinheiro selecionado na página HTML
    var valor2 = parseFloat(dinheiro_selecionado);

    // Recebe e armazena a soma do valor atual no campo 'id="total_dinheiro"' com o valor de cada dinheiro selecionado na página HTML.
    var valor3 = valor1 + valor2;

    // Monta a palavra utilizada no AFD da máquina de doces.
    var palavra = new Array(0, "A", "B", 2, 3, "C");

    // Recebe e armazena a palavra gerada atual no campo 'id="total_palavra"' na página HTML.
    var palavraAtual = $('#total_palavra').val();
    
    // Altera no campo 'id="total_dinheiro"' da página HTML com o valor da variável 'valor3'.
    document.getElementById('total_dinheiro').value=valor3;

    // Altera no campo 'id="total_palavra"' da página HTML capturando o valor atual do próprio campo com o valor da palavra do dinheiro selecionado.
    document.getElementById('total_palavra').value=palavraAtual+palavra[dinheiro_selecionado];
}

/* 
** Função que recebe o doce escolhido, busca a palavra atual na página HTML e envia os dados obtidos para a primeira função do AFD.
*/
function efetuarCompra(doce){
    // Verifica se a máquina já foi utilizada, se sim, bloqueia a compra dos doces.
    if(compraEfetuada == true){
        $.alert({
            title: false,
            content: 'Você utilizou a Máquina de Doce, deseja utilizar novamente?',
            buttons: {
            Sim: {
                btnClass: 'btn-success',
                backgroundDismiss: true,
                action: function(){
                    limparCampos();
                }
            },
            Não: {
                btnClass: 'btn-red'
            }
        }
        });
        return false;
    }
    // Recebe e armazena a palavra gerada atual no campo 'id="total_palavra"' na página HTML.
    var palavraGerada = $('#total_palavra').val();

    // Variável que armazena a concatenação da variável 'valorPalavra' com a váriavel 'doce' gerando a palavra para ser enviada ao AFD.
    var valorPalavra = palavraGerada+doce;

    // Atualiza a palavra com o doce escolhido no campo 'id="total_palavra"' na página HTML.
    $('#total_palavra').val(valorPalavra);

    // Chama a primeira função do AFD enviando a palavra gerada e passando os parâmetros a serem utilizados na função de substring do JavaScript.
    dinheiro(valorPalavra, 0, 0);
}

/*
** ------//------ Início do AFD - Primeira função - Estado Inicial ------//------
*/
function dinheiro(valor, i, valor_total){

    // substring utilizado para pegar a primeira letra da palavra recebida.
    valor_doce = valor.substr(i, 1);

    // Verifica se existe apenas a palavra que representa o doce, no caso do usuário não ter inserido algum dinheiro.
    if(valor_doce == 'D' || valor_doce == 'E' || valor_doce == 'F'){
// Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Caso seja a primeira palavra seja somente algum doce.
        $('.maquina-resultado').html("Operação não realizada. Favor inserir o dinheiro primeiro.");
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a segunda função.
        dinheiro_2(valor, i, valor_total);
    }
    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a terceira função.
        dinheiro_3(valor, i, valor_total);
    }
    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a sexta função.
        dinheiro_6(valor, i, valor_total);
    }

}

/*
** Segunda Função/Estado
*/
function dinheiro_2(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Caso não exista dinheiro suficiente.
    if(valor_doce == 'D' || valor_doce == 'E' || valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a terceira função.
        dinheiro_3(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a quarta função.
        dinheiro_4(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a sétima função.
        dinheiro_7(valor, i, valor_total);
    }
}

/*
** Terceira Função/Estado
*/
function dinheiro_3(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Caso não exista dinheiro suficiente.
    if(valor_doce == 'D' || valor_doce == 'E' || valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a quarta função.
        dinheiro_4(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a quinta função.
        dinheiro_5(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a oitava função.
        dinheiro_8(valor, i, valor_total);
    }
}

/*
** Quarta Função/Estado
*/
function dinheiro_4(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Caso não exista dinheiro suficiente.
    if(valor_doce == 'D' || valor_doce == 'E' || valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a quinta função.
        dinheiro_5(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a sexta função.
        dinheiro_6(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }
}

/*
** Quinta Função/Estado
*/
function dinheiro_5(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Caso não exista dinheiro suficiente.
    if(valor_doce == 'D' || valor_doce == 'E' || valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a sexta função.
        dinheiro_6(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a sétima função.
        dinheiro_7(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }
}

/*
** Sexta Função/Estado
*/
function dinheiro_6(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Caso não exista dinheiro suficiente.
    if(valor_doce == 'D' || valor_doce == 'E' || valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a sétima função.
        dinheiro_7(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a oitava função.
        dinheiro_8(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }
}

/*
** Sétima Função/Estado
*/
function dinheiro_7(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "D" e o dinheiro para a compra do doce seja apenas R$ 6,00.
    if(valor_doce == 'D'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce.
        compraDoce1();
    }

    // Caso o dinheiro seja apenas "R$ 6,00" e foi selecionado o doce "E" (R$ 7,00) ou doce "F" (R$ 8,00).
    if(valor_doce == 'E' || valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a oitava função.
        dinheiro_8(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }
}

/*
** Oitava Função/Estado
*/
function dinheiro_8(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "D" e o dinheiro para a compra do doce seja acima R$ 6,00.
    if(valor_doce == 'D'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce e retorna o troco.
        compraDoce1ComTroco(valor_total);
    }

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "E" e o dinheiro para a compra do doce seja apenas R$ 7,00.
    if(valor_doce == 'E'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce.
        compraDoce2();
    }

    // Caso o dinheiro seja apenas "R$ 7,00" e foi selecionado o doce "F" (R$ 8,00).
    if(valor_doce == 'F'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Retorna a mensagem de dinheiro insuficiente.
        $('.maquina-resultado').html("Dinheiro insuficiente, retire o valor R$ "+valor_total+",00.");
        $('#troco').css('visibility', 'visible');
        $('#retirada-ruffles').css('visibility', 'hidden');
        $('#retirada-hersheys').css('visibility', 'hidden');
        $('#retirada-doritos').css('visibility', 'hidden');
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }
}

/*
** Nona Função/Estado
*/
function dinheiro_9(valor, i, valor_total){

    // Recebe a palavra e pega a próxima letra (próxima posição da palavra) através do substring.
    valor_doce = valor.substr(i, 1);

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "D" e o dinheiro para a compra do doce seja acima R$ 6,00.
    if(valor_doce == 'D'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce.
        compraDoce1ComTroco(valor_total);
    }

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "E" e o dinheiro para a compra do doce seja acima R$ 7,00.
    if(valor_doce == 'E'){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce.
        compraDoce2ComTroco(valor_total);
    }

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "F" e o dinheiro para a compra do doce seja acima de R$ 8,00.
    if(valor_doce == 'F' && valor_total > 8){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce.
        compraDoce3ComTroco(valor_total);
    }

    // Verifica se, na palavra recebida, o doce selecionado seja apenas "F" e o dinheiro para a compra do doce seja apenas R$ 8,00.
    if(valor_doce == 'F' && valor_total == 8){
        // Muda o status da máquina para "usada", bloqueando as demais interações.
        compraEfetuada = true;
        // Chama a função compra doce.
        compraDoce3();
    }

    // Verifica se a letra selecionada é A (R$ 1,00).
    if(valor_doce == 'A'){
        // Acresenta 1 (R$ 1,00) ao valor total.
        valor_total += 1;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é B (R$ 2,00).
    if(valor_doce == 'B'){
        // Acrescenta 2 (R$ 2,00) ao valor total.
        valor_total += 2;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }

    // Verifica se a letra selecionada é C (R$ 5,00).
    if(valor_doce == 'C'){
        // Acrescenta 5 (R$ 5,00) ao valor total.
        valor_total += 5;
        // Acrescenta 1 ao nosso contador 'i', para mudar a posição de verificação da palavra pelo substring.
        i += 1;
        // Chama a nona função.
        dinheiro_9(valor, i, valor_total);
    }
}

/*
** AFD - Funções finais - Estados Finais
*/

/* -- Início das funções de compra do Doce1 "D" -- */
/*
** Função para realizar a compra do Doce1 "D" com apenas R$ 6,00.
*/
function compraDoce1(){
    // Retorna o doce escolhido.
    $('.maquina-resultado').html("Operação concluída, retire seu doce.");
    $('#troco').css('visibility', 'hidden');
    $('#retirada-ruffles').css('visibility', 'visible');
    $('#retirada-hersheys').css('visibility', 'hidden');
    $('#retirada-doritos').css('visibility', 'hidden');
}

/*
** Função para realizar a compra do Doce1 "D" com o dinheiro acima de R$ 6,00 e retorna o troco.
*/
function compraDoce1ComTroco(valor_total){
    // Valor do doce.
    doce = 6;
    // Calcula o troco, subtraindo o valor_total pelo doce.
    troco = valor_total - doce;
    // Retorna o doce escolhido e o valor do troco
    $('.maquina-resultado').html("Operação concluída, retire seu doce e seu troco de R$ "+troco+',00.');
    $('#troco').css('visibility', 'visible');
    $('#retirada-ruffles').css('visibility', 'visible');
    $('#retirada-hersheys').css('visibility', 'hidden');
    $('#retirada-doritos').css('visibility', 'hidden');
}
/* -- Fim das funções de compra do Doce1 "D" -- */


/* -- Início das funções de compra do Doce2 "E" -- */
/*
**    Função para realizar a compra do Doce2 "E" com apenas R$ 7,00.
*/
function compraDoce2(){
    // Retorna o doce escolhido.
    $('.maquina-resultado').html("Operação concluída, retire seu doce.");
    $('#troco').css('visibility', 'hidden');
    $('#retirada-ruffles').css('visibility', 'hidden');
    $('#retirada-hersheys').css('visibility', 'visible');
    $('#retirada-doritos').css('visibility', 'hidden');
}

/*
**    Função para realizar a compra do Doce2 "E" com o dinheiro acima de R$ 7,00 e retorna o troco.
*/
function compraDoce2ComTroco(valor_total){
    // Valor do doce.
    doce = 7;
    // Calcula o troco, subtraindo o valor_total pelo doce.
    troco = valor_total - doce;
    // Retorna o doce escolhido e o valor do troco
    $('.maquina-resultado').html("Operação concluída, retire seu doce e seu troco de R$ "+troco+',00.');
    $('#troco').css('visibility', 'visible');
    $('#retirada-ruffles').css('visibility', 'hidden');
    $('#retirada-hersheys').css('visibility', 'visible');
    $('#retirada-doritos').css('visibility', 'hidden');
}
/* -- Fim das funções de compra do Doce2 "E" -- */


/* -- Início das funções de compra do Doce3 "F" -- */
/*
**    Função para realizar a compra do Doce3 "F" com apenas R$ 8,00.
*/
function compraDoce3(){
    // Retorna o doce escolhido.
    $('.maquina-resultado').html("Operação concluída, retire seu doce.");
    $('#troco').css('visibility', 'hidden');
    $('#retirada-ruffles').css('visibility', 'hidden');
    $('#retirada-hersheys').css('visibility', 'hidden');
    $('#retirada-doritos').css('visibility', 'visible');
}

/*
**    Função para realizar a compra do Doce3 "F" com o dinheiro acima de R$ 8,00 e retorna o troco.
*/
function compraDoce3ComTroco(valor_total){
    // Valor do doce.
    doce = 8;
    // Calcula o troco, subtraindo o valor_total pelo doce.
    troco = valor_total - doce;
    // Retorna o doce escolhido e o valor do troco
    $('.maquina-resultado').html("Operação concluída, retire seu doce e seu troco de R$ "+troco+',00.');
    $('#troco').css('visibility', 'visible');
    $('#retirada-ruffles').css('visibility', 'hidden');
    $('#retirada-hersheys').css('visibility', 'hidden');
    $('#retirada-doritos').css('visibility', 'visible');
}
/* -- Fim das funções de compra do Doce3 "F" -- */

/*
**    ------//------ Fim do AFD ------//------
*/