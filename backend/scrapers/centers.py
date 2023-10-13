import requests

# Just obtain the JSON file
def get_test_centers():
    response = requests.get(
        "https://data.cityofnewyork.us/resource/8eux-rfe8.json"
    )
    data = response.json()

    center_list = []
    for idx, center in enumerate(data.items()):
        new_center = {}

        new_center["name"] = center.get("input_1_facilityname")
        new_center["address"] = center.get("input_1_address")
        new_center["borough"] = center.get("input_1_borough")
        new_center["nta"] = center.get("output_nta_name")
        new_center["zip_code"] = center.get("input_1_zipcode")
        new_center["phone"] = center.get("input_1_phone2")
        new_center["council"] = center.get("output_city_council_district")
        new_center["community"] = center.get("output_community_district")
        new_center["howto"] = center.get("input_1_additionalinfo2")
        new_center["longitude"] = center.get("longitude2")
        new_center["latitude"] = center.get("latitude2")
        new_center["id"] = idx

        new_center["nearby_hospitals"] = []
        new_center["at_neighborhood"] = []

        center_list.append(new_center)

    return center_list

# Will need authentication to run
def get_center_yelp(center_list):

    # TODO: Auth

    for center in center_list:

        image_url = None
        rating = None

        # Set intersection
        if center["longitude"] == None or center["latitude"] == None:
            response = requests.get(
                "https://api.yelp.com/v3/businesses/search?sort_by=distancelimit=1&longitude={long}&latitude={lat}}".format(long = center["longitude"], lat = center["latitude"])
            )
            tmp = response.json()

            if len(tmp) > 0:
                image_url = tmp[0].get("image_url")
                rating = tmp[0].get("rating")

        center["image_url"] = image_url
        center["rating"] = rating

def center_scraper():
    center_list = get_test_centers
    get_center_yelp(center_list)
    return center_list
