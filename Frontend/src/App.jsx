import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <EmployeeList />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/add"
                    element={
                        <PrivateRoute>
                            <AddEmployee />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditEmployee />
                        </PrivateRoute>
                    }
                />

            </Routes>

            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;