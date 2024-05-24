<div align="center">

<img src=“frontend/public/pulse-svgrepo-com.svg” width="150">

# MetroPulse NYC

A website and API with the goal of bringing awareness to the rising hypertension health issues in the New York area, and help those struggling with the condition.

</div>

## Goals

- Provide a general overview of hypertension and related complications.
- Provide an easily navigable list of test centers for people looking to get tested.
- Provide a list of medical facilities to more easily get treatment when complications arise.

## Usage

- The deployed website can be reached at https://www.metropulse.link
- The REST api’s documentation can be found at https://documenter.getpostman.com/view/29785582/2s9YJZ3jGy

## Building

### Frontend (website)

- NPM needs to be installed on you machine. Run the following:

```
cd frontend
npm start
npm run
```

### Backend (api)

- Python needs to be installed on your machine. Run the following:

```
cd backend
pip install --no-cache-dir -r requirements.txt
gunicorn -w 2 -b 0.0.0.0:8080 endpoints:app
```
