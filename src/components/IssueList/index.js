import React from "react";

import Moment from "react-moment";
import Badge from 'react-bootstrap/Badge'
import {Col, Row} from 'react-bootstrap'


const IssueList = ({ issues, showDetail }) => {
  return (
    <div>
      {issues.map((issue) => (
        <IssueDetail
          key={issue.id} issue={issue} showDetail={showDetail}
        />
      ))}
    </div>
  );
};

const IssueDetail = ({ issue, showDetail }) => {

  return <div>
    <article onClick={() => showDetail(issue)}>
      <Row>
      <Col sm={4} > 
        <h3 className="left-style">#{issue.number}
        <img
        className="avatar-style"
        src={issue.user.avatar_url}
        alt="avatar"
      />
      </h3> 
      </Col>
      <Col sm={8} >
      <h4>{issue.title}</h4>
      
      <p className="text-muted" style={{ marginBottom: "0px" }}>@{issue.user.login} <span>Last Update: <Moment fromNow>{issue.updated_at}</Moment> </span> <span>Comments: {issue.comments} </span></p>
      <p style={{ marginBottom: "0px" }}>
        {issue.body.slice(0, 100)}
      </p>
      <p >
          {issue.labels.map((label) =>
            <span><Badge variant="secondary">{label.name}</Badge> </span>
          )}
        </p>
        

      </Col>
      </Row>
      
      
    </article>




  </div>
}

export default IssueList;
