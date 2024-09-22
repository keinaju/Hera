Hera is a food-oriented social media powered with Next.js/React.
The purpose of this project is to explore potential of data-driven food service, for example to help customers find allergy-free food. Main technologies used are Next.js/React, AWS-SDK, Google API and mongoose.

Restaurants are able to register as a user and then share data and photos about their food. Data is stored as JSON in MongoDB + files in AWS S3 bucket.

Customers are able to explore food in a feed based on preferences of location and taste. Server leverages Google Geocoding API to convert user-provided address or place to latitude/longitude -coordinate pairs, and then respond with the most appropriate local restaurants.

## Running a Development Server

First, run the development server:

```bash
npm run dev
```

Connect to [http://localhost:3000](http://localhost:3000) with your browser.

## Running in Production

```bash
npm run build && npm run start
```