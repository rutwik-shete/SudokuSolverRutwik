import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "./sudoku.css";

var row0 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row4 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row5 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row6 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row7 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var row8 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var sudoku = [row0, row1, row2, row3, row4, row5, row6, row7, row8];
var iterations = 0;
var timeElapsed = 0;

function printTableData(Number, colIndex, rowIndex) {
  if (Number === 0) {
    Number = " ";
  }
  if (
    (colIndex === 2 && rowIndex === 3) ||
    (colIndex === 5 && rowIndex === 3) ||
    (colIndex === 2 && rowIndex === 6) ||
    (colIndex === 5 && rowIndex === 6)
  ) {
    return (
      <td className="tableDataSolidTop tableDataSolidRight" key={colIndex + 1}>
        <input
          placeholder={Number}
          id={rowIndex + "," + colIndex}
          key={rowIndex + "," + colIndex}
          className="InputsStyle"
          maxLength={1}
        ></input>
      </td>
    );
  } else if (colIndex === 8) {
    if (rowIndex === 0) {
      return (
        <td key={colIndex + 1}>
          <input
            placeholder={Number}
            id={rowIndex + "," + colIndex}
            key={rowIndex + "," + colIndex}
            className="InputsStyle"
            maxLength={1}
          ></input>
        </td>
      );
    }
    if (rowIndex === 3 || rowIndex === 6) {
      return (
        <td className="tableDataSolidTop" key={colIndex + 1}>
          <input
            placeholder={Number}
            id={rowIndex + "," + colIndex}
            key={rowIndex + "," + colIndex}
            className="InputsStyle"
            maxLength={1}
          ></input>
        </td>
      );
    }
    return (
      <td className="tableDataDashedTop" key={colIndex + 1}>
        <input
          placeholder={Number}
          id={rowIndex + "," + colIndex}
          key={rowIndex + "," + colIndex}
          className="InputsStyle"
          maxLength={1}
        ></input>
      </td>
    );
  } else if (rowIndex === 0) {
    if (colIndex === 2 || colIndex === 5) {
      return (
        <td className="tableDataSolidRight" key={colIndex + 1}>
          <input
            placeholder={Number}
            id={rowIndex + "," + colIndex}
            key={rowIndex + "," + colIndex}
            className="InputsStyle"
            maxLength={1}
          ></input>
        </td>
      );
    }
    return (
      <td className="tableDataDashedRight" key={colIndex + 1}>
        <input
          placeholder={Number}
          id={rowIndex + "," + colIndex}
          className="InputsStyle"
          maxLength={1}
        ></input>
      </td>
    );
  } else if (colIndex === 2 || colIndex === 5) {
    return (
      <td className="tableDataDashedTop tableDataSolidRight" key={colIndex + 1}>
        <input
          placeholder={Number}
          id={rowIndex + "," + colIndex}
          key={rowIndex + "," + colIndex}
          className="InputsStyle"
          maxLength={1}
        ></input>
      </td>
    );
  } else if (rowIndex === 3 || rowIndex === 6) {
    return (
      <td className="tableDataSolidTop tableDataDashedRight" key={colIndex + 1}>
        <input
          placeholder={Number}
          id={rowIndex + "," + colIndex}
          key={rowIndex + "," + colIndex}
          className="InputsStyle"
          maxLength={1}
        ></input>
      </td>
    );
  }
  return (
    <td className="tableDataDashedTop tableDataDashedRight" key={colIndex + 1}>
      <input
        placeholder={Number}
        id={rowIndex + "," + colIndex}
        key={rowIndex + "," + colIndex}
        className="InputsStyle"
        maxLength={1}
      ></input>
    </td>
  );
}

class SudokuTable extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Table bordered className="child SudokuTable ">
            <tbody>
              {sudoku.map((Row, rowIndex) => (
                <tr key={rowIndex}>
                  {Row.map((Number, colIndex) =>
                    printTableData(Number, colIndex, rowIndex)
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div id="Acknowledgement" className="Acknowledgement">
          Solved By Rutwik Shete <br />
          In{" "}
          <span className="redText" id="iterations">
            {iterations}
          </span>{" "}
          iternation
          <br />
          in{" "}
          <span className="redText" id="timeElapsed">
            {timeElapsed}
          </span>{" "}
          milliseconds
        </div>
        <button onClick={makeChangesInArray} className="glow-on-hover">
          Solve
        </button>
      </div>
    );
  }
}

function makeChangesInArray() {
  document.getElementById("Acknowledgement").style.visibility = "hidden";
  const checkNumber = /[ 0-9]/;
  var number;
  var isChar = false;
  for (let row = 0; row < sudoku.length; row++) {
    for (let col = 0; col < sudoku[row].length; col++) {
      number =
        document.getElementById(row + "," + col).value === ""
          ? 0
          : document.getElementById(row + "," + col).value;
      if (checkNumber.test(number)) {
        sudoku[row][col] = number;
        document.getElementById(row + "," + col).style.color = "white";
      } else {
        document.getElementById(row + "," + col).style.color = "red";
        isChar = true;
      }
    }
  }
  if (isChar) {
    //document.getElementById("errText").style.visibility = "visible";
    alert("Enter Valid Numbers In The Highlighted Boxes");
  } else {
    //document.getElementById("errText").style.visibility = "hidden";
    fetch("https://sudoku-solver-rutwik-api.herokuapp.com/solveSudoku/Solve", {
      method: "POST",
      body: JSON.stringify({ sudoku: sudoku }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((result) => {
        console.log(result);
        insertValues(result.sudoku);
        timeElapsed = result.timeElapsed;
        iterations = result.iterations;
        document.getElementById("iterations").innerHTML = result.iterations;
        document.getElementById("timeElapsed").innerHTML = result.timeElapsed;
      });
  }
  //console.log(JSON.stringify({ sudoku: sudoku }));
}

function insertValues(sudokuSolved) {
  if (sudokuSolved[0][0] === 0) {
    alert("Not A Valid Sudoku Question , Please Check Your Number Combination");
  } else {
    document.getElementById("Acknowledgement").style.visibility = "visible";
    for (let row = 0; row < sudokuSolved.length; row++) {
      for (let col = 0; col < sudokuSolved[row].length; col++) {
        if (sudoku[row][col] === sudokuSolved[row][col]) {
          document.getElementById(row + "," + col).style.color = "white";
        } else {
          document.getElementById(row + "," + col).style.color =
            "rgb(10, 212, 10)";
          document.getElementById(row + "," + col).style.fontWeight = "bold";
        }
        document.getElementById(row + "," + col).value = sudokuSolved[row][col];
      }
    }
  }
}

export default SudokuTable;
