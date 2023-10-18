import requests
import json

try:
    from google_static_maps import static_google_maps_scraper
except:
    from scrapers.google_static_maps import static_google_maps_scraper

try:
    from image import places_scraper
except:
    from scrapers.image import places_scraper

# Just obtain the JSON file
def get_test_centers():
    response = requests.get(
       "https://data.cityofnewyork.us/resource/8eux-rfe8.json"
    )
    data = response.json()

    center_list = []
    for idx, center in enumerate(data):

        new_center = {}

        new_center["name"] = center.get("input_1_facilityname")
        new_center["address"] = center.get("input_1_address")
        new_center["borough"] = center.get("input_1_borough")
        new_center["nta_name"] = center.get("output_nta_name")
        new_center["zip_code"] = center.get("input_1_zipcode")
        new_center["phone"] = center.get("input_1_phone2")
        new_center["council"] = center.get("output_city_council_district")
        new_center["community"] = center.get("output_community_district")
        new_center["howto"] = center.get("input_1_additionalinfo2")
        new_center["longitude"] = center.get("longitude2")
        new_center["latitude"] = center.get("latitude2")

        new_center["id_t"] = idx
        new_center["nearby_hospitals"] = []
        new_center["parent_neighborhood"] = []

        center_list.append(new_center)

    return center_list

def center_scraper():
    center_list = get_test_centers()
    # places_scraper(center_list)
    # static_google_maps_scraper(center_list, horizontal_value = 400, 
    #    vertical_value = 400, zoom = 10)
    return center_list

def main():
    center_list = center_scraper()
    print(json.dumps(center_list, indent=4))

if __name__ == "__main__":
    main()
