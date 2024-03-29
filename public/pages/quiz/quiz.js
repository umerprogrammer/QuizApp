// var questions = [
//     {
//         question:"Html Stands For _______________________",
//         options: ["Hyper Text Makeup Language",
//         "html",
//         "Case Cading Style Sheet",
//         "Hypertext markup language"
//         ],
//         correctAns: "Hypertext markup language",
//     },
//     {
//         question:"Css Stands For _______________________",
//         options: [
//             "Casecading Style Sheet",
//             "Java",
//             "Ram",
//             "Hypertext markup language"
//         ],
//         correctAns: "Casecading Style Sheet",
//     },
//     {
//         question:"Js Stands For _______________________",
//         options: [
//             "Java Style",
//             "Java Script",
//             "Script",
//             "Script Src"
//         ],
//         correctAns: "Java Script",
//     },
//     {
//         question:"Dom Stands For _______________________",
//         options: [
//             "Document Object Model",
//             "html",
//             "Css",
//             "Java"
//         ],
//         correctAns: "Document Object Model",
//     },
//     {
//         question:"Ram Stands For _______________________",
//         options: [
//             "Read Only Memory",
//             "Dom",
//             "Random Acccess Memory",
//             "For Pc"
//         ],
//         correctAns: "Random Acccess Memory",
//     },
//     {
//         question:"Rom Stands For _______________________",
//         options: [
//             "Hyper Text Markup Language",
//             "html",
//             "HTml",
//             "Read Only Memory"
//         ],
//         correctAns: "Read Only Memory",
//     },
// ];


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase,ref,get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyACrXLShAHp9-K8y27sGfwVDSLNYflFV0w",
    authDomain: "cssclass02.firebaseapp.com",
    projectId: "cssclass02",
    storageBucket: "cssclass02.appspot.com",
    messagingSenderId: "1055020963251",
    appId: "1:1055020963251:web:b73df7bf219812ecea27c6",
    measurementId: "G-WEW020XCZ0"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();
  const reference = ref(db,"question/");

  var questions=[];

  function getData(){
    return new Promise((resolve,reject) => {
        get(reference).then((data) =>{
            if(data.exists()){
            const getData = Object.values(data.val());
            questions = getData;
            //console.log(getData,"GetData");
            resolve(getData);
            }
        }).catch((error)=>{
            console.log(error,"Error");
            reject(error);
        })
    });
  }


await getData();

var vhours = "01";
var vmin = "30";
var vsec = "00";


var totQuest = document.getElementById('totQuesIndex');
var curQuest = document.getElementById('curQuesIndex');
var quest = document.getElementById('txtquiz');
var optButton  = document.getElementById('buttons');
var nextButton  = document.getElementById('btnNext');
var backButton  = document.getElementById('btnBack');
var showButton  = document.getElementById('btnShowAll');
var btnResult = document.getElementById("btnShowResult");
var btnstartAgain = document.getElementById("btnstartAgain");

var resultBlock = document.getElementById("resultBlock");
var questBlock = document.getElementById("questBlock");

var secnd = document.getElementById("sec");
var min = document.getElementById("min");
var hours = document.getElementById("hrs");

var totmarks = document.getElementById("totmarks");
var obtmarks = document.getElementById("obtmarks");
var perc = document.getElementById("perc");
var grade = document.getElementById("grade");
var reuslt = document.getElementById("reuslt");

var interval;
var index = 0;
var isFinish = 0;
var totalMarks = 60;
var obtainmarks = 0;
var percentage = 0;
var reusltStatus = "Failed";
var resultgrade = "A";

totQuest.innerHTML = questions.length;
totalMarks = questions.length * 10;
curQuest.innerHTML = index +1;

hours.innerHTML = vhours;
min.innerHTML = vmin;
secnd.innerHTML = vsec;

