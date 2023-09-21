**— Group #6 —**


**Team Members:**



* Kyston Brown (kmb6273)
* Thomas Moody (tjm4482)
* Alex Cabrera (gac2827)
* Kamil Kalowski (ktk582)

**Name of the Project: **MetroPulse-NYC

**Proposed Project: **Hypertension Awareness in NY City

**Problem Importance: **Hypertension affects 30 percent of New York residents, and a large portion of the population either are not aware of the problem, know they have the disease but do not get any sort of treatment ([link](https://www.nyc.gov/assets/doh/downloads/pdf/epi/databrief135.pdf)).

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



* Where can NYC residents go to check for dangerously high blood pressure?
* Where can NYC residents find urgent medical care due to high blood pressure?
* What facilities geared at aiding their high blood pressure can be found in their district?
* What is hypertension?
