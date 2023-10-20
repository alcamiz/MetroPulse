import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Copied from https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/flow_tests/navbarTests.py

URL = "https://www.metropulse.link/"


class Test(unittest.TestCase):
    @classmethod
    def setUpClass(self) -> None:
        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}

        self.driver = webdriver.Chrome(
            options=options, service=Service(ChromeDriverManager().install())
        )
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_Brand(self):
        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()
        self.assertEqual(self.driver.current_url, URL)

    def test_Home(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar brand: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-toggler"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-toggler")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[1]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[1]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find Home link: " + str(ex))

        self.assertEqual(self.driver.current_url, URL)

    def test_About(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar brand: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-toggler"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-toggler")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[5]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[5]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find About link: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "about/")

    def test_Medicals(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar brand: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-toggler"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-toggler")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[2]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[2]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find Medical Facilities link: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "medical/")

    def test_Centers(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar brand: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-toggler"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-toggler")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[3]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[3]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find Test Centers link: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "test/")

    def test_Hoods(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar brand: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-toggler"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-toggler")
            element.click()
        except Exception as ex:
            print("Couldn't find navbar: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[4]')
                )
            )
            element = self.driver.find_element(
                By.XPATH, '//*[@id="basic-navbar-nav"]/div/div/a[4]'
            )
            element.click()
        except Exception as ex:
            print("Couldn't find Neighborhoods link: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "hoods/")


if __name__ == "__main__":
    unittest.main()
