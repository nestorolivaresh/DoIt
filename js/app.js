const wrapper = document.querySelector(".valign-wrapper"), 
      checkBtn = document.querySelector(".btn-check"), 
      startBtn = document.querySelector(".btn-start"),
      titleWrapper = document.querySelector(".title-wrapper"),
      cardsWrapper = document.querySelector(".cards-wrapper");

let id = 0;
let tasksList = [];

const generateID = () => id++;

const removeStartDiv = () => wrapper.style.display = "none";

const startDiv = () => {
  removeStartDiv();

  titleWrapper.innerHTML += `
  <div class="title-div">
    <span class="title-txt white-text">Do It!<img src="images/image2.png" id="img2"></span>
    <p class="content-txt subtitle-txt">The best way to organize your tasks</p>
  </div>
  <a href="#" class="btn-floating btn-large right buttom" id="add"><i class="plus-btn large white material-icons">add</i></a>
  `; 

  addCard();
  const addBtn = document.getElementById("add");
  addBtn.addEventListener("click", addCard);

}

startBtn.addEventListener("click", startDiv);

const addCard = () => {

generateID();

cardsWrapper.innerHTML = `

    <div class="col s12 card-container">
      <div class="card task-card" id="${id}">
        <form class="task-form">
          <div class="card-content blue-text">
            <div class="input-field">
              <input type="text" class="task-card-title" maxLength="150" placeholder="Enter your Task Title" spellcheck="false">
            </div>
            <div class="input-field">
              <textarea class="materialize-textarea task-card-txt" maxLength="150" placeholder="Describe Your Task" spellcheck="false"></textarea>
            </div>
            <a class="btn btn-card btn-submit" onclick="submitTask()"><i class="material-icons save-icon">save</i> Save Task</a>
          </div>
        </form>
        <div class="card-action">
        <a class="btn-card btn"><i class="material-icons">edit</i> Edit</a>
        <a class="btn-card btn" onclick="deleteTask(${id})"><i class="material-icons delete-word">delete</i> Delete</a>
          <label class="btn-card btn">
          <input type="checkbox" class="checkbox-blue" />
          <span class="btn-card">Done</span>
          </label>
        </div> 
      </div>
    </div>
`;
}

