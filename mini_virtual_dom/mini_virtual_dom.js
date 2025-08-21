
const add_btn = document.getElementById("add-btn");
const del_btn = document.getElementById("del-btn");
const input = document.getElementById("item-input");
const ul = document.getElementById("item-list");
const arrayDeTareas = JSON.parse(localStorage.getItem("todoList")) || [];

if(arrayDeTareas !== null){
	for (let i = 0; i < arrayDeTareas.length; i++) {
		const li = document.createElement("li");

		const cb = document.createElement("input");
		cb.type = "checkbox";

		cb.addEventListener("change", () => {
			if(cb.checked){
				li.style.textDecoration = "line-through";
			}
			else{
				li.style.textDecoration = "none";
			}
		});

		li.appendChild(cb);
		li.appendChild(document.createTextNode(arrayDeTareas[i]));
		ul.appendChild(li);
	}
}

add_btn.addEventListener("click", addlist);

del_btn.addEventListener("click", dellist);

function dellist(){
	const items = ul.querySelectorAll("li");

	let i = items.length - 1;
	while(i >= 0)
	{
		const li = items[i];
		const checkbox = li.querySelector('input[type="checkbox"]');
		if(checkbox && checkbox.checked)
		{
			arrayDeTareas.splice(i, 1);
			localStorage.setItem("todoList", JSON.stringify(arrayDeTareas));
			ul.removeChild(li);
		}	
		i--;
	}
}

function addlist(){
	if(input.value.trim())
	{
		const li = document.createElement("li");

		const cb = document.createElement("input");
		cb.type = "checkbox";

		cb.addEventListener("change", () => {
			if(cb.checked){
				li.style.textDecoration = "line-through";
			}
			else{
				li.style.textDecoration = "none";
			}
		});
	
		li.appendChild(cb);
		li.appendChild(document.createTextNode(input.value));

		arrayDeTareas.push(input.value);
		localStorage.setItem("todoList", JSON.stringify(arrayDeTareas));

		ul.appendChild(li);

		input.value = "";
	}
}
