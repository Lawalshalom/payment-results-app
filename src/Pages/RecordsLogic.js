import React, { useEffect, useState } from 'react';
import Records from './Records';

const RecordsLogic = () => {
    const [records, setRecords] = useState(null);
    const [ sortDetails, setSortDetails ] = useState({gender: "All", paymentMethod: "all", sortBy: "FirstName"});

    async function getRecords(){
        const infoDiv = document.getElementById("info-div");
        const loadingDiv = document.getElementById("loading-div");
        const resultDiv = document.getElementById("result-div");
        infoDiv.style.display = "block";
        loadingDiv.style.display = "block";
        resultDiv.style.display = "none";
        const res = await fetch("https://api.enye.tech/v1/challenge/records");
        const data = await res.json();
        if (data.status === "success"){
            infoDiv.style.display = "none";
            loadingDiv.style.display = "none";
            resultDiv.style.display = "block";
            sessionStorage.setItem("records", JSON.stringify(data.records));
           return setRecords(data.records.profiles)
        }
    }

    useEffect(() => {
        getRecords().catch(err => console.log(err));
    }, [])

    function genderFilter(records, gender){
        return records.filter(record => record["Gender"] === gender);
    }
    function paymentFilter(records, paymentMethod){
        return records.filter(record => record["PaymentMethod"] === paymentMethod);
    }

    function timetoUnix(timeString){
        const [year, month, day] = timeString.split(" ")[0].split("-");
        const [hour, min, sec] = timeString.split(" ")[1].split(":");
        let unix = new Date(year, month-1, day, hour, min, sec);
        return unix.valueOf();
    }

    function sortRecords(records, property){
        if (records.length <= 1) return records;
        else {
            let leftArr = [];
            let rightArr = [];
            let newArr = [];
            let pivot = records.pop();

            for (let i = 0; i < records.length; i++){
                if (property === "LastLoginDate"){
                    if (timetoUnix(records[i][property]) < timetoUnix(pivot[property])) leftArr.push(records[i]);
                    else rightArr.push(records[i]);
                } else {
                    if (records[i][property].toLowerCase() < pivot[property].toLowerCase()) leftArr.push(records[i]);
                    else rightArr.push(records[i]);
                }
            }
            return newArr.concat(sortRecords(leftArr, property), pivot, sortRecords(rightArr, property));
        }
    };

    let users = [];
    if (records) {
        const {gender, paymentMethod, sortBy} = sortDetails;
        const genderFiltered = gender === "All" ? records : genderFilter(records, gender);
        const paymentFiltered = paymentMethod === "all" ? genderFiltered : paymentFilter(genderFiltered, paymentMethod);
        users = sortBy === "None" ? paymentFiltered : sortRecords(paymentFiltered, sortBy);
    };

    const handleSearchUsers = (e) => {
        e.preventDefault();
        const form = document.getElementById("search-users");
        const searchName = new FormData(form).get("search-name").toLowerCase();
        const newUsers = [];
        records.forEach(user => {
            let username = user.FirstName + user.LastName;
            if (username.toLowerCase().indexOf(searchName) !== -1){
                newUsers.push(user);
            }
        });
       setRecords(newUsers);
    }
    const cancelSearch = (e) => {
        e.preventDefault();
        const form = document.getElementById("search-users");
        form.reset();
        const storedRecords = JSON.parse(sessionStorage.getItem("records")).profiles;
        setRecords(storedRecords);
    }

    return (
        <Records users={users} sortDetails={sortDetails} setSortDetails={setSortDetails}
            handleSearchUsers={handleSearchUsers} cancelSearch={cancelSearch}/>
    )
}
export default RecordsLogic;