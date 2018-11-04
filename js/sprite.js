const createSprite = seletor => {

    const $el = $(seletor);
    const frames = [
                'frame1','frame2','frame3','frame4','frame5',
                'frame6','frame7','frame8','frame9'
    ];
    let posicao = 0;
    let last = frames.length - 1;
    $el.addClass(frames[posicao]);

    
    const moveFrame = (from, to) => {
        $el.removeClass(from)
           .addClass(to);
    };

    const hasNext = () =>  posicao + 1 <= last;

    const nextFrame = () => {
        if (hasNext()) { 
           moveFrame(frames[posicao], frames[++posicao]);
        }
    };

    const reset = () =>  {
        moveFrame(frames[posicao], frames[0]); 
        posicao = 0;
    };

    const isFinished = ()=> !hasNext();
    
    return{
        nextFrame,
        reset,
        isFinished
    };



};
 