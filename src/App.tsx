
import { useState, useEffect } from 'react';

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

  const [character, addCharacter] = useState('');
  const [display, setDisplay] = useState('');
  const [operation, setOperation] = useState('');

  const [message, setMessage] = useState('');

  function getResult() {

    var replaced = character.replaceAll('÷', '/').replaceAll('x', '*').replaceAll('√', 'sqrt(')

    var oneByOne = replaced.split('')

    let sqrt = false

    var replaced_new = '';

    oneByOne.forEach(function (one, i) {

      var newValue = one;

      if((one === 's') || (one === 'q') || (one === 'r') || (one === 't') || (one === '(' && oneByOne[i-1] === 't')){
        sqrt = true
      } 

      if(sqrt === true){

        if((one === '+') || (one === '-') || (one === '/') || (one === '*')){

          newValue = ')'+one
          sqrt = false

        }

        
        if(typeof oneByOne[i+1] !== 'string'){
          newValue = one+')'
          sqrt = false

        }

      } 

      replaced_new = replaced_new + newValue

    })

    var calculate = nerdamer(replaced_new)

    addCharacter(calculate)

  }

  function clearAll() {
    setMessage('')
    addCharacter('')
  }

  function deleteLast() {
    setMessage('')
    addCharacter(character.slice(0, -1))
  }


  function updateDisplay() {

    if (typeof character == 'string') {

      var values = character.split(operation);

      var lastValue = values[values.length - 1]

      values.splice(-1)

      var penultimateValue = values[values.length - 1]

      if (penultimateValue === '') {

        addCharacter(character.substring(0, character.length - 1))

      }

      if (lastValue?.includes('.')) {

        var lastCharacter = lastValue.slice(-1)
        var lastValueWithoutLastCharacter = character.substring(0, character.length - 1)

        if (lastValueWithoutLastCharacter?.includes('.') && lastCharacter === '.') {
          addCharacter(character.substring(0, character.length - 1))
        }

      }


    }


    setDisplay(character)

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


            <Row className="line">

              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '^'); }}>^</Button></Col>
              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '√'); }}>√</Button></Col>
              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={() => clearAll()}>C</Button></Col>
              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={() => deleteLast()}>←</Button></Col>

            </Row>
            <Row className="line">

              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '('); setOperation('&#40;') }}>&#40;</Button></Col>
              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + ')'); setOperation('&#41;') }}>&#41;</Button></Col>
              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '%'); setOperation('%') }}>%</Button></Col>
              <Col xs="3" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '÷'); setOperation('÷') }}>÷</Button></Col>
            </Row>

            <Row>


              <Col xs="9">
                <Row className="line">
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '7')}>7</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '8')}>8</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '9')}>9</Button></Col>
                </Row>
                <Row className="line">
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '4')}>4</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '5')}>5</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '6')}>6</Button></Col>
                </Row>
                <Row className="line">
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '1')}>1</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '2')}>2</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '3')}>3</Button></Col>
                </Row>
                <Row className="line">
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '0')}>0</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={() => addCharacter(character + '00')}>00</Button></Col>
                  <Col xs="4" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '.') }}>.</Button></Col>

                </Row>
              </Col>

              <Col xs="3">

                <Row className="line">
                  <Col xs="12" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + 'x'); setOperation('x') }}>x</Button></Col>
                </Row>
                <Row className="line">
                  <Col xs="12" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '-'); setOperation('-') }}>-</Button></Col>
                </Row>
                <Row className="line">
                  <Col xs="12" className="p-0"><Button className="character" block color="dark" onClick={function () { addCharacter(character + '+'); setOperation('+') }}>+</Button></Col>

                </Row>
                <Row className="line">
                  <Col xs="12" className="p-0"><Button className="get-result" block color="primary" onClick={() => getResult()}>=</Button></Col>
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
