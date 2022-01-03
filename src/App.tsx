import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
    useMatch,
    useLocation
} from "react-router-dom";
import {
  GlobalStateProvider,
  useGlobalState,
} from "./providers/GlobalStateProvider";
import { HomeView } from "./views/HomeView";
import { TableView } from "./views/TableView";
import { LoginView } from "./views/LoginView";

const Private = ({ element }: { element: JSX.Element }) => {
  const { me } = useGlobalState();
  const {pathname} = useLocation();

  return me.name ? element : <Navigate to={`/login?goto=${pathname || "/"}`} />;
};

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Private element={<HomeView />} />} />
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/table/:tableId"
            element={<Private element={<TableView />} />}
          />
          <Route path="*" element={<div>404 here</div>} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
