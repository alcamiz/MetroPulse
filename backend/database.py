from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

from sqlalchemy import Integer, String, ForeignKey, Table, Column, func
from sqlalchemy.orm import mapped_column, DeclarativeBase, relationship

from scrapers.centers import center_scraper
from scrapers.medical import med_scraper
from scrapers.neighborhoods import neighborhood_scraper

from requests import Request
from urllib.parse import urlparse, parse_qs

class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://master:IsMhBiSlQCpC1AlD5Plw@metropulse.ccwakrptuj51.us-east-2.rds.amazonaws.com:5432/postgres"
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}
db.init_app(app)

center_association = db.Table(
    "center_association",
    Base.metadata,
    Column("parent_id", ForeignKey("neighborhood_table.id_t")),
    Column("child_id", ForeignKey("center_table.id_t")),
)

hospital_association = db.Table(
    "hospital_association",
    Base.metadata,
    Column("parent_id", ForeignKey("neighborhood_table.id_t")),
    Column("child_id", ForeignKey("hospital_table.id_t")),
)

ch_association = db.Table(
    "ch_association",
    Base.metadata,
    Column("parent_id", ForeignKey("center_table.id_t")),
    Column("child_id", ForeignKey("hospital_table.id_t")),
)

hc_association = db.Table(
    "hc_association",
    Base.metadata,
    Column("parent_id", ForeignKey("hospital_table.id_t")),
    Column("child_id", ForeignKey("center_table.id_t")),
)

class Neighborhood(db.Model):
    __tablename__ = "neighborhood_table"
    borough = mapped_column(String(100))
    fips_county_code = mapped_column(String(100))
    nta_code = mapped_column(String(100))
    nta_name = mapped_column(String(100))
    population = mapped_column(String(100))

    desc = mapped_column(String(2000))
    static_map_url = mapped_column(String(500))
    image_url = mapped_column(String(500))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    hospitals_in_neighborhood = relationship("Hospital", secondary=hospital_association, back_populates="parent_neighborhood")
    test_centers_in_neighborhood = relationship("TestCenter", secondary=center_association, back_populates="parent_neighborhood")

class TestCenter(db.Model):
    __tablename__ = 'center_table'
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

    static_map_url = mapped_column(String(500))
    image_url = mapped_column(String(500))
    rating = mapped_column(String(100))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    nearby_hospitals = relationship("Hospital", secondary=ch_association)
    parent_neighborhood = relationship("Neighborhood", secondary=center_association, back_populates="test_centers_in_neighborhood")

class Hospital(db.Model):
    __tablename__ = 'hospital_table'
    facility_type = mapped_column(String(100))
    name = mapped_column(String(100))
    address = mapped_column(String(100))
    zip_code = mapped_column(String(100))
    borough = mapped_column(String(100))
    nta_name = mapped_column(String(100))
    zip_code = mapped_column(String(100))
    phone = mapped_column(String(100))
    council_district = mapped_column(String(100))
    longitude = mapped_column(String(100))
    latitude = mapped_column(String(100))
    
    static_map_url = mapped_column(String(500))
    image_url = mapped_column(String(500))
    rating = mapped_column(String(100))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    nearby_centers = relationship("TestCenter", secondary=hc_association)
    parent_neighborhood = relationship("Neighborhood", secondary=hospital_association, back_populates="hospitals_in_neighborhood")
    
def db_populate_neighborhoods():
    neighborhood_list = neighborhood_scraper()
    for neighborhood in neighborhood_list:
        if neighborhood["nta_code"] is not None:
            hospitals_in_neighborhood = Hospital.query.filter_by(nta_name=neighborhood["nta_name"]).all()
            neighborhood["hospitals_in_neighborhood"].extend(hospitals_in_neighborhood)
            test_centers_in_neighborhood = TestCenter.query.filter_by(nta_name=neighborhood["nta_name"]).all()
            neighborhood["test_centers_in_neighborhood"].extend(test_centers_in_neighborhood)
        neighborhood_data = Neighborhood(**neighborhood)
        db.session.add(neighborhood_data)
    db.session.commit()

def db_populate_centers():
    center_list = center_scraper()
    for center in center_list:
        center_data = TestCenter(**center)
        db.session.add(center_data)

    db.session.commit()

def db_populate_hospitals():
    hospital_list = med_scraper()
    for hospital in hospital_list:
        hospital_data = Hospital(**hospital)
        db.session.add(hospital_data)

    db.session.commit()

def db_final_relations():
    center_list = TestCenter.query.all()
    hospital_list = Hospital.query.all()

    for hospital in hospital_list:
        if hospital.borough != None:
            nearby_centers = TestCenter.query.filter(func.lower(TestCenter.borough) == func.lower(hospital.borough)).all()
            hospital.nearby_centers.extend(nearby_centers)

    for center in center_list:
        if center.borough != None:
            nearby_hospitals = Hospital.query.filter(func.lower(Hospital.borough) == func.lower(center.borough)).all()
            center.nearby_hospitals.extend(nearby_hospitals)
    
    db.session.commit()

def reset_database():
    db.session.remove()
    db.drop_all()
    db.create_all()

def populate_database():
    reset_database()
    db_populate_hospitals()
    db_populate_centers()
    db_populate_neighborhoods()
    db_final_relations()

def fix_key(url, new_key):
    runner = urlparse(url)
    params = parse_qs(runner.query)
    base_url = runner._replace(query=None).geturl()

    if 'key' in params:
        params['key'] = new_key

    new_url = Request('GET', base_url, params=params).prepare().url
    return new_url

def update_key(new_key):
    center_list = TestCenter.query.all()
    hospital_list = Hospital.query.all()
    n_list = Neighborhood.query.all()

    for hospital in hospital_list:
        if hospital.static_map_url != None:
            hospital.static_map_url = fix_key(hospital.static_map_url, new_key)
        if hospital.image_url != None:
            hospital.image_url = fix_key(hospital.image_url, new_key)

    for center in center_list:
        if center.static_map_url != None:
            center.static_map_url = fix_key(center.static_map_url, new_key)
        if center.image_url != None:
            center.image_url = fix_key(center.image_url, new_key)

    for hood in n_list:
        if hood.static_map_url != None:
            hood.static_map_url = fix_key(hood.static_map_url, new_key)
        if hood.image_url != None:
            hood.image_url = fix_key(hood.image_url, new_key)

    db.session.commit()

def main():
    with app.app_context():
        populate_database()

if __name__ == "__main__":
    main()
