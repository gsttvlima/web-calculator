
import  { useState, useEffect } from 'react';

import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button, Input } from 'reactstrap';

import './App.css';

var nerdamer = require('nerdamer');

require('nerdamer/Algebra');
require('nerdamer/Calculus');
require('nerdamer/Solve');
require('nerdamer/Extra');

function App() {

  const [character, setCharacter] = useState('');
  const [display, setDisplay] = useState('');
  const [operation, setOperation] = useState('');

  const [message, setMessage] = useState('');

  const [buttonOn, setButtonOn] = useState('d-block w-100');
  const [buttonOff, setButtonOff] = useState('d-none w-100');

  const [calculatorState, setCalculatorState] = useState('off');

  function turnOff() {

    if (calculatorState === 'on') {

      setMessage('')
      setCharacter('')
      setMessage('Preparing to sleep')
      setTimeout(() => {
        setMessage('Preparing to sleep.')
        setTimeout(() => {
          setMessage('Preparing to sleep..')
          setTimeout(() => {
            setMessage('Preparing to sleep...')

            setTimeout(() => {

              setMessage('Good bye!')

              setTimeout(() => {

                setMessage('')

              }, 800)

            }, 1000)

          }, 400)
        }, 400)
      }, 400)

    }
  }

  function turnOn() {

    if (calculatorState === 'off') {

      setMessage('')
      setCharacter('')

      setMessage('Initializing')
      setTimeout(() => {
        setMessage('Initializing.')
        setTimeout(() => {
          setMessage('Initializing..')
          setTimeout(() => {
            setMessage('Initializing...')

            setTimeout(() => {

              setMessage('All done. Go ahead!')
              setCalculatorState('on')


            }, 1000)

          }, 400)
        }, 400)
      }, 400)

    }


  }


  function getResult() {

    if (calculatorState === 'on') {

      var replaced = character.replaceAll('÷', '/');
      var replaced = replaced.replaceAll('x', '*');

      var calculate = nerdamer(replaced);

      setCharacter(calculate)

    }

  }

  function addComma() {

    if (calculatorState === 'on') {

      var check = character.split(operation);

      if (operation === '') {
        var lastOperation = character;
      } else {
        var lastOperation = check[check.length - 1];
      }

      if (lastOperation.indexOf(".") != -1) {

      } else {
        setCharacter(character + '.')
      }

    }

  }

  function clearAll() {
    setMessage('')
    setCharacter('')

  }

  function deleteLast() {
    if (calculatorState === 'on') {
      setMessage('')
      setCharacter(character.slice(0, -1))
    }
  }


  function updateDisplay() {
    if (calculatorState === 'on') {


      setDisplay(character)

    }

  }

  useEffect(() => {
    updateDisplay()

  }
  )


  return (
    <div className="App">
      <div className='d-flex align-items-center justify-content-center h-100'>

        <Card className="calculator">

          <CardTitle>

            <Input placeholder={message} disabled id="display" value={display}></Input>

          </CardTitle>

          <CardBody>


            <Row>

              <Col xs="3" className="p-0">

                <Button block color="light" onClick={() => turnOn()}><span>on</span></Button>

              </Col>


              <Col xs="3" className="p-0">

                <Button block color="light" onClick={() => turnOff()}>off</Button>

              </Col>


              <Col xs="3" className="p-0"><Button block color="light" onClick={() => clearAll()}>c</Button></Col>
              <Col xs="3" className="p-0"><Button block color="light" onClick={() => deleteLast()}>←</Button></Col>

            </Row>

            <Row>


              <Col xs="9">
                <Row>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '7')}>7</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '8')}>8</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '9')}>9</Button></Col>
                </Row>
                <Row>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '4')}>4</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '5')}>5</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '6')}>6</Button></Col>
                </Row>
                <Row>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '1')}>1</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '2')}>2</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '3')}>3</Button></Col>
                </Row>
                <Row>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => setCharacter(character + '0')}>0</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => addComma()}>.</Button></Col>
                  <Col xs="4" className="p-0"><Button block color="light" onClick={() => getResult()}>=</Button></Col>
                </Row>
              </Col>

              <Col xs="3">
                <Row>
                  <Col xs="12" className="p-0"><Button block color="light" onClick={function () { setCharacter(character + '÷'); setOperation('÷') }}>÷</Button></Col>
                </Row>
                <Row>
                  <Col xs="12" className="p-0"><Button block color="light" onClick={function () { setCharacter(character + 'x'); setOperation('x') }}>x</Button></Col>
                </Row>
                <Row>
                  <Col xs="12" className="p-0"><Button block color="light" onClick={function () { setCharacter(character + '-'); setOperation('-') }}>-</Button></Col>
                </Row>
                <Row>
                  <Col xs="12" className="p-0"><Button block color="primary" onClick={function () { setCharacter(character + '+'); setOperation('+') }}>+</Button></Col>
                </Row>
              </Col>

            </Row>

          </CardBody>
        </Card>

      </div>
    </div>
  );
}

export default App;
