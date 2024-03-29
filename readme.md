# Getting started
## Install
> npm install

## Data base URL
Create a .env file to store your data base's url like in the following example:
> MONGO_DB_URL=database-url

## Start the development server
> npm run dev

If you run the app on windows please refer to: [debug npm](https://www.npmjs.com/package/debug) to set the package.json's script to windows mode.

## Connecting to the API
### Get location's list
To get the list with all the locations, make a <span style="color:red; font-weight:bold">GET </span> request to the following endpoint:

In development:

> http<nolink>://localhost:5000/api/locations/all

In production:
> https<nolink>://fast-castle-21380.herokuapp.com/api/locations/all

### Get one location 
#### Request's params.
Add urls parameters for name or id fields in the following form:

#### id:
In development
> http<nolink>://localhost:5000/api/locations/id/<span style="color:red">5cd828ab14a53531011d72d4</span>

In production:
> https<nolink>://fast-castle-21380.herokuapp.com/api/locations/id/5cd828ab14a53531011d72d4

#### name:

In development:
> http<nolink>://localhost:5000/api/locations/name/<span style="color:red">bogota</span>

In production:

> https<nolink>://fast-castle-21380.herokuapp.com/api/locations/name/london

## Response

You should get a response similar to this one:

```json
  {
    "_id": "5cd828ab14a53531011d72d4",
    "name": "colombia",
    "file": {
        "lat": 4.5709,
        "lng": 74.2973,
        "capital": "bogotá",
        "distanceToOffice": 7672.032312929571
    },
    "__v": 0
  }   
```

### That's all!





