import { useState, memo, useCallback, useMemo, useEffect } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // useEffect(() => {
  //   setCounterChanges([{ value: initialCount, id: Math.random() * 1000 },])
  // }, [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([
    { value: initialCount, id: Math.random() * 1000 },
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
      { value: 1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;

// import { useState, memo, useCallback, useMemo } from 'react';

// import IconButton from '../UI/IconButton.jsx';
// import MinusIcon from '../UI/Icons/MinusIcon.jsx';
// import PlusIcon from '../UI/Icons/PlusIcon.jsx';
// import CounterOutput from './CounterOutput.jsx';
// import { log } from '../../log.js';

// function isPrime(number) {
//   log(
//     'Calculating if is prime number',
//     2,
//     'other'
//   );
//   if (number <= 1) {
//     return false;
//   }

//   const limit = Math.sqrt(number);

//   for (let i = 2; i <= limit; i++) {
//     if (number % i === 0) {
//       return false;
//     }
//   }

//   return true;
// }
// // remove memo == > const Counter = memo(function Counter({ initialCount }) {
// const Counter = memo(function Counter({ initialCount }) {
//   log('<Counter /> rendered', 1);
//   // So this anonymous arrow function here. And it will then store the result of this execution, so the result of calling isPrime then in the endsince that's returned in this anonymous function here. And it will only re-execute this function if one of those dependencies here changed. So if you have an empty dependencies array. this will never re-execute,because there are no dependencies that could change.

//   const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

//   const [counter, setCounter] = useState(initialCount);
//  // These functions might seem that they are not changed but these are created inside the Counter so they are nested. and therefore they are technically recreated every time the counter function is on run.
//   const handleDecrement = useCallback(function handleDecrement() {
//     setCounter((prevCounter) => prevCounter - 1);
//   }, [])

//   const handleIncrement = useCallback(function handleIncrement() {
//     setCounter((prevCounter) => prevCounter + 1);
//   });

//   return (
//     <section className="counter">
//       <p className="counter-info">
//         The initial counter value was <strong>{initialCount}</strong>. It{' '}
//         <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
//       </p>
//       <p>
//         <IconButton icon={MinusIcon} onClick={handleDecrement}>
//           Decrement
//         </IconButton>
//         <CounterOutput value={counter} />
//         <IconButton icon={PlusIcon} onClick={handleIncrement}>
//           Increment
//         </IconButton>
//       </p>
//     </section>
//   );
// });

// export default Counter;
