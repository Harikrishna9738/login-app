


import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            UDID:'000000000000001',
            pin:'',
            appVersion: "4.0.0",
            username:'',
            appChannel:"malaicha_android_app",
            authenticated: false,
            nErr: false,
            pErr: false,
            errorMessage: '',
            loading:false

        
        }
        
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        localStorage.clear();
    }
    login (){
        
        this.setState({loading:true})
        
            axios.post('https://hpbqa.nvizible.co.za/SARB/v4/login', 
            {  
                "pin": this.state.pin,
                "username": this.state.username,
                "UDID": this.state.UDID,
                "appVersion": this.state.appVersion,
                "appChannel":this.state.appChannel
            }
            )
            .then(res =>{
                localStorage.setItem('userName',this.state.username)
                var httpRes = res.data;
                // localStorage.setItem("isOtpRequired", httpRes.data.OTPVerificationRequired);
                this.setState({
                    authenticated: true,
                    loading: false
                })
                if(httpRes.data.OTPVerificationRequired){
                    this.props.history.push('/otp')
                }else{
                    this.props.history.push('/userinfo')
                }
            })
            .catch(err => {
                this.setState({
                    pErr: true,
                    errorMessage: err.response.data.message,
                    loading: false
                })
                // alert(err.response.data.message)
            })
        
        
        
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value, nErr: false ,pErr:false});
        console.log(this.state);
      

    }

    formCheck = () => {
        
    }

    render(){
        
        return(
            <header>
            <div className="body">
             {this.state.loading && <div id="loader"></div>}   
            <form className="login-box">
               
                
                
                    <h1>LOGIN PAGE</h1>
                    {
                        this.state.authenticated ?  this.props.history.push('/userInfo') : null
                    }   
                    
                    <div className="text">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <input type="text" name="username"  onChange={this.onChange} placeholder="Enter the username" value={this.state.username} /><br/>
                        {
                            this.state.nErr ? <span> {this.state.errorMessage} </span> : null 
                        }
                    </div>
                    <div className="text">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                        <input type="password" name="pin"  onChange={this.onChange} placeholder="Enter the pin" value={this.state.pin} /><br/>
                        {
                            this.state.pErr ? <span> {this.state.errorMessage} </span> : null 
                        }
                    </div>
                    
                          {/* <div className="itag">
                         <i className="fa fa-refresh fa-spin"></i>
                         </div>
                     */}
                    
                    
                    {/* <input type="button" className="button" name="login" onClick={this.login}    value="submit"/> */}
                    {/* <button className="button" onClick={this.login}  >  submit </button> */}
               
            </form>
             <div className="abc">             

             
            <button className="button" onClick={this.login}  >  submit </button>
            </div>
            </div>
            </header>
        )
    }
}
export default Login;