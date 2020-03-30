(function() 
 {
  var allQuestions = [];

  fetch("question.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    allQuestions = loadedQuestions;
    nextQuestion();
  });

  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');

  var bordrad = ["30% 70% 70% 30% / 30% 30% 70% 70% ", "33% 67% 56% 44% / 73% 64% 36% 27%", "55% 45% 27% 73% / 31% 58% 42% 69%", 
                 "19% 81% 58% 42% / 60% 30% 70% 40% ", "66% 34% 70% 30% / 30% 74% 26% 70%", "86% 14% 71% 29% / 52% 51% 49% 48%",
                 "34% 66% 55% 45% / 26% 81% 19% 74% ", "29% 71% 32% 68% / 87% 68% 32% 13%", "74% 26% 41% 59% / 49% 68% 32% 51%"];
  var m = 0;
  
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        
        let highlight = index+1;
        document.getElementById(highlight).style.background = 'greenyellow';
        
        
        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              m=Math.floor(Math.random() * bordrad.length);
              
              document.getElementById("container").style.borderRadius = bordrad[m];
              
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You answered ' + correct + ' out of ' +allQuestions.length+' questions correctly. Congratulations!');
        return score;
  }
})();