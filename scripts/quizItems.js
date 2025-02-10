import { updateFile } from "./quizToSaveApi.js";


let amountReceived = parseInt(
  new URLSearchParams(window.location.search).get("amount"),
  10
);
const ListOfAllQuiz = [];

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded successfully");

  if (isNaN(amountReceived) || amountReceived <= 0) {
    console.error("Invalid or missing amount parameter in the URL");
    return;
  }

  console.log("Amount received from the URL: ", amountReceived);
  for (let i = 1; i < amountReceived + 1; i++) {
    generateQuizElement(i);
  }
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      checkboxes.forEach((cb) => {
        if (cb !== this) cb.checked = false;
      });
    });
  });
  
  
  // let  checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // checkboxes.forEach((checkbox) => {
  //     checkbox.addEventListener('change', function () {
  //         if (this.checked) {
  //             // Uncheck all other checkboxes
  //             checkboxes.forEach((otherCheckbox) => {
  //                 if (otherCheckbox !== this) {
  //                     otherCheckbox.checked = false;
  //                 }
  //             });
  //         }
  //     });
  // });

  let buttons = document.querySelectorAll("button");

  let itemRecived;

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let parent = e.target.parentElement;
      saveDataForNow(parent);

      collapseForm(parent);
      if (button === buttons[buttons.length - 1]) {
        itemRecived = collapseForm(parent);
        sendDataToLocalStorage(itemRecived);
        nextButton();
      }
    });
  });
});
function generateRandomId() {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
function sendDataToLocalStorage(itemRecived) {
  
    itemRecived.id = generateRandomId()
  const getListOfData = localStorage.getItem("listOfQuiz");
  const arrayOfData = JSON.parse(getListOfData);
  checkIfDuplicateAndSave(itemRecived, arrayOfData);
 
}


function checkIfDuplicateAndSave(itemRecived, arrayOfData) {
    if (itemRecived) {
        const isDuplicate = arrayOfData.some(
            (item) => JSON.stringify(item) === JSON.stringify(itemRecived) 
        );

        if (!isDuplicate) {

            itemRecived.id = generateRandomId();


            console.log(itemRecived.id, "    is ID ");

            console.log(itemRecived);
            arrayOfData.push(itemRecived); 
            console.log("New data added:", itemRecived.id);
        } else {
            console.log("Duplicate data, not added:", itemRecived.id);
        }
    } else {
        console.error("formData-2 is null or invalid!");
    }
    localStorage.setItem("allItem", JSON.stringify(ListOfAllQuiz));
    // updateFile(ListOfAllQuiz, "Questions Updated")
    console.log("it is updating")
}

function nextButton() {
  const nextButton = document.createElement("button");
  nextButton.type = "button";
  const url = "quizForUser.html";
  nextButton.href = url;
  window.location.href = url;
}
function generateQuizElement(number) {
  let body = document.body;
  let main = document.createElement("div");
  main.className = "containerOfEachQuiz";

  let form = document.createElement("form");
  form.id = `formPost-${number}`;
  let questionLabel = document.createElement("label");
  questionLabel.className = "questionLabel";
  questionLabel.setAttribute("for", `question-${number}`);
  questionLabel.id = `que-${number}`;
  questionLabel.textContent = `Q-${number}`
  questionLabel.appendChild(document.createElement("br"));

  let inputQuestion = document.createElement("input");
  inputQuestion.className = "questionInput";
  inputQuestion.required = true;
  inputQuestion.id = `question-${number}`;
  inputQuestion.type = "text";
  inputQuestion.name = `que-${number}`;
  inputQuestion.placeholder = "Enter your question here..."

  inputQuestion.appendChild(document.createElement("br"));
  form.appendChild(questionLabel);
  form.appendChild(inputQuestion);

  let optDiv = document.createElement("div");
  optDiv.className = "optContainer";

  for (let i = 1; i < 5; i++) {
    const options_choice_holder = document.createElement('div')
    options_choice_holder.className = "options-choice-holder";
    
    let optLabel = document.createElement("label");
    optLabel.className = "optLabel";
    optLabel.setAttribute("for", `input-${i}-${number}`);
    optLabel.id = `int-${i}-${number}`;
    optLabel.textContent = `${i}- `;
    // optLabel.appendChild(document.createElement("br"))
    options_choice_holder.appendChild(optLabel);

    let ChoiceInput = document.createElement("input");
    ChoiceInput.required = true
    ChoiceInput.type = "text";
    ChoiceInput.placeholder = "Enter your answer here..."
    ChoiceInput.id = `input-${i}-${number}`;
    ChoiceInput.name = `option-${i}`;
    // ChoiceInput.appendChild(document.createElement("br"))
    options_choice_holder.appendChild(ChoiceInput);
    optDiv.appendChild(options_choice_holder)
  }
  let options = generateQuizOptions();

  // let optionDiv = generateQuizElement()
  form.appendChild(optDiv);
  form.appendChild(options);
  let saveButton = document.createElement("button");
  saveButton.id = `saveButton-${number}`;
  saveButton.textContent = "Save";
  saveButton.type = "button";
  // form.appendChild(optionDiv)
  form.appendChild(saveButton);
  main.appendChild(form);
  body.appendChild(main);
  generateQuizOptions();
}

function generateQuizOptions() {
  let optionsDiv = document.createElement("div");
  optionsDiv.className = "optionsContainer";

  let titleOptions = document.createElement("h3");
  titleOptions.className = "titleOptions";
  titleOptions.textContent = "Correct option"
  optionsDiv.appendChild(titleOptions);
  titleOptions.appendChild(document.createElement("br"));
  let ulOptions = document.createElement("div");
  ulOptions.className = "ulOptions";
  optionsDiv.appendChild(ulOptions);
  ulOptions.appendChild(document.createElement("br"));
  let num = amountReceived;
  for (let i = 1; i < 5; i++) {
    let eachOpton = document.createElement("div");
    eachOpton.className = "eachOption";
    let optionLabel = document.createElement("label");
    optionLabel.className = "optionLabel";
    optionLabel.setAttribute("for", `check-${i}-${num}`);
    optionLabel.id = `checkbox-${i}-${num}`;
    optionLabel.textContent = `${i}`;
    // optionLabel.appendChild(document.createElement("br"))
    eachOpton.appendChild(optionLabel);

    let optionCheckBoxInput = document.createElement("input");
    optionCheckBoxInput.required = true
    optionCheckBoxInput.type = "checkbox";
    optionCheckBoxInput.id = `check-${i}-${num}`;
    optionCheckBoxInput.name = `Choice-${i}`;

    eachOpton.appendChild(optionCheckBoxInput);
    eachOpton.appendChild(document.createElement("br"));
    num--;
    ulOptions.appendChild(eachOpton);
  }
  return optionsDiv;
}
function saveDataForNow(form) {
  let formData = new FormData(form);
  let quizQuestions = {
    id: 0,
    question: "",
    options: [],
    correctAnswer: [],
  };

  let formValues = Array.from(formData.values());
  let formDataEntries = Array.from(formData.entries());
  let correctAnswerExtracted = formDataEntries[5];
  let numbersOnly = correctAnswerExtracted[0];
  let indexNo = numbersOnly.replace(/\D/g, "");
  quizQuestions.id = generateRandomId()
  quizQuestions.question = formValues[0];
  quizQuestions.options = [
    formValues[1],
    formValues[2],
    formValues[3],
    formValues[4],
  ];
  quizQuestions.correctAnswer = formValues[indexNo];
  ListOfAllQuiz.push(quizQuestions);
  localStorage.setItem("listOfQuiz", JSON.stringify(ListOfAllQuiz));
  localStorage.setItem(
    `formData-${amountReceived}`,
    JSON.stringify(quizQuestions)
  );
}

function collapseForm(form) {
  let data = localStorage.getItem(`formData-${amountReceived}`);
  let parseData = JSON.parse(data);

  while (form.firstChild) {
    form.removeChild(form.firstChild);
  }

  let quizContainer = document.createElement("div");
  quizContainer.className = "quizContainer";
  let questionTitle = document.createElement("h2");
  questionTitle.classList = "questionTitle";
  questionTitle.textContent = parseData.question;
  let optionContiner = document.createElement("div");
  optionContiner.className = "optionsHolder";

  form.appendChild(quizContainer);
  quizContainer.appendChild(questionTitle);
  for (let i = 0; i < 4; i++) {
    let optionsitem = document.createElement("p");
    optionsitem.className = "optionsitem";
    if (parseData.options[i] === parseData.correctAnswer) {
      let strong = document.createElement("strong");
      strong.textContent = parseData.correctAnswer + "  ✔  ";
      optionsitem.appendChild(strong);
    } else {
      optionsitem.textContent = parseData.options[i];
    }
    quizContainer.appendChild(optionsitem);
  }
  let title = document.createElement("h2");
  title.textContent = parseData;
  return parseData;
}

