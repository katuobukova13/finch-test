import React, { useState, useRef } from "react";
import wand from "./icons/magic-wand.png";

import "./App.css";

const FIRST = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

const SECOND = [1, 2];

const App = () => {
  let [firstNumbers, setFirstNumbers] = useState([]);
  let [secondNumber, setSecondNumber] = useState(null);
  let [firstFillNumbers, setFirstFillNumbers] = useState("Отметьте 8 чисел.");
  let [secondFillNumber, setSecondFillNumber] = useState("Отметьте 1 число.");
  let [ticketWon, setTicketWon] = useState("Проиграли :(");
  let [result, changeResult] = useState(true);

  //создание рефов для каждого элемента первого поля
  const firstID = useRef([]).current;
  const saveFirstRef = (i) => (elem) => {
    firstID[i] = elem;
  };

  //создание рефов для каждого элемента второго поля
  const secondID = useRef([]).current;
  const saveSecondRef = (i) => (elem) => {
    secondID[i] = elem;
  };

  //удаление элементов первого поля
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

  //отметить 8 цифр в первом поле
  const addFirstNumbers = (e) => {
    if (firstNumbers.includes(+e.target.id)) {
      e.target.className = "field__item";
      removeFirstNumber(+e.target.id);
    } else {
      if (firstNumbers.length < 8 && e.target.id) {
        e.target.className = "field__item checked";
        setFirstNumbers([...firstNumbers, +e.target.id]);
        setFirstFillNumbers(`Отмечено ${firstNumbers.length + 1} из 8.`);
      }
    }
  };

  //удалить цифру из 2 поля
  const removeNumberTwo = () => {
    setSecondNumber(null);
    setSecondFillNumber("Отметьте 1 число.");
  };

  //добавить одну цифру в 2 поле
  const addSecondNumber = (e) => {
    if (secondNumber === +e.target.id) {
      e.target.className = "field__item";
      removeNumberTwo(+e.target.id);
    } else {
      if (secondNumber === null) {
        e.target.className = "field__item checked";
        setSecondNumber(+e.target.id);
        setSecondFillNumber("Число отмечено.");
      }
    }
  };

  //сгенерировать массив выйгрыша
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

    return [arrBig, arrSmall];
  };

  //отметить числа для выбора волшебной палочкой
  const checkedNumbers = (magicBig, magicSmall) => {
    for (let i = 0; i < magicBig.length; i++) {
      firstID[magicBig[i]].className = "field__item checked";
    }
    secondID[magicSmall].className = "field__item checked";
  };

  //генерация пользовательского массива чисел волшебной палочкой
  const generateMagicWand = (min, max) => {
    let magicBig = [...firstNumbers];
    let magicSmall = secondNumber;

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

  //результат выйгрыша/пройгрыша
  const showResult = () => {
    let random = generateArrays(1, 19);

    let checkFirst = firstNumbers.filter((el) => random[0].includes(el));
    let checkSecond = secondNumber === random[1];

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

            <div className="field" onClick={addFirstNumbers}>
              {FIRST.map((elem, key) => (
                <div
                  className="field__item"
                  key={elem}
                  id={elem}
                  ref={saveFirstRef(elem)}
                >
                  {elem}
                </div>
              ))}
            </div>
            <span>
              Поле 2 <span className="fill-small">{secondFillNumber}</span>
            </span>
            <div className="field" onClick={addSecondNumber}>
              {SECOND.map((elem, key) => (
                <div
                  className="field__item"
                  key={elem}
                  id={elem}
                  ref={saveSecondRef(elem)}
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
};

export default App;
