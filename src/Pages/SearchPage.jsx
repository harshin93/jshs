import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { Form } from "react-router-dom";
import { useState } from "react";



function SearchPage() {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [countryCode, setCountry] = useState("ca");
  const [resultsPage, setResultsPage] = useState("10"); 

  async function callApi () {
    const apiUrl = `http://api.adzuna.com/v1/api/jobs/${countryCode}/search/1?app_id=f38d76c9&app_key=984c129b2c177125936035882babf553&results_per_page=${resultsPage}&what=${jobTitle}&where=${location}&content-type=application/json`;
    const resp = await fetch(apiUrl)
    .then(response => response.json());
    setJobs(resp.results);
  }

  const handleJobTitle = (event) => {
    setJobTitle(event.target.value);
  }

  const handleLocation = (event) => {
    setLocation(event.target.value);
  }

  const handleCountry = (event) => {
    setCountry(event.target.value);
  }

  const handleResultsPage = (event) => {
    setResultsPage(event.target.value);
  }

    return (
      <div className="App">
        <Header/>
          <div className="searchSection">
              <label>Job Title</label>
              <input type="text" name="jobTitle" onChange={handleJobTitle} />
              <label>Location</label>
              <input type="text" name="location" onChange={handleLocation} />
              <label>Country Code</label>
              <input type="text" name="countryCode" placeholder="ca gb us in" onChange={handleCountry} />
              <label>Results per page</label>
              <input type="text" name="resultsPage" placeholder="10 or 15" onChange={handleResultsPage} />
            <button onClick={callApi}>Search Result</button>
          </div>
          <div className="result">
            <h1>Results:</h1> <br />
            {jobs.length !== 0 && jobs.map((job,index) => 
              <>
                <div key={index}>
                <label style={{color:"blue"}}>Title:</label>
<span>{job.title}</span><br />

<label style={{color:"pink"}}>Description:</label>
<span>{job.description}</span><br />

<label style={{color:"violet"}}>Location:</label>
<span>{job.location.display_name}</span><br />

<label style={{color:"green"}}>Company:</label>
<span>{job.company.display_name}</span><br />
                </div>
                <hr />
              </>
              )}
            </div>
            <Footer/>
        </div>
      
    )
    
  }
  
  export default SearchPage