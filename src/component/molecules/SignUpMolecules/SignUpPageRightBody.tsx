import React, { useEffect, useState } from "react";
import "./SignUpPageRightBody.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyDispatch, MyUseSelector } from "../../../store";
import { fetchManagerRegister } from "../../../store/feature/userSlice";
import { IBaseResponse } from "../../../models/IBaseResponse";
import { fetchCompanyList } from "../../../store/feature/companySlice";
import { ICompanyNameResponse } from "../../../models/ICompanyNameResponse";

function SignUpPageRightBody() {
  const dispatch = useDispatch<MyDispatch>();
  const navigate = useNavigate();

  const companyNameList = MyUseSelector(
    (state) => state.company.companyNameList
  );
  useEffect(() => {
    dispatch(fetchCompanyList());
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Şifre görünürlüğünü değiştirir
  };

  const saveManager = async () => {
    const response = await dispatch(
      fetchManagerRegister({
        companyName,
        email,
        name,
        surname,
        gender,
        password,
        rePassword,
        birthDate,
        department,
        title,
      })
    );

    const payload = response.payload as IBaseResponse;
    if (payload?.code === 200) {
      navigate("/sign-in");
    }
  };
  return (
    <div className="col col-right-sign-up">
      <div className="row-right-sign-up">
        <h2 className="header-sign-up">Manager Registration</h2>
      </div>
      <div className="row-sign-up">
        <hr className="hr-1-sign-up" />
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Company Name
        </label>
      </div>
      <div className="row-right-sign-up">
        <select
          className="form-select form-select-sign-up"
          aria-label="Default select example"
          onChange={(evt) => {
            setCompanyName(evt.target.value);
          }}
          value={companyName}
        >
          <option selected>Company Name</option>
          {companyNameList?.map((name: string, index: number) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Deparment
        </label>
      </div>
      <div className="row-right-sign-up">
        <select
          className="form-select form-select-sign-up"
          aria-label="Default select example"
          onChange={(evt) => {
            setDepartment(evt.target.value);
          }}
          value={department}
        >
          <option selected disabled>
            Deparment
          </option>
          <option value="HR">HR</option>
          <option value="FINANCE">FINANCE</option>
          <option value="MARKETING">MARKETING</option>
          <option value="SALES">SALES</option>
          <option value="IT">IT</option>
          <option value="LEGAL">LEGAL</option>
          <option value="RESEARCH">RESEARCH</option>
          <option value="ENGINEERING">ENGINEERING</option>
          <option value="ADMINISTRATION">ADMINISTRATION</option>
          <option value="PRODUCTION">PRODUCTION</option>
        </select>
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Title
        </label>
      </div>
      <div className="row-right-sign-up">
        <input
          type="text"
          className="form-control form-mail-sign-up"
          id="exampleFormControlInput1"
          placeholder="Title"
          onChange={(evt) => {
            setTitle(evt.target.value);
          }}
          value={title}
        />
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Company mail address
        </label>
      </div>
      <div className="row-right-sign-up">
        <input
          type="email"
          className="form-control form-mail-sign-up"
          id="exampleFormControlInput1"
          placeholder="name@company.com"
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
          value={email}
        />
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Name
        </label>
      </div>
      <div className="row-right-sign-up">
        <input
          type="text"
          className="form-control form-mail-sign-up"
          id="exampleFormControlInput1"
          placeholder="Name"
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          value={name}
        />
      </div>
      <div className="row-right">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Surname
        </label>
      </div>
      <div className="row-right-sign-up">
        <input
          type="text"
          className="form-control form-mail-sign-up"
          id="exampleFormControlInput1"
          placeholder="Surname"
          onChange={(evt) => {
            setSurname(evt.target.value);
          }}
          value={surname}
        />
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Birthdate
        </label>
      </div>
      <div className="row-right-sign-up">
        <input
          type="date"
          className="form-control form-mail-sign-up"
          id="exampleFormControlInput1"
          onChange={(evt) => {
            setBirthDate(evt.target.value);
          }}
          value={birthDate}
        />
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-text-sign-up"
        >
          Gender
        </label>
      </div>
      <div className="row-right-sign-up">
        <select
          className="form-select form-select-sign-up"
          aria-label="Default select example"
          onChange={(evt) => {
            setGender(evt.target.value);
          }}
          value={gender}
        >
          <option selected disabled>
            Gender
          </option>
          <option value="MAN">MAN</option>
          <option value="WOMAN">WOMAN</option>
          <option value="OTHER">OTHER</option>
        </select>
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-password-sign-up"
        >
          Password
        </label>
      </div>
      <div className="row-right-sign-up pass-icon-sign-up">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control form-password-sign-up"
          id="exampleFormControlInput1"
          placeholder="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
          value={password}
        ></input>
        <i
          className={`fa ${
            showPassword ? "fa-eye-slash sign-up-icon" : "fa-eye sign-up-icon"
          }`}
          onClick={togglePasswordVisibility}
        ></i>
      </div>
      <div className="row-right-sign-up">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label-password-sign-up"
        >
          Re-Password
        </label>
      </div>
      <div className="row-right-sign-up pass-icon-sign-up">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control form-password-sign-up"
          id="exampleFormControlInput1"
          placeholder="re-password"
          onChange={(evt) => {
            {
              setRePassword(evt.target.value);
            }
            if (evt.target.value === password) setIsWrong(false);
            else setIsWrong(true);
          }}
          value={rePassword}
        ></input>
      </div>
      <div className="row-right-sign-up">
        {password !== "" &&
          (isWrong ? (
            <label className="text-danger text-danger-sign-up">
              Passwords don't match!
            </label>
          ) : null)}
      </div>
      <div className="row-btn row-right-sign-up">
        <button
          className="btn gradient-button-sign-up submit-button-sign-up"
          onClick={saveManager}
          disabled={password !== rePassword || password === ""}
        >
          <span style={{ color: "white" }}>Submit</span>
        </button>
      </div>
    </div>
  );
}

export default SignUpPageRightBody;
