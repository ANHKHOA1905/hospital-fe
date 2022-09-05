import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from "../../services/userService";

import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      isShowPassword: false,
      errMessage: ''
    };
  }

  handlOnChangeUserName(e) {
    this.setState({
      userName: e.target.value,
    });
  }
  handleOnChangePassWord(e) {
    this.setState({
      passWord: e.target.value,
    });
  }
  handleShowPassword() {
    const { isShowPassword } = this.state;
    this.setState({
      isShowPassword: !isShowPassword,
    });
  }
  async handleSubmitAccount() {
    const { userName, passWord } = this.state;
    try {
      this.setState({
        errMessage: ''
      })
      const data = await handleLoginApi(userName, passWord);
      if (data && data.errCode !== 0){
        this.setState({
          errMessage: data.message
        })
      }
      if (data && data.errCode === 0){
        this.props.userLoginSuccess({email: data.email, role_id: data.role_id})
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { userName, passWord, isShowPassword, errMessage } = this.state;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="login-content__title col-12 text-center">LOGIN</div>
            <div className="login-content__input form-group col-12">
              <label>UserName</label>
              <input
                type="text"
                placeholder=" username"
                value={userName}
                onChange={(e) => this.handlOnChangeUserName(e)}
              />
            </div>
            <div className="login-content__input form-group col-12 custom-password">
              <label>Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                value={passWord}
                onChange={(e) => {
                  this.handleOnChangePassWord(e);
                }}
              />
              <i
                className={
                  isShowPassword
                    ? `fas fa-eye custom-password__icon`
                    : `fas fa-eye-slash custom-password__icon`
                }
                onClick={() => {
                  this.handleShowPassword();
                }}
              ></i>
            </div>
            <div className="col-12" style={{
              color: "red"
            }}>
              {errMessage}
            </div>
            <div
              className="login-content__button col-12 text-center"
              onClick={() => {
                this.handleSubmitAccount();
              }}
            >
              LOGIN
            </div>
            <div className="login-content__action">
              <span>Forgot password ?</span>
              <div className="login-content__action__other">
                <label>Or Login With: </label>
                <div className="social">
                  <div className="social__login gg">
                    <i className="fab fa-google"></i>{" "}
                  </div>
                  <div className="social__login fb">
                    <i className="fab fa-facebook-f"></i>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) => {
     dispatch(actions.userLoginSuccess(userInfo))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
