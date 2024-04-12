'use strict';

//constants
const totalQuestions = 5;
const base_url = `https://opentdb.com/api.php?amount=${totalQuestions}`;

//global variables
let url; //send fetch request to this url
let counter;
let score;
let correct;
let questions;

//get DOM elements
const cards = document.querySelectorAll('.card');
const categoryCard = cards[0];
const questionCard = cards[1];
const skeletonCard = cards[2];
const scoreCard = cards[3];

const categoryElements = Array.from(document.querySelectorAll('.category-item'));
const playBtn = document.querySelector('button');
const submitBtn = questionCard.querySelector('button');
const playAgainBtn = scoreCard.querySelector('button');
const questionHeaders = questionCard.querySelectorAll('span');
const questionText = questionCard.querySelector('.question-text');
const questionBody = questionCard.querySelector('.card-body');
const scoreElements = scoreCard.querySelectorAll('.stat');


categoryElements.forEach(item=>item.addEventListener('click', clickCategory));

function clickCategory(e){
    e.target.classList.toggle('selected');
    categoryElements.forEach(item=>{
        if(item.classList.contains('selected')&& item!== e.target)
            item.classList.remove('selected');
    });
}

playBtn.addEventListener('click', initGame);

function initGame() {
    //reset global variables
    counter = 0;
    score = 0;
    correct = 0;
    questions = [];
    url = base_url;

    const selectedCat = categoryElements.find(item=>item.classList.contains('selected'));
    if (!selectedCat) {
        alert('Please pick a category');
        return;
    }

    const catId = selectedCat.getAttribute('data-category');
    url = `${base_url}&category=${catId}`;

    categoryCard.classList.add('hidden');
    skeletonCard.classList.remove('hidden');

    getQuestions();
}

async function getQuestions() {
    try {
        const response = await fetch(url);
        if(!response.ok)
            throw Error(`Error: ${response.url} ${response.statusText}`);
        const data = await response.json();
        if(data.response_code === 0){
            processQuestions(data.results);
            showQuestions();
        }
        else{
            throw Error('Error: Cannot fetch questions from the API');
        }
    } catch (error) {
        console.log(error);
    }
}

function processQuestions(data) {
    questions = data.map(q => {
        const answers = [...q.incorrect_answers, q.correct_answer];
        answers.sort(()=>Math.random()-0.5);
        const corrAnsIndex = answers.indexOf(q.correct_answer);

        return {
            text: q.question,
            level: q.difficulty,
            answers: answers,
            correctAnswerIndex: corrAnsIndex
        };
    });
}

function showQuestions() {
    submitBtn.disabled = false;
    let optionElements = questionCard.querySelectorAll('.option-item');
    optionElements.forEach(element=>element.remove());

    const question = questions[counter];
    questionHeaders[0].textContent = `Question: ${counter+1} / ${totalQuestions}`;
    questionHeaders[1].textContent = `Level: ${question.level}`;
    questionHeaders[2].textContent = `Score: ${score}`;
    questionText.innerHTML = question.text;
    const fragment = document.createDocumentFragment();
    question.answers.forEach(answer=>{
        const option = document.createElement('div');
        option.innerHTML = answer;
        option.classList.add('option-item');
        fragment.append(option);
    });

    questionBody.insertBefore(fragment, submitBtn);
    skeletonCard.classList.add('hidden');
    questionCard.classList.remove('hidden');

    optionElements = questionCard.querySelectorAll('.option-item');
    optionElements.forEach(item=>item.addEventListener('click', e=>{
        optionElements.forEach(element=>{
            if(element.classList.contains('selected'))
                element.classList.remove('selected');
        });

        e.target.classList.add('selected');
    }));
}

submitBtn.addEventListener('click', submitAnswer);

function submitAnswer() {
    submitBtn.disabled = true;
    const answerSubmitted = questionBody.querySelector('.selected');
    const allAnswers = questionBody.querySelectorAll('.option-item');
    const correctAnswer = questions[counter].correctAnswerIndex;
    const correctText = allAnswers[correctAnswer].textContent;
    const pickedAnswer = answerSubmitted.textContent;

    allAnswers[correctAnswer].classList.add('correct');


    if(!answerSubmitted){
        nextQuestion();
        return;
    }

    if (pickedAnswer === correctText) {
        switch (questions[counter].level.toLowerCase()) {
            case 'easy':
                score += 10;
                break;
            case 'medium':
                score += 20;
                break;
            case 'hard':
                score += 30;
                break;
            default:
                break;
        }
        correct++;
    }
    else {
        answerSubmitted.classList.add('wrong');
    }

    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    counter++;

    if(counter < totalQuestions)
        showQuestions();
    else
        showScore();
}

function showScore() {
    scoreElements[0].textContent = `Correct Answers: ${correct}`;
    scoreElements[1].textContent = `Score: ${score}`;

    questionCard.classList.add('hidden');
    scoreCard.classList.remove('hidden');
}

playAgainBtn.addEventListener('click', ()=>{

    categoryCard.classList.remove('hidden');
    scoreCard.classList.add('hidden');

    initGame();

});