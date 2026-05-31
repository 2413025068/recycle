let materiRead = 0;
let quizDone = 0;
let greenPoint = 0;

let materiVisited = [];

console.log("JS BERHASIL");

// 1. DATA SOAL KUIS (Anda bisa menambah soal di sini)
const myQuestions = [
  {
    question: "Botol plastik termasuk jenis sampah?",
    answers: [
      { text: "Organik", correct: false },
      { text: "Anorganik", correct: true },
      { text: "B3", correct: false }
    ]
  },
  {
    question: "Sampah yang mudah terurai seperti daun dan sisa makanan disebut?",
    answers: [
      { text: "Anorganik", correct: false },
      { text: "B3", correct: false },
      { text: "Organik", correct: true }
    ]
  },
  {
    question: "Manakah di bawah ini yang merupakan cara terbaik mengurangi sampah plastik?",
    answers: [
      { text: "Membakar plastik", correct: false },
      { text: "Membawa kantong belanja sendiri", correct: true },
      { text: "Membuangnya ke sungai", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

// 2. FUNGSI PINDAH HALAMAN
function showScreen(id) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(function(screen){
        screen.style.display = "none";
    });
    document.getElementById(id).style.display = "flex";

    // Jika masuk ke halaman kuis, mulai kuis dari awal
    if (id === 'quiz') {
        startQuiz();
    }
}

// 3. FUNGSI LOGIN
function loginUser() {
    const name = document.getElementById("username").value;
    if(name == ""){
        alert("Masukkan nama");
    } else {
        document.getElementById("welcome").innerHTML = "Hallo, " + name + " 👋";
        showScreen("home");
    }
}

// 4. FUNGSI MULAI KUIS
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// 5. FUNGSI MENAMPILKAN SOAL
function showQuestion() {
    const currentQuestion = myQuestions[currentQuestionIndex];
    
    // Update nomor dan teks pertanyaan
    document.getElementById("quiz-number").innerHTML = "Pertanyaan " + (currentQuestionIndex + 1) + " dari " + myQuestions.length;
    document.getElementById("question").innerHTML = currentQuestion.question;

    // Bersihkan kontainer tombol jawaban lama
    const answerButtonsElement = document.getElementById("answer-buttons");
    answerButtonsElement.innerHTML = "";

    // Buat tombol jawaban baru secara otomatis
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer");
        button.onclick = function() { checkAnswer(answer.correct); };
        answerButtonsElement.appendChild(button);
    });
}

// 6. FUNGSI CEK JAWABAN & LANJUT SOAL
function checkAnswer(isCorrect){
  const buttons =
  document.querySelectorAll(".answer");

  buttons.forEach(btn=>{
    btn.disabled = true;
  });

  if(isCorrect){

    score += 100;

    alert("Jawaban Benar 🎉");

  } else {

    alert("Jawaban Salah 😢");
  }

  document.getElementById("next-btn")
  .style.display = "block";
}

function nextQuestion(){

  currentQuestionIndex++;

  document.getElementById("next-btn")
  .style.display = "none";

  if(currentQuestionIndex <
  myQuestions.length){

    showQuestion();

  } else {

    quizDone++;

    greenPoint += score;

    updateAccount();

    let finalScore =
    Math.round(score / myQuestions.length);

    document.getElementById("score")
    .innerHTML =
    finalScore + " / 100";

    showScreen("result");
  }
}

// 7. FUNGSI MATERI
function showMateri(title, text){
  document.getElementById("materiTitle").innerHTML = title;
  document.getElementById("materiText").innerHTML = text;
}

const materiData = {

  1: {
    title: "Pengertian Daur Ulang",

    text: `
    Daur ulang adalah proses mengolah kembali barang bekas atau sampah menjadi barang baru yang bermanfaat.<br><br>

    Daur ulang dilakukan untuk mengurangi pencemaran lingkungan dan menghemat sumber daya alam.<br><br>

    Contoh barang yang dapat didaur ulang yaitu plastik, kertas, kaca, dan kaleng.
    `
  },

  2: {
    title: "Jenis-Jenis Sampah",

    text: `
    Sampah dibedakan menjadi beberapa jenis, yaitu:<br><br>

    <b>Sampah Organik</b><br>
    Sampah yang mudah membusuk atau terurai secara alami seperti daun dan sisa makanan.<br><br>

    <b>Sampah Anorganik</b><br>
    Sampah yang sulit terurai seperti plastik, kaca, botol, dan kaleng.<br><br>

    <b>Sampah B3</b><br>
    Sampah berbahaya yang mengandung zat kimia seperti baterai dan obat-obatan.
    `
  },

  3: {
    title: "Manfaat Daur Ulang",

    text: `
    Daur ulang memiliki banyak manfaat, antara lain:<br><br>

    • Mengurangi jumlah sampah<br>
    • Menjaga kebersihan lingkungan<br>
    • Mengurangi pencemaran tanah dan air<br>
    • Menghemat energi dan sumber daya alam<br>
    • Membuat lingkungan menjadi sehat dan nyaman
    `
  },

  4: {
    title: "Cara Melakukan Daur Ulang",

    text: `
    Langkah sederhana dalam melakukan daur ulang:<br><br>

    1. Pisahkan sampah organik dan anorganik.<br>
    2. Bersihkan sampah yang masih dapat digunakan.<br>
    3. Kumpulkan barang bekas seperti botol dan kertas.<br>
    4. Olah kembali menjadi barang baru yang bermanfaat.<br><br>

    Contoh:<br>
    • Botol plastik menjadi pot tanaman<br>
    • Kaleng menjadi tempat pensil<br>
    • Kertas bekas menjadi kerajinan tangan
    `
  },

  5: {
    title: "Menjaga Lingkungan",

    text: `
    Menjaga lingkungan dapat dilakukan mulai dari hal kecil, seperti:<br><br>

    • Tidak membuang sampah sembarangan<br>
    • Mengurangi penggunaan plastik<br>
    • Membawa tumbler sendiri<br>
    • Menanam pohon<br>
    • Ikut kerja bakti membersihkan lingkungan<br><br>

    Dengan menjaga lingkungan, kehidupan menjadi lebih sehat dan nyaman.
    `
  }

};

function loadMateri(id){
  document.getElementById("materiTitle")
  .innerHTML =
  materiData[id].title;

  document.getElementById("materiText")
  .innerHTML =
  materiData[id].text;

  // CEK SUDAH DIBACA BELUM
  if(!materiVisited.includes(id)){
    materiVisited.push(id);
    materiRead++;
    greenPoint += 10;
    updateAccount();
  }
}

console.log(materiData);

function updateAccount(){

  document.getElementById("materiCount")
  .innerHTML =
  materiRead + " Materi";

  document.getElementById("quizCount")
  .innerHTML =
  quizDone + " Kuis";

  document.getElementById("greenPoint")
  .innerHTML =
  greenPoint;
}

function editProfile(){

  let newName =
  prompt("Masukkan nama baru");

  if(newName != "" && newName != null){

    document.getElementById("profileName")
    .innerHTML = newName;
  }
}

function changeProfileIcon(){

  let icons = ["👤","🌿","♻️","🌎","🍃"];

  let randomIcon =
  icons[Math.floor(Math.random()*icons.length)];

  document.getElementById("profileIcon")
  .innerHTML = randomIcon;
}

let screenHistory = [];

function showScreen(id){

  const screens =
  document.querySelectorAll(".screen");

  screens.forEach(screen=>{
    screen.style.display = "none";
  });

  document.getElementById(id)
  .style.display = "flex";

  screenHistory.push(id);
}

function goBack(){

  if(screenHistory.length > 1){

    screenHistory.pop();

    let previous =
    screenHistory[screenHistory.length - 1];

    showScreen(previous);
  }
}