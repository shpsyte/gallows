const criaController = jogo =>  {

    const $entrada = $('.entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {
        $lacunas.empty();
        jogo.getLacunas().forEach(element => {
           $("<li>")
                .addClass('lacuna')
                .text(element)
                .appendTo($lacunas);
        });
    };

    const mudaPlaceHolder = texto => 
        $entrada.attr('placeholder', texto);


        const guardaPalavraSecreta = () => {
        try {
            jogo.setPalavrasSecreta($entrada.val());
            mudaPlaceHolder('chute');
            exibeLacunas();
            $entrada.val('');
            
        } catch (error) {
            alert(error.message);
        }
    };

    const reinicia = () => {  
        jogo.reinicia();
        mudaPlaceHolder('Palavra secreta');
        $lacunas.empty();
    };

    const leChute = () => {
        try {
            jogo.processaChute($entrada.val().trim().substr(0,1));
            $entrada.val('');
            exibeLacunas();
           
            var ganhou = jogo.ganhou();
            var perdeu = jogo.perdeu();
    
            setTimeout(() => {
                if (ganhou || perdeu)
                {
                    alert(ganhou ? "Parabéns você ganhou" : "Que pena, você perdeu");
                    reinicia();
                }
            }, 200);
           
            
        } catch (error) {
            alert(error.message);
        }  
        

    };

    const inicia = ()  => {
        $entrada.keypress( event => {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };
    return { inicia };
};