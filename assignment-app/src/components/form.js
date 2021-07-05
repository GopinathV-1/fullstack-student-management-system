import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const FormPage = (props) => {
    const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [ errorMsg, setErrorMsg] = useState('');
  const { username, password } = user;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [username, password];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const auth = {
        username,
        password
      };
      props.handleOnSubmit(auth);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };
  
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
          ...prevState,
          [name]: value
        }));
  };
    return(
        <>
        <div className="col-md-8 m-5">
          <article className="content-section">
            <div className="article-metadata">
              {errorMsg && <p className="article-metadata error">{errorMsg}</p>}
              {props.isRegister?<h2>Join Today</h2>:<h2>Please Login</h2>}
            </div>
              <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                className="input-control"
                type="text"
                name="username"
                placeholder="Enter your name "
                value={username}
                onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
                <Form.Control
                className="input-control"
                type="text"
                name="password"
                placeholder="Enter password"                      
                value={password}
                onChange={handleInputChange}
                />
              </Form.Group>   
              <Button variant="primary" type="submit" className="submit-btn">                  
                {props.isRegister? <span>Register</span>:<span>Submit</span>}
              </Button>
            </Form> 
        </article>
      </div>
    </>
  )
}

export default FormPage;
