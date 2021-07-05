import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';

const AssignmentForm = (props) => {
  const {id} = useParams();
  const [assignment, setAssignment] = useState({
    subject: '',
    staff: '',
    title: '',
    content: '',
    due_date: ''
  });
  const getAssignment = async () => {
    if(id){
    const { data } =await axios.get(`http://localhost:8000/viewset/assignments/${id}/`);
    setAssignment(data);
    }
  }

  useEffect(()=>{
    if(id){
      getAssignment();
    }
  },[])

  const [errorMsg, setErrorMsg] = useState('');
  const { subject, staff, title, content, due_date } = assignment;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [subject, staff, title, content, due_date];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const assignment = {
        subject,
        staff,
        title,
        content,
        due_date
      };
      props.handleOnSubmit(assignment);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignment((prevState) => ({
          ...prevState,
          [name]: value
        }));
  };

  return (
    <div className="row">
    <div className="col-md-8 m-5">
    <article className="content-section">
      {errorMsg && <p className="article-metadata error">{errorMsg}</p>}
      <div className="article-metadata">
        <h2>
          Assignment Details
        </h2>
      </div>

      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          {console.log('printed',assignment)}
          <select
            className="ml-3"
            name="subject"
            value={subject}
            onChange={handleInputChange}
          >
            <option value="">Subject</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option selected value="Maths">Maths</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </Form.Group>
        <Form.Group controlId="staff">
          <Form.Label>Staff</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="staff"
            value={staff}
            placeholder="Enter name of staff"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="title"
            value={title}
            placeholder="Enter title of assignment"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content  </Form.Label>
          <textarea
            className="input-control"
            type="textarea"
            name="content"
            value={content}
            placeholder="Enter work to be done"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="duedate">
          <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              placeholder="Due date"
              value={due_date}
              onChange={handleInputChange}
            />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </article>
    </div>
    </div>
  );
};

export default AssignmentForm;