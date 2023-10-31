import { useState } from "react";
import { cookies } from "./cookies-config";
import SignIn from "./pages/signIn/SignIn";



function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  return (
    <div className="h-screen">
      <SignIn isAuth={isAuth} setIsAuth={setIsAuth} />
    </div>
  );
}

export default App;
