import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

url = "https://www.metropulse.link/"

class test(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls) -> None:
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        cls.driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))
        cls.driver.get(url)

        #return super().setUpClass()
    
    @classmethod
    def tearDownClass(cls) -> None:
        cls.driver.quit()
        #return super().tearDownClass()
    
    def test_facilities(cls):
        cls.driver.get(url + "medical")
        cls.assertEqual(cls.driver.current_url, url + "medical/")

    def test_centers(cls):
        cls.driver.get(url + "test")
        cls.assertEqual(cls.driver.current_url, url + "test/")

    def test_neighborhoods(cls):
        cls.driver.get(url + "hoods")
        cls.assertEqual(cls.driver.current_url, url + "hoods/")

if __name__ == '__main__':
    unittest.main()
