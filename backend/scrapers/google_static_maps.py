import requests
import json
from urllib.parse import quote
import base64

API_KEY = "AIzaSyDh3IrFeC6Qr188VbidMaL0cpxS-eyUwqw"

#keep in mind test centers

def static_google_maps_scraper(in_list, horizontal_value, vertical_value, zoom):
    for model in in_list:
        if model["nta_name"] != None:
            address = model["nta_name"]
            url_encoded_adress = quote(address).replace("%20", "+") + ",NY"
            response = requests.get("https://maps.googleapis.com/maps/api/staticmap?",
               params= {"key": API_KEY, "zoom": f"{zoom}", "size": f"{horizontal_value}x{vertical_value}", "center":url_encoded_adress})
            if response.status_code == 200:
                image_url = f"https://maps.googleapis.com/maps/api/staticmap?center={url_encoded_adress},zoom={zoom}&size={horizontal_value}x{vertical_value}&key={API_KEY}"
                model["image_url"] = image_url
            