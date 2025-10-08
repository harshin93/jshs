import Header from "../Components/Header"
import Footer from "../Components/Footer"
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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

function Login() {


  const [emailId, setEmail] = useState('');
  const [userPass, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  function handleEmailId(event) {
    setEmail(event.target.value);
  }

  function handleUserPass(event) {
    setPassword(event.target.value);
  }

  function callLoginApi() {
    console.log("entered email: " + emailId)
    console.log("entered pass : " + userPass)
    const dbRef = ref(getDatabase());
    const storage = getStorage();


    const encodedEmailId = emailId.replaceAll(".", "_");
    console.log("email" + encodedEmailId);
    get(child(dbRef, `users/${encodedEmailId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setUserInfo(snapshot.val());
        console.log("SET working? :" + userInfo)
        const starsRef = sRef(storage, snapshot.val().image)
        getDownloadURL(starsRef)
          .then((url) => {
            myImage.src = url;
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('doesnt exist')
                break;
              case 'storage/unauthorized':
                console.log('Permission Denied')
                break;
              case 'storage/canceled':
                console.log('Cancelled')
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      } else {
        console.log("No data available");
        alert("Email or Password is wrong!")
      }
    }).catch((error) => {
      console.error(error);
    });



  }

  return (
    <div className="App">
      <Header />
      <div className="login">
        <label>Email:</label>
        <input type="email" name="emailId" require onChange={handleEmailId} />
        <label>Password:</label>
        <input type="password" name="userPass" onChange={handleUserPass} />
        <button onClick={callLoginApi}>Login</button>        
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      </div>
      <div className="userInfo-container">
        {userInfo.length !== 0 &&
          <>
            <label>First name:</label>
            <input type="text" value={userInfo.firstName} /><br />

            <label>Last name:</label>
            <input type="text" value={userInfo.lastName} /><br />

            <label>Birth Date:</label>
            <input type="text" value={userInfo.birthDate} /><br />

            <label>Age:</label>
            <input type="text" value={userInfo.userAge} /><br />

            <label>Email:</label>
            <input type="text" value={userInfo.emailId} /><br />

            <label>Occupation:</label>
            <input type="text" value={userInfo.occupation} /><br />

            <label>Image:</label>
            <img height='200px' width='200px' name="myImage" src={userInfo.image}></img><br />
            <button onClick={logOut}>Log out</button>
          </>
        }
        
      
      
      {profile ? (
                <div style={{color:"black"}}>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in using Google</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
              <button onClick={() => login()}>Sign in with Google 🚀 </button>
          )}
          </div>
      <Footer />
    </div>
  )

}
export default Login