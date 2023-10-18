import requests
import json
try:
    from google_static_maps import static_google_maps_scraper
except:
    from scrapers.google_static_maps import static_google_maps_scraper
try:
    from wiki import wiki_scraper
except:
    from scrapers.wiki import wiki_scraper

def get_neighborhoods():
    response = requests.get(
        "https://data.cityofnewyork.us/resource/swpk-hqdp.json"
    )
    data = response.json()
    neighborhood_list = []

    idx = 0
    for neighborhood in data:

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
        idx += 1

    return neighborhood_list

def neighborhood_scraper():
    neighborhood_list = get_neighborhoods()
    # wiki_scraper(neighborhood_list)
    #static_google_maps_scraper(neighborhood_list, horizontal_value = 400, 
    #     vertical_value = 400, zoom = 10)
    return neighborhood_list

def main():
    n_list = neighborhood_scraper()
    #wiki_scraper(neighborhood_list)
    #print(json.dumps(n_list, indent=4))

if __name__ == "__main__":
    main()
