#This script applys forbidden black magic ):
from selenium import webdriver
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import time
username = "giorgios"
email = "lala@gmai.com"
pswd = "1@Lalasfdls@1"
firstname = "giorgos"
surname = "kokolakis"
amka = "01018011111"
telephone = 332
height = 160
weight = 100
city = "heraklion"
address = "naxou"
url = 'http://localhost:8080/Hospital_System/'
#url = "amazon.com"

chromedriver = "C:\chromedriver.exe"
ser = Service(chromedriver)
op = webdriver.ChromeOptions()

driver = webdriver.Chrome(service=ser, options=op)
driver.maximize_window()

driver.get(url)
driver.find_element(By.ID, 'username').send_keys(username)
driver.find_element(By.ID, 'email').send_keys(email)
driver.find_element(By.ID, 'pswd').send_keys(pswd)
driver.find_element(By.ID, 're-pswd').send_keys(pswd)
driver.find_element(By.ID, 'firstname').send_keys(firstname)
driver.find_element(By.ID, 'surname').send_keys(surname)
driver.find_element(By.ID, 'amka').send_keys(amka)
driver.find_element(By.ID, 'telephone').send_keys(telephone)
driver.find_element(By.ID, 'height').send_keys(height)
driver.find_element(By.ID, 'weight').send_keys(weight)
driver.find_element(By.ID, 'city').send_keys(city)
driver.find_element(By.ID, 'address').send_keys(address)
driver.find_element(By.ID, 'agree-with-terms').click()
driver.find_element(By.ID, 'man').click()
driver.find_element(By.ID, 'default-radio').click()
driver.find_element(By.ID, 'blood-giver').click()
your_choice=driver.find_element(By.XPATH ,"//select/option[@value='0+']")
your_choice.click()


#driver.find_element(By.ID, 'a-blood').click()
time.sleep(3)
element = driver.find_element(By.ID, 'submit-buttonn').click()


# driver.close()
