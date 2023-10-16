import requests
import json

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

def get_center_google(center_list):

    for center in center_list:

        image_url = None
        rating = None

        # Set intersection
        if center["longitude"] != None and center["latitude"] != None:

            response = requests.get(
                "https://maps.googleapis.com/maps/api/place/nearbysearch/output?",
                params = {"radius": "1", "location": f"{center.get('longitude')},{center.get("latitude")}}",
            )
            response_json = response.json()["businesses"]

            if len(response_json) > 0:

                target_obj = response_json[0]

                if "photos" in target_obj:
                    image_arr = target_obj.get("photos")
                    if len(image_arr) > 0:
                        image_obj = image_arr[0]
                        image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={image_obj.get('photo_reference')}"

                if "rating" in target_obj:
                    rating = str(target_obj.get("rating"))

        center["image_url"] = image_url
        center["rating"] = rating


# Will need authentication to run
def get_center_yelp(center_list):

    api_key = ""

    for center in center_list:

        image_url = None
        rating = None

        # Set intersection
        if center["longitude"] != None and center["latitude"] != None:

            response = requests.get(
                f"https://api.yelp.com/v3/businesses/search?radius=1&sort_by=distance&limit=1",
                params = {"radius": "1", "longitude": center.get('longitude'), "latitude": center.get("latitude")},
                headers = {"Authorization": f"Bearer {api_key}", "accept": "application/json"}
            )
            tmp = response.json()["results"]

            if len(tmp) > 0:
                image_url = tmp[0].get("image_url")
                if image_url == "":
                    image_url = None

                rating = string(tmp[0].get("rating"))
                if rating == "":
                    rating = None

        center["image_url"] = image_url
        center["rating"] = rating


def center_scraper():
    center_list = get_test_centers()
    get_center_yelp(center_list)
    return center_list

def main():
    center_list = get_test_centers()
    print(json.dumps(center_list, indent=4))

if __name__ == "__main__":
    main()
