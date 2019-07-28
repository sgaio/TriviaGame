$(document).ready(function () {
    var options = [
        {
            question: "Which team has had the most players drafter in the first round of the NFL Draft?", 
            choice: ["Alabama", "USC", "Michigan", "Ohion State"],
            answer: 1,
            photo: "assest/images/USC.jpg"
         },
         {
             question: "Which team has been to the most bowl games?", 
            choice: ["Alabama", "Miami", "Texas", "Cal Berkeley"],
            answer: 0,
            photo: "assest/images/alabama.png"
         }, 
         {
             question: "What two teams played in the very first college football game?", 
            choice: ["Yale and Harvard", "USC and CAL", "Rutgers and Princeton", "Army and Navy" ],
            answer: 2,
            photo: "assest/images/rutgers.jpg"
        }, 
        {
            question: "Which schools have won the most Heisman Trophies?", 
            choice: ["Ohio State", "Norte Dame", "Both A&B", "Standford" ],
            answer: 2,
            photo: "assest/images/ohio_nortedame.png"
        }, 
        {
            question: "Who was the first African-American to win the Hesiman Trophy?", 
            choice: ["Walter Payton", "OJ Simpson", "Jim Brown", "Ernie Davis" ],
            answer: 3,
            photo: "assest/images/erniedavis.jpg"
        }, 
        {
            question: "What do the winners of the Alabama versus Tennessee game do every year?", 
            choice: ["Nothing", "Smoke Cigars", "Steal Mascots", "Tear Down Goal Post" ],
            answer: 1,
            photo: "assest/images/cigars.jpeg"
        }, 
        {
            question: "Who holds the record for the longest winning streak in college football?", 
            choice: ["Alabama", "Oklahoma", "Norte Damn", "USC" ],
            answer: 1,
            photo: "assest/images/ou.jpeg"
        }, 
        {
            question: "Which confrence has the best record in BCS bowl games?", 
            choice: ["SEC", "BIG 10", "PAC 12", "ACC" ],
            answer: 0,
            photo: "assest/images/sec.png"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer 
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer 
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })