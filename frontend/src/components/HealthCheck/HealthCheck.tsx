import { useState, useEffect } from "react";
import { api, ENDPOINTS } from "../../api-config/api-config";

// Define the shape of data we expect from the health endpoint
type HealthData = {
  status: string;
  timestamp: string;
  database: string;
  // Add any other properties your health endpoint returns
};

const Health = () => {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        // Use your API client to call the health endpoint
        const data = await api.get<HealthData>(ENDPOINTS.HEALTH);
        setHealth(data);
      } catch (err) {
        // Handle any errors
        setError("Could not connect to server");
        console.error("Health check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="health-container">
        <h2>Server Health</h2>
        <p>Checking server status...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="health-container">
        <h2>Server Health</h2>
        <p className="error">{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  // Display health data
  return (
    <div className="health-container">
      <h2>Server Health</h2>
      <div className="health-status">
        <p>
          <strong>Status: </strong>
          <span
            className={health?.status === "up" ? "status-up" : "status-down"}
          >
            {health?.status}
          </span>
        </p>

        <p>
          <strong>Last Updated: </strong> {health?.timestamp}
        </p>
        <p>
          <strong>Nu funkar deployment igen</strong>
        </p>
      </div>
    </div>
  );
};

export default Health;
