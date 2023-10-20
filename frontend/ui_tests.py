import os
from sys import platform

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./frontend/flow_tests/chromedriver.exe"
    elif platform == "linux":
        PATH = "./frontend/flow_tests/chromedriver_linux"
    else:
        print("Unsupported OS")
        exit(-1)
        
    os.system("python3 ./flow_tests/instances.py")
    os.system("python3 ./flow_tests/instance_page.py")
    os.system("python3 ./flow_tests/navbarTests.py")
