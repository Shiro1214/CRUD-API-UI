//import logo from './logo.svg';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import StudentList from './components/StudentList';
import SearchComponent from './components/SearchComponent';
import PersonCreate from './components/PersonCreate';
import HomePage  from './components/Home';  
import Person from './components/Person';
import CoursesList from './components/CoursesList';
import CourseCreate from './components/CourseCreate';
import Course from './components/Course';
import TeacherList from './components/TeacherList';
import PersonEdit from './components/PersonEdit';
import CourseEdit from './components/CourseEdit';
//the app will run and get a list of person
function App() {
  return (
      <div className="App">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div class="container-fluid">
              <Link to="/" className="navbar-brand">DevPlat</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <Link to="/students" className="nav-link">List of Students</Link>
                </li>
                <li class="nav-item">
                  <Link to="/teachers" className="nav-link">List of Teachers</Link>
                </li>
                <li class="nav-item">
                  <Link to="/search" className="nav-link">Search Person</Link>
                </li>
                <li class="nav-item">
                  <Link to="/courses" className="nav-link">Courses</Link>
                </li>
                {/*<li class="nav-item">
                <Link to="/create" className="nav-link">Create Person</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/students" element = {<StudentList />} />
          <Route path="/search" element = {<SearchComponent />} />
          <Route path="/create" element = {<PersonCreate />} />
          <Route path="/person" element = {<Person />} />
          <Route path="/course" element = {<Course />} />
          <Route path="/courses" element = {<CoursesList />} />
          <Route path="/courseCreate" element = {<CourseCreate />} />
          <Route path="/teachers" element = {<TeacherList />} />
          <Route path="/personEdit" element = {<PersonEdit />} />
          <Route path="/courseEdit" element = {<CourseEdit />} />
        </Routes>
      </div>
  );
  /*

          <nav>
          <ul>
            <li>
              <Link to="/list">List of Persons</Link>
            </li>
            <li>
              <Link to="/search">Search Person</Link>
            </li>
            <li>
              <Link to="/create">Create Person</Link>
            </li>
          </ul>
        </nav>
   return (
    <div className="App">
      <SearchComponent />
      <PersonList />
      <PersonCreate />
    </div>
  );
  
  */
 
}

export default App;