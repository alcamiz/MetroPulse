from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

from sqlalchemy import Integer, String, ForeignKey, Table, Column
from sqlalchemy.orm import mapped_column, DeclarativeBase, relationship

from scrapers.centers import center_scraper
from scrapers.medical import med_scraper
from scrapers.neighborhoods import neighborhood_scraper

class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite+pysqlite:///:memory:"
db.init_app(app)

# CORS(app)

# engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)

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
    year = mapped_column(String(100))
    fips_county_code = mapped_column(String(100))
    nta_code = mapped_column(String(100))
    nta_name = mapped_column(String(100))
    population = mapped_column(String(100))

    map_url = mapped_column(String(100))
    image_url = mapped_column(String(100))

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

    map_url = mapped_column(String(100))
    image_url = mapped_column(String(100))
    rating = mapped_column(String(100))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    nearby_hospitals = relationship("Hospital", secondary=ch_association)

    parent_id = mapped_column(Integer, ForeignKey("neighborhood_table.id_t"))
    parent_neighborhood = relationship("Neighborhood", back_populates="test_centers_in_neighborhood")

class Hospital(db.Model):
    __tablename__ = 'hospital_table'
    facility_type = mapped_column(String(100))
    facility_name = mapped_column(String(100))
    address = mapped_column(String(100))
    borough = mapped_column(String(100))
    nta_name = mapped_column(String(100))
    zip_code = mapped_column(String(100))
    phone = mapped_column(String(100))
    council_district = mapped_column(String(100))
    longitude = mapped_column(String(100))
    latitude = mapped_column(String(100))
    
    map_url = mapped_column(String(100))
    image_url = mapped_column(String(100))

    id_t = mapped_column(Integer, unique=True, primary_key=True)
    nearby_centers = relationship("TestCenter", secondary=hc_association)

    parent_id = mapped_column(Integer, ForeignKey("neighborhood_table.id_t")) 
    parent_neighborhood = relationship("Neighborhood", back_populates="hospitals_in_neighborhood")
    
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

        if center["nta_name"] != None:
            nearby_hospitals = Hospital.query.filter_by(nta_name=center["nta_name"]).all()
            center["nearby_hospitals"].extend(nearby_hospitals)

            # neighborhood = Neighborhood.query.filter_by(name=center["nta"]).first()
            # center["parent_neighborhood"] = neighborhood

        center_data = TestCenter(**center)
        db.session.add(center_data)

    db.session.commit()

def db_populate_hospitals():
    hospital_list = med_scraper()
    for hospital in hospital_list:

        if hospital["nta_name"] != None:
            nearby_centers = TestCenter.query.filter_by(nta_name=hospital["nta_name"]).all()
            hospital["nearby_centers"].extend(nearby_centers)

            # neighborhood = Neighborhood.query.filter_by(name=center["nta"]).first()
            # center["parent_neighborhood"] = neighborhood

        hospital_data = Hospital(**hospital)
        db.session.add(hospital_data)

    db.session.commit()

def populate_database():
    db_populate_centers()
    db_populate_hospitals()
    db_populate_neighborhoods()

def main():
    with app.app_context():
        db.create_all()
        populate_database()
        # print(Neighborhood.query.filter_by(nta_name="Astoria").first().test_centers_in_neighborhood)

if __name__ == "__main__":
    main()
