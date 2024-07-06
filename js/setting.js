import { Quiz } from "./quiz.js";
export class Settings {
    constructor(){
        this.chooseCategory = document.getElementById('category');
        this.chooseDifficulty = document.getElementsByName('difficulty');
        this.numberOfQuestions = document.getElementById('numberOfQuestions');

        document.getElementById('startBtn').addEventListener('click', () => this.startQuiz())
    }

    async startQuiz(){
        let category = this.chooseCategory.value;
        let difficulty = Array.from(this.chooseDifficulty).find((input) => {return input.checked}).value
        let num = this.numberOfQuestions.value

        if (num == '' || num <= 0 || num > 50) {
            $('#questionsAlert').fadeIn(500)
        } else {
            let api = `https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}`
            let questions = await this.quizApi(api)
            $('#questionsAlert').fadeOut(400)
            $('#settings').fadeOut(900 , function(){
            $('#quiz').fadeIn(900)
            })
            const quiz = new Quiz(questions);
        }
        
    }

    async quizApi(api){
        let response = await fetch(api)
        let data = await response.json()
        return data.results
    }
}