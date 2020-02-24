


import React, { Component } from 'react';
import axios from 'axios';


class Otp extends Component {
    constructor(props){
        super(props);
        this.state={
            UDID:'000000000000001',
            otp:'',
            username:'',
            appChannel:"malaicha_android_app",
            authenticated: false,
            
        

        
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        // alert(localStorage.getItem('isOtpRequired'))

    }
    verifyOtp(){
        
            axios.post('https://hpbqa.nvizible.co.za/SARB/v4/verifyotp', 
            {  
                "otp": this.state.otp,
                "msisdn": localStorage.getItem('userName'),
                "UDID": this.state.UDID,
                "appChannel":this.state.appChannel
            }
            )
            .then(res =>{
                console.log(res)
                this.setState({
                    authenticated: true,
                
                })
                this.props.history.push('/userInfo')
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.message,
                    
                })
                // alert(err.response.data.message)
            })
        
        
        
    }
    onChange=(e)=>  {
         this.setState({otp: e.target.value});
        //  console.log(this.state.otp);
        

    }

    

    render(){
        
        return(
            <header>
            <div className="body">
             
            <form className="login-box">
               
                
                
                    <h1>OTP PAGE</h1>
                    {
                        this.state.authenticated ? <h2>Login Successful</h2> : null
                    }   
                    
                    <div className="text">
                       
                        <p>please enter otp
                            send by this number</p><br/>
                       
                    </div>
                    <div className="text">
                    
                        <input type="number" name="otp"  onChange={this.onChange} placeholder="Enter the otp"  /><br/>
                        
                    </div>
                    
                         
            </form>
             <div className="abc">             

             
            <button className="button"  onClick={()=>this.verifyOtp()}  >  submit </button>
            </div>
            </div>
            </header>
        )
    }
}
export default Otp;