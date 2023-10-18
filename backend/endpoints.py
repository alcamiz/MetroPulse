from flask import Flask, jsonify, request, Response
from database import app, db, Neighborhood, TestCenter, Hospital, populate_database
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

with app.app_context():
    db.create_all()
    populate_database()

@app.route("/")
def home():
    return "Invalid Query"

class TestCenterSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TestCenter

class HospitalSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Hospital

class NeighborhoodSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Neighborhood


center_schema = TestCenterSchema()
hosptial_schema = HospitalSchema()
neighborhood_schema = NeighborhoodSchema()

# Default page size for pagination
PAGE_SIZE = 25

@app.route("/centers")
def get_centers():

    page = request.args.get("page", type=int)
    if page == None:
        page = 1

    per_page = request.args.get("per_page", type=int)
    if per_page == None:
        per_page = PAGE_SIZE

    query = TestCenter.query

    # Filtering
    borough = request.args.get("borough")
    if borough != None:
        query = query.filter(TestCenter.borough == borough)

    nta = request.args.get("nta")
    if nta != None:
        query = query.filter(TestCenter.nta_name == nta)

    zip_code = request.args.get("zip")
    if zip_code != None:
        query = query.filter(TestCenter.zip_code == zip_code)

    query = query.paginate(page=page, per_page=per_page, error_out=False)

    result_list = []
    center_list = query.items

    for center in center_list:

        dict_center = center_schema.dump(center)
        nearby_hospitals = []

        for idx, hospital in enumerate(center.nearby_hospitals):
            if idx > 10:
                break
            nearby_hospitals.append(
                {
                    "name": hospital.facility_name,
                    "id_t": hospital.id_t,
                    "image_url": hospital.image_url,
                }
            )
        
        dict_center["nearby_hospitals"] = nearby_hospitals
        if len(center.parent_neighborhood) > 0:
            dict_center["parent_neighborhood"] = center.parent_neighborhood[0].id_t
        result_list.append(dict_center)

    response = jsonify({"size": len(result_list), "data": result_list})
    return response
    
@app.route("/hospitals")
def get_hospitals():

    page = request.args.get("page", type=int)
    if page == None:
        page = 1

    per_page = request.args.get("per_page", type=int)
    if per_page == None:
        per_page = PAGE_SIZE

    query = Hospital.query

    # Filtering
    borough = request.args.get("borough")
    if borough != None:
        query = query.filter(Hospital.borough == borough)

    nta = request.args.get("nta")
    if nta != None:
        query = query.filter(Hospital.nta_name == nta)

    zip_code = request.args.get("zip")
    if zip_code != None:
        query = query.filter(Hospital.zip_code == zip_code)

    query = query.paginate(page=page, per_page=per_page, error_out=False)

    result_list = []
    hospital_list = query.items

    for hospital in hospital_list:

        dict_hospital = hosptial_schema.dump(hospital)
        nearby_centers = []

        for idx, center in enumerate(hospital.nearby_centers):
            if idx > 10:
                break
            nearby_centers.append(
                {
                    "name": center.name,
                    "id_t": center.id_t,
                    "image_url": center.image_url,
                }
            )
        
        dict_hospital["nearby_centers"] = nearby_centers
        if len(hospital.parent_neighborhood) > 0:
            dict_hospital["parent_neighborhood"] = hospital.parent_neighborhood[0].id_t
        result_list.append(dict_hospital)

    response = jsonify({"size": len(result_list), "data": result_list})
    return response

@app.route("/neighborhoods")
def get_neighborhoods():

    page = request.args.get("page", type=int)
    if page == None:
        page = 1

    per_page = request.args.get("per_page", type=int)
    if per_page == None:
        per_page = PAGE_SIZE

    query = Neighborhood.query

    # Filtering
    nta = request.args.get("fips")
    if nta != None:
        query = query.filter(Neighborhood.nta_name == nta)

    borough = request.args.get("borough")
    if borough != None:
        query = query.filter(Neighborhood.borough == borough)

    query = query.paginate(page=page, per_page=per_page, error_out=False)

    result_list = []
    neighborhood_list = query.items

    for neighborhood in neighborhood_list:

        dict_neighborhood = neighborhood_schema.dump(neighborhood)
        nearby_hospitals = []
        nearby_centers = []

        for idx, hospital in enumerate(neighborhood.hospitals_in_neighborhood):
            if idx > 10:
                break
            nearby_hospitals.append(
                {
                    "name": hospital.facility_name,
                    "id_t": hospital.id_t,
                    "image_url": hospital.image_url,
                }
            )

        for idx, center in enumerate(neighborhood.test_centers_in_neighborhood):
            if idx > 10:
                break
            nearby_centers.append(
                {
                    "name": center.name,
                    "id_t": center.id_t,
                    "image_url": center.image_url,
                }
            )

        dict_neighborhood["nearby_hospitals"] = nearby_hospitals
        dict_neighborhood["nearby_centers"] = nearby_centers
        result_list.append(dict_neighborhood)

    response = jsonify({"size": len(result_list), "data": result_list})
    return response
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
