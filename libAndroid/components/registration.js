import React, {Component} from 'react';
import {reduxStore} from '../containers/App';
import {addPost, addFeed, addYou} from '../actions/ArmDevMobileActions'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    StatusBar,
    Linking,
    AsyncStorage,
    Alert
} from 'react-native';

const {width, height} = Dimensions.get('window');
const STORAGE_KEY = 'id_token';
const options = {};

export default
class Registration extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            image: '',
            emailOrUsername: '',
            unameAvailable: false,
            wrongCredentials: false,
        }
    }
    onImageChange(image) {
        this.setState({image})
    }
    onFirstNameChange(firstName) {
        this.setState({firstName})
    }
    onLastNameChange(lastName) {
        this.setState({lastName})
    }
    onEmailChange(email) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const tested = regExp.test(email);
        if (tested) {
            this.setState({email});
        } else {
            this.setState({email: ''});
        }
    }
    async onUserNameChange(userName) {
        const checked = await this.checkUname(userName);
        if (checked) {
            this.setState({unameAvailable: true});
        } else {
            this.setState({unameAvailable: false});
        }
        this.setState({userName})
    }
    onPasswordChange(password) {
        this.setState({password})
    }
    onEmailOrUsernameChange(emailOrUsername) {
        this.setState({emailOrUsername})
    }
    cleanAll() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            emailOrUsername: '',
            wrongCredentials: false,
            unameAvailable: false
        })
    }
    async checkUname(text) {
        const unameFetchOptions = {
            method: 'post',
            headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'}),
            body: JSON.stringify({uname: text})
        };

        const fetched = await fetch('http://10.15.1.230:8080/uname_check', unameFetchOptions);
        const jsoned = await fetched.json();
        return jsoned.unameAvailable;
    }
    async _navigate(propName, name) {
        if (propName === 'toSignIn') {
            this.props.navigator.push({
                name: 'SignIn',
                rightButton: (
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginRight: 10
                    }} onPress={async() => {
                        const everythingOK = await this.sendLogin();
                        if (everythingOK) {
                            this._navigate('toFootBar', everythingOK);
                            this.cleanAll();
                        }
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: 'black'
                        }}>Done</Text>
                    </TouchableOpacity>
                ),
                leftButton: (
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginRight: 10
                    }} onPress={() => {
                        this.props.navigator.pop();
                        this.cleanAll();
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: 'black'
                        }}>X</Text>
                    </TouchableOpacity>
                ),
                passProps: {
                    onPasswordChange: (data) => this.onPasswordChange(data),
                    onEmailOrUsernameChange: (data) => this.onEmailOrUsernameChange(data)
                }
            });
        } else if (propName === 'toSignUp') {
            this.props.navigator.push({
                name: 'SignUp',
                rightButton: (
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginRight: 10
                    }} onPress={async() => {
                        const everythingOK = await this.sendSigning();
                        if (everythingOK) {
                            this.cleanAll();
                            this._navigate('toFootBar', everythingOK);
                        }
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: 'black'
                        }}>Done</Text>
                    </TouchableOpacity>
                ),
                leftButton: (
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginRight: 10
                    }} onPress={() => {
                        this.props.navigator.pop();
                        this.cleanAll();
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: 'black'
                        }}>X</Text>
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
                }
            });
        } else if (propName === 'toFootBar') {
            const DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch("http://10.15.1.230:8080/protected/get_feed", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + DEMO_TOKEN
                }
            }).then((res) => res.json()).then((res) => {
                reduxStore.dispatch(addFeed(res));
                reduxStore.dispatch(addYou(name.youInfo));
            }).then(() => reduxStore.getState().armDevMobile).then((res) => {
                this.props.navigator.resetTo({
                    name: 'FootBar',
                    passProps: {
                        _logout: () => this._logout(),
                        store: res
                    }
                });
            }).catch((err) => Alert.alert('error', `${err}`));
        }
    }
    async _onValueChange(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    async _logout() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            Alert.alert("Logout Success!");
            this.props.navigator.resetTo({name: 'Registration', passProps: {}});
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    async sendLogin() {
        const {emailOrUsername, password} = this.state;
        if (emailOrUsername.trim() && password.trim()) {
            const request_options = {
                method: 'post',
                headers: new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'}),
                body: JSON.stringify({emailOrUsername, password})
            };
            try {
                const fetched = await fetch('http://10.15.1.230:8080/user_login', request_options)
                const jsoned = await fetched.json();
                await this._onValueChange(STORAGE_KEY, jsoned.id_token);
                Alert.alert("Login Success!", "Hoorah!!")
                return jsoned;
            } catch (e) {
                console.log('err');
                Alert.alert('Error', e);
                return 0;
            }
        } else {
            Alert.alert('Oops', 'Your credentials are not right!')
            return 0;
        }
    }
    async sendSigning() {
        const {
            firstName,
            lastName,
            email,
            userName,
            password,
            unameAvailable
        } = this.state;
        const checked = await this.checkUname(userName);
        if (!unameAvailable || !checked) {
            Alert.alert('Oops!', 'this username is already registered');
            return 0;
        }
        if (firstName.trim() && lastName.trim() && email.trim() && userName.trim().length > 5 && password.trim().length > 6) {
            let data = new FormData();
            if(this.state.image){
              data.append('avatar', {
                  uri: this.state.image.path,
                  name: this.state.userName,
                  type: 'image/jpg'
              });
            }
            data.append('fullName', firstName + " " + lastName);
            data.append('email', email);
            data.append('uname', userName);
            data.append('password', password);
            const request_options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data
            }
            try {
                const fetched = await fetch('http://10.15.1.230:8080/user_registration', request_options)
                const jsoned = await fetched.json();
                await this._onValueChange(STORAGE_KEY, jsoned.id_token);
                Alert.alert("Signup Success!", "Hoorah!!")
                return jsoned;
            } catch (e) {
                console.log('err');
                Alert.alert('Error', e);
                return 0;
            }
        } else {
            Alert.alert('Oops!', 'Your credentials are not right!')
            this.setState({wrongCredentials: true});
            return 0;
        }
    }
    openGitLink() {
        const url = 'https://github.com/iteratehackerspace/ArmDevMobile';
        Linking.openURL(url).catch(err => console.error('An error occurred while opening link', err));
    }
    render() {
        return (
            <View style={style.container}>
                <StatusBar backgroundColor="#bf0e0e" barStyle="light-content"/>
                <View style={{
                    width: 0.8 * width,
                    height: 0.6 * height
                }}>
                    <View style={{
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        <Text style={{
                            fontSize: 30,
                            color: '#bf0e0e'
                        }}>ArmDev</Text>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            marginBottom: 20
                        }}>The best community for Armenian developers</Text>
                    </View>
                    <View style={{
                        marginBottom: 10
                    }}>
                        <Button title='Sign in' onPress={() => this._navigate('toSignIn')}/>
                    </View>
                    <View style={{
                        marginBottom: 10
                    }}>
                        <Button title='Sign up' onPress={() => this._navigate('toSignUp')}/>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 11,
                            color: '#867770'
                        }}>Our project is fully open-source,</Text>
                        <Text style={{
                            fontSize: 11,
                            color: '#867770'
                        }}>you can find it:</Text>
                        <TouchableOpacity onPress={() => {
                            this.openGitLink()
                        }}>
                            <Text style={{
                                color: 'blue'
                            }}>
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
        marginTop: 0.05 * height
    }
});
