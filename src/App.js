import React, { useState, useRef } from "react";
import wand from "./icons/magic-wand.png";

import "./App.css";

const FIRST = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

const SECOND = [1, 2];

function App() {
  let [firstNumbers, setFirstNumbers] = useState([]);
  let [secondNumber, setSecondNumber] = useState(null);
  let [firstFillNumbers, setFirstFillNumbers] = useState("Отметьте 8 чисел.");
  let [secondFillNumber, setSecondFillNumber] = useState("Отметьте 1 число.");
  let [ticketWon, setTicketWon] = useState("Проиграли :(");
  let [result, changeResult] = useState(true);

  const firstID = useRef([]).current;
  const saveFirstRef = (i) => (elem) => {
    firstID[i] = elem;
  };

  const secondID = useRef([]).current;
  const saveSecondRef = (i) => (elem) => {
    secondID[i] = elem;
  };

  const removeFirstNumber = (number) => {
    let copy = [...firstNumbers];
    for (let i = copy.length - 1; i >= 0; i--) {
      if (copy[i] === number) {
        copy.splice(i, 1);
      }
    }
    setFirstNumbers(copy);
    setFirstFillNumbers(`Отмечено ${copy.length} из 8.`);
  };

  const addFirstNumbers = (e) => {
    if (firstNumbers.includes(+e.target.id)) {
      e.target.style.background = "white";
      removeFirstNumber(+e.target.id);
    } else {
      if (firstNumbers.length < 8) {
        e.target.style.background = "yellow";
        setFirstNumbers([...firstNumbers, +e.target.id]);
        setFirstFillNumbers(`Отмечено ${firstNumbers.length + 1} из 8.`);
        console.log(firstNumbers);
      }
    }
  };

  const removeNumberTwo = () => {
    setSecondNumber(null);
    setSecondFillNumber("Отметьте 1 число.");
  };

  const addSecondNumber = (e) => {
    if (secondNumber === null) {
      e.target.style.background = "yellow";
      setSecondNumber(+e.target.id);
      setSecondFillNumber("Число отмечено.");
    } else {
      e.target.style.background = "white";
      removeNumberTwo();
    }
  };

  const generateArrays = (min, max) => {
    let arrBig = [];
    let arrSmall = null;

    for (let i = 0; arrBig.length < 8; i++) {
      let randomBig = Math.floor(min + Math.random() * (max + 1 - min));
      if (!arrBig.includes(randomBig)) {
        arrBig.push(randomBig);
      }
    }

    let randomSmall = 1 + Math.random() * 2;
    arrSmall = Math.floor(randomSmall);

    console.log(arrBig, arrSmall);

    return [arrBig, arrSmall];
  };

  const checkedNumbers = (magicBig, magicSmall) => {
    for (let i = 0; i < magicBig.length; i++) {
      firstID[magicBig[i]].style.background = "yellow";
    }
    secondID[magicSmall].style.background = "yellow";
  };

  const generateMagicWand = (min, max) => {
    let magicBig = [...firstNumbers];
    let magicSmall = null;

    for (let i = 0; magicBig.length < 8; i++) {
      let randomBig = Math.floor(min + Math.random() * (max + 1 - min));
      if (!magicBig.includes(randomBig)) {
        magicBig.push(randomBig);
      }
      setFirstNumbers(magicBig);
    }

    let randomSmall = 1 + Math.random() * 2;
    magicSmall = Math.floor(randomSmall);
    setSecondNumber(magicSmall);

    checkedNumbers(magicBig, magicSmall);

    setFirstFillNumbers("Отмечено 8 из 8.");
    setSecondFillNumber("Число отмечено.");
  };

  const showResult = () => {
    let random = generateArrays(1, 19);

    console.log(`random: ${random}`);
    console.log(`1 & 2: ${firstNumbers}, ${secondNumber}`);

    let checkFirst = firstNumbers.filter((el) => random[0].includes(el));
    let checkSecond = secondNumber === random[1];

    console.log(checkFirst, checkFirst.length, checkSecond);

    if (
      checkFirst.length >= 4 ||
      (checkFirst.length >= 3 && checkSecond === true)
    ) {
      setTicketWon("Ого, вы выиграли! Поздравляем!");
    }

    changeResult(false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="ticket">Билет 1</div>
        {result ? (
          <>
            <div className="wand" onClick={() => generateMagicWand(1, 19)}>
              <img src={wand} alt="wand" />
            </div>

            <span>
              Поле 1 <span className="fill-big">{firstFillNumbers}</span>
            </span>

            <div className="field">
              {FIRST.map((elem, key) => (
                <div
                  className="field__item"
                  key={elem}
                  id={elem}
                  ref={saveFirstRef(elem)}
                  onClick={addFirstNumbers}
                >
                  {elem}
                </div>
              ))}
            </div>
            <span>
              Поле 2 <span className="fill-small">{secondFillNumber}</span>
            </span>
            <div className="field">
              {SECOND.map((elem, key) => (
                <div
                  className="field__item"
                  key={elem}
                  id={elem}
                  ref={saveSecondRef(elem)}
                  onClick={addSecondNumber}
                >
                  {elem}
                </div>
              ))}
            </div>
            <button onClick={showResult}>Показать результат</button>
          </>
        ) : (
          <div className="result">{ticketWon}</div>
        )}
      </div>
    </div>
  );
}

export default App;
