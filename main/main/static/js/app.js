var Todo = Backbone.Model.extend({
    urlRoot: '/todos',
    defaults: {
        title: '',
        done: false
    }
});

var TodoList = Backbone.Collection.extend({
    model: Todo,
    url: '/todos'
});

var TodoView = Backbone.View.extend({
    el: '#todo-app',

    events: {
        'click #add-btn': 'createTodo',
        'click .toggle': 'toggleDone',
        'click .delete': 'deleteTodo'
    },

    initialize: function () {
        this.collection = new TodoList();
        this.listenTo(this.collection, 'sync update', this.render);
        this.collection.fetch();
    },

    render: function () {
        var html = '';

        this.collection.each(function (todo) {
            html += `
                <li data-id="${todo.id}">
                    <input type="checkbox" class="toggle" ${todo.get('done') ? 'checked' : ''}>
                    <span style="text-decoration:${todo.get('done') ? 'line-through' : 'none'}">
                        ${todo.get('title')}
                    </span>
                    <button class="delete">X</button>
                </li>
            `;
        });

        this.$('#todo-list').html(html);
    },

    createTodo: function () {
        var title = this.$('#new-title').val();
        if (!title) return;

        this.collection.create({ title: title }, { wait: true });
        this.$('#new-title').val('');
    },

    toggleDone: function (e) {
        var id = $(e.currentTarget).closest('li').data('id');
        var todo = this.collection.get(id);

        todo.save({ done: !todo.get('done') }, { patch: true });
    },

    deleteTodo: function (e) {
        var id = $(e.currentTarget).closest('li').data('id');
        var todo = this.collection.get(id);

        todo.destroy();
    }
});

$(function () {
    new TodoView();
});
