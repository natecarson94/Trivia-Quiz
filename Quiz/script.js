let quiz=document.getElementById('quiz');

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

//Get Quiz Data
fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
  .then(response => response.json())
  .then(data => {
    let api = data.results;

    let questions = api.map(key =>{
      return key.question;
    })
//assign all answers to an array
    let answers = api.map(key =>{
      let allAnswers= key.incorrect_answers.push(key.correct_answer);
      return key.incorrect_answers;
    })
// Establish the correct answer
    let correct_answers = api.map(key=>{
        return key.correct_answer;
    })
//create the function to shuffle the answers
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
//Create a Question header and a ul.
//Shuffle the answers
    for(i=0; i<5; i++){
      let h2 = createNode('h2');
      let ul = createNode('ul');
      h2.innerHTML = questions[i];
      shuffleArray(answers[i]);

//loop through answers
//create li for each answer
//create radio button for each answer
      for(j=0; j<4; j++){

        let li= createNode('li');
        let  input = createNode('input');

          input.name=`q${i}`;
          input.type="radio"
          input.value=answers[i][j]
          li.innerHTML=answers[i][j]

          append(li,input);
          append(ul,li);
          append(h2,ul);

        }
        append(quiz,h2);
    }
    let input=createNode('input');
    input.id="submitButton";
    input.type="submit";
    input.name="mysubmit";
    input.value="Submit";

    append(quiz,input);
//Calculate your score
    quiz.onsubmit = function(){
      let scoreKeeper = 0;
      let key = ['incorrect','incorrect','incorrect','incorrect','incorrect'];

    for (i=0;i<5;i++){

      if(correct_answers.includes(document.querySelector(`input[name=q${i}]:checked`).value)=== true){
        scoreKeeper++;
        key[i] = 'correct';
      }
      }
alert(`You got ${scoreKeeper} out of 5 correct.

Question 1 was ${key[0]}
Question 2 was ${key[1]}
Question 3 was ${key[2]}
Question 4 was ${key[3]}
Question 5 was ${key[4]}`);
    }
    })
