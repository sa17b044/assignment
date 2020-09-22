const form = document.querySelector('.form-quiz');
const questionBox = document.querySelector('.question-id');
const finBtn = document.querySelector('.fin-form');
let tempScore = 0;
const checkAnswer = (uAnswer , cAnswer) => {
    console.log(uAnswer , cAnswer);
    let score = 0;
    if (uAnswer == cAnswer) {
        score++
    } else {
        score--;
    }
    tempScore += score;
    saveScore(tempScore);
    };
    const saveScore = (allScore)=>{
        console.log(allScore);
        };
const test = finBtn.addEventListener('submit', e => {
    e.preventDefault();
    saveScore(tempScore);
    localStorage.setItem('score',tempScore);
    window.location.replace('../include/allScore.html');
});
const showQuiz = (data)=>{
    const questionBox = document.querySelector('.question-id');
    console.log(data);
    let corAnswerArray = [];
Object.keys(data.correct_answers).forEach((key,index)=>{

    if (data.correct_answers[key]==='true') {
        corAnswerArray = index;
    }
});
        const html = `
        <p>${data.question}</p>
        <input type="radio" name=${data.id} value="0" onclick="checkAnswer('0',${corAnswerArray})">
        <label>${data.answers.answer_a}</label>
        <input type="radio" name=${data.id} value="1" onclick="checkAnswer('1',${corAnswerArray})">
        <label>${data.answers.answer_b}</label>
        <input type="radio" name=${data.id} value="2" onclick="checkAnswer('2',${corAnswerArray})">
        <label>${data.answers.answer_c}</label>
        <input type="radio" name=${data.id} value="3" onclick="checkAnswer('3',${corAnswerArray})">
        <label>${data.answers.answer_d}</label>
        `;
    console.log(data.id);
        questionBox.innerHTML += html
}
const updateData = async (category,difficulty) => {
    const apiKey='sfhAoINcu7inNKskV0MBHldJI2GAKR3vO1lwsJwh';
    const url = `https://quizapi.io/api/v1/questions?apiKey=`+apiKey+`&category=`+category+`&difficulty=`+difficulty;
    const res = await fetch(url);
    if (res.status !== 200 ) {
        throw new Error('cannot fetch the data - no response');
    }
    const data = await res.json();
    return data;
};
form.addEventListener('submit', e => {
    e.preventDefault();
    const category = form.category.value;
    const difficulty = form.difficulty.value;
    form.reset();
    updateData(category,difficulty)
        .then(data => showQuiz(data[0]))
        .catch(err => console.log(err));
});
