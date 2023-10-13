from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.types import JSON
from scrapers.center import center_scraper

app = Flask(__name__)
CORS(app)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://example.com"
db = SQLAlchemy(app)

class TestCenter(Base):
    __tablename__ = 'users'
    name = Column(String(100))
    address = Column(String(100))
    borough = Column(String(100))
    nta = Column(String(100))
    zip_code = Column(String(100))
    phone = Column(String(100), unique=True)
    council = Column(String(100), unique=True)
    community = Column(String(100))
    howto = Column(String(100))
    longitude = Column(String(100))
    latitude = Column(String(100))
    id_t = Column(Integer, unique=True, primary_key=True)
    nearby_hospitals = db.relationship("Hospital", secondary=hospital_centers, back_populates="nearby_centers")
    at_neighborhood = db.relationship("Neighborhood", secondary=neighborhoods, back_populates="at_centers")

    def __repr__(self):
        return "Center Name:" + self.name

class Neighborhoods(Base):
    __tablename__ = "Neighborhoods"
    borough = Column(String(100))
    year = Column(String(100))
    flips_county_code = Column(String(100))
    nta_code = Column(String(100))
    nta_name = Column(String(100))
    population = Column(String(100))
    
def db_neighborhood_population():
    neighborhood_list = neighborhood_scraper()
    for neighborhood in neighborhood_list:
        if neighborhood["nta_code"] is not None:
            hospitals_in_neighborhood = Hospital.query.filter_by(nta=neighborhood["nta_name"]).all()
            neighborhood["hospitals_in_neighborhood"].append(hospitals_in_neighborhood)
            test_centers_in_neighborhood = TestCenter.query.filter_by(nta=neighborhood["nta_name"]).all()
            neighborhood["test_centers_in_neighborhood"].append(test_centers_in_neighborhood)
        neighborhood_data = Neighborhoods(**neighborhood)
        db.session.add(neighborhood_data)
    db.session.commit()

def db_centers_population(center_list):
    center_list = center_scraper()
    for t_row in center_list:

        if t_row["nta"] != None:
            near_hospitals = Hospital.query.filter_by(nta=t_row["nta"]).all()
            t_row["nearby_hospitals"].append(near_hospitals)

            neighborhood = Neighborhood.query.filter_by(name=t_row["nta"]).first()
            t_row["at_neighborhood"] = neighborhood
        park_data = Park(**db_row)
        db.session.add(park_data)

    db.session.commit()

# TODO: Hospitals/Neighborhoods
