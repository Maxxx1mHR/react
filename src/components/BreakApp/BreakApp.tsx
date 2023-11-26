import { useState } from 'react';

const BreakApp = () => {
  const [isBreak, setIsBreak] = useState(false);
  if (isBreak) {
    throw Error('error!');
  }
  return (
    <button className="button button_danger" onClick={() => setIsBreak(true)}>
      Break app
    </button>
  );
};

export default BreakApp;
