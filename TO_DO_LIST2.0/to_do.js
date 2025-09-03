const input = document.getElementById("input");
const add_btn = document.getElementById("add_btn");
const list = document.getElementById("list");
const del_btn = document.getElementById("del_btn");
const filter_all = document.getElementById("show-all");
const filter_done = document.getElementById("show-done");
const filter_pending = document.getElementById("show-pending");

const tasks = JSON.parse(localStorage.getItem("List")) || [];

if(tasks){
	render_list();
}

add_btn.addEventListener("click", add_to_list);

del_btn.addEventListener("click", del_to_list);

filter_all.addEventListener("click", () => {
	const items = list.querySelectorAll("li");
	items.forEach(li => {
		li.style.display = "flex";
	});
});

filter_done.addEventListener("click", () => {
	const items = list.querySelectorAll("li");
	items.forEach(li => {
		if(li.dataset.completed == "true")
		{
			li.style.display = "flex";
		}
		else
		{
			li.style.display = "none";
		}
	});
});

filter_pending.addEventListener("click", () => {
	const items = list.querySelectorAll("li");
	items.forEach(li => {
		li.style.display = li.dataset.completed == "false" ? "flex" : "none";
	});
});

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

		li.dataset.completed = task.completed;

		if(task.completed){
			li.style.textDecoration = "line-through";
		}
		
		li.addEventListener("click", () => {
			task.completed = !task.completed;
			localStorage.setItem("List", JSON.stringify(tasks));
			render_list();
		});

		li.addEventListener("dblclick", () => {
			const new_text = prompt("Edit task:", li.textContent);
			if(!(new_text == null || new_text.trim() == "")){
				task.text = new_text;
				localStorage.setItem("List", JSON.stringify(tasks));
				render_list();
			}
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