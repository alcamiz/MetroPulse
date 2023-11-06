from flask import Flask, jsonify, request, Response
from database import app, db, Neighborhood, TestCenter, Hospital, populate_database
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.sql.expression import asc, desc
from sqlalchemy import or_, func, and_, Integer
from sqlalchemy.sql.operators import ilike_op

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

center_count = None
hospital_count = None
n_count = None

with app.app_context():
    center_count = TestCenter.query.count()
    hospital_count = Hospital.query.count()
    n_count = Neighborhood.query.count()

# Default page size for pagination
PAGE_SIZE = 25

def center_build(query):
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
    return result_list

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

    # Sorting
    sort_order = request.args.get("sort_order", type=str, default="asc")
    if sort_order == None:
        sort_order = "asc"
    
    sort_by = request.args.get("sort_by", type=str, default=None)
    if sort_by == None:
        sort_by = "id"

    if sort_by == "id":
        if sort_order == "asc":
            query = query.order_by(asc(TestCenter.id_t))
        elif sort_order == "desc":
            query = query.order_by(desc(TestCenter.id_t))

    elif sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(TestCenter.name))
        elif sort_order == "desc":
            query = query.order_by(desc(TestCenter.name))

    elif sort_by == "zip":
        if sort_order == "asc":
            query = query.order_by(asc(TestCenter.zip_code))
        elif sort_order == "desc":
            query = query.order_by(desc(TestCenter.zip_code))

    center_count = query.count()
    query = query.paginate(page=page, per_page=per_page, error_out=False)

    result_list = center_build(query)
    response = jsonify({"total_size": center_count, "size": len(result_list), "data": result_list})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def hospital_build(query):
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
    return result_list
    
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

    # Sorting
    sort_order = request.args.get("sort_order", type=str, default="asc")
    if sort_order == None:
        sort_order = "asc"
    
    sort_by = request.args.get("sort_by", type=str, default=None)
    if sort_by == None:
        sort_by = "id"

    if sort_by == "id":
        if sort_order == "asc":
            query = query.order_by(asc(Hospital.id_t))
        elif sort_order == "desc":
            query = query.order_by(desc(Hospital.id_t))

    elif sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(Hospital.nta_name))
        elif sort_order == "desc":
            query = query.order_by(desc(Hospital.nta_name))

    elif sort_by == "zip":
        if sort_order == "asc":
            query = query.order_by(asc(Hospital.zip_code))
        elif sort_order == "desc":
            query = query.order_by(desc(Hospital.zip_code))

    hospital_count = query.count()
    query = query.paginate(page=page, per_page=per_page, error_out=False)

    result_list = hospital_build(query)
    response = jsonify({"total_size": hospital_count, "size": len(result_list), "data": result_list})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def hood_build(query):
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
    return result_list

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

     # Sorting
    sort_order = request.args.get("sort_order", type=str, default="asc")
    if sort_order == None:
        sort_order = "asc"
    
    sort_by = request.args.get("sort_by", type=str, default=None)
    if sort_by == None:
        sort_by = "id"

    if sort_by == "id":
        if sort_order == "asc":
            query = query.order_by(asc(Neighborhood.id_t))
        elif sort_order == "desc":
            query = query.order_by(desc(Neighborhood.id_t))

    elif sort_by == "name":
        if sort_order == "asc":
            query = query.order_by(asc(Neighborhood.nta_name))
        elif sort_order == "desc":
            query = query.order_by(desc(Neighborhood.nta_name))

    n_count = query.count()
    query = query.paginate(page=page, per_page=per_page, error_out=False)

    result_list = hood_build(query)
    response = jsonify({"total_size": n_count, "size": len(result_list), "data": result_list})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Get a specific park
@app.route("/centers/<center_id>")
def get_center_id(center_id):
    center = TestCenter.query.filter_by(id_t=center_id).first()
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
    hospital = Hospital.query.filter_by(id_t=hospital_id).first()
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
    neighborhood = Neighborhood.query.filter_by(id_t=neighborhood_id).first()
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

def search_centers(search_terms, page, per_page):
    if len(search_terms) < 1:
        pass

    # PostgreSQL specific features; do not switch to MySQL
    post_vector = func.to_tsvector(TestCenter.name + TestCenter.address + TestCenter.borough + TestCenter.nta_name)
    post_query = func.to_tsquery((''.join([f'{term} | ' for term in search_terms]))[:-2])
    query = TestCenter.query.filter(post_vector.bool_op("@@")(post_query))
    query = query.order_by(func.ts_rank(post_vector, post_query).desc())

    # for term in search_terms:
    #     query = query.filter(ilike_op(TestCenter.name, f'%{term}%'))
    count = query.count()
    query = query.paginate(page=page, per_page=per_page, error_out=False)
    return center_build(query), count

def search_hospitals(search_terms, page, per_page):
    if len(search_terms) < 1:
        pass

    # PostgreSQL specific features; do not switch to MySQL
    post_vector = func.to_tsvector(Hospital.name + Hospital.address + Hospital.borough + Hospital.nta_name)
    post_query = func.to_tsquery((''.join([f'{term} | ' for term in search_terms]))[:-2])
    query = TestCenter.query.filter(post_vector.bool_op("@@")(post_query))
    query = query.order_by(func.ts_rank(post_vector, post_query).desc())

    # for term in search_terms:
    #     query = query.filter(ilike_op(Hospital.name, f'%{term}%'))
    count = query.count()
    query = query.paginate(page=page, per_page=per_page, error_out=False)
    return center_build(query), count

def search_hoods(search_terms, page, per_page):
    if len(search_terms) < 1:
        pass

    # PostgreSQL specific features; do not switch to MySQL
    post_vector = func.to_tsvector(Neighborhood.nta_name + Neighborhood.borough)
    post_query = func.to_tsquery((''.join([f'{term} | ' for term in search_terms]))[:-2])
    query = TestCenter.query.filter(post_vector.bool_op("@@")(post_query))
    query = query.order_by(func.ts_rank(post_vector, post_query).desc())

    # for term in search_terms:
    #     query = query.filter(ilike_op(Neighborhood.nta_name, f'%{term}%'))
    count = query.count()
    query = query.paginate(page=page, per_page=per_page, error_out=False)
    return center_build(query), count

@app.route("/search")
def search():

    page = request.args.get("page", type=int)
    if page == None:
        page = 1

    per_page = request.args.get("per_page", type=int)
    if per_page == None:
        per_page = PAGE_SIZE

    search_string = request.args.get("string", type=str, default=None)
    if search_string == None:
        search_string = ""
    search_terms = search_string.split()

    model = request.args.get("model", type=str, default=None)
    if model == None:
        model = "all"

    if model == "all" or model == "center":
        result_centers, center_count = search_centers(search_terms, page, per_page)
    else:
        result_centers = []
        center_count = 0

    if model == "all" or model == "hospital":
        result_hospitals, hospital_count = search_hospitals(search_terms, page, per_page)
    else:
        result_hospitals = []
        hospital_count = 0

    if model == "all" or model == "neighborhood":
        result_hoods, n_count = search_hoods(search_terms, page, per_page)
    else:
        result_hoods = []
        n_count = 0

    response = jsonify({"centers": {"data": result_centers, "size": len(result_centers), "total_size": center_count},
                        "hospitals": {"data": result_hospitals, "size": len(result_hospitals), "total_size": hospital_count},
                        "neighborhoods": {"data": result_hoods, "size": len(result_hoods), "total_size": n_count}})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    app.run(port=5000, debug=True)
