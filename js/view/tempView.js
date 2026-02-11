export const TodoView = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#todo-template").html()),

    events: {
        "click .toggle": "toggleDone",
        "click .delete": "deleteTodo",
    },

    initialize() {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "destroy", this.remove);
    },

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    toggleDone() {
        this.model.toggle();
    },

    deleteTodo() {
        this.model.destroy();
    },
});
