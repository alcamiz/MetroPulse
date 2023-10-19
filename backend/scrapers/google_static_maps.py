import requests
import json
from urllib.parse import quote
import base64

API_KEY = "AIzaSyDh3IrFeC6Qr188VbidMaL0cpxS-eyUwqw"

#keep in mind test centers

def static_google_maps_scraper(in_list, horizontal_value, vertical_value, zoom):
    for model in in_list:

        image_url = None
        location_param = None

        if model.get("longitude") != None and model.get("latitude") != None:
            location_param = f"{model.get('latitude')},{model.get('longitude')}"

        elif model.get("nta_name") != None:
            address = model["nta_name"]
            location_param = quote(address).replace("%20", "+") + ",NY"
        
        if location_param != None:
            response = requests.get("https://maps.googleapis.com/maps/api/staticmap?",
                params = {"key": API_KEY, "zoom": f"{zoom}", "size": f"{horizontal_value}x{vertical_value}", "center":location_param})
            if response.status_code == 200:
                image_url = response.url

        model["static_map_url"] = image_url
