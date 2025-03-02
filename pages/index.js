import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Grid, CircularProgress, Box } from "@mui/material";

// API URL for CoinGecko
const BASE_URL = "https://api.coingecko.com/api/v3/simple/price";

export default function Home() {
  const [data, setData] = useState(null); // For storing cryptocurrency data
  const [loading, setLoading] = useState(true); // For managing the loading state
  const [error, setError] = useState(null); // For managing errors
  const [search, setSearch] = useState(""); // For the search bar

  // Function to fetch data from CoinGecko API
  const fetchCryptoPrices = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(BASE_URL, {
        params: {
          ids: "bitcoin,ethereum,cardano,ripple,polkadot",
          vs_currencies: "usd",
        },
      });

      setData(response.data); // Set the fetched data into state
    } catch (err) {
      setError("Error fetching data"); // Set error if any
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or when the "Refresh" button is clicked
  useEffect(() => {
    fetchCryptoPrices();
  }, []); // Empty dependency array means this effect runs only once on mount

  const filteredData = data
    ? Object.keys(data)
        .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {})
    : {};

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      {/* Search bar */}
      <TextField
        label="Search Cryptocurrency"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      {/* Loading state */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Box sx={{ color: "red" }}>{error}</Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {/* Displaying the filtered data */}
            {Object.keys(filteredData).map((crypto) => (
              <Grid item xs={12} sm={4} key={crypto}>
                <Box
                  sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2 }}
                >
                  <h2>{crypto.charAt(0).toUpperCase() + crypto.slice(1)}</h2>
                  <p>Price: ${filteredData[crypto].usd}</p>
                </Box>
              </Grid>
            ))}
          </Grid>
          {/* Refresh button */}
          <Button
            onClick={fetchCryptoPrices}
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Refresh
          </Button>
        </>
      )}
    </Box>
  );
}
