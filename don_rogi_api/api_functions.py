#!/usr/bin/python
import MySQLdb as mdb

class CronosDB():
  def __init__(self, user=None, password=None, database=None):
    self.user = user
    self.password = password
    self.database = database

  def select(self, query=None):
    connection = mdb.connect("localhost", self.user, self.password, self.database, charset="utf8")
    cursor = connection.cursor()
    result = None
    try:
      cursor.execute(query)
      result = [dict(line) for line in [zip([ column[0] for column in cursor.description ], row) for row in cursor.fetchall()]]
    except mdb.Error as error:
      print "Error: {0}".format(error)
      return None
    finally:
      connection.close()
      return result

  def insert(self, query=None):
    connection = mdb.connect("localhost", self.user, self.password, self.database, charset="utf8")
    cursor = connection.cursor()
    try:
      cursor.execute(query)
      connection.commit()
    except mdb.Error as error:
      print "Error: {0}".format(error)
      return False
    finally:
      connection.close()
      return True

  def update(self, query=None):
    connection = mdb.connect("localhost", self.user, self.password, self.database, charset="utf8")
    cursor = connection.cursor()
    try:
      cursor.execute(query)
      connection.commit()
    except mdb.Error as error:
      print "Error: {0}".format(error)
      return False
    finally:
      connection.close()
      return True

  def delete(self, query=None):
    connection = mdb.connect("localhost", self.user, self.password, self.database, charset="utf8")
    cursor = connection.cursor()
    try:
      cursor.execute(query)
      connection.commit()
    except mdb.Error as error:
      print "Error: {0}".format(error)
      return False
    finally:
      connection.close()
      return True

  ##############################################################################
  #                       USER SECTION                                         #
  ##############################################################################
  def add_user(self, name=None, password=None, email=None):
    user_id = self.get_user_id(name, password)
    if user_id:
      print "Cannot add user, {0} already exists".format(name)
      return user_id
    query = "INSERT INTO user (id, name, password, email) VALUES (DEFAULT, '{0}', '{1}', '{2}')"
    query = query.format(name, password, email)
    self.insert(query)
    user_id = self.get_user_id(name, password)
    return user_id

  def login_user(self, name, password):
    query = "SELECT * FROM user WHERE name='{0}' AND password='{1}'"
    query = query.format(name, password)
    result = self.select(query)
    if len(result) > 1:
      raise ValueError("Cannot login, we have a cloned user {0}!".format(name))
    elif len(result) == 0:
      raise ValueError ("Wrong name or password ({0})".format(name))
    elif result[0]['name'] == name and result[0]['password'] == password:
      return result[0]['id']

  def update_user_password(self, user_id, password=None):
    query = "UPDATE user SET password='{0}' WHERE id='{1}'"
    query = query.format(password, user_id)
    return self.update(query)

  def update_user_email(self, user_id=None, email=None):
    query = "UPDATE user SET email='{0}' WHERE id='{1}'"
    query = query.format(email, user_id)
    return self.update(query)

  def get_user_id(self, name, password):
    query = "SELECT id FROM user WHERE name='{0}' AND password='{1}'"
    query = query.format(name, password)
    result = self.select(query)
    if len(result) < 1:
      return None
    else:
      return result[0]['id']

  def get_users(self):
    query = "SELECT * FROM user"
    return self.select(query)

  def get_user_by_id(self, user_id):
    query = "SELECT * FROM user WHERE id='{0}'".format(user_id)
    return self.select(query)

  ##############################################################################
  #             ACTORS                                                         #
  ##############################################################################
  def get_actors(self):
    query = "SELECT * FROM actor"
    results = self.select(query)
    for result in results:
      result["birth_date"] = result["birth_date"].strftime("%Y-%m-%d")
    return results

  def get_actor_by_id(self, actor_id):
    query = "SELECT * FROM actor WHERE id='{0}'".format(actor_id)
    results = self.select(query)
    for result in results:
      result["birth_date"] = result["birth_date"].strftime("%Y-%m-%d")
    return results

  def get_actor_id(self,name, nationality, birth_date):
    query = "SELECT id FROM actor WHERE name='{0}' AND nationality='{1}' AND birth_date='{2}'"
    query = query.format(name, nationality, birth_date)
    result = self.select(query)
    if len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_actor(self, name, nationality, birth_date):
    actor_id = self.get_actor_id(name, nationality, birth_date)
    if actor_id:
      print "Cannot add actor, {0}-{1}-{2} already exists".format(name, nationality, birth_date)
      return actor_id
    query = "INSERT INTO actor (id, name, nationality , birth_date) VALUES (DEFAULT, '{0}', '{1}', '{2}')"
    query = query.format(name, nationality, birth_date)
    self.insert(query)
    actor_id = self.get_actor_id(name, nationality, birth_date)
    return actor_id

  def update_actor(self, actor_id, name, nationality, birth_date):
    query = "UPDATE actor SET name='{0}', nationality='{1}', birth_date='{2}' WHERE id='{3}'"
    query = query.format(name, nationality, birth_date, actor_id)
    return self.update(query)

  ##############################################################################
  #           DIRECTOR
  ##############################################################################
  def get_directors(self):
    query = "SELECT * FROM director"
    results = self.select(query)
    for result in results:
      result["birth_date"] = '{0.day:02d}-{0.month:02d}-{0.year:4d}'.format(result["birth_date"])
    return results

  def get_director_by_id(self, director_id):
    query = "SELECT * FROM director WHERE id='{0}'".format(director_id)
    results = self.select(query)
    for result in results:
      print result
      result["birth_date"] = '{0.day:02d}-{0.month:02d}-{0.year:4d}'.format(result["birth_date"])
    return results

  def get_director_id(self,name, nationality, birth_date):
    query = "SELECT id FROM director  WHERE name='{0}' AND nationality='{1}' AND birth_date='{2}'"
    query = query.format(name, nationality, birth_date)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_director(self, name, nationality, birth_date):
    director_id = self.get_director_id(name, nationality, birth_date)
    if director_id:
      print "Cannot add drector, {0}-{1}-{2} already exists".format(name, nationality, birth_date)
      return director_id
    query = "INSERT INTO director (id, name, nationality, birth_date) VALUES (DEFAULT, '{0}', '{1}', '{2}')"
    query = query.format(name, nationality, birth_date)
    self.insert(query)
    director_id = self.get_director_id(name, nationality, birth_date)
    return director_id

  def update_director(self, director_id, name, nationality, birth_date):
    query = "UPDATE director SET name='{0}', nationality='{1}', birth_date='{2}' WHERE id='{3}'"
    query = query.format(name, nationality, birth_date, director_id)
    return self.update(query)

  ##############################################################################
  #           GENRES
  ##############################################################################
  def get_genres(self):
    query = "SELECT * FROM genre"
    return self.select(query)

  def get_genre_by_id(self, genre_id):
    query = "SELECT * FROM genre WHERE id='{0}'".format(genre_id)
    results = self.select(query)
    return results

  def get_genre_id(self, genre, subgenre):
    query = "SELECT id FROM genre WHERE genre='{0}' AND sub_genre='{1}'"
    query = query.format(genre, subgenre)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_genre(self, genre, subgenre):
    genre_id = self.get_genre_id(genre, subgenre)
    if genre_id:
      print "Cannot add genre, {0}-{1} already exists".format(genre, subgenre)
      return genre_id
    query = "INSERT INTO genre (id, genre, sub_genre) VALUES (DEFAULT, '{0}', '{1}')"
    query = query.format(genre, subgenre)
    self.insert(query)
    genre_id = self.get_genre_id(genre, subgenre)
    return genre_id

  def update_genre(self, genre_id, genre, subgenre):
    query = "UPDATE genre SET genre='{0}', sub_genre='{1}' WHERE id='{2}'"
    query = query.format(genre, subgenre, genre_id)
    return self.update(query)

  ##############################################################################
  #           STUDIOS
  ##############################################################################
  def get_studios(self):
    query = "SELECT * FROM film_studio"
    return self.select(query)

  def get_studio_by_id(self, studio_id):
    query = "SELECT * FROM film_studio WHERE id='{0}'".format(studio_id)
    results = self.select(query)
    return results

  def get_studio_id(self, name, country):
    query = "SELECT id FROM film_studio WHERE name='{0}' AND country='{1}'"
    query = query.format(name, country)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_studio(self, name, country):
    studio_id = self.get_studio_id(name, country)
    if studio_id:
      print "Cannot add studio, {0}-{1} already exists".format(name, country)
      return studio_id
    query = "INSERT INTO film_studio (id, name, country) VALUES (DEFAULT, '{0}', '{1}')"
    query = query.format(name, country)
    self.insert(query)
    studio_id = self.get_studio_id(name, country)
    return studio_id

  def update_studio(self, studio_id, name, country):
    query = "UPDATE film_studio SET name='{0}', country='{1}' WHERE id='{2}'"
    query = query.format(name, country, studio_id)
    return self.update(query)

  ##############################################################################
  #             AWARDS SECTION                                                 #
  ##############################################################################
  def get_awards(self):
    query = "SELECT * FROM award"
    return self.select(query)

  def get_award_by_id(self, award_id):
    query = "SELECT * FROM award WHERE id='{0}'".format(award_id)
    results = self.select(query)
    return results

  def get_award_id(self, name, country):
    query = "SELECT id FROM award WHERE name='{0}' AND country='{1}'"
    query = query.format(name, country)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_award(self, name, country):
    award_id = self.get_award_id(name, country)
    if award_id:
      print "Cannot add award, {0}-{1} already exists".format(name, country)
      return studio_id
    query = "INSERT INTO award (id, name, country) VALUES (DEFAULT, '{0}', '{1}')"
    query = query.format(name, country)
    self.insert(query)
    award_id = self.get_award_id(name, country)
    return award_id

  def update_award(self, award_id, name, country):
    query = "UPDATE award SET name='{0}', country='{1}' WHERE id='{2}'"
    query = query.format(name, country, award_id)
    return self.update(query)

  def get_award_categories(self, award_id):
    query = "SELECT * FROM nomination_category WHERE award_id='{0}'"
    query = query.format(award_id)
    results = self.select(query)
    return results

  def get_award_category_by_id(self, award_id, category_id):
    query = "SELECT * FROM nomination_category WHERE id='{0}' AND award_id='{1}'".format(category_id, award_id)
    results = self.select(query)
    return results

  def get_award_category_id(self, award_id, name):
    query = "SELECT id FROM nomination_category WHERE award_id='{0}' AND name='{1}'"
    query = query.format(award_id, name)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_award_category(self, award_id, name):
    category_id = self.get_award_category_id(award_id, name)
    if category_id:
      print "Cannot add award category, {0}-{1} already exists".format(award_id, name)
      return category_id
    query = "INSERT INTO nomination_category (id, award_id, name) VALUES (DEFAULT, '{0}', '{1}')"
    query = query.format(award_id, name)
    self.insert(query)
    category_id = self.get_award_category_id(award_id, name)
    return category_id

  def update_award_category(self, category_id, award_id, name):
    query = "UPDATE nomination_category SET award_id='{0}', name='{1}' WHERE id='{2}'"
    query = query.format(award_id, name, category_id)
    return self.update(query)

  def get_award_nominations(self, award_id):
    query = "SELECT * FROM nomination_view WHERE award_id='{0}'"
    query = query.format(award_id)
    results = self.select(query)
    for result in results:
      result["actor_birth_date"] = result["actor_birth_date"].strftime("%Y-%m-%d")
      result["year"] = result["year"].strftime("%Y-%m-%d")
    return results

  def get_award_nominations_by_year(self, award_id, year):
    query = "SELECT * FROM nomination_view WHERE award_id='{0}' AND year='{1}'"
    query = query.format(award_id, year)
    results = self.select(query)
    for result in results:
      result["actor_birth_date"] = result["actor_birth_date"].strftime("%Y-%m-%d")
      result["year"] = result["year"].strftime("%Y-%m-%d")
    return results

  def get_award_nomination_by_id(self, nom_id):
    query = "SELECT * FROM nomination_view WHERE id='{0}'"
    query = query.format(nom_id)
    results = self.select(query)
    for result in results:
      result["actor_birth_date"] = result["actor_birth_date"].strftime("%Y-%m-%d")
      result["year"] = result["year"].strftime("%Y-%m-%d")
    return results

  def get_award_nominations_by_year_category(self, award_id, year, category_id):
    query = "SELECT * FROM nomination_view WHERE award_id='{0}' AND year='{1}' AND nc_id='{2}'"
    query = query.format(award_id, year, category_id)
    results = self.select(query)
    for result in results:
      result["actor_birth_date"] = result["actor_birth_date"].strftime("%Y-%m-%d")
      result["year"] = result["year"].strftime("%Y-%m-%d")
    return results

  def get_award_nomination_id(self, category_id, actor_id, year, won):
    query = "SELECT id FROM nomination WHERE nc_id='{0}' AND actor_id='{1}' AND year='{2}' AND won='{3}'"
    query = query.format(category_id, actor_id, year, won)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_award_nomination(self, category_id, actor_id, year, won):
    nom_id = self.get_award_nomination_id(category_id, actor_id, year, won)
    if nom_id:
      print "Cannot add nomination, {0}-{1}-{2}-{3} already exists".format(category_id, actor_id, year, won)
      return nom_id
    query = "INSERT INTO nomination (id, nc_id, actor_id, year, won) VALUES (DEFAULT, '{0}', '{1}', '{2}', '{3}')"
    query = query.format(category_id, actor_id, year, won)
    self.insert(query)
    nom_id = self.get_award_nomination_id(category_id, actor_id, year, won)
    return nom_id

  def update_award_nomination(self, nom_id, category_id, actor_id, year, won):
    query = "UPDATE nomination SET nc_id='{0}', actor_id='{1}', year='{2}', won='{3}' WHERE id='{4}'"
    query = query.format(category_id, actor_id, year, won, nom_id)
    return self.update(query)


  ##############################################################################
  #           STUDIOS
  ##############################################################################
  def get_movies(self):
    query = "SELECT * FROM movie"
    results = self.select(query)
    for result in results:
      result["year"] = '{0.day:02d}-{0.month:02d}-{0.year:4d}'.format(result["year"])
    return results

  def get_movie_by_id(self, movie_id):
    query = "SELECT * FROM movie WHERE id='{0}'".format(movie_id)
    movie = self.select(query)
    if not movie or len(movie) < 1:
      return None
    movie["year"] = '{0.day:02d}-{0.month:02d}-{0.year:4d}'.format(movie["year"])
    studio = self.get_movie_studio_info(movie_id)
    genre = self.get_movie_genre_info(movie_id)
    actor = self.get_movie_actor_info(movie_id)
    director = self.get_movie_director_info(movie_id)
    return {"movie": movie, "studio": studio, "genre": genre, "actor": actor, "director": director}

  def get_movies_by_genre(self, genre):
    query = "SELECT * FROM genre WHERE genre='{0}'"
    query = query.format(genre)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    genre_id = result[0]['id']

    query = "SELECT m.id, m.name, m.url FROM movie AS m LEFT OUTER JOIN(SELECT * FROM movie_genre WHERE genre_id='{0}') AS g ON m.id = g.movie_id"
    query = query.format(genre_id)
    results = self.select(query)
    return result

  def get_movie_genre_info(self, movie_id):
    query = "SELECT g.id, g.genre, g.subgenre FROM movie_genre AS mg LEFT OUTER JOIN (SELECT * movie WHERE id='{0}') AS m ON mg.movie_id = m.id LEFT OUTER JOIN genre AS g ON mv.genre_id = g.id"
    query = query.format(movie_id)
    results = self.select(query)
    return result

  def get_movie_studio_info(self, movie_id):
    query = "SELECT fs.id, fs.name, fs.country FROM filmed_by AS fb LEFT OUTER JOIN (SELECT * movie WHERE id='{0}') AS m ON fb.movie_id = m.id LEFT OUTER JOIN film_studio AS fs ON fb.studio_id = fs.id"
    query = query.format(movie_id)
    results = self.select(query)
    return result


  def get_movie_actor_info(self, movie_id):
    query = "SELECT a.id, a.name, a.nationality, a.birth_date FROM cast AS c LEFT OUTER JOIN (SELECT * movie WHERE id='{0}') AS m ON c.movie_id = m.id LEFT OUTER JOIN actor AS a ON c.actor_id = a.id"
    query = query.format(movie_id)
    results = self.select(query)
    for result in results:
      result["birth_date"] = '{0.day:02d}-{0.month:02d}-{0.year:4d}'.format(result["year"])
    return result

  def get_movie_director_info(self, movie_id):
    query = "SELECT d.id, d.name, d.nationality, d.birth_date FROM directed AS dir LEFT OUTER JOIN (SELECT * movie WHERE id='{0}') AS m ON dir.movie_id = m.id LEFT OUTER JOIN director AS d ON dd.director_id = d.id"
    query = query.format(movie_id)
    results = self.select(query)
    for result in results:
      result["birth_date"] = '{0.day:02d}-{0.month:02d}-{0.year:4d}'.format(result["year"])
    return result

  def get_movie_id(self, name, year, country):
    query = "SELECT id FROM movie WHERE name='{0}' AND country='{1}' AND year='{2}'"
    query = query.format(name, country, year)
    result = self.select(query)
    if not result or len(result) < 1:
      return None
    else:
      return result[0]['id']

  def add_movie(self, info):
    movie = info["movie"]
    studio = info["studio"]
    genre = info["genre"]
    actor = info["actor"]
    director = info["director"]

    # Add movie logic
    movie_id = self.get_movie_id(movie["name"], movie["year"], movie["country"])
    if movie_id:
      print "Cannot movie, {0}-{1}-{2} already exists".format(movie["name"], movie["year"], movie["country"])
      return movie_id

    query = "INSERT INTO movie (id, name, year, synopsis, country, url) VALUES (DEFAULT, '{0}', '{1}', '{2}', '{3}', '{4}')"
    query = query.format(movie["name"], movie["year"], movie["synopsis"], movie["country"], movie["url"])
    self.insert(query)
    movie_id = self.get_movie_id(movie["name"], movie["year"], movie["country"])

    # Add extra fields logic
    for item in studio:
      studio_id = self.add_studio(item["name"], item["country"])
      self.insert("INSERT INTO filmed_by (movie_id, studio_id) VALUES ('{0}', '{1}')".format(movie_id, studio_id))

    for item in genre:
      genre_id = self.add_genre(item["genre"], item["subgenre"])
      self.insert("INSERT INTO movie_genre (movie_id, genre_id) VALUES ('{0}', '{1}')".format(movie_id, genre_id))

    for item in actor:
      actor_id = self.add_actor(item["name"], item["nationality"], item["birth_date"])
      self.insert("INSERT INTO cast (movie_id, actor_id) VALUES ('{0}', '{1}')".format(movie_id, actor_id))

    for item in director:
      director_id = self.add_director(item["name"], item["nationality"], item["birth_date"])
      self.insert("INSERT INTO directed (movie_id, director_id) VALUES ('{0}', '{1}')".format(movie_id, director_id))
    return movie_id

  def update_movie(self, info):
    movie = info["movie"]
    query = "UPDATE  movie SET name='{0}', year='{1}', synopsis='{2}', country='{3}', url='{4}' WHERE id='{5}'"
    query = query.format(movie["name"], movie["year"], movie["synopsis"], movie["country"], movie["url"], movie["id"])
    self.update(query)
    return self.get_movie_by_id(movie["id"])

  def delete_movie_trans(self, table, other_attr,  movie_id, other_id):
    query = "DELETE FROM '{0}' WHERE movie_id='{1}' AND '{2}'='{3}'"
    query = query.format(table, other_attr, movie_id, other_id)
    return self.delete(query)

  def add_movie_trans(self, table, other_attr,  movie_id, other_id):
    query = "INSERT INTO '{0}' VALUES(movie_id, '{1}') VALUES ('{2}','{3}')"
    query = query.format(table, other_attr, movie_id, other_id)
    return self.insert(query)

