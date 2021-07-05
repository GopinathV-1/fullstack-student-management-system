import React, {useEffect} from 'react';
import Assignment from './Assignment';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

const AssignmentsList = ({ assignments, setAssignments }) => {
   const sorted = assignments.sort((a, b) => b['id'] - a['id'])
   const [token] = useCookies(['mytoken']);

   if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }
    const history = useHistory();
    useEffect(()=>{
    if(!token['mytoken']){
      history.push('/login');
    }
  },[token])
  return (
    <React.Fragment>
      <div>
        {sorted.length ? sorted.map((assignment) => (
            <Assignment key={assignment.id} {...assignment} />
          )): <h2 className="message content-section col-md-8">Loading Please Wait.........</h2>}
      </div>
    </React.Fragment>
  );
};

export default AssignmentsList;
