const answer =  "APPLE";
let index = 0;
let attempts =0; // 시도할 수 있는 횟수 제한 변수

function appStart(){
    const handleEnterKey =()=>{
        for(let i =0; i < 5; i++){
            const block  = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            console.log(block.innerText);

            const blockValue = block.innerText;
            const answerValue = answer[i]
            
        }

    }

    // 키를 누르면 board-column에 입력됨
    const handleKeydown =(e)=>{
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);

        if(index === 5){ // 키를 5번 입력하면 중지
            if(keyCode === 13 ){
                handleEnterKey()
            }else{
                return
            }
        }else if(65 <=keyCode && keyCode <=90){    // 알파벳만 입력 가능하도록 지정
            // 화면에 대문자로 출력되도록 설정
            thisBlock.innerText = key; 
            index +=1;
        }
    }
    window.addEventListener("keydown",handleKeydown)
}

appStart();
