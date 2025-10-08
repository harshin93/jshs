import {Link} from 'react-router-dom'

function Footer(){
    return (
        <div className="Footer">
    
      <h1 style={{ color: "green", 
                   textAlign: "center"}}>
        JSHS: Jobs Hunting Portal
      </h1>
      <p style={{ color: "blue", 
                   textAlign: "center"}}>JSHS: Jobs Hunting Portal. A web app develooped in React, Node, JS and CSS. </p>
      <p style={{ color: "blue", 
                   textAlign: "center"}}>Author: Harshin Mehta. I am a student in Humber College enrolled in WDDM: Web Design and Developing. <br />
                   I have created this web app to learn about api integration, React and Node Express. <br />
                   <h3><Link style={{color: "blue"}} to="/ContactUs">ContactUs</Link></h3>
                   </p>
        </div>
    )
}

export default Footer