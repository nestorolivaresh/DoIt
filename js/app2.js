const wrapper = document.querySelector(".valign-wrapper"),
  checkBtn = document.querySelector(".btn-check"),
  startBtn = document.querySelector(".btn-start"),
  titleWrapper = document.querySelector(".title-wrapper"),
  cardsWrapper = document.querySelector(".cards-wrapper");

let generatorId = 0;
let tasks = [];

const renderCardList = () => {
  wrapper.style.display = "none";
  console.log("Show card ");
	addTitle();
	showCardGenerator();
	showList();
};

const addTitle = () => {
  titleWrapper.innerHTML = `
  <div class="title-div">
    <span class="title-txt white-text">Do It!<img src="images/image2.png" id="img2"></span>
    <p class="content-txt subtitle-txt">The best way to organize your tasks</p>
  </div>
  `
};

const generateId = () => {
	generatorId ++
	return generatorId;
}

const showCardGenerator = () => {
  console.log("Add card function triggered");
	const cardGen = document.getElementById("card-generator");
	cardGen.style.display = "block";
};



const submitTask = (id=null) => {
	let cardTitle;
	let cardDescription;
	if(id){
		cardTitle = document.getElementById(`task-${id}-title`).value;
		cardDescription = document.getElementById(`task-${id}-desc`).value;
		
		// editCard()
	} else {
		cardTitle = document.getElementById("card-generator-title").value;
		cardDescription = document.getElementById("card-generator-desc").value;
		const generatedId = generateId();
		console.log('generated id from id generator ',generatedId)
		addTask(generatedId,cardTitle,cardDescription)
	}
};

const addTask = (id, taskTitle, taskDesc) => {
  const task = {
    id: id,
    title: taskTitle,
    description: taskDesc
  };
  console.log("pushing to task array", task);
	tasks.push(task);
	addCard(task);
};


const showList = () => {
	// cardsWrapper.innerHTML=''
	const newCard = document.createElement("div");

	tasks.forEach(task => {
		newCard.innerHTML += `
		<div class="col s6 card-container">
		<div class="card task-card" id="${task.id}">
		<form class="task-form" id=${task.id}>
		<div class="card-content blue-text">
		<div class="input-field">
		<input type="text" class="task-card-title" id="task-${task.id}-title" maxLength="150" value="${task.title}" spellcheck="false">
		</div>
		<div class="input-field">
								<input type="text" class="task-card-txt" id="task-${task.id}-desc" maxLength="150" value="${task.description}" spellcheck="false">
								</div>
								<button type="button" class="btn btn-card btn-submit" onclick="submitTask(${task.id})"><i class="material-icons save-icon">save</i> Save Task</button>
							</div>
					</form>
					<div class="card-action">
					<a class="btn-card btn"><i class="material-icons">edit</i> Edit</a>
					<a class="btn-card btn" onclick="deleteTask(${task.id})"><i class="material-icons delete-word">delete</i> Delete</a>
						<label class="btn-card btn">
						<input type="checkbox" class="checkbox-blue" />
						<span class="btn-card">Done</span>
						</label>
						</div> 
						</div>
						</div>
						`;
			cardsWrapper.appendChild(newCard)
	});
}

	const addCard = ({id, title, description}) => {
	const newCard = document.createElement("div");
  newCard.innerHTML += `
  <div class="col s6 card-container">
		<div class="card task-card" id="${id}">
		<form class="task-form" id=${id}>
		<div class="card-content blue-text">
		<div class="input-field">
		<input type="text" class="task-card-title" id="task-${id}-title" maxLength="150" value="${title}" spellcheck="false" readonly>
		</div>
		<div class="input-field">
								<input type="text" class="task-card-txt" id="task-${id}-desc" maxLength="150" value="${description}" spellcheck="false" readonly>
								</div>
								<button type="button" class="btn btn-card btn-submit" id="submit-${id}" style="display:none" onclick="submitTask(${id})"><i class="material-icons save-icon">save</i> Save Task</button>
							</div>
					</form>
					<div class="card-action">
					<button type="button" class="btn btn-card" onclick="cancelEdit(${id})" id="cancel-${id}" style="display:none"><i class="material-icons cancel-icon">cancel</i> Cancel</button>
					<button class="btn-card btn" onclick="editTask(${id})" id="edit-${id}"><i class="material-icons">edit</i> Edit</button>
					<button class="btn-card btn"><i class="material-icons delete-word">delete</i> Delete</button>
						<label class="btn-card btn">
						<input type="checkbox" class="checkbox-blue" />
						<span class="btn-card">Done</span>
						</label>
						</div> 
						</div>
						</div>
						`;
cardsWrapper.appendChild(newCard);
}

const editCard = id => {
	document.getElementById(`submit-${id}`).style.display = "inline-block";
	document.getElementById(`edit-${id}`).style.display = "none";
	document.getElementById(`cancel-${id}`).style.display = "inline-block";
	document.getElementById(`task-${id}-title`).removeAttribute("readonly");
	document.getElementById(`task-${id}-desc`).removeAttribute("readonly");
	
}

const cancelEdit = id => {
	document.getElementById(`submit-${id}`).style.display = "none";
	document.getElementById(`edit-${id}`).style.display = "inline-block";
	document.getElementById(`cancel-${id}`).style.display = "none";
	document.getElementById(`task-${id}-title`).readOnly = true;
	document.getElementById(`task-${id}-desc`).readOnly = true;
	const task = tasks.find(task => task.id === id);
	document.getElementById(`task-${id}-title`).value = task.title;
	document.getElementById(`task-${id}-desc`).value = task.description; 
}