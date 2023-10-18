import requests
import json

def wiki_scraper(in_list):

    for model in in_list:

        wiki_text = None
        if model["nta_name"] != None:

            response = requests.get(
                "https://en.wikipedia.org/w/api.php?",
                params = {"action": "opensearch", "format": "json", "redirects": "resolve", "search": f"{model.get('nta_name')} NY", "limit": "1", "namespace": "0"}
            )
            wiki_json = response.json()

            if len(wiki_json[1]) > 0:
                wiki_name = wiki_json[1][0]
                response = requests.get(
                    "https://en.wikipedia.org/w/api.php?exintro&explaintext",
                    params = {"action": "query", "format": "json", "prop": "extracts", "exsentences": "2", "titles": f"{wiki_name}"}
                )

                #print(response.json())
                inner_json = next(iter(response.json()["query"]["pages"].values()))
                # print(inner_json)
                # if "extract" in inner_json:
                #     wiki_text = inner_json["extract"]

        model["desc"] = wiki_text
