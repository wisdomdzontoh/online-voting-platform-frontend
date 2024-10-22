// hooks/useFetchData.js
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

const useFetchData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get navigation function

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const result = await fetchFunction(); // Call the passed fetch function
        setData(result); // Set data on success
      } catch (err) {
        setError(err);

        if (err.response && err.response.status === 401) {
          toast.error("Session expired. Redirecting to login...");
          // Clear tokens and redirect to login if unauthorized
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          navigate('/login'); // Redirect to login page
        } else {
          toast.error("Failed to fetch data."); // Show toast for other errors
        }
      } finally {
        setLoading(false); // Ensure loading state is false
      }
    };

    fetchData(); // Trigger the fetch

  }, [fetchFunction, navigate]); // Depend on fetchFunction and navigate

  return { data, loading, error }; // Return error for custom handling
};

export default useFetchData;
