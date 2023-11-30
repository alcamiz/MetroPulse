**— Group 06 —**

- Project Site: https://www.metropulse.link
- API Docs Link: https://documenter.getpostman.com/view/29785582/2s9YJZ3jGy
- API Link: https://backend.metropulse.link (endpoints are centers/hospitals/neighborhoods/search)

**Team Members:**

* Kyston Brown (kmb6273)
* Thomas Moody (tjm4482)
* Alex Cabrera (gac2827)
* Kamil Kalowski (ktk582)

**Name of the Project:** MetroPulse-NYC

**Proposed Project:** Helping NYC's black community deal with rising hypertension health issues.

**Problem Importance:** The city of New York has recently published concerning statistics about the rise of hypertension problems in the city. In particular, the disease is disproportionately affecting black communities, with the prevalance of hypertension in the community being almost double (44%) that of the white community (23%). More concerning is the fact that of those in the community suffering from the disease, only 30% report having controlled blood pressure. With a number so low, we aim to help this community to more easily keep their blood pressure in check by finding local blood pressure testing centers, and in case of emergency find a facility able to help them stabilize their condition.

**Data Sources URLs (RESTful APIs)**

* Testing Centers ([link](https://data.cityofnewyork.us/resource/8eux-rfe8.json))
* Council Demographics in Each District ([link](https://data.cityofnewyork.us/City-Government/Council-district-breakdown/jqy3-ybjq))
* Descriptions for all models ([link](https://en.wikipedia.org/w/api.php))
* Hospital APIs ([link](https://data.cityofnewyork.us/resource/f7b6-v6v3.json))
* Google Static Maps APIs ([link](https://www.openstreetmap.org/about/api/))
* Google Places APIs ([link](https://maps.googleapis.com/maps/api/place/nearbysearch/json))

**Three Models:**

* Medical Facilities
* Neighborhoods
* Test Centers

**Number of Instances**

* Neighborhoods: 195
* Medical Facilities: 78
* Test Centers: 1000

**Attributes per Model**

* Neighborhoods 
    * Borough
    * Population
    * County Code
    * NTA Code
    * County Code
    * Nearby Hospitals
    * Description
* Medical Facilities
    * Facility Name
    * Borough
    * Council District
    * Contact Information
    * Zipcode
    * Borough
* Test Centers
    * Location
    * Facility Name
    * Address
    * Times
    * Phone Number
    * Service Type

**Connections:**

* Neighborhood: List of nearby testing centers and hospitals
* Test Centers: List of hospitals within 10 mile radius and link to neighborhood.
* Hospitals: List of test centers within 10-mile radius and link to neighborhood.

**Rich Media**

* Map locations (OpenStreetMaps)
* Images (Google Images; testing and medical centers)

**Types of Media per Model**

* Neighborhoods
    * Map outline of the Neighborhood
    * Picture showing off neighborhood vibe
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

## Project Leaders
Responsibilities: 
Schedule meetings, (partly) delegate roles, think up high-level architecture, and keep everyone on track.
| Phase | Project Leader
| :---: | :-------: |        
| 1     | Alex Cabrera   |
| 2     | Thomas Moody |
| 3     | Kamil Kalowski |
| 4     | Kyston Brown |

## Completion Time

### Phase 1
| Name               | Estimated     | Actual        |
| ------------------ | :-----------: | :-----------: |
| Kamil Kalowski    |  10           | 10                 |
| Alex Cabrera      |  20           | 17                 |
| Thomas Moody      |  20           | 15                 |
| Kyston Brown      |  20           | 20                 |

### Phase 2
| Name               | Estimated     | Actual        |
| ------------------ | :-----------: | :-----------: |
| Kamil Kalowski    |  20           | 25                 |
| Alex Cabrera      |  20           | 25                 |
| Thomas Moody      |  15           | 20                 |
| Kyston Brown      |  15           | 20                 |

### Phase 3
| Name               | Estimated     | Actual        |
| ------------------ | :-----------: | :-----------: |
| Kamil Kalowski    |  20           | 25                 |
| Alex Cabrera      |  20           | 25                 |
| Thomas Moody      |  15           | 20                 |
| Kyston Brown      |  15           | 20                 |

### Phase 4
| Name               | Estimated     | Actual        |
| ------------------ | :-----------: | :-----------: |
| Kamil Kalowski    |  10           | 10                 |
| Alex Cabrera      |  10           | 10                 |
| Thomas Moody      |  10           | 10                 |
| Kyston Brown      |  10           | 10                 |

## Git SHA
| Phase               | SHA           |
| ------------------- | :-----------: |
| 1                   |  870d3e41     |
| 2                   |  712c6123     |
| 3                   |  4a020eca     |
| 4                   |  c17cf1a4     |
