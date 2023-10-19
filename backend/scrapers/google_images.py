import requests
import json

API_KEY = "AIzaSyDh3IrFeC6Qr188VbidMaL0cpxS-eyUwqw"

def places_scraper(in_list):

    for model in in_list:

        image_url = None
        rating = None

        # Set intersection
        if model["longitude"] != None and model["latitude"] != None:

            response = requests.get(
                "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
                params = {"keyword": model.get("name"), "radius": "500", "location": f"{model.get('latitude')},{model.get('longitude')}", "key": API_KEY}
            )
            response_json = response.json()["results"]

            if len(response_json) > 0:
                place_obj = response_json[0]
                place_id = place_obj.get("place_id")

                if place_id != None:
                    response = requests.get(
                        "https://maps.googleapis.com/maps/api/place/details/json?",
                        params = {"place_id": place_id, "key": API_KEY}
                    )
                    target_obj = response.json().get("result")
                    # print(json.dumps(target_obj, indent=4))

                    if target_obj != None:
                        if "photos" in target_obj:
                            image_arr = target_obj.get("photos")
                            if len(image_arr) > 0:
                                image_obj = image_arr[0]
                                image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference={image_obj.get('photo_reference')}&key={API_KEY}"
                        if "rating" in target_obj:
                            rating = str(target_obj.get("rating"))

        model["image_url"] = image_url
        model["rating"] = rating
