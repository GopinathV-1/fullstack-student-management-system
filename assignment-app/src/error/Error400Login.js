import React from 'react'
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Error400Login = () => {
    const history = useHistory();
    return (
        <div>
            <h2 className="message content-section col-md-8">
                Login credentials are wrong.. (or) The user does not exist .
            </h2>
            <h2 className="message content-section col-md-8">
                Please try again.... 
            </h2>
            <Button className="btn btn-dark m-5" onClick={()=>{history.push('/login')}}>Register here</Button>
        </div>
    )
}

export default Error400Login
