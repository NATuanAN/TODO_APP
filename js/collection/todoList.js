import { Todo } from "../model/todo.js";

export const TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage("todo-backbone"),
});