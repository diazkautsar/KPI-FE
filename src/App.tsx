import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

import { getToken } from './utils/token';

import LoginPage from './components/Login';
import DashboardPage from './components/Dashboard';
import CoursePage from './components/Course';
import ModulesPage from './components/Modules';

import FormCourse from './components/FormCourse';
import FormModules from './components/FormModules';

import './App.css';

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }: PrivateRouteProps) => {
    const token = getToken();
    return token ? <>{Component}</> : <Navigate to="/" replace />;
};

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthLayout>
                        <LoginPage />
                    </AuthLayout>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute
                        element={
                            <DashboardLayout>
                                <DashboardPage />
                            </DashboardLayout>
                        }
                    />
                }
            />

            <Route
                path="/dashboard/course/add"
                element={
                    <PrivateRoute
                        element={
                            <DashboardLayout>
                                <FormCourse />
                            </DashboardLayout>
                        }
                    />
                }
            />

            <Route
                path="/dashboard/course"
                element={
                    <PrivateRoute
                        element={
                            <DashboardLayout>
                                <CoursePage />
                            </DashboardLayout>
                        }
                    />
                }
            />

            <Route
                path="/dashboard/module"
                element={
                    <PrivateRoute
                        element={
                            <DashboardLayout>
                                <ModulesPage />
                            </DashboardLayout>
                        }
                    />
                }
            />

            <Route
                path="/dashboard/module/add"
                element={
                    <PrivateRoute
                        element={
                            <DashboardLayout>
                                <FormModules />
                            </DashboardLayout>
                        }
                    />
                }
            />
        </Routes>
    );
}

export default App;
