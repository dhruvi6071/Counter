import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigerCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);
  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }
  return (
    <>
      <Header />
      <main>
       <ConfigureCounter onSet={handleSetCount} />
       {/* whenever the key value changes, so the chosen count state value changes, React will basically, you could say, throw away the old component instance. It will destroy it and recreate it. So as if it would be rendering this counter component for the first time. And therefore this is a nice trick or pattern, to be precise, */}
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
