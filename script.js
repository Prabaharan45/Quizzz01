const questions=[
    {
        question:"நம் சாலையம்பதியில் கொடி கம்பத்தின் உயரம் என்ன?",
        answers:[
            {text:"38அடி" ,correct:false},
            {text:"34அடி", correct:true},
            {text:"36அடி" ,correct:false},
            {text:"32அடி", correct:false},
        ]
    },
    {
        question:"தெய்வமவர்கள்  எந்த ஊரு வழியாக வரும்பொழுது  அவர்களுக்கு பிடரி கண் திறந்தது?",
        answers:[
            {text:"மார்க்கம்பட்டி" ,correct:false},
            {text:"மதுரை", correct:false},
            {text:"அரச்சலூர்" ,correct:true},
            {text:"திருப்பத்தூர்", correct:false},
        ]
    },
    {
        question:"ஆண்டவர்களின் வாகனம் எது?",
        answers:[
            {text:"மயில்" ,correct:false},
            {text:"சிங்கம்", correct:false},
            {text:"கழுகு" ,correct:false},
            {text:"வெண்புறவி", correct:true},
        ]
    },
    {
        question:"மெய்மதம் உதயமான தேதி எது??",
        answers:[
            {text:"02-06-1966", correct:true},
            {text:"02-07-1954", correct:false},
            {text:"02-06-1944",correct:false},
            {text:"02-08-1933", correct:false},
        ]
    },
    {
        question:"வள்ளலார் இந்த பெருமிதம் தமக்கு எவ்வாரு கிடைத்ததாக கூறுகிறார்?",
        answers:[
            {text:"தனது முயற்சியினால்", correct:false},
            {text:"நூல் படித்ததினால்", correct:false},
            {text:"ஆண்டவர்கள் தயவினால்" ,correct:true},
            {text:"தனது நல்ல குணத்தால்", correct:false},
        ]
    }
];

const quesElement=document.getElementById("ques");
const ansElement=document.getElementById("ans-btn");
const nextElement=document.getElementById("next");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextElement.innerHTML="next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    quesElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}
function resetState(){
    nextElement.style.display="none";
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }
}
function selectanswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextElement.style.display="block";
}

function showScore(){
    resetState();
    quesElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML="Play Again";
    nextElement.style.display="block";
}
function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextElement.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextbutton();
    }else{
        startQuiz();
    }
})
startQuiz();