# Getting started
## Install
> npm install

## Data base URL
create a .env file to store your data base url like in the following example:
> MONGO_DB_URL=database-url

## Start the  development server
> npm run dev

If you run the app on windows please refer to: [debug npm](https://www.npmjs.com/package/debug) to set the package.json's script to windows mode.

# Connecting to the API
### Get location's list
To get the list with all the locations, make a <span style="color:red; font-weight:bold">GET </span> request to the following endpoint:

In development:

> [http<nolink>://localhost:4000/api/locations/](http://localhost:5000/api/locations/all)

In production:
> [http<nolink>://localhost:4000/api/locations/](http://localhost:5000/api/locations/all)

### Get one location 
####Request query strings params.
Add query strings parameters for name or id in the following form:
> http://localhost:5000/api/locations/?id=5cd828ab14a53531011d72d4
> http://localhost:5000/api/locations/?name=bogota


## Response

You will get a response like similar to this one:

```json
    {
    "lat": 4.5709,
    "lng": 74.2973,
    "capital": "Bogotá",
    "country": "Colombia",
    "language": "Spanish"
  }
```
### Other fields
  + country (optional)
  + language (optional)
  + currency (optional)
  + capital (optional)
  

### That's all!





