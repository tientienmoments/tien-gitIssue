import React from "react";

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
  
  return<div>
          <img src={issue.user.avatar_url} alt="avatar"/> 
          <h4 onClick={() => showDetail(issue)}>{issue.title}</h4>
          <h4>{issue.comments}</h4>
          <h4>{issue.user.login}</h4>
          <h4>{issue.created_at}</h4>
          <p>{issue.body.slice(0,100)}...</p>
          </div>
}

export default IssueList;
