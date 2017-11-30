let quiz=document.getElementById('quiz');

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
  .then(response => response.json())
  .then(data => {
    let api = data.results;

    let questions = api.map(key =>{
      return key.question;
    })

    let answers = api.map(key =>{
      let allAnswers= key.incorrect_answers.push(key.correct_answer);
      return key.incorrect_answers;
    })
    let correct_answers = api.map(key=>{
        return key.correct_answer;
    })

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    for(i=0; i<5; i++){
      let h2 = createNode('h2');
      let ul = createNode('ul');
      h2.innerHTML = questions[i];
      shuffleArray(answers[i]);


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
          //console.log(input);
        }
        append(quiz,h2);
    }
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
