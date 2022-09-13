import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styling.scss';
import Button from './Button';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { isCompositeComponent } from 'react-dom/test-utils';

function List() {
 const [userData, setUserData] = useState([]);
 const [loading, setLoading] = useState(false);32
 const [user, setActiveUser] = useState(false);
 const [activeLink, setActiveLink] = useState(0);
 
 const onClickHandler =()=> {
  console.log("задіяно кнопку");
    setLoading(true);
    axios.get('https://randomuser.me/api/')
    .then(response =>{
      console.log(response.data.results);
      setUserData(response.data.results);
    }).catch((error) =>{
      console.log(error);
      setLoading(true);
    }).finally(()=>{
      setLoading(false);
      setActiveUser(true);
    })
    }

    const icons = [
      'fas fa-user fa-4x',
      'fas fa-envelope fa-4x',
      'fas fa-calendar-alt fa-4x',
      'fas fa-map-marker fa-4x',
      'fas fa-phone fa-4x',
      'fas fa-lock fa-4x',
    ]

  const PhraseGenerator = ({user})=>{
    const phrases = [
      `Привіт, мене звати ${user.name.first} ${user.name.last}`,
      `Моя електронна скринька ${user.email}`,
      `Моя дата народження ${user.dob.date.slice(0,10)}`,
      `Моя країна ${user.location.country}`,
      `Мій номер телефону ${user.phone}`,
      `Мій пароль ${user.login.password}`,
    ];
return <h1>{phrases[activeLink]}</h1>

  }

  const activeLinkHandler = (index) => {
    setActiveLink(index);
  }


  return (
    <div className="List">
      <div class="grid-container">
  <div class="grid-item">
  <p id='name_result' className='result'> 
  <Button isActive={user} clicked={onClickHandler}/>
  {loading ? (
    <h1>Завантаження...</h1>
  ):(
    <div className='app_user'>
      {userData.map((user, index) => {
        return (
          <Fragment key={user.cell}>
            <img src={user.picture.large} alt="#" />
            <PhraseGenerator user={user} />
            <div className='app_icons'>
              {icons.map((icon, index) => {
                return <i className={icon} key={index} onMouseEnter={()=> activeLinkHandler(index)}>||</i>
              })}
            </div>
          </Fragment>
        )
      })}
    </div>
  )}
  </p>
  </div>
</div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <List />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
