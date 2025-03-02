# Challenges & Solutions

1. **Handling API Errors**:

   - Initially, the app didn't handle cases where the API request fails. I added error handling in the `fetchCryptoPrices` function to catch errors and display an appropriate message.

2. **Displaying Data Efficiently**:

   - I had to implement a search bar to filter cryptocurrencies. This was done by filtering the data based on the search query before displaying it.

3. **Loading State**:
   - Managing the loading state during API requests was tricky. I used the `CircularProgress` component from Material UI to show a loading spinner until the data is fetched.
