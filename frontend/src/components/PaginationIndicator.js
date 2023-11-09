import React from "react";
import "../styles/Pagination.css"

const max = (val1, val2) => {
  return val1 > val2 ? val1 : val2;
};

const min = (val1, val2) => {
  return val1 < val2 ? val1 : val2;
};

const VALUES_BEFORE_AND_AFTER = 5;

const PaginationIndicator = ({ numPages, currPage, setCurrPage }) => {
  const valuesAround = [];
  for (
    let i = max(
      currPage -
        VALUES_BEFORE_AND_AFTER -
        (max(currPage + VALUES_BEFORE_AND_AFTER, numPages) - numPages),
      1
    );
    i < currPage;
    i++
  ) {
    valuesAround.push(i);
  }
  valuesAround.push(currPage);
  for (
    let i = currPage + 1;
    i <=
    min(
      currPage +
        VALUES_BEFORE_AND_AFTER -
        min(currPage - VALUES_BEFORE_AND_AFTER, 0),
      numPages
    );
    i++
  ) {
    valuesAround.push(i);
  }

  const selectNextButton = () => {
    setCurrPage(currPage + 1);
  };

  const selectPrevButton = () => {
    setCurrPage(currPage - 1);
  };

  const selectButton = (pageNumber) => {
    if (currPage !== pageNumber) {
      setCurrPage(pageNumber);
    }
  };

  return (
    <div className="pagination-indicator">
      {currPage !== 1 && (
        <button
          className="pagination-button prev-next-pagination-button"
          onClick={selectPrevButton}
        >
          {"<"}
        </button>
      )}
      {valuesAround.map((currVal) => {
        return (
          <button
            key={currVal}
            className={
              "pagination-button" +
              (currVal === currPage ? " pagination-selected" : "")
            }
            onClick={() => selectButton(currVal)}
          >
            <span>{currVal}</span>
          </button>
        );
      })}
      {currPage !== numPages && (
        <button
          className="pagination-button prev-next-pagination-button"
          onClick={selectNextButton}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default PaginationIndicator;
