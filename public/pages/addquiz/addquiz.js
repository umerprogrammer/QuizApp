import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, ref, set, push, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

var tbody = document.getElementById("quizList");

var txtquest = document.getElementById("txtquest");
var txtoption1 = document.getElementById("txtoption1");
var txtoption2 = document.getElementById("txtoption2");
var txtoption3 = document.getElementById("txtoption3");
var txtoption4 = document.getElementById("txtoption4");
var txtcorrectAnswer = document.getElementById("txtcorrectAnswer");
var questId = document.getElementById("questId");

var btnok = document.getElementById("btnok");
var btncancel = document.getElementById("btncancel");

var confirmationModal = new bootstrap.Modal(document.getElementById('exampleModal'));
var modaltitle = document.getElementById("modal-title");
var modalmessage = document.getElementById("modal-message");
var modalOkButton = document.getElementById("btnok");
var modalCancelButton = document.getElementById("btncancel");

var dialogResult = "";

var questions = [];


const reference = ref(db, "question/");

var quizObject = {
  question: "",
  options: [],
  correctAnswer: "",
}

//////////////// ADD RECORD ////////////////

window.addQuiz = async function (e) {
  e.preventDefault();
  quizObject.options = [];
  // const addRef = ref(db,"question/");
  quizObject.id = push(reference).key;
  quizObject.question = txtquest.value.toString();
  quizObject.options.push(txtoption1.value.toString());
  quizObject.options.push(txtoption2.value.toString());
  quizObject.options.push(txtoption3.value.toString());
  quizObject.options.push(txtoption4.value.toString());
  quizObject.correctAnswer = (txtcorrectAnswer.value.toString());
  console.log(quizObject, "Quiz Object");
  set(ref(db, `question/${quizObject.id}`), quizObject);

  dialogbox("Save Record","Record has been successfully saved.","block","none",true);
  document.getElementById("frmQuiz").reset();
  await getData();

}

function getData() {
  return new Promise((resolve, reject) => {
    get(reference).then((data) => {
      if (data.exists()) {
        const getData = Object.values(data.val());
        questions = getData;
        var i = 1;
        tbody.innerHTML = "";
        getData.forEach(element => {
          tbody.innerHTML += `<tr ondblclick='selectRow(${JSON.stringify(element)})'><td class="text-center">${i}</td><td title="${element.question}" class="td-showquest">${element.question}</td></tr>`;
          i++;
        });
        console.log(getData, "GetData");
      }
    }).catch((error) => {
      console.log(error, "Error");
    })
  });
}


//////////////// SELECT RECORD ////////////////

window.selectRow = function (data) {
  var objectData = JSON.parse(JSON.stringify(data));
  txtquest.value = objectData.question;
  txtoption1.value = objectData.options[0];
  txtoption2.value = objectData.options[1];
  txtoption3.value = objectData.options[2];
  txtoption4.value = objectData.options[3];
  txtcorrectAnswer.value = objectData.correctAnswer;
  questId.innerText = objectData.id;
}


////////////// DELETE RECORD ////////////

window.deleteQuest = function () {
  dialogbox("Delete Record","Are you sure, you want to delete this record?","block","block",true);
  modalOkButton.addEventListener("click", function () {
    var Id = questId.innerText;
    if (Id != "") {
      questions
      const deleteRef = ref(db, `question/${Id}`);
      remove(deleteRef).then(async () => {
        console.log("Record has been deleted.");
        document.getElementById("frmQuiz").reset();
        await getData();
      }).catch((error) => {
        console.log(error);
      })
    }
  });
}


//////////////// UPDATE RECORD ////////////////

window.updateQuest = function () {
  dialogbox("Update Record","Are you sure, you want to Edit this record?","block","block",true);
  modalOkButton.addEventListener("click", function () {
    var Id = questId.innerText;
    if (Id != "") {
      quizObject.options = [];
      // const addRef = ref(db,"question/");
      quizObject.question = txtquest.value.toString();
      quizObject.options.push(txtoption1.value.toString());
      quizObject.options.push(txtoption2.value.toString());
      quizObject.options.push(txtoption3.value.toString());
      quizObject.options.push(txtoption4.value.toString());
      quizObject.correctAnswer = (txtcorrectAnswer.value.toString());
      console.log(quizObject, `question/`);
      var updRef = ref(db, `question/${Id}/`);
      update(updRef, quizObject).then(async () => {
        console.log("Record has been updated.");
        //document.getElementById("frmQuiz").reset();
        await getData();
      }).catch((error) => {
        console.log(error);
      })
    }
  });
}

//////////////// CLEARE CONTROL ////////////////

window.clearcontrol = function () {
 // dialogbox("Confirmation","Are you sure, you want to delete this record?","block","block",true);
 // modalOkButton.addEventListener("click", function () {
    document.getElementById("frmQuiz").reset();
    questId.innerText = "-";
 //   confirmationModal.hide();
 // })
}


function dialogbox(title, message, btnok, btncance, dialgStatus) {

  modaltitle.innerText = title;
  modalmessage.innerText = message;
  modalOkButton.style.display = btnok;
  modalCancelButton.style.display = btncance;
  if (dialgStatus)
    confirmationModal.show();
  else
    confirmationModal.show();
}


await getData();


