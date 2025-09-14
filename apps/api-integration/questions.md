# API Integration Challenge - Questions

Please answer the following questions about your weather application implementation:

1. **API Implementation**: Describe your approach to integrating the weather API:

   - Which API did you choose and why?
     I chose OpenWeather API because it provides reliable and well documented weather data, and it was easy to get started with a free tier that includes 1,000 calls per day. This allowed me to quickly prototype without costs. The API offers current, hourly, and daily forecast data in a consistent JSON format, which makes integration straightforward. It also provides additional features (like icons, air quality, and geocoding) that I can leverage later if needed.

   - How did you structure your API service layer?
     I structured the API service layer as a small Express proxy that runs locally and exposes clean /api/\* endpoints for weather, forecast, geocoding, and top cities. This setup keeps provider keys secure in environment variables (via dotenv) and prevents exposing them to the client. Each route validates query parameters (e.g., lat, lon), handles upstream errors gracefully, and returns normalized JSON so the UI has a consistent contract.
   - How did you handle error cases and rate limiting?
     I handled error cases by returning appropriate HTTP status codes from the API (e.g., 400 for missing or invalid parameters, 500 for upstream or internal server errors), along with a simple JSON error body so the client can reliably interpret failures. On the client side, I used React Query to manage API calls and surface errors, and wrapped the main UI in an error boundary to gracefully catch and display fallback states without breaking the entire app. I haven't implmented rate limit because of the time constraint.

2. **User Experience**: Explain your key UX decisions:

   - How did you present the weather data effectively?
     I presented the weather data by first looking at how other popular weather sites and apps structure their UI, and then drawing inspiration from design examples on Dribbble to create a clean, visually engaging layout. I focused on showing the most important information (temperature, real feel, conditions, wind, humidity, sunrise/sunset) in a card-based format with clear hierarchy and intuitive icons, so users can quickly understand the forecast at a glance.
   - How did you handle loading states and errors?
     I handled loading and error states by keeping the UI consistent across sections: each section shows a skeleton loader while data is being fetched, and if something goes wrong, an error card with a clear message is displayed. I used React Query to manage the request lifecycle, so I could easily check for isLoading and isError states and conditionally render the skeleton or error card. This approach ensures that users always get immediate feedback, whether data is still loading or an error occurs, without breaking the overall layout.
   - What accessibility features did you implement?
     I implemented accessibility by leveraging shadcn/ui, which is built on top of Radix primitives and comes with proper ARIA roles, keyboard navigation, and focus management by default. On top of that, I made sure to provide meaningful labels, alt text for icons, and descriptive headings so that screen readers can interpret the UI clearly.

3. **Technical Decisions**: What were your main technical considerations?

   - How did you optimize API calls and performance?
     I optimized API calls and performance by using React Query to manage data fetching, caching, and background refetching. I set an appropriate stale time so that frequently accessed data (like current weather) isn’t refetched unnecessarily, which reduces API usage and improves responsiveness. For the search functionality, I implemented debouncing to avoid sending a request on every keystroke and instead wait until the user pauses typing. Together, these optimizations kept the app responsive, reduced redundant network traffic, and ensured that the free API quota was used efficiently.
   - How did you handle state management?
     I handled state management primarily with React Query for all server state, since it takes care of fetching, caching, and syncing API data. For client-side state that isn’t tied to the server, like theme, units, and selected location, I used a lightweight React Context. This kept API-related logic separate from app configuration, avoided unnecessary prop drilling, and ensured that both remote and local state were managed in a clear, maintainable way.

   - How did you ensure the application works well across different devices?
     I built it mobile-first and responsive with Tailwind (flex/grid layouts, breakpoint utilities, fluid spacing/typography), ensuring components reflow cleanly from small screens to desktop.

4. **Challenges**: What was the most challenging aspect of this project and how did you overcome it?
   The most challenging aspect was getting familiar with the OpenWeather API and understanding how its different endpoints work. Some parts of the API weren’t straightforward, and a few features either required an upgraded subscription or didn’t work as expected. Because of the time constraints, I couldn’t go through all of the documentation in depth, so I had to focus on just the endpoints I needed most—current weather, forecast, and geocoding—and test them directly to confirm their behavior. I overcame this by iterating quickly, checking responses in Postman/through fetch calls, and adapting the app to use only the reliable, free endpoints so I could deliver a working solution within the timeframe.

5. **Improvements**: If you had more time, what would be the top 2-3 improvements you would make to the application?
   If I had more time, the first improvement I’d make would be migrating the app to a React framework like Next.js, since it provides a lot of out-of-the-box features such as server-side rendering (SSR) for better SEO and performance, built-in routing and layouts for cleaner structure, and easier API route management. Second, I’d add rate limiting.
