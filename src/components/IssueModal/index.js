import React from "react";
import { Modal, Media, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import PacmanLoader from "react-spinners/PacmanLoader";
import Moment from "react-moment";

const IssueModal = ({ showModal, setShowModal, selectedIssue, loadingComments, comments,  handleMore,
  disableShowMore, }) => {
  return (
    <div>
      {selectedIssue && (
        <Modal
          size="xl"
          show={showModal}
          onHide={() => setShowModal(false)}
          
        >
          <Modal.Header closeButton>
            <Modal.Title>
              #{selectedIssue.number} <span>{selectedIssue.title}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactMarkdown source={selectedIssue.body} skipHtml="true"  />
            <hr />
            <h4>Comments:</h4>
            <p style={{ "overflow-x": "auto" }}>
            {comments && comments.length ? (
              comments.map((comment) => (
               <Comments key={comment.id} {...comment} />
              ))
            ) : (
              <span>There are no comments of this issue</span>
            )}
          </p>
          <div className="d-flex justify-content-center">
            {loadingComments ? (
              <PacmanLoader color="#4A90E2" size={25} loading={loadingComments} />
            ) : (
              <>
                {!disableShowMore && (
                  <Button
                    type="button"
                    onClick={handleMore}
                    disabled={disableShowMore}
                  >
                    Show More
                  </Button>
                )}
              </>
            )}
          </div>
            
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

const Comments = ({ user, body, created_at }) => {
  return (
    <Media>
      <img
        width={130}
        height={130}
        src={user.avatar_url}
        alt="avatar"
        margin={15}
        
      />
      <Media.Body className="comment-style">
        <div>
          
          <span className="text-muted">@{user.login} </span>
          <span>
            commented <Moment fromNow>{created_at}</Moment>
          </span>
          

        </div>
        <ReactMarkdown source={body} skipHtml="true" />
      </Media.Body>
    </Media>
  );
};



export default IssueModal;