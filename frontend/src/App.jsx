import { useState } from "react";
import { cookies } from "./cookies-config";
import SignIn from "./pages/signIn/SignIn";


import Home from "./pages/home/Home";

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  return (
    <div className="h-screen">
      {!isAuth ? (
        <SignIn setIsAuth={setIsAuth} />
      ) : (
        <div className=" h-full ">
          <Home />
        </div>
      )}
    </div>
  );
}

export default App;
