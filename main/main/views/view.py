from pyramid.view import view_config
from ..models import Todo
from pyramid.httpexceptions import HTTPBadRequest,HTTPNotFound

@view_config(route_name='api_todos', renderer='json')
def api_todos(request):
    todos = request.dbsession.query(Todo).all()
    return [
        {
            "id": t.id,
            "title": t.title,
            "done": t.done
        }
        for t in todos
    ]


@view_config(route_name='home', renderer='templates/todo.jinja2')
def home(request):
    return {}

@view_config(route_name='api_todo', renderer='json', request_method='GET')
def api_todo(request):
    todo_id = int(request.matchdict['id'])
    todo = request.dbsession.get(Todo, todo_id)

    if not todo:
        raise HTTPNotFound()

    return {
        "id": todo.id,
        "title": todo.title,
        "done": todo.done
    }


@view_config(route_name='api_todos', renderer='json', request_method='POST')
def add_todo(request):
    data = request.json_body
    title = data.get("title")

    if not title:
        raise HTTPBadRequest(json_body={"error": "Title is required"})

    todo = Todo(title=title, done=False)
    request.dbsession.add(todo)
    request.dbsession.flush()

    return {
        "id": todo.id,
        "title": todo.title,
        "done": todo.done
    }

@view_config(route_name='api_todo', renderer='json', request_method='DELETE')
def delete_todo(request):
    todo_id= int (request.matchdict['id'])
    todo=request.dbsession.get(Todo,todo_id)
    
    if not todo:
        return HTTPNotFound()
    request.dbsession.delete(todo)
    return {"message":"delete succecful"}

@view_config(route_name='api_todo',request_method='PATCH', renderer='json')
def update_todo(request):
    todo_id = int(request.matchdict['id'])
    todo = request.dbsession.get(Todo, todo_id)

    print (todo_id)
    if not todo:
        raise HTTPNotFound()

    data = request.json_body

    if "done" in data:
        todo.done = data["done"]

    if "title" in data:
        todo.title = data["title"]

    return {
        "id": todo.id,
        "title": todo.title,
        "done": todo.done
    }

