**— Group 06 —**

- Project Site: https://www.metropulse.link
- API Link: https://documenter.getpostman.com/view/29785582/2s9YJZ3jGy

**Team Members:**



* Kyston Brown (kmb6273)
* Thomas Moody (tjm4482)
* Alex Cabrera (gac2827)
* Kamil Kalowski (ktk582)

**Name of the Project:** MetroPulse-NYC

**Proposed Project:** Helping NYC's black community deal with rising hypertension health issues.

**Problem Importance:** The city of New York has recently published concerning statistics about the rise of hypertension problems in the city. In particular, the disease is disproportionately affecting black communities, with the prevalance of hypertension in the community being almost double (44%) that of the white community (23%). More concerning is the fact that of those in the community suffering from the disease, only 30% report having controlled blood pressure. With a number so low, we aim to help this community to more easily keep their blood pressure in check by finding local blood pressure testing centers, and in case of emergency find a facility able to help them stabilize their condition.

**Data Sources URLs (RESTful APIs)**



* Testing Centers ([link](https://dev.socrata.com/foundry/data.cityofnewyork.us/8eux-rfe8))
* Council Demographics in Each District ([link](https://data.cityofnewyork.us/City-Government/Council-district-breakdown/jqy3-ybjq))
* District Populations ([link](https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2))
* Hospital APIs ([link](https://data.cityofnewyork.us/Health/NYC-Health-Hospitals-patient-care-locations-2011/f7b6-v6v3))
* Maps APIs ([link](https://www.openstreetmap.org/about/api/))

**Three Models:**



* Medical Facilities
* Districts
* Test Centers

**Number of Instances**



* Districts: 51
* Medical Facilities: 78
* Test Centers: 999

**Attributes per Model**



* Districts 
    * Demographics
    * Population
    * Borough
    * Average cardiologist price?
* Medical Facilities
    * Location
    * Contact information
    * District
    * Borough
* Test Centers
    * Location
    * Facility Name
    * Address
    * Times
    * Phone Number
    * Service Type

**Connections:**



* District: List of test centers and hospitals
* Test Centers: List of hospitals within 10 mile radius and link to district location.
* Hospitals: List of test centers within 10-mile radius and link to district location.

**Rich Media**



* Map locations (OpenStreetMaps)
* Images (Bing Images; testing and medical centers)

**Types of Media per Model**



* Districts
    * Map outline of the district
    * Pie chart showing demographics
* Medical Facilities
    * Maps
    * Images
* Test Centers
    * Maps
    * Images

**Questions to Answer:**



* How can black NYC residents suffering from hypertension control their blood pressure consistently?
* Where can black NYC residents find urgent medical care due to high blood pressure?
* What facilities geared at aiding their high blood pressure can be found in their district?
