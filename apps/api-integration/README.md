# API Integration Challenge

This challenge focuses on your ability to integrate with external APIs, handle asynchronous requests, and create a responsive, user-friendly interface that effectively presents data from an API.

## The Challenge

You will be creating a weather application that integrates with a public weather API and provides users with current weather information and forecasts. The application should include:

1. **Current Weather Display**
   - Show current weather information for a location
   - Display temperature, conditions, humidity, wind speed, etc.
   - Include appropriate weather icons based on conditions

2. **Search Functionality**
   - Allow users to search for weather by city name or zip code
   - Implement autocomplete/suggestions for city search
   - Remember recent searches

3. **Extended Forecast**
   - Display a 5-day forecast with daily summaries
   - Show high/low temperatures for each day
   - Include weather conditions and probability of precipitation

4. **Weather Map**
   - Implement a visual map showing weather patterns
   - Allow users to click on the map to get weather for that location

5. **Weather Alerts**
   - Display any weather alerts or warnings for the selected location
   - Implement a notification system for severe weather alerts

## Technical Requirements

- Integrate with a public weather API (e.g., OpenWeatherMap, WeatherAPI, etc.)
- Implement proper error handling for API requests
- Create a responsive UI using the provided SCSS styles
- Optimize for performance, including loading states
- Implement client-side caching for API responses
- Add appropriate data visualizations (charts, maps, etc.)
- Make the application accessible

## Getting Started

```bash
# Install dependencies
npm install

# Run the app
npm run dev
```

## Recommended Weather APIs

You can use any of the following APIs (or another of your choice):
- [OpenWeatherMap](https://openweathermap.org/api)
- [WeatherAPI](https://www.weatherapi.com/)
- [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
- [Weatherbit](https://www.weatherbit.io/api)

Most of these APIs offer free tiers that are sufficient for this challenge.

## Evaluation Criteria

You will be evaluated on:

1. **API Integration**: Proper handling of API requests and responses
2. **UX/UI Design**: Creating an intuitive and visually appealing interface
3. **Error Handling**: How you handle API errors and edge cases
4. **Performance**: Efficient API usage and interface responsiveness
5. **Code Quality**: Organization, readability, and maintainability
6. **Data Visualization**: How effectively you present weather data
7. **Explanation**: Quality of answers in `questions.md`

## Submission

1. Create a branch with your name (e.g., `john-doe-api`)
2. Commit your changes with clear commit messages
3. Push your branch and create a Pull Request
4. Make sure you've completed the `questions.md` file

## Bonus Points

- Implement a "real-time" update feature that refreshes data periodically
- Add unit tests for key functionality
- Implement a PWA that works offline with cached data
- Add additional weather data visualizations

Good luck!


## How to run

```bash
# Install dependencies
npm install

# Run the backend
npm run dev:server

# Run the app
npm run dev
```

Create a .env file in the project root with:

```bash
OPEN_WEATHER_KEY=your_openweather_api_key
RAPID_API_KEY=your_rapidapi_key
```
* OPEN_WEATHER_KEY → required for weather and geocoding data
* RAPID_API_KEY → used to look up top cities for a country by population