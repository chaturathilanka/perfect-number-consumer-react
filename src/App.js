import "./App.css";
import { useState } from "react";
import { Base64 } from 'js-base64';
function App() {

  const [single_number, setNum] = useState("");
  const [to, setNum1] = useState("");
  const [from, setNum2] = useState("");

  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const headers = new Headers()
  headers.set('Authorization', 'Basic ' + Base64.encode("username" + ":" + "password"));

  let handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      
      let res = await fetch(`http://localhost:8080/api/v1/perfectnumber/${single_number}`, {
        method: "GET",
        headers: headers
      });
      let resJson = await res.json();
      if (res.status === 200) {
        if(resJson.isPerfectNumber == true) {
          setMessage1("Success : Entered number is a Perfect Number");
        }
        else {
          setMessage1("NO : Entered number is not a Perfect Number");

        }
      } else {
        setMessage1("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  let handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      
      let res = await fetch(`http://localhost:8080/api/v1/perfectnumber/${to}/${from}`, {
        method: "GET",
        headers: headers
      });
      let str =''
      let resJson = await res.json();
      if (res.status === 200) {
        if(resJson.isPerfectNumber == true) {
          setMessage2("Success : Entered number is a Perfect Number");
          {resJson.perfectNumberList.map(function(d, idx){
            str = str + d + ", "
          })}
          setMessage2("perfect number list : " + str)
        }
        else {
          setMessage1("Do not have perfect numbers in given range");

        }
      } else {
        setMessage2("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit1}>
        <label> <h1> Check For Perfect Number </h1></label>
        <input
          type="number"
          value={single_number}
          placeholder="number"
          onChange={(e) => setNum(e.target.value)}
        />
        <button type="submit">Submit</button>

        <div className="message">{message1 ? <p>{message1}</p> : null}</div>
      </form>
      <span> </span>
      <form onSubmit={handleSubmit2}>
      <label> <h1> Perfect Number  Series</h1></label>

        <input
          type="number"
          value={to}
          placeholder="number"
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          value={from}
          placeholder="number"
          onChange={(e) => setNum2(e.target.value)}
        />      

        <button type="submit">Submit</button>

        <div className="message">{message2 ? <p>{message2}</p> : null}</div>
      </form>
    </div>
    
  );
}

export default App;
