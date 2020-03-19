(function() 
 {
  var allQuestions = [{
    question: "This is a dummy question1",
    options: ["A", "B", "C", "D"],
    answer: 2
  }, {
    question: "This is a dummy question2",
    options: ["A", "B", "C", "D"],
    answer: 3
  }, {
    question: "This is a dummy question3",
    options: ["A", "B", "C", "D"],
    answer: 1
  },{
    question: "abcdThis is a dummy question",
    options: ["A", "B"],
    answer: 1
  },{
    question: "efgdThis is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 0
  }, {
    question: "sdsdsdThis is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 1
  },{
    question: "sdsdThis is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 0
  },{
    question: "dsdThis is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 0
  },{
    question: "sdThis is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 3
  },{
    question: "This is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 2
  },{
    question: "dsThis is a dummy question",
    options: ["A", "B", "C", "D"],
    answer: 0
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
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
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();