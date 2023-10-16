import requests
import json

def get_Med():
    med_list = []
    res = requests.get("https://data.cityofnewyork.us/resource/f7b6-v6v3.json")
    data = res.json()
    for i, n in enumerate(data):
        med_data = {}
        med_data["facility_type"] = n.get("facility_type")
        med_data["borough"] = n.get("borough")
        med_data["facility_name"] = n.get("facility_name")
        med_data["phone"] = n.get("phone")
        med_data["address"] = n.get("location_1.human_address")
        med_data["council_district"] = n.get("council_district")
        med_data["nta"] = n.get("nta")
        med_data["longitude"] = n.get("longitude")
        med_data["latitude"] = n.get("latitude")
        med_data["id"] = i

        med_data["nearby_hospitals"] = []
        med_data["at_neighborhood"] = []
        med_data["nearby_centers"] = []

        med_list.append(med_data)
    
    return med_list

#Same as center?
def get_med_google(med_List):

    api_key = "API_KEY"

    for fac in med_List:

        image_url = None
        rating = None

        # Set intersection
        if fac["longitude"] != None and fac["latitude"] != None:

            response = requests.get(
                f"https://maps.googleapis.com/maps/api/place/nearbysearch/output?",
                params = {"radius": "1", "key": api_key, "location": f"{fac.get('longitude')},{fac.get('latitude')}"},
                headers = {"Authorization": f"Bearer {api_key}", "accept": "application/json"}
            )
            tmp = response.json()["businesses"]

            if len(tmp) > 0:
                image_arr = tmp[0].get("photos")

                if len(image_arr) > 0:
                    image_obj = image_arr[0]
                    

                if image_url == "":
                    image_url = None

                rating = tmp[0].get("rating")
                if rating == "":
                    rating = None

        fac["image_url"] = image_url
        fac["rating"] = rating

def med_scrapper():
    med_list = get_Med()
    get_med_google(med_list)
    return med_list