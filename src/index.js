import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import theme from '../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/UI/Loading';
import RegistrationContainer from './containers/Login/RegistrationContainer';
import LoginContainer from './containers/Login/LoginContainer';
import deviceStorage from "./lib/device-storage";
import axios from 'axios';
import config from './constants/config';

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, showLogin:false, user:null  };
  }

  async componentDidMount() {
    SplashScreen.hide();
    try{
      let token = await deviceStorage.loadJWT("token");
      console.log("token"+token)
      let response = await axios.get(config.apiBaseUrl+"/isTokenValid",{headers: {'token': token}});
      console.log(response)
      if(response.status == 200 && response.data){
        this.setState({ token : token ,loading:false});
      }else{
        this.setState({ showLogin : true,loading:false });
      }
    }catch(error){
      this.setState({ showLogin : true,loading:false });
    }

  }

  showLogin(){
    this.setState({ showLogin:true ,loading:false})
  }

  onLoginSuccess(userInfos){
    deviceStorage.saveKey("token",userInfos.jwtToken)
    this.setState({loading:false, showLogin:false,token:userInfos.jwtToken })
  }

  render() {
    const { loading , token, showLogin } = this.state;
    const { store, persistor } = this.props;
    console.log(this.state)
    if (loading) {
      return <Loading />;
    }
    if(showLogin){
      return <LoginContainer onLoginSuccess={this.onLoginSuccess.bind(this)}/>
    }
    if(!token){
      return <RegistrationContainer  showLogin={this.showLogin.bind(this)} />
    }

    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <Router>
                <Stack key="root">{Routes}</Stack>
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default App;
