// ======================
// DATA APLIKASI
// ======================

let materiRead = 0;
let quizDone = 0;
let greenPoint = 0;
let materiVisited = [];

let currentQuestionIndex = 0;
let score = 0;

// ======================
// DATA QUIZ
// ======================

const questions = [
{
question:"Botol plastik termasuk jenis sampah?",
answers:[
"Organik",
"Anorganik",
"B3",
"Kaca"
],
correct:1
},
{
question:"Daun kering termasuk sampah?",
answers:[
"Organik",
"Anorganik",
"B3",
"Logam"
],
correct:0
},
{
question:"Apa manfaat daur ulang?",
answers:[
"Menambah sampah",
"Mencemari lingkungan",
"Mengurangi limbah",
"Merusak alam"
],
correct:2
},
{
question:"Wadah plastik bekas bisa?",
answers:[
"Dibuang ke sungai",
"Digunakan kembali",
"Dibakar",
"Dikubur"
],
correct:1
},
{
question:"Warna tempat sampah organik biasanya?",
answers:[
"Hijau",
"Merah",
"Hitam",
"Ungu"
],
correct:0
}
];

let currentQuestion = 0;
let score = 0;

// ======================
// MULAI QUIZ
// ======================

function startQuiz(){

currentQuestion = 0;
score = 0;

showScreen("quiz");

document.getElementById("next-btn").style.display =
"none";

showQuestion();
}

// ======================
// TAMPILKAN SOAL
// ======================

function showQuestion(){

const q = questions[currentQuestion];

document.getElementById("quiz-number").innerHTML =
"Pertanyaan " +
(currentQuestion + 1) +
" dari " +
questions.length;

document.getElementById("question").innerHTML =
q.question;

const answerBox =
document.getElementById("answer-buttons");

answerBox.innerHTML = "";

q.answers.forEach((answer,index)=>{

const button =
document.createElement("button");

button.classList.add("answer");

button.innerHTML = answer;

button.onclick = () =>{
selectAnswer(index,button);
};

answerBox.appendChild(button);

});

document.getElementById("next-btn").style.display =
"none";
}

// ======================
// PILIH JAWABAN
// ======================

function selectAnswer(index,button){

const correct =
questions[currentQuestion].correct;

document
.querySelectorAll(".answer")
.forEach(btn=>{
btn.disabled = true;
});

if(index === correct){

button.classList.add("correct");
score++;

}else{

button.classList.add("wrong");

document
.querySelectorAll(".answer")
[correct]
.classList.add("correct");

}

document.getElementById("next-btn")
.style.display = "block";
}

// ======================
// SOAL BERIKUTNYA
// ======================

function nextQuestion(){

currentQuestion++;

if(currentQuestion < questions.length){

showQuestion();

}else{

finishQuiz();

}
}

// ======================
// HASIL QUIZ
// ======================

function finishQuiz(){

quizDone++;

const nilai =
Math.round(
(score / questions.length) * 100
);

greenPoint += nilai;

updateAccount();

document.getElementById("score").innerHTML =
nilai + " / 100";

showScreen("result");
}

// ======================
// PINDAH HALAMAN
// ======================

function showScreen(screenId){

    document.querySelectorAll(".screen").forEach(screen=>{
        screen.style.display = "none";
    });

    const target = document.getElementById(screenId);

    if(target){
        target.style.display = "flex";
    }

    if(screenId === "home"){
        updateAccount();
    }
}

// ======================
// LOGIN
// ======================

function loginUser(){

    const username =
    document.getElementById("username").value.trim();

    if(username === ""){
        alert("Masukkan nama terlebih dahulu");
        return;
    }

    document.getElementById("welcome").innerHTML =
    "Hallo, " + username + " 👋";

    document.getElementById("profileName").innerHTML =
    username;

    showScreen("home");
}

// ======================
// QUIZ
// ======================

function startQuiz(){
  
  alert("Quiz berjalan")
    currentQuestionIndex = 0;
    score = 0;

    showScreen("quiz");

    showQuestion();
}

