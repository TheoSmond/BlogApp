import React from 'react';
import axios from 'axios';


class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state={
            login:"",
            pwd:"",
            role:"author"
        }
        this.handleLoginChange = this.handleChange.bind(this,'login');
        this.handlePasswordChange = this.handleChange.bind(this,'pwd');

    }


    handleChange = (keyName,e) => {
        this.setState({
            [keyName]:e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            login:this.state.login,
            pwd:this.state.pwd,
            role:this.state.role
        }
        console.log(user)


        axios.post('/api/users',  {login: user.login,pwd: user.pwd,role: user.role} )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() {
        return (
            <div className={"container"} onSubmit={this.handleSubmit}>
                <div className={"row justify-content-md-center"}>
                    <form id="registerForm" className="row col-4">
                        <div className="col-12">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={this.state.login} autoComplete="off" onChange={this.handleLoginChange} id="loginInput"/>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Password</label>
                            <input type="password" value={this.state.pwd} onChange={this.handlePasswordChange} className="form-control" id="passwordInput"/>
                        </div>
                        <div className="col-4">

                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary" id="submitRegister">Register</button>
                        </div>
                        <div className="col-4">

                        </div>
                    </form>
                </div>
            </div>
        )

    }


}

export default RegisterForm;