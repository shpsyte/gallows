const criaJogo = (sprite) => {
    let palavraSecreta = '';
    let lacunas = [];
    let etapa = [0,1,2];
    let posicaoEtapa = 1;

    const temPosicaoBranco = () => {  
        return lacunas.some(function(lacuna) {
            return lacuna == '';
        });
       
    };


    const ganhou = () => lacunas.length ? !temPosicaoBranco(): false;
    const perdeu = () => sprite.isFinished();
    const ganhouOuPerdeu = () => ganhou() ||  perdeu();

    const reinicia = () => {  
        posicaoEtapa = 1;
        sprite.reset();
        lacunas = [];
        palavraSecreta = '';
    };


    const processaChute = chute =>{
        if (!chute.trim()) 
        throw new Error('Chute inválido');
        
 

        //g = indica do inicio ao fim
        //i = case insensitive
        let exp = new RegExp(chute, 'gi'),
            resultado,
            acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {

            lacunas[resultado.index] = chute;
            acertou = true;
        }

        if (!acertou){

            sprite.nextFrame();
        }

    };

    const ciraLacunas = () => {  
        //lacunas = Array(palavraSecreta.length).fill('');
        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
            
        }
    };

    const setEtapa = posicao => posicaoEtapa = posicao;

    const setPalavrasSecreta = palavra => {  
        if (!palavra.trim()) 
          throw new Error('Palavra secreta inválida');

        palavraSecreta = palavra;
        ciraLacunas();
        setEtapa(2);
    };

    const getLacunas = () => lacunas;
    const getEtapa = () => etapa[posicaoEtapa];



    return {
        setPalavrasSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia

    };
};