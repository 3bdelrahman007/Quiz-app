import { Finish } from "./finish.js";

export class Quiz {
    constructor(qustions){
        this.myQuest = qustions;
        this.currentQuest = 0;
        this.score = 0;
        this.startQuiz();
        document.getElementById('next').addEventListener('click', this.nextQuest.bind(this));
    }

    startQuiz(){
        document.getElementById('question').innerHTML = this.myQuest[this.currentQuest].question;
        document.getElementById('currentQuestion').innerHTML = this.currentQuest + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.myQuest.length
        let correctAnswer = this.myQuest[this.currentQuest].correct_answer
        let incorrectAnswers = this.myQuest[this.currentQuest].incorrect_answers
        let answers = [correctAnswer, ...incorrectAnswers].sort()

        let quizBox = ``
        for (let i = 0; i < answers.length; i++) {
            quizBox += `
            <div class="form-check ms-2">
                <label class="form-check-label mb-1">
                    <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
                    ${answers[i]}
                </label>
            </div>`          
        }
        document.getElementById('rowAnswer').innerHTML = quizBox;
    }

    nextQuest(){
        let correctAnswer = this.myQuest[this.currentQuest].correct_answer;
        let userAnswer = Array.from(document.getElementsByName('answer')).find((answer) => {return answer.checked})
        if(userAnswer != undefined){
            $('#alert').fadeOut(400)
            this.currentQuest++
            this.checkAnswer(userAnswer.value, correctAnswer)
            if(this.currentQuest < this.myQuest.length){
                this.startQuiz()
            }else {
                $('#quiz').fadeOut(900 , function(){
                    $('#finish').fadeIn(900)
                    })
                const finish = new Finish(this.score)
            }
        } else {
            $('#alert').fadeIn(500)
        }
        
    }

    checkAnswer(userAnswer, correctAnswer){
        if (userAnswer == correctAnswer) {
            $('#Correct').fadeIn(500).fadeOut(500);
            this.score++
        } else {
            $('#inCorrect').fadeIn(500).fadeOut(500);
        }
    }
}