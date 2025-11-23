let index =0;
let attempt = 0;
let score = 0;
let wrong = 0;
let totalQuestions = 10;
let questions = quiz.sort(function(){
   return 0.5 - Math.random();
});
$(function(){
    

    let totalTime = 200;
    let min = 0;
    let sec = 0;
    let counter = 0;

    let timer = setInterval( function(){
        counter++;
        min = Math.floor( (totalTime - counter) / 60) 
        sec = totalTime - (min * 60) - counter 

        $(".timerBox span").text(min +" : "+sec)

        if(counter == totalTime)
        {
            alert("Time is up. Press OK to show result");
            result();
            clearInterval(timer);
        }
    }, 1000); 
    printQusetions(index);
});


function printQusetions(i){
    

    $(".questionBox").text(questions[i].question)
    $(".optionBox span").eq(0).text(questions[i].option[0])
    $(".optionBox span").eq(1).text(questions[i].option[1])
    $(".optionBox span").eq(2).text(questions[i].option[2])
    $(".optionBox span").eq(3).text(questions[i].option[3])
}

function generateRan(){
    var max = 4;
    var random = [];
    for(var i = 0;i<max ; i++){
        var temp = Math.floor(Math.random()*max);
        if(random.indexOf(temp) == -1){
            random.push(temp);
        }
        else
         i--;
    }
    return random;
}

function checkAnswer(option){
    attempt++;

    let optionClicked = $(option).data("opt");
    if(optionClicked == questions[index].answer)
    {
        $(option).addClass("correct");
        score++;
    }
    else
    {
        $(option).addClass("wrong")
        wrong++;
    }
    $(".scoreBox span").text((score * 10))
    $(".optionBox span").attr("onclick", "") 
    
    setTimeout(function() {
        showNext();
    },1000);
}

let num = 1
function showNext(){
    if(index <= 8)
    {
        index++;
        num++;

        printQusetions(index);
        $(".con button").eq(0).removeClass("disabled")
        $(".optionBox span").removeClass();
        $(".optionBox span").attr("onclick", "checkAnswer(this)")
        $(".count span").text(num)
    }
    else{
        setTimeout(function() {
            showResult(0);
        },500);
    }
}


function showResult(j){
    if(
        j == 1 && num < 10 && 
        !confirm("Quiz has not finished. Press OK to skip quiz and show results.")
    ){
        return;
    }
    result();
}
function result()
{
    
        $("#totalQuestion").text(totalQuestions)
        $("#questionScreen").hide()
        $(".scoreBoard span").text((score * 10))
        $("#resultScreen").show()
        $("#attemptQuestion").text(attempt)
        $("#correctQuestion").text(score)
        $("#wrongAnswers").text(wrong)
    
}
