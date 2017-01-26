import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
  Linking
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default
class Registration extends Component {
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      image: '',
      unameAvailable: false,
      wrongCredentials: false,
    }
  }
  onImageChange(image){
    this.setState({image})
  }
  onFirstNameChange(firstName){
    this.setState({firstName})
  }
  onLastNameChange(lastName){
    this.setState({lastName})
  }
  onEmailChange(email){
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const tested = regExp.test(email);
    if(tested){
      this.setState({email});
    }else{
      this.setState({email: ''});
    }
  }
  async onUserNameChange(userName){
    const checked = await this.checkUname(this.state.userName);
    if(checked){
      this.setState({unameAvailable: true});
    }else{
    }
    this.setState({userName})
  }
  onPasswordChange(password){
    this.setState({password})
  }
  onEmailOrUsernameChange(emailOrUsername){
    this.setState({emailOrUsername})
  }
  cleanAll(){
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      emailOrUsername: '',
      wrongCredentials: false,
      unameAvailable: false,
    })
  }
  async checkUname(text){
    const unameFetchOptions = {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body:JSON.stringify({
        uname: text,
      }),
    };
    const fetched = await fetch('http://192.168.1.212:8080/uname_check', unameFetchOptions);
    const jsoned = await fetched.json();
    return jsoned.unameAvailable;
  }
  _navigate(propName, name) {
    if(propName === 'toSignIn'){
      this.props.navigator.push({
        name: 'SignIn',
        rightButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => {
              this._navigate('toFootBar');
              this.cleanAll();
            }}>
          <Text style={style.headerText}>Done</Text>
          </TouchableOpacity>
        ),
        leftButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => {
              this.sendSigning();
              this.props.navigator.pop();
              this.cleanAll();
            }}>
          <Text style={style.headerText}>X</Text>
          </TouchableOpacity>
        ),
        passProps: {
          onPasswordChange: (data) => this.onPasswordChange(data),
          onEmailOrUsernameChange: (data) => this.onEmailOrUsernameChange(data),
        },
      });
    }else if(propName === 'toSignUp'){
      this.props.navigator.push({
        name: 'SignUp',
        rightButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={async () => {
              const everythingOK = await this.sendSigning();
              console.log(this.state.wrongCredentials);
              if(everythingOK){
                this.cleanAll();
                this._navigate('toFootBar');
              }
            }}>
            <Text style={style.headerText}>Done</Text>
          </TouchableOpacity>
        ),
        leftButton: (
          <TouchableOpacity 
            style={style.headerTextContainer}
            onPress={() => {
              this.props.navigator.pop();
              this.cleanAll();
            }}>
            <Text style={style.headerText}>X</Text>
          </TouchableOpacity>
        ),
        passProps: {
          onFirstNameChange: (data) => this.onFirstNameChange(data),
          onLastNameChange: (data) => this.onLastNameChange(data),
          onEmailChange: (data) => this.onEmailChange(data),
          onUserNameChange: (data) => this.onUserNameChange(data),
          onPasswordChange: (data) => this.onPasswordChange(data),
          onImageChange: (data) => this.onImageChange(data),
          wrongCredentials: this.state.wrongCredentials
        },
      });
    }else if(propName === 'toFootBar'){
        this.props.navigator.push({
          name: 'FootBar',
          passProps: {
          },
        });
    }
  }
  sendSigning(){
    const {
      firstName, 
      lastName, 
      email, 
      userName, 
      password, 
      unameAvailable 
    } = this.state;
    if(
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      userName.trim().length > 5 &&
      password.trim().length > 6 &&
      unameAvailable
    ){
      const request_options = {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify({
          fullName : firstName + " " + lastName,
          email : email,
          uname: userName,
          password: password
        })
      };
      fetch('http://192.168.1.212:8080/user_registration', request_options);
      return 1;
    }else{
      this.setState({wrongCredentials: true});
      return 0;
    }
  }
  openGitLink() {
    const url = 'https://github.com/iteratehackerspace/ArmDevMobile';
    Linking.openURL(url)
    .catch(err => console.error('An error occurred while opening link', err));
  }
  render(){
    return(
      <View style={style.container}>
       <StatusBar backgroundColor="#bf0e0e" barStyle="light-content" />
        <View style={style.smallContainer}>
          <View style={style.titleContainer}>
            <Text style={style.title}>ArmDev</Text>
          </View>
          <View style={style.phraseContainer}>
            <Text style={style.phrase}>The best community for Armenian developers</Text>
          </View>
          <View style={style.button}>
            <Button 
              title='Sign in'
              onPress={() => this._navigate('toSignIn')}
            />
          </View>
          <View style={style.button}>
            <Button 
              title='Sign up'
              onPress={() => this._navigate('toSignUp')}
            />
          </View>
          <View style={style.openSourceContainer}>
            <Text style={style.openSource}>Our project is fully open-source,</Text>
            <Text style={style.openSource}>you can find it:</Text>
            <TouchableOpacity 
              onPress={() => {this.openGitLink()}}>
                <Text style={style.linkStyle}>
                  HERE
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d6c9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.05 * height,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    color: '#bf0e0e'
  },
  smallContainer: {
    width: 0.8 * width,
    height: 0.6 * height
  },
  openSourceContainer: {
    alignItems: 'center'
  },
  openSource: {
    fontSize: 11,
    color: '#867770'
  },
  phraseContainer: {
    alignItems: 'center'
  },
  phrase: {
    marginBottom: 20
  },
  button: {
    marginBottom: 10
  },
  linkStyle: {
    color: 'blue'
  },
  headerTextContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 17,
    color: 'black',
  },
});
