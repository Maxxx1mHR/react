const BreakApp = ({ setIsBreak }: { setIsBreak: CallableFunction }) => {
  return (
    <button
      onClick={() => {
        setIsBreak(true);
      }}
      className="button button_danger"
    >
      Break app
    </button>
  );
};

export default BreakApp;
