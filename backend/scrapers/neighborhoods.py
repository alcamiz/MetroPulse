import requests

def get_neighborhoods():
    response = requests.get(
        "https://data.cityofnewyork.us/resource/swpk-hqdp.json"
    )
    data = response.json()
    neighborhood_list = []
    for idx, neighborhood in enumerate(data):
        new_neighborhood = {}
        new_neighborhood["borough"] = neighborhood.get("borough")
        new_neighborhood["year"] = neighborhood.get("year")
        new_neighborhood["fips_county_code"] = neighborhood.get("fips_county_code")
        new_neighborhood["nta_code"] = neighborhood.get("nta_code")
        new_neighborhood["nta_name"] = neighborhood.get("nta_name")
        new_neighborhood["population"] = neighborhood.get("population")
        new_neighborhood["id_t"] = idx

        new_neighborhood["hospitals_in_neighborhood"] = []
        new_neighborhood["test_centers_in_neighborhood"] = []

        neighborhood_list.append(new_neighborhood)
    return neighborhood_list

def neighborhood_scraper():
    neighborhood_list = get_neighborhoods()
    return neighborhood_list
