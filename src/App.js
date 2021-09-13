import React, { useState } from "react";
import wand from "./icons/magic-wand.png";

import "./App.css";

const App = () => {
  const [firstNumbers, setFirstNumbers] = useState([]);
  const [secondNumber, setSecondNumber] = useState(null);
  const [ticketWon, setTicketWon] = useState("Проиграли :(");
  const [result, changeResult] = useState(true);
  const [error, showError] = useState(false);

  //изменение текста для количества отмеченных цифр 1 поля
  const getTextForCheckedNumbsersFirst = () => {
    return `Отмечено ${firstNumbers.length} чисел из 8`;
  };

  //изменение текста для отмеченной цифры 2 поля
  const getTextForCheckedNumbserSecond = () => {
    if (secondNumber === null) {
      return `Отмeтьте 1 число.`;
    } else return `Отмeчено число.`;
  };

  //удаление элементов первого поля
  const removeFirstNumber = (number) => {
    setFirstNumbers(
      firstNumbers.filter((arrayNumber) => arrayNumber !== number)
    );
    getTextForCheckedNumbsersFirst(firstNumbers);
  };

  //отметить 8 цифр в первом поле
  const addFirstNumbers = (number) => {
    if (firstNumbers.length < 8 && !firstNumbers.includes(number)) {
      setFirstNumbers([...firstNumbers, number]);
      getTextForCheckedNumbsersFirst(firstNumbers);
    } else {
      removeFirstNumber(number);
    }
  };

  //удалить цифру из 2 поля
  const removeSecondNumber = () => {
    setSecondNumber(null);
    getTextForCheckedNumbserSecond(null);
  };

  //добавить одну цифру в 2 поле
  const addSecondNumber = (number) => {
    if (secondNumber === null) {
      setSecondNumber(number);
      getTextForCheckedNumbserSecond(secondNumber);
    } else {
      removeSecondNumber(number);
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

  //генерация пользовательского массива чисел волшебной палочкой
  const generateMagicWand = () => {
    let magicBig = [...firstNumbers];
    let magicSmall = secondNumber;
    const min = 1;
    const max = 19;

    for (let i = 0; magicBig.length < 8; i++) {
      let randomBig = Math.floor(min + Math.random() * (max + 1 - min));
      if (!magicBig.includes(randomBig)) {
        magicBig.push(randomBig);
      }
      setFirstNumbers(magicBig);
      getTextForCheckedNumbsersFirst(firstNumbers);
    }

    let randomSmall = 1 + Math.random() * 2;
    magicSmall = Math.floor(randomSmall);
    setSecondNumber(magicSmall);

    getTextForCheckedNumbserSecond(secondNumber);
  };

  //результат выйгрыша/пройгрыша
  const showResult = () => {
    if (firstNumbers.length === 8 && secondNumber) {
      let random = generateArrays(1, 19);

      let checkFirst = firstNumbers.filter((el) => random[0].includes(el));
      let checkSecond = secondNumber === random[1];

      if (
        checkFirst.length >= 4 ||
        (checkFirst.length >= 3 && checkSecond === true)
      ) {
        setTicketWon("ОГО, выйграли!");
      }
      changeResult(false);
      showError(false);
    } else {
      showError(true);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="ticket">Билет 1</div>
        {result ? (
          <>
            <div className="wand" onClick={generateMagicWand}>
              <img src={wand} alt="wand" />
            </div>

            <span className="fill">
              Поле 1
              <span className={`fill-big ${error ? "err" : ""}`}>
                {getTextForCheckedNumbsersFirst()}
              </span>
            </span>

            <div className="field">
              {[...Array(19)].map((elem, key) => (
                <button
                  key={key}
                  className={`field__item ${
                    firstNumbers.includes(key + 1) ? "field__item--checked" : ""
                  }`}
                  onClick={() => addFirstNumbers(key + 1)}
                >
                  {key + 1}
                </button>
              ))}
            </div>
            <span className="fill">
              Поле 2
              <span className={`fill-small ${error ? "err" : ""}`}>
                {getTextForCheckedNumbserSecond()}
              </span>
            </span>
            <div className="field">
              {[...Array(2)].map((elem, key) => (
                <button
                  className={`field__item ${
                    secondNumber === key + 1 ? "field__item--checked" : ""
                  }`}
                  onClick={() => addSecondNumber(key + 1)}
                  key={key}
                >
                  {key + 1}
                </button>
              ))}
            </div>
            <button className="button" onClick={showResult}>
              Показать результат
            </button>
          </>
        ) : (
          <div className="result">{ticketWon}</div>
        )}
      </div>
    </div>
  );
};

export default App;
