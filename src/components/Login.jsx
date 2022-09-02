import React from 'react'
import { useNavigate } from 'react-router-dom';
import Post from './Post';

export default function Login(props) {

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(e);

        let username = e.target.username.value;
        let password = e.target.password.value;

        console.log(btoa(`${username}:${password}`))

        let myHeaders = new Headers();
        myHeaders.append('Authorization', "Basic " + btoa(`${username}:${password}`))

        let response = await fetch('http://localhost:5000/api/token', {headers:myHeaders});
        if (response.ok){
            console.log('ok!')
            let data = await response.json();
        console.log(data)

        // store the token and expiration in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('expiration', data.token_expiration);
        

        // change the logged in state to true
        props.login();

        // flash success message and navigate back to home
        props.flashMessage('You have successfully logged in', 'success');
        navigate('/')
        } else {
            props.flashMessage('Your username and/or password are incorrect', 'danger')
        }
        

    }
    return (
            <>
                
                <h4 className="text-center">Login</h4>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" placeholder='Enter Username' name="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder='Enter Password' name="password" />

                        <input type="submit" className="btn btn-primary w-100 mt-3" value="Login"/>
                    </div>
                </form>
            </>
    )
}
