import React, { useState } from 'react'
import "../../styles/Form.css";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import { Filler } from './Filler';
const Form = () => {

  const triggerText = 'Open form';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };

  return (
    <div className='FormContainer'>
      <div className='subCont1'>
        <div className='img'>
          <img src='https://icons-for-free.com/download-icon-business+costume+male+man+office+user+icon-1320196264882354682_512.png' />
  <div className="middle">
  <input type="file"  accept="image/png, image/gif, image/jpeg" className="custom-file-input" />
  </div>
        </div>
        <div className='input1'>
          <input type={"text"} placeholder={"Enter your full name"} />
          <input type={"text"} placeholder={"Enter your profile tagline"} />
          <br />
          <hr />
          <div className='social-media-links'>
            <table>
              <tr>
                <td>
                  <input id='contact-input' type={"number"} placeholder={"Contact Number"} />
                </td>
                <td>
                  <input id='portfolio-url-input' type={"url"} placeholder={"Portfolio Url"} />
                </td>
              </tr>
              <tr>
                <td>
                  <input id='email-id-input' type={"email"} placeholder={"Email ID"} />
                </td>
                <td>
                  <input id='linkedin-url-input' type={"url"} placeholder={"Linkedin Url"} />
                </td>
              </tr>
              <tr>
                <td>
                  <input id='address-input' type={"text"} placeholder={"Address"} />
                </td>
                <td>
                  <input id='github-url-input' type={"url"} placeholder={"Github Url"} />
                </td>
              </tr>

            </table>
          </div>
        </div>
        <div  className='input2'>
          <textarea placeholder={"Enter your about section (maximum 300 characters)"} maxLength={"300"} ></textarea>
        </div>
      </div>
      <hr />


    </div>
  )
}

export default Form
