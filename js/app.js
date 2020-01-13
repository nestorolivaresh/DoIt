const cardsWrapper = document.querySelector(".cards-wrapper");

let generatorId = 0;
let tasks = [];

const renderCardList = () => {
	document.querySelector(".valign-wrapper").style.display = "none";
  console.log("Show card");
	addTitle();
	showCardGenerator();
};

const addTitle = () => {
	const titleWrapper = document.querySelector(".title-wrapper");
  titleWrapper.innerHTML = `
  <div class="title-div">
    <span class="title-txt white-text">Do It!<img src="images/image2.png" id="img2"></span>
    <p class="content-txt subtitle-txt">The best way to organize your tasks</p>
  </div>
  `
};

const generateId = () => {
	let tasksInLS = JSON.parse(localStorage.getItem("tasks"));
	if(tasksInLS !== null){
	generatorId = tasksInLS[tasksInLS.length-1].id;
	generatorId ++;
} else {
	generatorId = 0;
	generatorId ++
}
	return generatorId;
}

const showCardGenerator = () => {
  console.log("Add card function triggered");
	const cardGen = document.getElementById("card-generator");
	cardGen.style.display = "block";
	showList();
};



const submitTask = (id=null) => {
	let cardTitle;
	let cardDescription;
	let checkbox;
	if(id){
		cardTitle = document.getElementById(`task-${id}-title`).value;
		cardDescription = document.getElementById(`task-${id}-desc`).value;
		console.log(checkbox);
		tasks.forEach(task => {
			if(task.id === id){
				task.title = cardTitle;
				task.description = cardDescription;
				hideBtns(id);
				editTasksLS(id, cardTitle, cardDescription);
			}
		});
		console.log(tasks)
		// editCard()
	} else {
		cardTitle = document.getElementById("card-generator-title");
		cardDescription = document.getElementById("card-generator-desc");
		console.log(checkbox);
		const generatedId = generateId();
		console.log('generated id from id generator ',generatedId)
		addTask(generatedId,cardTitle.value,cardDescription.value,)
		cardTitle.value = "";
		cardDescription.value = "";
	}
};

const addTask = (id, taskTitle, taskDesc) => {
  const task = {
    id: id,
    title: taskTitle,
		description: taskDesc,
		done: false
  };
  console.log("pushing to task array", task);
	tasks.push(task);
	addCard(task);

	addTaskToLS(task);
};


const addTaskToLS = (task) => {
	let tasksInLS;

	if(localStorage.getItem("tasks") === null){
		tasksInLS = [];	
		tasksInLS.push(task);
		localStorage.setItem("tasks", JSON.stringify(tasksInLS));
	} else {
			tasksInLS = JSON.parse(localStorage.getItem("tasks"));
			tasksInLS.push(task);
			localStorage.setItem("tasks", JSON.stringify(tasksInLS));
	}
}

const editTasksLS = (id, cardTitle, cardDescription) => {
	let tasksInLS = JSON.parse(localStorage.getItem("tasks"));

	const index = tasksInLS.findIndex(task => task.id === id);
	tasksInLS[index] = {
		id: id,
		title: cardTitle,
		description: cardDescription,
		done: false
	}	
		localStorage.setItem("tasks", JSON.stringify(tasksInLS));
}
	
const deleteTasksLS = id => {
	let tasksInLS = JSON.parse(localStorage.getItem("tasks"));
	if(tasksInLS.length > 1){
	const index = tasksInLS.findIndex(task => task.id === id);
	tasksInLS.splice(index, 1);
	localStorage.setItem("tasks", JSON.stringify(tasksInLS));
	console.log(tasksInLS);
	} else {
		localStorage.removeItem("tasks");
	}
}


