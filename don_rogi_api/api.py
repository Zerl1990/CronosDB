import bottle
from bottle import request, response, run
from bottle import post, get, put, delete, route
import re
import json
from api_functions import CronosDB

################################################################################
#     Enable CROSS DOMAIN CLASS
################################################################################
class EnableCors(object):
    name = 'enable_cors'
    api = 2

    def apply(self, fn, context):
        def _enable_cors(*args, **kwargs):
            # set CORS headers
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if bottle.request.method != 'OPTIONS':
                # actual request; reply with the actual response
                return fn(*args, **kwargs)
        return _enable_cors

################################################################################
#     USER METHODS
################################################################################
@route('/users', method=['OPTIONS', 'GET'])
def show_users():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_users())

@route('/users/<user_id>', method=['OPTIONS', 'GET'])
def show_user_by_id(user_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_user_by_id(user_id))

@route('/users', method=['OPTIONS', 'POST'])
def add_user():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    user_id = db.add_user(data["name"], data["password"], data["email"])
    return json.dumps({'user_id': user_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/users/login', method=['OPTIONS', 'POST'])
def user_login():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.login_user(data["name"], data["password"]):
      raise ValueError("Wrong name or password")
    else:
      msg = "User {0} login successful".format(data["name"])
    return json.dumps({"msg": msg})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/users/<user_id>', method=['OPTIONS', 'PUT'])
def update_user(user_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if "email" in data:
      if not db.update_user_email(user_id, data["email"]):
        raise ValueError("Cannot update user email, it does not exists")
    if "password" in data:
      if not db.update_user_password(user_id, data["password"]):
        raise ValueError("Cannot update user email, it does not exists")
    return json.dumps(db.get_user_by_id(user_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     ACTOR METHODS
################################################################################
@get('/actors')
def show_actors():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_actors())

@get('/actors/<actor_id>')
def show_actor_by_id(actor_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_actor_by_id(actor_id))

@post('/actors')
def add_actor():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    actor_id = db.add_actor(data["name"], data["nationality"], data["birth_date"])
    return json.dumps({'actor_id': actor_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/actors/<actor_id>')
def update_actor(actor_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_actor(actor_id, data["name"], data["nationality"], data["birth_date"]):
      raise ValueError("Cannot update actor {0}-{1}".format(actor_id, data["name"]))
    return json.dumps(db.get_actor_by_id(actor_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     DIRECTOR METHODS
################################################################################
@get('/directors')
def show_directors():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_directors())

@get('/directors/<director_id>')
def show_director_by_id(director_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_director_by_id(director_id))

@post('/directors')
def add_actor():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    director_id = db.add_director(data["name"], data["nationality"], data["birth_date"])
    return json.dumps({'director_id': director_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/directors/<director_id>')
def update_actor(director_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_director(director_id, data["name"], data["nationality"], data["birth_date"]):
      raise ValueError("Cannot update director {0}-{1}".format(director_id, data["name"]))
    return json.dumps(db.get_director_by_id(director_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     GENRE METHODS
################################################################################
@get('/genres')
def show_genres():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_genres())

@get('/genres/<genre_id>')
def show_director_by_id(genre_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_genre_by_id(genre_id))

@post('/genres')
def add_actor():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    genre_id = db.add_genre(data["genre"], data["subgenre"])
    return json.dumps({'genre_id': genre_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/genres/<genre_id>')
def update_actor(genre_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_genre(genre_id, data["genre"], data["subgenre"]):
      raise ValueError("Cannot update genre{0}-{1}".format(genre_id, data["genre"]))
    return json.dumps(db.get_genre_by_id(genre_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     FILM STUDIO SECTION
################################################################################
@get('/studios')
def show_studios():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_studios())

@get('/studios/<studio_id>')
def show_studio_by_id(studio_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_studio_by_id(studio_id))

@post('/studios')
def add_studio():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    studio_id = db.add_studio(data["name"], data["country"])
    return json.dumps({'studio_id': studio_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/studios/<studio_id>')
def update_actor(studio_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_studio(studio_id, data["name"], data["country"]):
      raise ValueError("Cannot update studio{0}-{1}-{2}".format(studio_id, data["name"], data["country"]))
    return json.dumps(db.get_studio_by_id(studio_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     AWARD SECTION
################################################################################
@get('/awards')
def show_awards():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_awards())

@get('/awards/<award_id>')
def show_studio_by_id(award_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_by_id(award_id))

@post('/awards')
def add_studio():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    award_id = db.add_award(data["name"], data["country"])
    return json.dumps({'award_id': award_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/awards/<award_id>')
def update_award(award_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_award(award_id, data["name"], data["country"]):
      raise ValueError("Cannot update award {0}-{1}-{2}".format(award_id, data["name"], data["country"]))
    return json.dumps(db.get_award_by_id(award_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@get('/awards/<award_id>/categories')
def show_award_categories(award_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_categories(award_id))

@get('/awards/<award_id>/categories/<category_id>')
def show_award_category_by_id(award_id, category_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_category_by_id(award_id, category_id))

@post('/awards/<award_id>/categories')
def add_award_category(award_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    category_id = db.add_award_category(award_id, data["name"])
    return json.dumps({'award_category_id': category_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/awards/<award_id>/categories/<category_id>')
def update_award_category(award_id, category_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_award_category(category_id, award_id, data["name"]):
      raise ValueError("Cannot update award category {0}-{1}-{2}".format(category_id, award_id, data["name"]))
    return json.dumps(db.get_award_category_by_id(award_id, category_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@get('/awards/<award_id>/nominations')
def show_award_nominations(award_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_nominations(award_id))

@get('/awards/<award_id>/nominations/<year>')
def show_award_nominations_by_year(award_id, year):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_nominations_by_year(award_id, year))

@get('/awards/<award_id>/nominations/<year>/<category_id>')
def show_award_nominations_by_year_category(award_id, year, category_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_nominations_by_year_category(award_id, year, category_id))

@post('/awards/<award_id>/nominations')
def add_award_category(award_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    nom_id = db.add_award_nomination(data['category_id'], data['actor_id'], data['year'], data['won'])
    return json.dumps({'nom_id': nom_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/awards/<award_id>/nominations/<nom_id>')
def update_award_category(award_id, nom_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_award_nomination(nom_id, data["category_id"], data["actor_id"], data["year"], data["won"]):
      raise ValueError("Cannot award nomination {0}-{1}-{2}-{3}-{4}".format(nom_id, data["category_id"], data["actor_id"], data["year"], data["won"]))
    return json.dumps(db.get_award_nomination_by_id(nom_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     MOVIE SECTION
################################################################################
@get('/movies')
def show_movies():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movies())

@get('/movies/<movie_id>')
def show_movie_by_id(movie_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movie_by_id(movie_id))

@get('/movies/genre/<genre_name>')
def show_movie_by_id(genre_name):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movies_by_genre(genre_name))

@post('/movies')
def add_movie():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    movie_id = db.add_movie(data)
    return json.dumps({'movie_id': studio_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@put('/movies/<movie_id>')
def update_movie(movie_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    if not db.update_movie(data):
      raise ValueError("Cannot update movie{0}".format(data))
    return json.dumps(db.get_movie_by_id(movie_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@delete('/movies/transaction')
def delete_movie_trans():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    result = db.delete_movie_trans(data["table"], data["other_attr"], data["movie_id"], data["other_id"])
    return json.dumps({'result': result})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@post('/movies/transaction')
def delete_movie_trans():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    result = db.add_movie_trans(data["table"], data["other_attr"], data["movie_id"], data["other_id"])
    return json.dumps({'result': result})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

app = bottle.app()
app.install(EnableCors())
app.run(port=8080)
#run(host='localhost', port=8080, debug=True, reloader=True)
