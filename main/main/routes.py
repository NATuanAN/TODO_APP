def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=0)
    config.add_route('home', '/')
    config.add_route('api_todos', '/todos')
    config.add_route('api_todo', '/todos/{id}')
