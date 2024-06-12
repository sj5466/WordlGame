const answer =  "APPLE";
let index = 0;
let attempts =0; // 시도할 수 있는 횟수 제한 변수
let timer; 

function appStart(){
   
    const handleBackspace = () =>{
        if(index > 0){
            const preBlock = document.querySelector(`.board-column[data-index='${attempts}${index -1}']`); // 전에 있는 데이터를 지움
            preBlock.innerText = "";
        }
    
        index !== 0 ? index-- : 0;
    }

    const displayGameover =()=>{
        const div = document.createElement("div");
        div.innerText = "게임이 종료됐습니다.";
        div.style = "display: flex; justify-content: center; align-items: center; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);background-color:#fff; width:200px; padding:20px;"
        document.body.appendChild(div);
    }
    const gameover =() =>{
        window.removeEventListener("keydown",handleKeydown);
        displayGameover();
        clearInterval(timer)
    }

    const nextLine =()=>{
        if(attempts === 6)return;
        attempts += 1;
        index = 0;
    }

    const handleEnterKey =()=>{
        let answerLength = 0;
        for(let i =0; i < 5; i++){
            const block  = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            console.log(block.innerText);

            const blockValue = block.innerText;
            const answerValue = answer[i];

            if(blockValue === answerValue) {
                block.style.background = "#6AAA64";
                answerLength++;
            }
            else if( answer.includes(blockValue)) block.style.background ="#c9b458";
            else block.style.background ="#787C7E";
            block.style.color ="white";
            
        }

        if(answerLength === 5) gameover();
        else nextLine();
    }

    // 키를 누르면 board-column에 입력됨
    const handleKeydown =(e)=>{
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);

        if(keyCode === 8) handleBackspace();
        else if(index === 5){ // 키를 5번 입력하면 중지
            if(keyCode === 13 ){
                handleEnterKey();
            }else{
                return
            }
        }else if(65 <=keyCode && keyCode <=90){    // 알파벳만 입력 가능하도록 지정
            // 화면에 대문자로 출력되도록 설정
            thisBlock.innerText = key; 
            index +=1;
        }
    }

    const startTime =() =>{
        const startTime = new Date();

        function setTime(){
            const currentTime = new Date();
            const remainTime = new Date(currentTime - startTime);
            const minute = remainTime.getMinutes().toString();
            const seconds = remainTime.getSeconds().toString();
        
            const timeElement = document.querySelector('.time-count')
            timeElement.innerText = `${minute.padStart(2,'0')} : ${seconds.padStart(2,'0')}`;
        }
        
        timer = setInterval(() => {
            setTime()
        }, 1000);
    }
    startTime();
    window.addEventListener("keydown",handleKeydown);
}

appStart();
