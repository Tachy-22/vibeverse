import { Outlet } from "react-router-dom";

import Modal from "./components/Modal";
function App() {
  return (
    <div className="h-screen">
      <Modal />
      <Outlet />
    </div>
  );
}

export default App;
