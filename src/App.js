// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [max, setMax] = useState({ x: 0, y: 0, z: 0 });
  const [thrown, setThrown] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const acl = new Accelerometer({ frequency: 60 });

    acl.addEventListener("reading", () => {
      acl.x > max.x && (max.x = acl.x);
      acl.y > max.y && (max.y = acl.y);
      acl.z > max.z && (max.z = acl.z);
    });

    acl.start();
    return () => {
      // acl.done();
    };
  }, [max]);

  function handleResetClick() {
    setMax({ x: 0, y: 0, z: 0 });
    setThrown(false);
  }

  function handleMockThrow() {
    setMax({ x: 12, y: 4, z: 10 });
    setThrown(true);
  }

  return (
    <div className="app-container">
      <header className="header">Tableflip</header>
      <Controls onResetClick={handleResetClick} onMockThrow={handleMockThrow} />

      <div className="max">{max.x}</div>
      <div className="max">{max.y}</div>
      <div className="max">{max.z}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20% 90%",
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <div className="character" style={{ textAlign: "right" }}>
          {thrown ? "(╯°□°)╯︵" : "(╮°_°)╮"}
        </div>
        <div className="room">
          <div
            className="x-axis"
            style={{
              transform: `translateX(${max.x * 10}px)`,
              transition: "all 1s",
              display: "inline-block",
            }}
          >
            <div
              className="table"
              style={{
                display: "inline-block",
                transform: `rotate(${max.y * 100}deg)`,
                transition: "all 1s",
              }}
            >
              ┳━┳
            </div>
          </div>
        </div>
        {/* ┳━┳ ┳━┳ ヽ(ಠل͜ಠ)ﾉ (╯°□°)╯︵ ┻━┻ */}
      </div>
    </div>
  );
}

function Controls({ handleStart, onResetClick, onMockThrow }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      {/* <button onClick={handleStart}>Start</button> */}

      <button onClick={onResetClick}>Reset</button>
      <button onClick={onMockThrow}>Throw</button>
    </div>
  );
}

export default App;
