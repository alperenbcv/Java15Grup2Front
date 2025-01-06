import React from "react";
import "./SignInPageRightBody.css";
import CyberPunkLogo from "../../atoms/GetStartedButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../../store";
import { fetchGetProfile, fetchLogin } from "../../../store/feature/userSlice";
import { useNavigate } from "react-router-dom";
import { PayloadAction } from "@reduxjs/toolkit";
import { IBaseResponse } from "../../../models/IBaseResponse";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

function SignInPageRightBody() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isMailEmpty, setIsMailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<MyDispatch>();
  const navigate = useNavigate();
  const login = () => {
    setIsMailEmpty(email === "");
    setIsPasswordEmpty(password === "");
    if (email === "" || password === "") {
      setIsEmpty(true);
      return;
    } else setIsEmpty(false);

    dispatch(fetchLogin({ email, password })).then((data:any) => {
      if (data.payload.code === 200) {
        dispatch(fetchGetProfile());
        navigate("/manager-dashboard");
      }
    });
  };

  

  return (
    <div className="col col-right">
      <div className="row-right">
        <h2 className="header" style={{fontSize:'2em', marginBottom:'30px'}}>Sign in with email</h2>
      </div>
      {isEmpty ? (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Warning</h4>
          <hr />
          <p>Email or password can't be empty!</p>
        </div>
      ) : null}
      <div className="row-right">
        <label           style={{fontSize: '1em'}}
  htmlFor="exampleFormControlInput1" className="form-label-email">
          Email address
        </label>
      </div>
      <div className="row-right">
        <Input 
        className="large-placeholder"
        style={{height: '50px', fontSize: '1em'}}
         placeholder="name@example.com"
         id="exampleFormControlInput1"
         onChange={(evt) => {
          setEmail(evt.target.value);
        }}
        value={email}
        />
      </div>

      <div className="row-right">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-password"
          style={{fontSize: '1em'}}
        >
          Password
        </label>
      </div>
      <div className="row-right" >
        <Input.Password
        className="large-placeholder"
          style={{height: '50px', fontSize: '1em'}}
          id="exampleFormControlInput1"
          placeholder="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
          value={password}
          iconRender={(visible)=>visible?<EyeTwoTone/>:<EyeInvisibleOutlined/>}
          />
         
         
      </div>
      <div className="row">
        <a className="forgot-link my-1" href="">
          I forgot password
        </a>
        <a className="forgot-link my-1" href="/sign-up">
          I don't have an account
        </a>
      </div>
      <div className="row-btn my-1">
        <button className="btn gradient-button submit-button" onClick={login}>
          <span style={{ color: "white" }}>Submit</span>
        </button>
      </div>
    </div>
  );
}

export default SignInPageRightBody;
