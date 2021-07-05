import React from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Formpage from './form';

const Register = () => {
    
  const history = useHistory();
  const handleOnSubmit = async (auth) => {
        await axios({
            method: 'post',
            url: 'http://localhost:8000/viewset/users/',
            data: auth
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
        switch (error.response.status) {
            case 400:
                history.push('/registererr')
                break
            default:
                break
            }
        });
        };
    return(
        <>
        <div className="row">
        <Formpage handleOnSubmit={handleOnSubmit} isRegister={1}/>
        <div className="col-md-6 ml-5">
            <article className="content-section">
                <h5 >If you already have an account
                <Button variant="primary" onClick={()=>{history.push('/login')}} className="btn-dark ml-3">
                    Login Here
                </Button>
                </h5>
            </article>
        </div>
        </div>
        </>
    )
}

export default Register
