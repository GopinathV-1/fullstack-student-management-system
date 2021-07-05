import React from 'react'
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap';

const Error403 = () => {
    const history = useHistory();
    return (
        <div>
            <h2 className="message content-section col-md-8">
                Sorry... You do not the have permissiom to perform this operation
            </h2>
            <Button className="btn btn-dark m-5" onClick={()=>{history.push('/')}}>Goto Home</Button>
        </div>
    )
}

export default Error403
