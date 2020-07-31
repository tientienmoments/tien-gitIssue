import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import Search from "./components/Search";
import PaginationIssue from "./components/PaginationIssue";
import IssueList from "./components/IssueList";
import IssueModal from "./components/IssueModal";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [commentTotalPageNum, setCommentTotalPageNum] = useState(1);

  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [comments, setComments] = useState([]);
  const [urlFetchComments, setUrlFetchComments] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const [commentPageNum, setCommentPageNum] = useState(1);





  const [searchTerm, setSearchTerm] = useState("facebook/react");

  const handleSubmitSearchForm = (event) => {
    event.preventDefault();
    // Get the url
    const repo = searchTerm.substring(searchTerm.lastIndexOf("/") + 1);
    const withoutRepo = searchTerm.substring(0, searchTerm.lastIndexOf("/"));
    const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
    if (!repo || !owner) {
      setErrorMsg("Wrong Input");
    } else {
      setRepo(repo);
      setOwner(owner);
    }
  };

  useEffect(() => {
    const fetchIssue = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("info", data)

        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(/page=(\d+)>; rel="last"/);
            console.log(getTotalPage);
            if (getTotalPage) {
              setTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setIssues(data);
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
      setLoading(false);
    };
    fetchIssue();
  }, [owner, repo, pageNum]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showDetail = (issue) => {
    setCommentPageNum(1);
    setCommentTotalPageNum(1);
    setSelectedIssue(issue);
    setComments([]);
    setUrlFetchComments(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issue.number}/comments?page=1&per_page=5`
    );

    setShowModal(true);
    setSelectedIssue(issue);
    console.log(issue.title);
  };
  ////comment part

  const handleMoreComments = () => {
    if (commentPageNum >= commentTotalPageNum) return;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${
      selectedIssue.number
      }/comments?page=${commentPageNum + 1}&per_page=5`;
    setCommentPageNum((num) => num + 1);
    setUrlFetchComments(url);
  };


  useEffect(() => {
    const fetchComments = async () => {
      if (!urlFetchComments) return;
      setLoadingComments(true);
      try {
        const response = await fetch(urlFetchComments);
        const data = await response.json();
        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) {
              setCommentTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setComments((c) => [...c, ...data]);
          setErrorMsg(null);
        } else {
          setErrorMsg(`FETCH COMMENTS ERROR: ${data.message}`);
          setShowModal(false);
        }
      } catch (error) {
        setErrorMsg(`FETCH COMMENTS ERROR: ${error.message}`);
        setShowModal(false);
      }
      setLoadingComments(false);
    };
    fetchComments();
  }, [urlFetchComments]);


  return (
    <div className="App">
      <Container>
        <h1>Github Issues</h1>
        <Search
          searchTerm={searchTerm}
          handleSubmit={handleSubmitSearchForm}
          handleChange={handleSearchInputChange}
        />
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <PaginationIssue
          pageNum={pageNum}
          totalPageNum={totalPageNum}
          setPageNum={setPageNum}
        />
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        ) : (
            <IssueList issues={issues} showDetail={showDetail} />
          )}

        <IssueModal
          selectedIssue={selectedIssue}
          showModal={showModal}
          setShowModal={setShowModal}
          comments={comments}
          loadingComments={loadingComments}
          handleMore={handleMoreComments}
          disableShowMore={commentPageNum === commentTotalPageNum}

        />
      </Container>
    </div>
  );
}

export default App;
