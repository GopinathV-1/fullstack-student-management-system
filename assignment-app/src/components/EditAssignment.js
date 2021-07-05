import React, {useState, useEffect} from 'react';
import AssignmentForm from './AssignmentForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const EditAssignment = ({ history, assignments, setAssignments }) => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState("");
  const [token] = useCookies(['mytoken']);

  const getAssignment = async () => {
    const { data } =await axios.get(`http://localhost:8000/viewset/assignments/${id}/`);
    setAssignment(data);
  
  }
  useEffect(() => {
    getAssignment();
  }, [])

  const handleOnSubmit = async(assignment) => {
    await axios({
      method: 'put',
      url: `http://localhost:8000/viewset/assignments/${id}/`,
      data: assignment,
      headers:{
        'Content-Type':'application/json',
        Authorization: `Token ${token['mytoken']}`
      }
    }).then((response) => {
      localStorage.removeItem('firstLoad');
      history.push('/')
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

  return (
    <div>
      <AssignmentForm handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditAssignment;
