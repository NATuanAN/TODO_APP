import { TodoView } from "./tempView.js";
import { TodoList } from "../collection/todoList.js";

export const AppView = Backbone.View.extend({
    el: "body",

    events: {
        "click #addTodo": "createTodo",
        "keypress #newTodo": "createOnEnter",
    },

    initialize() {
        this.todos = new TodoList();
        this.input = this.$("#newTodo");
        this.list = this.$("#todoList");

        this.listenTo(this.todos, "add", this.addOne);
        this.listenTo(this.todos, "reset", this.addAll);

        this.todos.fetch();
    },

    createTodo() {
        if (!this.input.val().trim()) return;

        this.todos.create({
            title: this.input.val(),
        });

        this.input.val("");
    },

    createOnEnter(e) {
        if (e.key === "Enter") {
            this.createTodo();
        }
    },

    addOne(todo) {
        const view = new TodoView({ model: todo });
        this.list.append(view.render().el);
    },
});
