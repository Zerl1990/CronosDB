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
    user = db.login_user(data["name"], data["password"])
    if not user:
      raise ValueError("Wrong name or password")
    return json.dumps(user)
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
    if not db.update_user(user_id, data["name"], data["password"], data["email"], data["admin"]):
      raise ValueError("Cannot update user {0}".format(user_id))
    return json.dumps(db.get_user_by_id(user_id)[0])
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

################################################################################
#     ACTOR METHODS
################################################################################
@route('/actors', method=['OPTIONS', 'GET'])
def show_actors():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_actors())

@route('/actors/<actor_id>', method=['OPTIONS', 'GET'])
def show_actor_by_id(actor_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_actor_by_id(actor_id))

@route('/actors', method=['OPTIONS', 'POST'])
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

@route('/actors/<actor_id>', method=['OPTIONS', 'PUT'])
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
@route('/directors', method=['OPTIONS', 'GET'])
def show_directors():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_directors())

@route('/directors/<director_id>', method=['OPTIONS', 'GET'])
def show_director_by_id(director_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_director_by_id(director_id))

@route('/directors', method=['OPTIONS', 'POST'])
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

@route('/directors/<director_id>', method=['OPTIONS', 'PUT'])
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
@route('/genres', method=['OPTIONS', 'GET'])
def show_genres():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_genres())

@route('/genres/<genre_id>', method=['OPTIONS', 'GET'])
def show_director_by_id(genre_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_genre_by_id(genre_id))

@route('/genres', method=['OPTIONS', 'POST'])
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
    genre_id = db.add_genre(data["genre"], data["sub_genre"])
    return json.dumps({'genre_id': genre_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/genres/<genre_id>', method=['OPTIONS', 'PUT'])
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
    if not db.update_genre(genre_id, data["genre"], data["sub_genre"]):
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
@route('/studios', method=['OPTIONS', 'GET'])
def show_studios():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_studios())

@route('/studios/<studio_id>', method=['OPTIONS', 'GET'])
def show_studio_by_id(studio_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_studio_by_id(studio_id))

@route('/studios', method=['OPTIONS', 'POST'])
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

@route('/studios/<studio_id>', method=['OPTIONS', 'PUT'])
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
@route('/awards', method=['OPTIONS', 'GET'])
def show_awards():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_awards())

@route('/awards/<award_id>', method=['OPTIONS', 'GET'])
def show_studio_by_id(award_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_by_id(award_id))

@route('/awards', method=['OPTIONS', 'POST'])
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

@route('/awards/<award_id>', method=['OPTIONS', 'PUT'])
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

@route('/awards/<award_id>/categories', method=['OPTIONS', 'GET'])
def show_award_categories(award_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_categories(award_id))

@route('/awards/<award_id>/categories/<category_id>', method=['OPTIONS', 'GET'])
def show_award_category_by_id(award_id, category_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_category_by_id(award_id, category_id))

@route('/awards/<award_id>/categories', method=['OPTIONS', 'POST'])
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

@route('/awards/<award_id>/categories/<category_id>', method=['OPTIONS', 'PUT'])
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

@route('/awards/<award_id>/nominations', method=['OPTIONS', 'GET'])
def show_award_nominations(award_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_nominations(award_id))

@route('/awards/<award_id>/nominations/<year>', method=['OPTIONS', 'GET'])
def show_award_nominations_by_year(award_id, year):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_nominations_by_year(award_id, year))

@route('/awards/<award_id>/nominations/<year>/<category_id>', method=['OPTIONS', 'GET'])
def show_award_nominations_by_year_category(award_id, year, category_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_award_nominations_by_year_category(award_id, year, category_id))

