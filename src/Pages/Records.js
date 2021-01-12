import React, { useState, useEffect } from 'react';
import pageFunctions from "../Components/pageFunctions";

const Records = (props) => {
  const [ gender, setGender ] = useState(["all", "male", "female", "prefer to skip"]);
  const [ paymentMethod, setPaymentMethod ] = useState(["all", "check", "cc", "paypal", "money order"]);
  const [ sortBy, setSortBy ] = useState(["None", "FirstName", "UserName", "LastLogin"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showUser, setShowUser] = useState(null);

  const {users, sortDetails, setSortDetails, handleSearchUsers, cancelSearch} = props;
  const displayUsers = users.slice(currentPage, currentPage+20);

  const {handleFilterClicks, handlePagination, handlePrev, handleNext, paginationArr, capitalizeText} = pageFunctions;

  useEffect(() => {
    const newState = {
      gender: capitalizeText(gender[0]),
      paymentMethod: paymentMethod[0],
      sortBy: sortBy[0]
    }
    if (JSON.stringify(sortDetails) === JSON.stringify(newState)) return;
    return setSortDetails(newState);
  });

  const pages = paginationArr(users);
  let length = pages.length;
  if (pages[length-1] <= currentPage/20) handlePagination(1, setCurrentPage, pages);

  return (
    <div className="container-md">
      <h1 className="text-center mt-4" data-aos="fade">Payment Records</h1>


      <div className="users" id="users" data-aos="fade-up">

        <div className="search-users">
            <form id="search-users" onSubmit={handleSearchUsers}>
                <input type="name" name="search-name" placeholder={`Showing ${displayUsers.length > 0 ? currentPage+1 : "0"} - ${currentPage + displayUsers.length} of ${users.length} Results`} required
                />
                <p className="text-right">
                  <strong><span className="d-none d-sm-inline mr-2">Search users</span>
                  <button title="Search Results"><i className="fa fa-search" type="submit"></i></button></strong>
                  <button onClick={cancelSearch} title="Cancel search"><i className="fa fa-times"></i></button>
                </p>
            </form>
        </div>

        <div className="sort-users d-flex justify-content-between">
          <div className="dropdown">
            <span>Gender</span>
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {gender[0]}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" onClick={(e) => handleFilterClicks(e, gender, setGender)}>{gender[1]}</button>
              <button className="dropdown-item" onClick={(e) => handleFilterClicks(e, gender, setGender)}>{gender[2]}</button>
              <button className="dropdown-item" onClick={(e) => handleFilterClicks(e, gender, setGender)}>{gender[3]}</button>
            </div>
          </div>
          <div className="dropdown" id="paymentMethod">
            <span>Payment Method</span>
            <button className="btn dropdown-toggle" type="button" id="accountDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {paymentMethod[0]}
            </button>
            <div className="dropdown-menu translate" aria-labelledby="accountDropdownMenuButton">
              <button onClick={(e) => handleFilterClicks(e, paymentMethod, setPaymentMethod)} className="dropdown-item"> {paymentMethod[1]}</button>
              <button onClick={(e) => handleFilterClicks(e, paymentMethod, setPaymentMethod)} className="dropdown-item">{paymentMethod[2]}</button>
              <button  onClick={(e) => handleFilterClicks(e, paymentMethod, setPaymentMethod)} className="dropdown-item"> {paymentMethod[3]}</button>
              <button  onClick={(e) => handleFilterClicks(e, paymentMethod, setPaymentMethod)} className="dropdown-item"> {paymentMethod[4]}</button>
            </div>
          </div>
          <div className="dropdown">
            Sort by:
            <button className="btn dropdown-toggle" type="button" id="sortDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {sortBy[0]}
            </button>
            <div className="dropdown-menu translate" aria-labelledby="sortDropdownMenuButton">
              <button onClick={(e) => handleFilterClicks(e, sortBy, setSortBy)} className="dropdown-item">{sortBy[1]}</button>
              <button onClick={(e) => handleFilterClicks(e, sortBy, setSortBy)} className="dropdown-item">{sortBy[2]}</button>
              <button onClick={(e) => handleFilterClicks(e, sortBy, setSortBy)} className="dropdown-item">{sortBy[3]}</button>
            </div>
          </div>
        </div>

    <div className="display-users">
      {displayUsers.length < 1 &&
        <div className="d-flex flex-column align-items-center">
          <p id="result-div"><strong><em>No results found...</em></strong></p>
          <p id="info-div"><strong><em>Loading Payment Results...</em></strong></p>
          <div id="loading-div"></div>
        </div>
      }

     {displayUsers.length > 0 &&
      <table>
        <thead>
            <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Gender</th>
                <th>Payment Method</th>
                <th>LastLogin</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
          {
            displayUsers.map(user => {
              const index = users.indexOf(user);
              const { FirstName, LastName, UserName, Gender, LastLogin, PaymentMethod} = user;
              return <tr key={index}>
                <td>{index+1}</td>
                <td>{FirstName} {LastName}</td>
                <td>{UserName}</td>
                <td>{Gender}</td>
                <td className="text-capitalize">{PaymentMethod}</td>
                <td>{LastLogin}</td>
                <td><button className="show-details-btn btn" onClick={() => setShowUser(user)}>Payment Details</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
      }
    </div>

    <nav aria-label="...">
      <ul className="pagination mt-4">
        <li className="page-item disabled" onClick={() => handlePrev(setCurrentPage)}>
          <button className="page-link"><i className="fa fa-angle-left" aria-label="hidden"></i></button>
        </li>
        {
            pages.map(num => {
                return (
                    <li key={pages.indexOf(num)} onClick={() => handlePagination(num, setCurrentPage)} className={num === 1 ? "active page-item" : "page-item"}><button className="page-link">{num}</button></li>
                )
            })
        }
        <li className="page-item" onClick={() => handleNext(setCurrentPage)}>
          <button className={pages.length < 2 ? "page-link disabled" :"page-link"}><i className="fa fa-angle-right" aria-label="hidden"></i></button>
        </li>
      </ul>
    </nav>

    <footer className="m-4">
      <p className="text-center">lawalshalom@gmail.com</p>
    </footer>

    </div>

    {showUser &&
      <div id="show-user">
        <div className="container d-flex justify-content-center" data-aos="zoom-in">
            <div className="show-user">
              {
                Object.keys(showUser).map(key => <p key={Math.random()}><strong>{key}: </strong> {showUser[key]}</p>)
              }
            </div>
        </div>
      </div>
    }
  </div>
  )
};

export default Records;