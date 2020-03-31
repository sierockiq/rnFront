import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from '../../components/Login/Login';
import { Actions } from 'react-native-router-flux';
import {getLatLngFromAdresse} from '../../lib/localization';
import axios from "axios";
import config from "../../constants/config";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = { error: null, success: null, loading: false };
  }

  /**
   * On Form Submission
   */
  onFormSubmit = async (data) => {
    const {onLoginSuccess} = this.props;
    this.setState({ success: null, error: null, loading: true });
    console.log(data)
    try{
      let response = await axios.post(config.apiBaseUrl+"/login", data);
      if(response.status == 200 && response.data){
        this.setState({ success:"Vous vous êtes connecté avec succés.", error: null, loading: false });
        onLoginSuccess(response.data);
      }else{
        throw new Error("Un problème s'est déroulé lors de votre connexion. Veuillez réessayer.")
      }
    }catch(error){
      console.log(error)
      this.setState({ loading: false, success: null, error: error.message });
    }
  }

  /**
   * Render
   */
  render = () => {
    const { error, loading, success } = this.state;
    return (
      <Login
        error={error}
        loading={loading}
        success={success}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

LoginContainer.propTypes = {
  onLoginSuccess :PropTypes.func.isRequired
};


export default LoginContainer;