const showList = () => {
	let tasksInLS = JSON.parse(localStorage.getItem("tasks"));
	if(localStorage.getItem("tasks") !== null){
	tasks = tasksInLS;

	tasksInLS.forEach(task => {
		let newCard = `
  <div class="col s6 card-container" id="card-${task.id}">
		<div class="card task-card">
		<form class="task-form" id="${task.id}">
		<div class="card-content blue-text">
		<p class="right">
			<label>
				<input type="checkbox" class="checkbox-blue" id="checkbox-${task.id}" onchange="checkboxChange(${task.id})"/>
				<span></span>
			</label>
		</p>
    </p>
		<div class="input-field">
		<input type="text" class="task-card-title" id="task-${task.id}-title" maxLength="150" value="${task.title}" spellcheck="false" readonly>
		</div>
		<div class="input-field">
								<input type="text" class="task-card-txt" id="task-${task.id}-desc" maxLength="150" value="${task.description}" spellcheck="false" readonly>
								</div>
								<button type="button" class="btn btn-card btn-submit" id="submit-${task.id}" style="display:none" onclick="submitTask(${task.id})"><i class="material-icons save-icon">save</i> Save Task</button>
							</div>
					</form>
					<div class="card-action">
					<button type="button" class="btn btn-card" onclick="cancelEdit(${task.id})" id="cancel-${task.id}" style="display:none"><i class="material-icons cancel-icon">cancel</i> Cancel</button>
					<button class="btn-card btn" onclick="editCard(${task.id})" id="edit-${task.id}"><i class="material-icons">edit</i> Edit</button>
					<button class="btn-card btn" onclick="deleteTask(${task.id})"><i class="material-icons delete-word">delete</i> Delete</button>
						</div> 
						</div>
						</div>
						`;
cardsWrapper.innerHTML += newCard;
// const index = tasksInLS.findIndex(LStask => LStask.id === task.id);
// if(tasksInLS[index].done = true){
// document.getElementById(`checkbox-${task.id}`).setAttribute("checked", "");
// console.log("test");
// } else if (tasksInLS[index].done = false){
// document.getElementById(`checkbox-${task.id}`).setAttribute("checked", "false");
// console.log("what");
// }
		});
	}
}

	const addCard = task => {

	let newCard = `
  <div class="col s6 card-container" id="card-${task.id}">
		<div class="card task-card">
		<form class="task-form" id="${task.id}">
		<div class="card-content blue-text">
		<p class="right">
			<label>
				<input type="checkbox" class="checkbox-blue" id="checkbox-${task.id}" onchange="checkboxChange(${task.id})"/>
				<span></span>
			</label>
		</p>
    </p>
		<div class="input-field">
		<input type="text" class="task-card-title" id="task-${task.id}-title" maxLength="150" value="${task.title}" spellcheck="false" readonly>
		</div>
		<div class="input-field">
								<input type="text" class="task-card-txt" id="task-${task.id}-desc" maxLength="150" value="${task.description}" spellcheck="false" readonly>
								</div>
								<button type="button" class="btn btn-card btn-submit" id="submit-${task.id}" style="display:none" onclick="submitTask(${task.id})"><i class="material-icons save-icon">save</i> Save Task</button>
							</div>
					</form>
					<div class="card-action">
					<button type="button" class="btn btn-card" onclick="cancelEdit(${task.id})" id="cancel-${task.id}" style="display:none"><i class="material-icons cancel-icon">cancel</i> Cancel</button>
					<button class="btn-card btn" onclick="editCard(${task.id})" id="edit-${task.id}"><i class="material-icons">edit</i> Edit</button>
					<button class="btn-card btn" onclick="deleteTask(${task.id})"><i class="material-icons delete-word">delete</i> Delete</button>
						</div> 
						</div>
						</div>
						`;
cardsWrapper.innerHTML += newCard;
	}

// const checkboxChange = (id) => {
// 	let tasksInLS = JSON.parse(localStorage.getItem("tasks"));
// 	const index = tasksInLS.findIndex(task => task.id === id);
// 	const checkbox = document.getElementById(`checkbox-${id}`);
// 	if(checkbox.checked){
// 		tasksInLS[index].done = true;
		
// 		localStorage.setItem("tasks", JSON.stringify(tasksInLS));
// 	} else{
// 		tasksInLS[index].done = false;
// 		localStorage.setItem("tasks", JSON.stringify(tasksInLS));
// 	}
// }

const editCard = id => {
	document.getElementById(`submit-${id}`).style.display = "inline-block";
	document.getElementById(`edit-${id}`).style.display = "none";
	document.getElementById(`cancel-${id}`).style.display = "inline-block";
	document.getElementById(`task-${id}-title`).removeAttribute("readonly");
	document.getElementById(`task-${id}-desc`).removeAttribute("readonly");
	
}

const cancelEdit = id => {
	hideBtns(id);
	const task = tasks.find(task => task.id === id);
	document.getElementById(`task-${id}-title`).value = task.title;
	document.getElementById(`task-${id}-desc`).value = task.description; 
}

const hideBtns = id => {
	document.getElementById(`submit-${id}`).style.display = "none";
	document.getElementById(`edit-${id}`).style.display = "inline-block";
	document.getElementById(`cancel-${id}`).style.display = "none";
	document.getElementById(`task-${id}-title`).readOnly = true;
	document.getElementById(`task-${id}-desc`).readOnly = true;
}

const deleteTask = id => {
	tasks.forEach((task, index) =>{
		if(task.id == id){
			tasks.splice(index, 1);
		}
	});
	document.getElementById(`card-${id}`).style.display = "none";
	console.log(tasks);
	deleteTasksLS(id);
}