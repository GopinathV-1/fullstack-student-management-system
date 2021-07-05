import React, {useEffect} from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Formpage from './form';

function Login(){

  const [token, setToken] = useCookies(['mytoken']);
  const history = useHistory();
  const handleOnSubmit = async (auth) => {
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api-token-auth/',
            data: auth
            }).then((response) => {
            setToken('mytoken',response.data.token);
            }).catch((error) => {
        switch (error.response.status) {
            case 400:
                history.push('/loginerr')
                break
            default:
                break
            }
        });
        } ;
        useEffect(() => {
            if(token['mytoken']){
                localStorage.removeItem('firstLoad');
                history.push('/');
        }
    })
    return(
      <>
        <div className="row">
        <Formpage handleOnSubmit={handleOnSubmit} isRegister={0}/>
        <div className="col-md-6 ml-5">
            <article className="content-section">
                <h5 >If you want create an new account
                <Button variant="primary" onClick={()=>{history.push('/register')}} className="btn-dark ml-3">
                    Register Here
                </Button>
                </h5>
            </article>
        </div>
        </div>
      </>
    )
}

export default Login;