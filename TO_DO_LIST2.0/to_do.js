const input = document.getElementById("input");
const add_btn = document.getElementById("add_btn");
const list = document.getElementById("list");
const del_btn = document.getElementById("del_btn");

const tasks = JSON.parse(localStorage.getItem("List")) || [];

if(tasks){
	render_list();
}

add_btn.addEventListener("click", add_to_list);

del_btn.addEventListener("click", del_to_list);

function add_to_list(){

	if(input.value.trim()){
		const new_task = {
			id: Date.now(),
			text: input.value,
			completed: false
		};

		tasks.push(new_task);
		localStorage.setItem("List", JSON.stringify(tasks));
		render_list();
		input.value = "";
	}
}

function render_list(){
	
	list.innerHTML = "";

	tasks.forEach(task => {
		const li = document.createElement("li");

		li.textContent = task.text;

		if(task.completed){
			li.style.textDecoration = "line-through";
		}
		
		li.addEventListener("click", () => {
			task.completed = !task.completed;
			localStorage.setItem("List", JSON.stringify(tasks));
			render_list();
		});

		list.appendChild(li);
	});	
}

function del_to_list(){

	for (let i = tasks.length - 1; i >= 0; i--) {
		if(tasks[i].completed){
			tasks.splice(i, 1);
		}
	}
	localStorage.setItem("List", JSON.stringify(tasks));
	render_list();
}