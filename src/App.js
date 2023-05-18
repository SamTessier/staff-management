import React, { useContext } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainScreen from './components/MainScreen';
import AllSchools from './components/AllSchools';
import CreateSchool from './components/CreateSchool';
import AllStaff from './components/AllStaff';
import AllStudents from './components/AllStudents';
import CreateStudent from './components/CreateStudent';
import CreateStaff from './components/CreateStaff';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesWithAuthentication />
      </Router>
    </AuthProvider>
  );
}

function RoutesWithAuthentication() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to my app
      </Typography>
      {currentUser === null ? (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/schools" element={<AllSchools />} />
          <Route path="/createschool" element={<CreateSchool />} />
          <Route path="/staff" element={<AllStaff />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/createstudent" element={<CreateStudent />} />
          <Route path="/createstaff" element={<CreateStaff />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </Container>
  );
}

export default App;
