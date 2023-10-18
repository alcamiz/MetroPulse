import requests
import json
try:
    from image import places_scraper
except:
    from scrapers.image import places_scraper

def none_strip(s):
    if s != None:
        return s.strip()
    return None

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
        if n.get("location_1") != None:
            human_address = n.get("location_1").get("human_address")
            if human_address != None:
                t = json.loads(human_address)
                med_data["address"] = t.get("address")
                med_data["zip_code"] = t.get("zip")
        else:
            med_data["address"] = None
            med_data["zip"] = None
        med_data["council_district"] = n.get("council_district")
        med_data["nta_name"] = none_strip(n.get("nta"))
        med_data["longitude"] = n.get("longitude")
        med_data["latitude"] = n.get("latitude")

        med_data["id_t"] = i
        med_data["parent_neighborhood"] = []
        med_data["nearby_centers"] = []

        med_list.append(med_data)
    
    return med_list

def med_scraper():
    med_list = get_Med()
    # places_scraper(med_list)
    return med_list

def main():
    hospital_list = med_scraper()
    print(json.dumps(hospital_list, indent=4))

if __name__ == "__main__":
    main()