function showQuestion(){
    quest.value = questions[index].question;
    //console.log(questions,"Get Question");
    //questTime();
    for(var i = 0 ; i<questions[index].options.length ; i++)
    {  
        var clsSpan =  isFinish == 1 && questions[index].correctAnswer == questions[index].options[i]? "d-block" : "d-none";
        var clsButton = isFinish == 1 && questions[index].correctAnswer == questions[index].options[i]? "btn-info" : "btn-outline-success";
        optButton.innerHTML+=`   <div class="col-md-6">
                        <button type="button" class="btn ${clsButton} d-flex justify-content-between" onclick="checkQuest(this,'${questions[index].correctAnswer}')">
                        <span>${questions[index].options[i]}</span>
                        <span class="${clsSpan}"><i class="fa-regular fa-circle-check"></i></span>
                    </button> </div>  `;
    }
}


window.checkQuest = function(a,b){
  if(a.innerText == b)
  {
    obtainmarks += 10;
    //a.firstElementChild.style.display = "block";
  }
    
}

window.showResult =function(){
    questBlock.classList.replace("d-block","d-none");
    resultBlock.classList.replace("d-none","d-block");

    createResult();
    btnstartAgain.classList.replace("d-none","d-block");
    
 
  }

window.nextQuestion = function(){
    
    if((index+1) < questions.length)
    {
        optButton.innerHTML = "";
        index++;
        curQuest.innerHTML = index+1;
        
        if((index+1) == questions.length)
        {
            console.log((index+1));
            nextButton.value = "Finish";
            nextButton.classList.replace("btn-outline-success","btn-outline-danger");
            nextButton.setAttribute("onClick","finishQuiz()");
            
        }
        showQuestion();
    }
}

window.finishQuiz = function(){
    showButton.style.display="block";
    // backButton.style.display="none";
    // nextButton.style.display="none";
    nextButton.value = "Next";
    nextButton.classList.replace("btn-outline-danger","btn-outline-success");

    btnResult.classList.replace("d-none","d-block");


    clearInterval(interval);
}

window.startAgain = function(){
    location.reload()   
}

window.showAll = function(){
    isFinish = 1;
    optButton.innerHTML = "";
    showQuestion();
    
}

window.backQuestion = function(){
    
    if(index > 0)
    {
        optButton.innerHTML = "";
        index--;
        curQuest.innerHTML = index+1;
        nextButton.value = "Next";
        nextButton.classList.replace("btn-outline-danger","btn-outline-success");
        nextButton.setAttribute("onClick","nextQuestion()");
        showQuestion();
    }
}


function questTime(){
    clearInterval(interval);
    secnd.innerHTML = "00";
    var second = 1;
    var minut = 1;
    interval = setInterval(() => {
        var sec = second++;
        secnd.innerHTML = sec.toString().length > 1 ? sec : "0" +  sec ;
        if(sec == 60 && vmin > 0 )
        {
            second = 0;
            vmin--;
            minut++;
            min.innerHTML = vmin;
        }
        if(minut == 60 && vhours > 0 )
        {
            minut = 0;
            vhours--;
            hours.innerHTML = vhours.toString().length > 1 ? vhours : "0" +  vhours ;
        }
        if(sec == 60)
        {
            second = 1;
            secnd.innerHTML = sec.toString().length > 1 ? sec : "0" +  sec ;
            sec = 0;
            //clearInterval(interval);
        }
        
    }, 1000);
}

function createResult(){
    if(obtainmarks > 0)
        percentage = Math.round( (obtainmarks/totalMarks)*100,2);
    if(percentage <= 0 )
    {
        reusltStatus = "Failed";
        resultgrade = "-";
    }
    else if(percentage >= 80)
    {
        reusltStatus = "Passed";
        resultgrade = "A+";
    }
    else if(percentage >= 60 && percentage <= 79.99)
    {
        reusltStatus = "Passed";
        resultgrade = "A";
    }
    else if(percentage <= 59.99)
    {
        reusltStatus = "Failed";
        resultgrade = "-";
    }

    totmarks.innerHTML = totalMarks.toString();
    obtmarks.innerHTML = obtainmarks.toString();
    grade.innerHTML = resultgrade.toString();
    perc.innerHTML = percentage.toString();
    reuslt.innerHTML = reusltStatus.toString();
        
}

showQuestion();
questTime();