import React, {useEffect} from 'react';
import AssignmentForm from './AssignmentForm';
import axios from "axios";
import { useCookies } from 'react-cookie';

const AddAssignment = ({ history, assignments, setAssignments }) => {
  const [token] = useCookies(['mytoken']);

  const handleOnSubmit = async (assignment) => {
    await axios({
      method: 'post',
      url: 'http://localhost:8000/viewset/assignments/',
      headers:{
        'Content-Type':'application/json',
        Authorization: `Token ${token['mytoken']}`
      },
      data: assignment
    }).then((response) => {
      localStorage.removeItem('firstLoad');
      history.push('/');
    }).catch((error) => {
        switch (error.response.status) {
            case 403:
                history.push('/error403')
                break
            default:
                break
         }
      });
  };
  useEffect(()=>{
  if(!token['mytoken']){
    history.push('/login');
  }
  },[token])

  return (
    <React.Fragment>
      <AssignmentForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddAssignment;
