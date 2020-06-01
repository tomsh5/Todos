'use strict';

var gTodos = _createTodos();
var gTodosFilter = 'all'
var gTodosSort = 'txt'

function getTodosForDisaply() {
    getTodosDisaplySorted()
    if (gTodosFilter === 'all') return gTodos;
    var todos = gTodos.filter(function (todo) {
        return (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    })
    return todos;
}

function getTodosDisaplySorted() {
    if (gTodosSort === 'txt') {
        gTodos.sort(function (todo1, todo2) {
            var nameA = todo1.txt.toUpperCase();
            var nameB = todo2.txt.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    else if (gTodosSort === 'created') {
        gTodos.sort(function (todo1, todo2) {
            return todo1.createdAt - todo2.createdAt;
        });
    }
    else if (gTodosSort === 'importance') {
        gTodos.sort(function (todo1, todo2) {
            return todo1.importance - todo2.importance;
        });

    }
}

function setFilter(filteredBy) {
    gTodosFilter = filteredBy;
}

function setSort(sortedBy) {
    gTodosSort = sortedBy;
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage('todos', gTodos)
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1)
    saveToStorage('todos', gTodos)
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance);
    gTodos.unshift(todo)
    saveToStorage('todos', gTodos)
}

function getTodosCount() {
    return gTodos.length;
}

function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) { return !todo.isDone })
    return activeTodos.length
}

function _createTodos() {
    var todos = loadFromStorage('todos')
    if (!todos || !todos.length) {
        var txts = ['Master CSS', 'Learn HTML', 'Become JS Ninja'];
        todos = txts.map(function(txt){return _createTodo(txt, 3)});
        saveToStorage('todos', todos)
        } 
    return todos;
}

function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}