import React from 'react';
import { useLocation } from 'react-router-dom';

function SubmissionPage() {
  const location = useLocation();
  const formData = location.state;
  console.log(formData);
  let qus = Object.keys(formData);
  let ans = Object.values(formData);
  return (
    <div className="m-5">
      <h1 className="text-light bg-dark d-flex justify-content-center p-5">Submission Details</h1>
      <div className="card">
        <div className="card-body">
          {qus.map((data, index) => {
            if (index >= 10) {
              return (
                <>
                  <p>{data}</p>
                  <p>{ans[index]}</p>
                  </>
              );
            } else if(ans[index] != ''){
              return (
                <p key={index} className="card-text">
                  {data}: {ans[index]}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default SubmissionPage;
