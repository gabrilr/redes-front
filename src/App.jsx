import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home"
import NotFound from "./pages/NotFound";
import LoginView from "./pages/Login";
import Form from "./pages/Form";
import Registroview from "./pages/RegistroView";


const App = () => {

  const [authorized, setAuthorized] = useState(true);

  return (
    <div>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          {authorized ? (
            <>
            <Route path="/" element={<LoginView setAuthorized={setAuthorized}/>} />
            <Route path="*" element={<NotFound/>} />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginView />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register-user" element={<Registroview />} />
              <Route path="/create" element={<Form />} />
              <Route path="/edit/:id" element={<Form />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
