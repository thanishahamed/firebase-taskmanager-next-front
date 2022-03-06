import { useEffect, useState } from "react";

const useNetworkConnection = () => {
  const [networkStatus, setNetworkSatus] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setNetworkSatus(true));
    window.addEventListener("offline", () => setNetworkSatus(false));
    return () => {
      window.addEventListener("online", () => setNetworkSatus(true));
      window.addEventListener("offline", () => setNetworkSatus(false));
    };
  }, []);
  return networkStatus;
};

export default useNetworkConnection;
