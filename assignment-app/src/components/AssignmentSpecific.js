import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AssignmentSpecific = ({ history, assignments, setAssignments }) => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({
    subject: '',
    staff: '',
    title: '',
    content: '',
    due_date: ''
  });
  const [token] = useCookies(['mytoken']);

  const getAssignment = async () => {
    const { data } =await axios.get(`http://localhost:8000/viewset/assignments/${id}/`);
    setAssignment(data);
  
  }
  useEffect(() => {
    getAssignment();
  }, [])
  const { subject, staff, title, content, due_date } = assignment;
  const handleRemoveAssignment = async () => {
    await axios({
      method: 'delete',
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
    <React.Fragment>
      <div className="row">
          <div className="col-md-8">
            <article className="content-section">
            <div className="item article-metadata">
                <h3>{subject}</h3>
                <div>
                  <Button variant="success" onClick={() => history.push(`/edit/${id}`)}>Update</Button>{' '}
                  <Button variant="danger" onClick={() => handleRemoveAssignment(id)}>Delete</Button>
                </div>
              </div>
              <div className="article-metadata">
                <h4 className="article-title">{title}</h4>
                <h6 className="article-content">{ content }</h6>
              </div>
              <div className="item">
                <p>
                  <span className="span">Due Date: </span>{new Date(due_date).toDateString()}                                   </p>
                <p>
                  <span className="span" id="space">Assigned by:</span>{staff}
                </p>
              </div>
         </article>
         </div>
    </div>
    </React.Fragment>
  );
};

export default AssignmentSpecific;