import Header from "../Components/Header"
import Footer from "../Components/Footer"
import React, { useState } from 'react';

import { getDatabase, ref as dbRef, set } from "firebase/database";
import { getDownloadURL, ref , getStorage, uploadBytesResumable } from "firebase/storage"

import { initializeApp } from "firebase/app";


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


function SignUp() {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthdate] = useState('');
  const [ageValue, setAge] = useState(18);
  const [occupation, setOccupation] = useState('');
  const [image, setFile] = useState("");
  const [url, setURL] = useState("");
  const [emailId, setEmail] = useState('');
  const [userPass, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  // progress

  const [percent, setPercent] = useState(0);
  const calculate_age = (dob1) => {    
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument    
    var age_now = today.getFullYear() - birthDate.getFullYear();    
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
  }

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleBirthDate(event) {    
    setAge(calculate_age(event.target.value));
    setBirthdate(event.target.value);
  }

  function handleChange(event) {
   
    setAge(event.target.value);
  }
  function handleImage(event) {
    if (event.target.files[0])
      setFile(event.target.files[0]);
  }

  function handleOccupation(event) {
    setOccupation(event.target.value);
  }

  function handleEmailId(event) {
    setEmail(event.target.value);
  }

  function handleUserPass(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPass(event) {
    setConfirmPassword(event.target.value);
  }

  


  function callSignupApi() {
    if (userPass !== confirmPassword) {
      alert("Please enter the same passowrd")
      return;
    }
    var imageUrl=""
    const storage = getStorage(app);
    const storageReference = ref(storage, 'files/' + image.name);
    
      if (!image) {
        alert("Please upload an image first!");
      }
      const metadata = {
        contentType: 'image/jpeg'
      };
      
      
  
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageReference, image, metadata);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
  
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            window.location.reload();
            //alert(url)
          });
        }
      );
      
    
    const db = getDatabase()
    const key = emailId.replaceAll(".", "_")
    console.log("inserting with key: " + key)
    
    set(dbRef(db, 'users/' + key), {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      userAge: ageValue,
      occupation: occupation,
      image: 'files/' + image.name,
      emailId: emailId,
      userPass: userPass
    });
    console.log("sign up completed")
    alert("Sign up completed.")
    //window.location.reload();
  }

  return (
    <div className="App">
      <Header />
      <div className="signup">
        <label>First Name</label>
        <input type="text" name="firstName" onChange={handleFirstName}></input>
        <label>Last Name</label>
        <input type="text" name="lastName" onChange={handleLastName}></input>
        <label>Date of Birth</label>
        <input type="date" name="birthDate" onChange={handleBirthDate}></input>
        <label>Age</label>
        <input type="range" name="userAge" min="0" max="100" value={ageValue} onChange={handleChange} class="slider" ></input>
        <p>{ageValue}</p>
        <label>Occupation</label>
        <select name="occupation" onChange={handleOccupation}>
          <option value="">-- Select an Occupation --</option>
          <option value="student">Student</option>
          <option value="job">Job</option>
          <option value="business">Business</option>
        </select>
        <label>Profile Image</label>
        <input type="file" name="image" onChange={handleImage}></input>
        <label>Email</label>
        <input type="email" name="emailId" require onChange={handleEmailId}></input>
        <label>Password</label>
        <input type="password" name="userPass" onChange={handleUserPass}></input>
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" onChange={handleConfirmPass}></input>
        <button onClick={callSignupApi}>Sign up</button>

        

      </div>
      <Footer />
    </div>
  )
}


export default SignUp