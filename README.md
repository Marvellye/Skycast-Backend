  API Documentation   body { background-color: #f8f9fa; } .container { margin-top: 30px; } .header { background-color: #007bff; /\* Blue background \*/ color: white; padding: 20px; text-align: center; border-radius: 5px; } .api-section { margin-bottom: 40px; } .api-title { font-size: 1.5rem; margin-bottom: 15px; } .code-container { position: relative; } .copy-btn { position: absolute; top: 10px; right: 10px; background: #0056b3; /\* Darker blue \*/ border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; } .copy-btn:hover { background: #004494; /\* Even darker blue \*/ } pre { background: #fff; border: 1px solid #ddd; border-radius: 5px; padding: 15px; overflow-x: auto; } h4 { margin-top: 20px; } footer { background-color: #007bff; /\* Blue background \*/ color: white; text-align: center; padding: 10px; margin-top: 40px; border-radius: 5px; }

Skycast API Documentation 🌩️🌨️🌧️
===================================

This API is a free api based on the weather data provided by [OpenWeatherMap](https://openweathermap.org/) and ip details from [Marvelly API](https://api.marvelly.com.ng/ip/)

##### Perks:

*   Unlimited Api calls 👀
*   Uptime 24/7 ✨
*   Developed by two handome dudes😎

/weather (query: {lon, lat})
----------------------------

**Description:** Fetches weather information based on latitude and longitude.📍

**Method:** GET

**URL:** `http://localhost:3000/weather?lon={lon}&lat={lat}`

Copy

    
    http://localhost:3000/weather?lon={lon}&lat={lat}
                    

#### Response

    
    {
      "lat": 12.1,
      "lon": 6.4,
      "timezone": "Africa/Lagos",
      "timezone_offset": 3600,
      "current": {
        "dt": 1725544162,
        "sunrise": 1725513843,
        "sunset": 1725558142,
        "temp": 29.38,
        "feels_like": 31.69,
        "pressure": 1011,
        "humidity": 60,
        "dew_point": 20.81,
        "uvi": 7.37,
        "clouds": 85,
        "visibility": 10000,
        "wind_speed": 3.6,
        "wind_deg": 294,
        "wind_gust": 3.4,
        "weather": [...]
      }
    }
                

/ipweather/:ip
--------------

**Description:** Fetches weather information based on IP address. 📍🖲️

**Method:** GET

**URL:** `http://localhost:3000/ipweather/{ip}`

Copy

    
    http://localhost:3000/ipweather/{ip}
                    

#### Response

    
    {
      "ip": "197.210.84.129",
      "city": "Calabar",
      "region": "Cross River State",
      "country": "NG",
      "loc": "4.9589,8.3270",
      "org": "AS29465 MTN NIGERIA Communication limited",
      "timezone": "Africa/Lagos",
      "timestamp": 1725544591,
      "user_browser": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      "message": "These info are not stored on our server but fetched from a third-party client.",
      "status": "success- marvelly",
      "weather": {
        "lat": 12.1,
        "lon": 6.4,
        "timezone": "Africa/Lagos",
        "timezone_offset": 3600,
        "current": {
          "dt": 1725544162,
          "sunrise": 1725513843,
          "sunset": 1725558142,
          "temp": 29.38,
          "feels_like": 31.69,
          "pressure": 1011,
          "humidity": 60,
          "dew_point": 20.81,
          "uvi": 7.37,
          "clouds": 85,
          "visibility": 10000,
          "wind_speed": 3.6,
          "wind_deg": 294,
          "wind_gust": 3.4,
          "weather": [...]
        }
      }
    }
                

/this-weather
-------------

**Description:** Fetches weather information based on the client's IP address. Basically, your phone 😎✨🥇

**Method:** GET

**URL:** `http://localhost:3000/this-weather`

Copy

    
    http://localhost:3000/this-weather
                    

#### Response

    
    {
      "ip": "197.210.84.129",
      "
    
    
    
    city": "Calabar",
      "region": "Cross River State",
      "country": "NG",
      "loc": "4.9589,8.3270",
      "org": "AS29465 MTN NIGERIA Communication limited",
      "timezone": "Africa/Lagos",
      "timestamp": 1725544591,
      "user_browser": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      "message": "These info are not stored on our server but fetched from a third-party client.",
      "status": "success- marvelly",
      "weather": {
        "lat": 12.1,
        "lon": 6.4,
        "timezone": "Africa/Lagos",
        "timezone_offset": 3600,
        "current": {
          "dt": 1725544162,
          "sunrise": 1725513843,
          "sunset": 1725558142,
          "temp": 29.38,
          "feels_like": 31.69,
          "pressure": 1011,
          "humidity": 60,
          "dew_point": 20.81,
          "uvi": 7.37,
          "clouds": 85,
          "visibility": 10000,
          "wind_speed": 3.6,
          "wind_deg": 294,
          "wind_gust": 3.4,
          "weather": [...]
        }
      }
    }
                

/weather/:country\_code/:state(Under Development⚠️☠️)
-----------------------------------------------------

**Description:** Fetches weather information based on the state name and country code.(there's a bug somewhere and I'll find it🌚🫠)

**Method:** GET

**URL:** `http://localhost:3000/weather/{country_code}/{state}`

Copy

    
    http://localhost:3000/weather/{country_code}/{state}
                    

#### Response

    
    {
      "lat": 12.98333,
      "lon": 7.60000,
      "timezone": "Africa/Lagos",
      "timezone_offset": 3600,
      "current": {
        "dt": 1725544162,
        "sunrise": 1725513843,
        "sunset": 1725558142,
        "temp": 29.38,
        "feels_like": 31.69,
        "pressure": 1011,
        "humidity": 60,
        "dew_point": 20.81,
        "uvi": 7.37,
        "clouds": 85,
        "visibility": 10000,
        "wind_speed": 3.6,
        "wind_deg": 294,
        "wind_gust": 3.4,
        "weather": [...]
      }
    }
                

© Skycast 2024 - Vector × Marvelly

function copyToClipboard(text) { navigator.clipboard.writeText(text).then(() => { Swal.fire({ title: 'Copied!', text: 'The endpoint has been copied to your clipboard.', icon: 'success', confirmButtonText: 'OK' }); }, (err) => { Swal.fire({ title: 'Error!', text: 'Failed to copy URL.', icon: 'error', confirmButtonText: 'OK' }); }); }
