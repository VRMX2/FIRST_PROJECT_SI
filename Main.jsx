import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Showemployees from './Showemployees'
import ShowServices from './ShowServices'
import ShowContarts from './ShowContarts'
import ShowConges from './ShowConges'
import ShowSalaires from './ShowSalaires'
import ShowRecres from './ShowRecres'
import LeaveBalance from './LeaveBalance'
import FormRequestConge from './FormRequestConge'
import EmployeeDetails from './EmployeeDetails'
import ShowEvaluations from './ShowEvaluations'
import Dashboards from './Dashboards'
import About from './About'
import ContactUs from './ContactUs'

function Main() {
  return (
    <BrowserRouter>
      <div className="page">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />

          {/* Protected/Employee Routes */}
          <Route path="/services/tables/all_employees" element={<Showemployees />} />
          <Route path="/services/tables/all_employees/:id" element={<EmployeeDetails />} />

          {/* Protected/Services Routes */}
          <Route path="/services/tables/all_services" element={<ShowServices />} />

          {/* Protected/Contrats Routes */}
          <Route path="/services/tables/all_contrats" element={<ShowContarts />} />

          {/* Protected/Conges Routes */}
          <Route path="/services/tables/all_conges" element={<ShowConges />} />

          {/* Protected/Salaires Routes */}
          <Route path="/services/tables/all_salaires" element={<ShowSalaires />} />

          {/* Protected/Recruitement Routes */}
          <Route path="/services/tables/all_recrs" element={<ShowRecres />} />

          {/* Protected/Gestion des Conges Routes */}
          <Route path="/services/Gestion_Conges" element={<LeaveBalance />} />
          <Route path="/services/Gestion_Conges/FormRequestConge" element={<FormRequestConge />} />


          {/* Protected/Recruitement Routes */}
          <Route path="/services/all_evaluations" element={<ShowEvaluations />} />


          <Route path="/services/Dashboeards" element={<Dashboards />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<ContactUs />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Main;
