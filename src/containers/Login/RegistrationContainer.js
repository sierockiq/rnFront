import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Registration from '../../components/Login/Registration';
import { Actions } from 'react-native-router-flux';
import {getLatLngFromAdresse} from '../../lib/localization';
import axios from "axios";
import config from "../../constants/config";

class RegistrationContainer extends Component {
  constructor() {
    super();
    this.state = { error: null, success: null, loading: false };
  }

  /**
   * On Form Submission
   */
  onFormSubmit = async (data) => {
    const {showLogin} = this.props;
    this.setState({ success: null, error: null, loading: true });
    try{
      let position = await getLatLngFromAdresse(data.adress,data.city)
      data.lat=position.lat;
      data.lng=position.lng;
      let userSaved = await axios.post(config.apiBaseUrl+"/register", data);
      this.setState({ success:"Votre user a bien été enregistré. Un mail vous a été envoyé à votre adresse afin de valider votre inscription.", error: null, loading: false });
      showLogin()
    }catch(error){
      this.setState({ loading: false, success: null, error: error.message });
    }
  }

  /**
   * Render
   */
  render = () => {
    const { error, loading, success } = this.state;
    return (
      <Registration
        error={error}
        loading={loading}
        success={success}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

RegistrationContainer.propTypes = {
  showLogin : PropTypes.func
};


export default RegistrationContainer;