function showQuestion(){

    const questionData =
    myQuestions[currentQuestionIndex];

    document.getElementById("quiz-number").innerHTML =
    "Pertanyaan " +
    (currentQuestionIndex + 1) +
    " dari " +
    myQuestions.length;

    document.getElementById("question").innerHTML =
    questionData.question;

    const answerContainer =
    document.getElementById("answer-buttons");

    answerContainer.innerHTML = "";

    questionData.answers.forEach(answer=>{

        const button =
        document.createElement("button");

        button.classList.add("answer");

        button.innerHTML = answer.text;

        button.onclick = function(){

            document
            .querySelectorAll(".answer")
            .forEach(btn=>{
                btn.disabled = true;
            });

            if(answer.correct){
                score++;
                button.style.background =
                "#9fbc63";
            }else{
                button.style.background =
                "#ffb3b3";
            }

            document.getElementById("next-btn")
            .style.display = "block";
        };

        answerContainer.appendChild(button);
    });
}

function nextQuestion(){

    currentQuestionIndex++;

    document.getElementById("next-btn")
    .style.display = "none";

    if(currentQuestionIndex < myQuestions.length){

        showQuestion();

    }else{

        finishQuiz();

    }
}

function finishQuiz(){

    quizDone++;

    const nilai =
    Math.round(
        (score / myQuestions.length) * 100
    );

    greenPoint += nilai;

    updateAccount();

    document.getElementById("score").innerHTML =
    nilai + " / 100";

    showScreen("result");
}

// ======================
// MATERI
// ======================

const materiData = {

1:{
title:"Pengertian Daur Ulang",
text:"Daur ulang adalah proses mengolah kembali sampah menjadi barang yang bermanfaat dan memiliki nilai guna."
},

2:{
title:"Jenis Sampah",
text:"Sampah terdiri dari sampah organik, anorganik dan B3."
},

3:{
title:"Manfaat Daur Ulang",
text:"Mengurangi pencemaran lingkungan, menghemat sumber daya dan menciptakan produk baru."
},

4:{
title:"Cara Daur Ulang",
text:"Pisahkan sampah berdasarkan jenisnya kemudian olah kembali menjadi produk yang bermanfaat."
},

5:{
title:"Menjaga Lingkungan",
text:"Membuang sampah pada tempatnya, mengurangi plastik sekali pakai dan melakukan daur ulang."
}

};

function loadMateri(id){

    document.getElementById("materiTitle")
    .innerHTML =
    materiData[id].title;

    document.getElementById("materiText")
    .innerHTML =
    materiData[id].text;

    if(!materiVisited.includes(id)){

        materiVisited.push(id);

        materiRead++;

        greenPoint += 10;

        updateAccount();
    }
}

// ======================
// AKUN
// ======================

function updateAccount(){

    const materi =
    document.getElementById("materiCount");

    const quiz =
    document.getElementById("quizCount");

    const point =
    document.getElementById("greenPoint");

    if(materi){
        materi.innerHTML =
        materiRead + " Materi";
    }

    if(quiz){
        quiz.innerHTML =
        quizDone + " Kuis";
    }

    if(point){
        point.innerHTML =
        greenPoint;
    }
}

function editProfile(){

    const namaBaru =
    prompt("Masukkan nama baru");

    if(namaBaru && namaBaru.trim() !== ""){

        document.getElementById("profileName")
        .innerHTML =
        namaBaru;
    }
}

function changeProfileIcon(){

    const icons =
    ["👤","♻️","🌿","🌎","🍃"];

    const randomIcon =
    icons[Math.floor(Math.random()*icons.length)];

    document.getElementById("profileIcon")
    .innerHTML =
    randomIcon;
}

// ======================
// AWAL APLIKASI
// ======================

window.onload = function(){

    document
    .querySelectorAll(".screen")
    .forEach(screen=>{
        screen.style.display = "none";
    });

    document.getElementById("splash")
    .style.display = "flex";

    updateAccount();
};