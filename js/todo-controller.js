'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisaply();
   
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `<li onclick="onTodoClicked('${todo.id}')" class="${className}">
                    ${todo.txt}
                    <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();

    if (!todos.length){
        document.querySelector('.todo-list').innerText = 'No Todos';
        }

}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    var isRemove = confirm('Delete?');
    if(isRemove){
    removeTodo(todoId)
    }
    renderTodos();
}

function onAddTodo() {
    var elTxt = document.querySelector('input')
    var elImp = document.querySelector('.importance')
    if (elImp.value > 3){
         alert('Number is too high')
         return
    }
    if (!elTxt.value || !elImp.value){
         alert('No txt or importance')
         return
    }
    else var txt = elTxt.value;
    var importance = elImp.value;
    addTodo(txt, importance)
    elTxt.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    renderTodos();
}
function onSetSort(sortedBy) {
    setSort(sortedBy);
    renderTodos();
}


