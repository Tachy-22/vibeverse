import { useState, useEffect } from "react";

function OnlineNotif() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(window.navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    // Initial check
    setIsOnline(window.navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className="OnlineNotif">
      {isOnline ? (
        <h1>You are online! 🌐</h1>
      ) : (
        <h1>
          No network connection. Please check your internet connection. 🚫
        </h1>
      )}
    </div>
  );
}

export default OnlineNotif;
