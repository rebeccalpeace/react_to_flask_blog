import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        // check that the passwords match
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass){
            props.flashMessage('Your passwords do not match', 'danger')
        } else {
            console.log('passwords match!')
            // set up request to Flask App
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                    } else {
                        props.flashMessage('You have successfully registered', 'success')
                        navigate('/')
                    }
                })
        }

    }
  return (
    <>
        <h4 className="text-center">Register</h4>
        <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" placeholder='Enter Email' name="email" />
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" placeholder='Enter Username' name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" placeholder='Enter Password' name="password" />
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" className="form-control" placeholder='Confirm Password' name="confirmPass" />

                <input type="submit" className="btn btn-primary w-100 mt-3" value="Register"/>
            </div>
        </form>
    </>
  )
}
