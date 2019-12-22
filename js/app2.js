const wrapper = document.querySelector(".valign-wrapper"), 
      checkBtn = document.querySelector(".btn-check"), 
      startBtn = document.querySelector(".btn-start"),
      titleWrapper = document.querySelector(".title-wrapper"),
      cardsWrapper = document.querySelector(".cards-wrapper");

let id = 0;
let tasks = [] ;


const showCard = () => {
	wrapper.style.display = "none";
	console.log('Show card ')
  addTitle();
}

const addTitle = () => {
  titleWrapper.innerHTML = `
  <div class="title-div">
    <span class="title-txt white-text">Do It!<img src="images/image2.png" id="img2"></span>
    <p class="content-txt subtitle-txt">The best way to organize your tasks</p>
  </div>
  <a href="#" class="btn-floating btn-large right" onclick="addCard()" id="add"><i class="plus-btn large white material-icons">add</i></a>
  `; 
  
  addCard();
}

const generateId = () => id++;

const addCard = () => {
	console.log('Add card function triggered')
  generateId();
  cardsWrapper.innerHTML += `
  <div class="col s6 card-container">
	<div class="card task-card" id="${id}">
	<div class="card-content blue-text">
	<div class="input-field">
	<input type="text" class="task-card-title" id="task-${id}-title" maxLength="150" placeholder="Enter your Task Title" spellcheck="false">
	</div>
	<div class="input-field">
              <input type="text" class="task-card-txt" id="task-${id}-desc" maxLength="150" placeholder="Describe Your Task" spellcheck="false">
							</div>
							<button type="button" class="btn btn-card btn-submit" onclick="submitTask(${id})"><i class="material-icons save-icon">save</i> Save Task</button>
						</div>
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
					if(tasks.length>0){
						const cardTitle = document.getElementById(`task-${id-1}-title`)
						console.dir(cardTitle)

					}
	console.log('added carded succesfully with id : ',id)
}

const submitTask = (id) => {
  console.log('submitting task ',id);
  const taskTitle = document.getElementById(`task-${id}-title`).value;
  const taskDesc = document.getElementById(`task-${id}-desc`).value;

  addTask(id, taskTitle, taskDesc);
  
  console.log(taskTitle, taskDesc);
}

const addTask = (id, taskTitle, taskDesc) => {
  const task = {
    id: id,
    title: taskTitle,
    description: taskDesc
  };
	console.log('pushing to task array',task)
	tasks.push(task);
	const cardTitle = document.getElementById(`task-${id}-title`)
	console.dir(cardTitle)
	// cardTitle.setAttribute('placeholder',task.title)
	cardTitle.value = task.title
	// cardTitle.readOnly = true;
	cardDescription = document.getElementById(`task-${id}-desc`)
	// cardDescription.setAttribute('placeholder',task.description)
	cardDescription.value = task.description
  // cardDescription.readOnly = true;

  console.log('saved card ',cardTitle.value);
}
