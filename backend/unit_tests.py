import unittest
import app

class Tests(unittest.TestCase):
    def setUp(self):
        # app.app.config["TESTING"] = True
        self.client = app.app.test_client()

    def testGetAllHosptialPagination(self):
        with self.client:
            response = self.client.get("")
            self.assertEqual(response.status_code, )
            data = response.json[""]
            self.assertEqual(len(data), )

    def testGetAllCenterPagination(self):
        with self.client:
            response = self.client.get("")
            self.assertEqual()
            data = response.json[""]
            self.assertEqual(len(data), )

    def testGetAllNeighborhoodPagination(self):
        with self.client:
            response = self.client.get("")
            self.assertEqual()
            data = response.json[""]
            self.assertEqual(len(data), )           

    def testGetAllHospitals(self):
        with self.client:
            response = self.client.get("")
            self.assertEqual(response.status_code, )
            data = response.json[""]
            self.assertEqual(len(data), )

    def testGetAllCenters(self):
        with self.client:
            response = self.client.get("")
            self.assertEqual(response.status_code, )
            data = response.json[""]
            self.assertEqual(len(data), )

    def testGetAllNeighborhoods(self):
        with self.client:
            response = self.client.get("")
            self.assertEqual(response.status_code, )
            data = response.json[""]
            self.assertEqual(len(data), )

    def testGetHospitalInstance(self):
        with self.client:
            response = self.client.get("/api/")
            self.assertEqual(response.status_code, )
            resp = response.json
            data = resp[""]
            self.assertEqual(data[""], "")
            self.assertEqual(data[""], "")
            self.assertEqual(len(data[""]), )

    def testGetCenterInstance(self):
        with self.client:
            response = self.client.get("/api/")
            self.assertEqual(response.status_code, )
            resp = response.json
            data = resp[""]
            self.assertEqual(data[""], "")
            self.assertEqual(data[""], "")
            self.assertEqual(len(data[""]), )

    def testGetNeighborhoodInstance(self):
        with self.client:
            response = self.client.get("/api/")
            self.assertEqual(response.status_code, )
            resp = response.json
            data = resp[""]
            self.assertEqual(data[""], "")
            self.assertEqual(data[""], "")
            self.assertEqual(len(data[""]), )

    def testHospitalsLength(self):
        with self.client:
            response = self.client.get("/api")
            self.assertEqual(response.status_code, 200)
            resp = response.json
            count = resp[""]
            self.assertEqual(count, )

    def testCentersLength(self):
        with self.client:
            response = self.client.get("/api")
            self.assertEqual(response.status_code, 200)
            resp = response.json
            count = resp[""]
            self.assertEqual(count, )

    def testNeighborhoodLength(self):
        with self.client:
            response = self.client.get("/api")
            self.assertEqual(response.status_code, )
            resp = response.json
            count = resp[""]
            self.assertEqual(count, )

    def testSearch(self):
        with self.client:
            response = self.client.get("/api")
            self.assertEqual(response.status_code, )
            resp = response.json
            animals = resp[""][""]
            states = resp[""][""]
            parks = resp[""][""]
            self.assertEqual(type(), list)
            self.assertEqual(type(), list)
            self.assertEqual(type(), list)


if __name__ == "__main__":
    unittest.main()
