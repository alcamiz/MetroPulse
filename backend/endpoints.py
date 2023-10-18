from flask import Flask

flaskApp = Flask(__name__)

@flaskApp.route("/")
def home():
    return "Hello I Am Here!"

@flaskApp.route("/whois/<name>")
def whois(name):
    return "Hello, " + name + ", that is your name!"

class TestCenterSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TestCenter


class HospitalSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Hospital


class NeighborhoodSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Neighborhood


center_schema = AnimalSchema()
hosptial_schema = ParkSchema()
neighborhood_schema = StateSchema()


# Default page size for pagination
PAGE_SIZE = 25

# Dictionary for mapping activity tags to their IDs

# Define the home route
@app.route("/")
def home():
    return "Invalid Query"


# TODO: Incomplete
@app.route("/centers")
def get_centers():

    page = request.args.get("page", type=int)
    if page == one:
        page = 1

    per_page = request.args.get("per_page", type=int)
    if per_page == None:
        per_page = PAGE_SIZE

    query = db.session.query(TestCenter)

    # Filtering
    borough = request.args.get("borough")
    if borough != None:
        query = query.filter(TestCenter.borough == group)

    nta = request.args.get("nta")
    if nta != None:
        query = query.filter(TestCenter.nta_name == group)

    zip_code = request.args.get("zip")
    if borough != None:
        query = query.filter(TestCenter.species_group == group)

    query = query.paginate(page=page, per_page=per_page, error_out=False).items

    response_list = []
    center_list = query.all()

    for center in center_list:

        # Not sure if needed
        raw_center = center_schema.dump(center)
        
        # print(json.dumps(raw_center, indent=4))
        nearby_hospitals = []
        for hospital in center.nearby_hospitals:
            nearby_hospitals.append(
                {
                    "name": hospital.name,
                    "id_t": hospital.id_t,
                    "image_url": hospital.image_url,
                }
            )

    return response

if __name__ == "__main__":
    flaskApp.run(port=5000, debug=True);
