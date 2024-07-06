export class Finish {
    constructor(score){
        document.getElementById('score').innerHTML = score;
        document.getElementById('tryAgainBtn').addEventListener('click', this.tryAgain)
    }
    tryAgain(){
        $('#finish').fadeOut(600, function(){
            $('#settings').fadeIn(600)
        })
        document.querySelector('#category option:nth-child(1)').selected = true;
        document.getElementById('easy').checked = true;
        document.getElementById('numberOfQuestions').value = '';
    }
}