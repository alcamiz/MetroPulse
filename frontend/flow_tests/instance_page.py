import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://www.metropulse.link/"


class Test(unittest.TestCase):
    @classmethod
    def setUpClass(self) -> None:
        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        self.driver = webdriver.Chrome(
            options=options, service=Service(ChromeDriverManager().install())
        )
        self.driver.get(url)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_hood_instance(self):
        self.driver.get(url + "hoods")
        try:
            WebDriverWait(self.driver, 20, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="root"]/div/div/div/div[2]/a[1]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="root"]/div/div/div/div[2]/a[1]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find link to Neighborhood Instance: " + str(ex))

        self.assertEqual(self.driver.current_url, url + "hoods/34")

    def test_center_instance(self):
        self.driver.get(url + "test")
        try:
            WebDriverWait(self.driver, 20, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="root"]/div/div/div/div[2]/a[1]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="root"]/div/div/div/div[2]/a[1]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find link to Center Instance: " + str(ex))

        self.assertEqual(self.driver.current_url, url + "test/87")

    def test_medical_instance(self):
        self.driver.get(url + "medical")
        try:
            WebDriverWait(self.driver, 20, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="root"]/div/div/div/div[2]/a[1]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="root"]/div/div/div/div[2]/a[1]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find link to Medical Instance: " + str(ex))

        self.assertEqual(self.driver.current_url, url + "medical/0")


if __name__ == "__main__":
    unittest.main()
