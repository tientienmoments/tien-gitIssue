import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationIssue = ({ pageNum, totalPageNum, setPageNum, setLoadingPage}) => {
  const handleClickOnFirst = () => {
    setPageNum(1);
    setLoadingPage(false);

  };

  const handleClickOnPrev = () => {
    if (pageNum > 1) {
      setPageNum((num) => num - 1);
      setLoadingPage(false);

    }
  };

  const handleClickOnLast = () => {
    setPageNum(totalPageNum);
    setLoadingPage(false);

  };

  const handleClickOnNext = () => {
    if (pageNum < totalPageNum) {
      setPageNum((num) => num + 1);
      setLoadingPage(false);

    }
  };

  const handleClickOnPage = (page) => {
    setPageNum(page);
    setLoadingPage(false);

  };

  return (
    <Pagination className=" d-flex justify-content-center">
      <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
      <Pagination.Item
        active={pageNum === 1}
        onClick={() => handleClickOnPage(1)}
      >
        {1}
      </Pagination.Item>


      {pageNum - 1 > 1 && <Pagination.Ellipsis />}
      {pageNum-1 > 1 && pageNum-1 < totalPageNum && (
        
        <Pagination.Item onClick={handleClickOnPrev} >{pageNum-1} </Pagination.Item>
       
      )}
      
      {pageNum > 1 && pageNum < totalPageNum && (
        
        <Pagination.Item active>{pageNum}</Pagination.Item>
       
      )}
      {pageNum+1 > 1 && pageNum+1 < totalPageNum && (
        
        <Pagination.Item onClick={handleClickOnNext} >{pageNum+1} </Pagination.Item>
       
      )}
      {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />}


      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum}
          onClick={() => handleClickOnPage(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      )}



      <Pagination.Next
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnNext}
      />
      <Pagination.Last
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnLast}
      />
    </Pagination>
  );
};

export default PaginationIssue;