@route('/awards/<award_id>/nominations', method=['OPTIONS', 'POST'])
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
    nom_id = db.add_award_nomination(data['category_id'], data['actor_id'], data['year'], data['won'], data["movie"])
    return json.dumps({'nom_id': nom_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/awards/<award_id>/nominations/<nom_id>', method=['OPTIONS', 'PUT'])
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
    if not db.update_award_nomination(nom_id, data["category_id"], data["actor_id"], data["year"], data["won"], data["movie"]):
      raise ValueError("Cannot award nomination {0}-{1}-{2}-{3}-{4}".format(nom_id, data["category_id"], data["actor_id"], data["year"], data["won"]))
    return json.dumps(db.get_award_nomination_by_id(nom_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/nominations_categories', method=['OPTIONS', 'GET'])
def show_awards():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_all_nominations_categories())

################################################################################
#     MOVIE SECTION
################################################################################
@route('/movies', method=['OPTIONS', 'GET'])
def show_movies():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movies())

@route('/movies/<movie_id>', method=['OPTIONS', 'GET'])
def show_movie_by_id(movie_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movie_by_id(movie_id))
  
@route('/movies/view/<movie_id>', method=['OPTIONS', 'GET'])
def show_movie_view_by_id(movie_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movie_view_info(movie_id))

@route('/movies/genre/<genre_name>', method=['OPTIONS', 'GET'])
def show_movie_by_genre(genre_name):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  movies = db.get_movies_by_genre(genre_name);
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)
  
@route('/movies/director/<director_name>', method=['OPTIONS', 'GET'])
def show_movie_by_director(director_name):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  director_name = director_name.replace(":", " ")
  movies = db.get_movies_by_director(director_name);
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)

@route('/movies/actor/<actor_name>', method=['OPTIONS', 'GET'])
def show_movie_by_actor(actor_name):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  actor_name = actor_name.replace(":", " ")
  movies = db.get_movies_by_actor(actor_name);
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)
  
@route('/movies/year/<year>', method=['OPTIONS', 'GET'])
def show_movie_by_year(year):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  movies = db.get_movies_by_year(year);
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)
  
@route('/movies/genre/<genre_name>/<subgenre_name>', method=['OPTIONS', 'GET'])
def show_movie_by_subgenre(genre_name, subgenre_name):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  movies = db.get_movies_by_genre_subgenre(genre_name, subgenre_name);
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)

@route('/movies', method=['OPTIONS', 'POST'])
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
    return json.dumps({'movie_id': movie_id})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/movies/<movie_id>', method=['OPTIONS', 'PUT'])
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

@route('/movies/transaction/delete', method=['OPTIONS', 'POST'])
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
    result = db.delete_movie_trans(data["movie_id"], data["other_id"], data["trans_name"])
    return json.dumps({'result': result})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/movies/transaction', method=['OPTIONS', 'POST'])
def add_movie_trans():
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    try:
      data = json.load(request.body)
    except Exception as error:
      raise ValueError("Cannot parse request: {0}".format(error))
    if data is None:
      raise ValueError("Request is None")
    result = db.add_movie_trans(data["movie_id"], data["other_id"], data["trans_name"])
    return json.dumps({'result': result})
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/movies/transaction/<name>', method=['OPTIONS', 'GET'])
def show_movie_trans(name):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  return json.dumps(db.get_movie_trans(name))

################################################################################
#     SMART SECTION
################################################################################
@route('/smart/displays/<user_id>/<movie_id>', method=['OPTIONS', 'POST'])
def update_displays(user_id, movie_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    info = db.update_displays(user_id, movie_id)
    return json.dumps(info)
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})

@route('/smart/rating/<user_id>/<movie_id>/<rating>', method=['OPTIONS', 'POST'])
def update_rating(user_id, movie_id, rating):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    info = db.update_rating(user_id, movie_id, rating)
    return json.dumps(info)
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})
    
@route('/smart/rating/<user_id>/<movie_id>', method=['OPTIONS', 'GET'])
def get_rating_by_user(user_id, movie_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    return json.dumps(db.get_rating_by_user(user_id, movie_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})
    
@route('/smart/movies/rating/<movie_id>', method=['OPTIONS', 'GET'])
def get_rating_by_movie(movie_id):
  response.headers['Content-Type'] = 'application/json'
  db = CronosDB("root", "zerl", "cronos")
  try:
    return json.dumps(db.get_rating_by_movie(movie_id))
  except ValueError as error:
    msg =  "Exception...{0}".format(error)
    response.status = 400
    print msg
    return json.dumps({"status": 400, "msg": msg})
  
@route('/smart/movies/top', method=['OPTIONS', 'GET'])
def get_top_movies():
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  movies = db.get_top_movies()
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)
  
@route('/smart/movies/suggestion/<user_id>', method=['OPTIONS', 'GET'])
def get_suggestion(user_id):
  db = CronosDB("root", "zerl", "cronos")
  response.headers['Content-Type'] = 'application/json'
  movies = db.get_likes_hash(user_id)
  for movie in movies:
    movie["youtube_id"] = movie["url"].split("=")[-1]
  return json.dumps(movies)
 
app = bottle.app()
app.install(EnableCors())
app.run(port=8080)
