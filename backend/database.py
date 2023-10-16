from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import mapped_column, DeclarativeBase

from scrapers.center import center_scraper

app = Flask(__name__)
CORS(app)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://example.com"
db = SQLAlchemy(app)

class TestCenter(Base):
    __tablename__ = 'users'
    name = mapped_column(String(100))
    address = mapped_column(String(100))
    borough = mapped_column(String(100))
    nta_name = mapped_column(String(100))
    zip_code = mapped_column(String(100))
    phone = mapped_column(String(100))
    council = mapped_column(String(100))
    community = mapped_column(String(100))
    howto = mapped_column(String(100))
    longitude = mapped_column(String(100))
    latitude = mapped_column(String(100))

    map_url = mapped_column(String(100))
    image_url = mapped_column(String(100))
    rating = mapped_column(String(100))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    nearby_hospitals = db.relationship("Hospital", back_populates="nearby_centers")
    parent_neighborhood = db.relationship("Neighborhood", back_populates="test_centers_in_neighborhood")

class Neighborhood(Base):
    __tablename__ = "Neighborhoods"
    borough = mapped_column(String(100))
    year = mapped_column(String(100))
    flips_county_code = mapped_column(String(100))
    nta_code = mapped_column(String(100))
    nta_name = mapped_column(String(100))
    population = mapped_column(String(100))

    map_url = mapped_column(String(100))
    image_url = mapped_column(String(100))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    hospitals_in_neighborhood = db.relationship("Hospital", back_populates="parent_neighborhood")
    test_centers_in_neighborhood = db.relationship("TestCenter", back_populates="parent_neighborhood")

class Hospital(Base):
    __tablename__ = 'Hospitals'
    facility_type = Column(String(100))
    facility_name = Column(String(100))
    address = Column(String(100))
    borough = Column(String(100))
    nta = Column(String(100))
    zip_code = Column(String(100))
    phone = Column(String(100), unique=True)
    council = Column(String(100), unique=True)
    longitude = Column(String(100))
    latitude = Column(String(100))

    id_t = Column(Integer, unique=True, primary_key=True)
    nearby_centers = db.relationship("TestCenter", back_populates="nearby_hospitals")
    at_neighborhood = db.relationship("Neighborhood", back_populates="hospitals_in_neighborhood")

    def __repr__(self):
        return "Hosptial name:" + self.facility_name
    
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
    for center in center_list:

        if center["nta"] != None:
            nearby_hospitals = Hospital.query.filter_by(nta=center["nta"]).all()
            center["nearby_hospitals"].append(nearby_hospitals)

            neighborhood = Neighborhood.query.filter_by(name=center["nta"]).first()
            center["at_neighborhood"] = neighborhood

        park_data = Park(**db_row)
        db.session.add(park_data)

    db.session.commit()
