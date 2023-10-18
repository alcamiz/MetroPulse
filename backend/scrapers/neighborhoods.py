import requests
import json

def get_neighborhoods():
    response = requests.get(
        "https://data.cityofnewyork.us/resource/swpk-hqdp.json"
    )
    data = response.json()
    neighborhood_list = []
    for idx, neighborhood in enumerate(data):

        # Avoid duplicated years
        if neighborhood.get("year") != "2010":
            continue

        new_neighborhood = {}
        new_neighborhood["borough"] = neighborhood.get("borough")
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

def main():
    n_list = neighborhood_scraper()
    print(json.dumps(n_list, indent=4))

if __name__ == "__main__":
    main()

