import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import {  getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDg8jWT72B8kUi1OsBzMZXgAH8wccJQ-NE",
    authDomain: "jshs-dd408.firebaseapp.com",
    databaseURL: "https://jshs-dd408-default-rtdb.firebaseio.com", 
    projectId: "jshs-dd408",
    storageBucket: "jshs-dd408.appspot.com",
    messagingSenderId: "93246688832",
    appId: "1:93246688832:web:169760e9d7088bb43319a5"
  };
  
const app = initializeApp(firebaseConfig);

function ContactUs() {
  
    const [emailId, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [textArea, setTextArea] = useState('');
  
    function handleFirstName(event) {
      setFirstName(event.target.value);
    }
  
    function handleEmailId(event) {
        setEmail(event.target.value);
    }
  
    function handletextArea(event) {
        setTextArea(event.target.value);
    }

    function callSubmitApi(){
        const db = getDatabase()
        const id = Math.floor(Math.random()*1000)
        console.log("id: "+id)
        set(ref(db, 'fromdata/'+ id), {
            name: firstName,
            email: emailId,
            msgContent: textArea
          });
          console.log("inserted")
          alert("Message Sent Successfully!")
          window.location.reload();
        }
   

    return (
        <div className="App">
            <Header />
            
    <div class="ContactUs">
        
            <div class="alert">Your Message Sent</div>
            <div class="inputBox">
                <input type="text" name="firstName" placeholder="Name" onChange={handleFirstName} />
            </div>
            <div class="inputBox">
            <input type="email" name="emailId" placeholder="Email" require  onChange={handleEmailId} />
            </div>
            <div class="inputBox">
                <textarea id="msgContent" name="textArea" cols="30" rows="10" placeholder="Message" onChange={handletextArea}></textarea>
            </div>
            <div class="inputBox">
                <button onClick={callSubmitApi}>Submit</button>
            </div>
        
            </div>
            <Footer />
        </div>
    )
}

export default ContactUs