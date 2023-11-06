import unittest
from endpoints import app

# These unit tests were influenced by Park-Dex

class Tests(unittest.TestCase):
    def setUp(self):
        #flask_app.config["TESTING"] = True
        self.client = app.test_client()

    def testInvalidRoute(self):
        with self.client:
            response = self.client.get("/test")
            self.assertEqual(response.status_code, 404)
            

    def testGetHospitalPagination(self):
        with self.client:
            response = self.client.get("/hospitals?page=3&per_page=25")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 25)

    def testGetCenterPagination(self):
        with self.client:
            response = self.client.get("/centers?page=1&per_page=25")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 25)

    def testGetNeighborhoodPagination(self):
        with self.client:
            response = self.client.get("/neighborhoods?page=4&per_page=25")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertEqual(len(data), 25)           

    def testGetAllHospitals(self):
        with self.client:
            response = self.client.get("/hospitals")
            self.assertEqual(response.status_code, 200)
            data = response.json["total_size"]
            self.assertEqual(data, 78)

    def testGetAllCenters(self):
        with self.client:
            response = self.client.get("centers")
            self.assertEqual(response.status_code, 200)
            data = response.json["total_size"]
            self.assertEqual(data, 1000)

    def testGetAllNeighborhoods(self):
        with self.client:
            response = self.client.get("neighborhoods")
            self.assertEqual(response.status_code, 200)
            data = response.json["total_size"]
            self.assertEqual(data, 195)

    def testGetHospitalInstance(self):
        with self.client:
            response = self.client.get("/hospitals/0")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"]
            self.assertEqual(data["facility_type"], "Child Health Center")
            self.assertEqual(data["borough"], "Manhattan")
            self.assertEqual(data["name"], "La Clinica Del Barrio")

    def testGetCenterInstance(self):
        with self.client:
            response = self.client.get("centers/1")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"]
            self.assertEqual(data["address"], "1368 Linden Boulevard")
            self.assertEqual(data["borough"], "BROOKLYN")
            self.assertEqual(len(data["nearby_hospitals"]), 11)

    def testGetNeighborhoodInstance(self):
        with self.client:
            response = self.client.get("neighborhoods/3")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"]
            self.assertEqual(data["borough"], "Bronx")
            self.assertEqual(data["desc"], "Belmont is a village within the town of Amity in Allegany County, New York, United States. Belmont is the county seat of Allegany County.")
            self.assertEqual(len(data), 11)

    def testCenterFiltering(self):
        with self.client:
            response = self.client.get("centers?borough=queens")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"][0]
            self.assertEqual(data["borough"].lower(), "queens")

    def testHospitalFiltering(self):
        with self.client:
            response = self.client.get("hospitals?borough=queens")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"][0]
            self.assertEqual(data["borough"].lower(), "queens")

    def testNeighborhoodFiltering(self):
        with self.client:
            response = self.client.get("neighborhoods?borough=queens")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"][0]
            self.assertEqual(data["borough"].lower(), "queens")

    def testCenterSorting(self):
        with self.client:
            response = self.client.get("centers?sort_by=id")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"][0]
            self.assertEqual(data["id_t"], 0)

    def testHospitalSorting(self):
        with self.client:
            response = self.client.get("hospitals?sort_by=id")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"][0]
            self.assertEqual(data["id_t"], 0)

    def testNeighborhoodSorting(self):
        with self.client:
            response = self.client.get("neighborhoods?sort_by=id")
            self.assertEqual(response.status_code, 200)
            full_data = response.json
            data = full_data["data"][0]
            self.assertEqual(data["id_t"], 0)

if __name__ == "__main__":
    unittest.main()
