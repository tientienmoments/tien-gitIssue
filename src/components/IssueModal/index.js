import React from "react";
import { Modal, Media, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
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
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {selectedIssue.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactMarkdown source={selectedIssue.body}/>
            <hr />
            <h4>Comments:</h4>
            <ul className="comment-style">
            {comments && comments.length ? (
              comments.map((comment) => (
               <Comments key={comment.id} {...comment} />
              ))
            ) : (
              <li>There are no comments of this issue</li>
            )}
          </ul>
          <div className="d-flex justify-content-center">
            {loadingComments ? (
              <ClipLoader color="#f86c6b" size={75} loading={loadingComments} />
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
      <Media.Body>
        <div>
          <p>
          <span className="text-muted">@{user.login}</span>
          <span>
            commented <Moment fromNow>{created_at}</Moment>
          </span>
          </p>

        </div>
        <ReactMarkdown source={body} />
      </Media.Body>
    </Media>
  );
};



export default IssueModal;