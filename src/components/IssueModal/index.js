import React from "react";
import { Modal, Media, Button, } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import PacmanLoader from "react-spinners/PacmanLoader";
import Moment from "react-moment";

const IssueModal = ({ showModal, setShowModal, selectedIssue, loadingComments, comments, handleMore,
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
            <div className="container wrapper">

              <div className="card-w col-md-4">
                <div className="card neumorphism">
                  <div className="card__icon">

                  </div>
                  <div className="card__text">
                    <ReactMarkdown source={selectedIssue.body} />

                  </div>
                </div>
              </div>


            </div>




            <h4>Comments:</h4>
            <p>
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
                <PacmanLoader color="#f5bc53" size={25} loading={loadingComments} />
              ) : (
                  <>
                    {!disableShowMore && (
                      <Button
                        type="button"
                        onClick={handleMore}
                        disabled={disableShowMore}
                        variant="outline-danger"
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
    <Media className="d-flex justify-content-center align-item-center">

      <Media.Body >


        <div className="card-w ">
          
          <div className="card active">
            
            <div className="card__text" style={{ overflowX: "auto" }}>
              <div className="comment-title-style">
              <span> 
              <img
                className="avatar-style"
                src={user.avatar_url}
                alt="avatar"
                margin={15}

              />

              </span>
              <h4> @{user.login} </h4>
              <span className="text-muted">
                 commented <Moment fromNow>{created_at}</Moment> 
              </span>
              </div>
              <hr></hr>
              <ReactMarkdown source={body} />

            </div>
          
          </div>
        </div>

      </Media.Body>
    </Media>
  );
};



export default IssueModal;