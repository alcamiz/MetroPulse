from flask import Flask, jsonify, request, Response
from database import app, db, Neighborhood, TestCenter, Hospital, populate_database
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

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

center_count = TestCenter.query.count()
hospital_count = Hospital.query.count()
n_count = Neighborhood.query.count()

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
                    "name": hospital.name,
                    "id_t": hospital.id_t,
                    "image_url": hospital.image_url,
                }
            )
        
        dict_center["nearby_hospitals"] = nearby_hospitals
        if len(center.parent_neighborhood) > 0:
            dict_center["parent_neighborhood"] = center.parent_neighborhood[0].id_t
        result_list.append(dict_center)

    response = jsonify({"total_size": center_count, "size": len(result_list), "data": result_list})
    response.headers.add("Access-Control-Allow-Origin", "*")
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

    response = jsonify({"total_size": hospital_count, "size": len(result_list), "data": result_list})
    response.headers.add("Access-Control-Allow-Origin", "*")
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
                    "name": hospital.name,
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

    response = jsonify({"total_size": n_count, "size": len(result_list), "data": result_list})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Get a specific park
@app.route("/centers/<center_id>")
def get_center_id(center_id):
    center = db.session.query(TestCenter).filter_by(id_t=center_id).first()
    if center == None:
        return jsonify({"data": None, "state": "Error"})

    dict_center = center_schema.dump(center)
    nearby_hospitals = []

    for idx, hospital in enumerate(center.nearby_hospitals):
        if idx > 10:
            break
        nearby_hospitals.append(
            {
                "name": hospital.name,
                "id_t": hospital.id_t,
                "image_url": hospital.image_url,
            }
        )
    
    dict_center["nearby_hospitals"] = nearby_hospitals
    if len(center.parent_neighborhood) > 0:
        dict_center["parent_neighborhood"] = center.parent_neighborhood[0].id_t

    response = jsonify({"data": dict_center, "state": "Ok"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Get a specific park
@app.route("/hospitals/<hospital_id>")
def get_hospital_id(hospital_id):
    hospital = db.session.query(Hospital).filter_by(id_t=hospital_id).first()
    if hospital == None:
        return jsonify({"data": None, "state": "Error"})

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

    response = jsonify({"data": dict_hospital, "state": "Ok"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Get a specific park
@app.route("/neighborhoods/<neighborhood_id>")
def get_neighborhood_id(neighborhood_id):
    neighborhood = db.session.query(Neighborhood).filter_by(id_t=neighborhood_id).first()
    if neighborhood == None:
        return jsonify({"data": None, "state": "Error"})

    dict_neighborhood = neighborhood_schema.dump(neighborhood)
    nearby_hospitals = []
    nearby_centers = []

    for idx, hospital in enumerate(neighborhood.hospitals_in_neighborhood):
        if idx > 10:
            break
        nearby_hospitals.append(
            {
                "name": hospital.name,
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

    response = jsonify({"data": dict_neighborhood, "state": "Ok"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
