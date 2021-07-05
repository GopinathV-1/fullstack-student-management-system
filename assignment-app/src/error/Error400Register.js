import React from 'react'
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap';

const Error400Register = () => {
    const history = useHistory();
    return (
        <div>
            <h2 className="message content-section col-md-8">
                Username is already taken, Please try with another one.
            </h2>
            <Button className="btn btn-dark m-5" onClick={()=>{history.push('/register')}}>Register here</Button>
        </div>
    )
}

export default Error400Register
