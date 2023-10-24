// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  // const [max, setMax] = useState({ x: 0, y: 0, z: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const [thrown, setThrown] = useState(false);

  function handleResetClick() {
    setX(0);
    setY(0);
    setZ(0);
    setThrown(false);
  }

  function handleMockThrow() {
    setX(Math.random() * 10);
    setY(Math.random() * 10);
    setZ(Math.random() * 10);
    setThrown(true);
  }

  function handleStartSensing() {
    // eslint-disable-next-line no-undef
    const acl = new Accelerometer({ frequency: 60 });

    acl.addEventListener("reading", () => {
      if (acl) {
        // setMax(acl);
        setX(acl.x);
        setY(acl.y);
        setZ(acl.z);
        setThrown(true);
      }
    });

    acl.start();
  }

  return (
    <div className="app-container">
      <header className="header">Tableflip</header>
      <div className="subheader">Chrome Mobile Only</div>

      <Controls
        onStart={handleStartSensing}
        onResetClick={handleResetClick}
        onMockThrow={handleMockThrow}
      />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "20% 80%",
          margin: "10rem auto",
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
              transform: `translateX(${x * 10}px)`,
              transition: "all 1s",
              display: "inline-block",
            }}
          >
            <div
              className="table"
              style={{
                display: "inline-block",
                transform: `rotate(${y * 100}deg)`,
                transition: "all 1s",
              }}
            >
              ┳━┳
            </div>
          </div>
        </div>
        {/* ┳━┳ ┳━┳ ヽ(ಠل͜ಠ)ﾉ (╯°□°)╯︵ ┻━┻ */}
      </section>

      <section className="debug" style={{ color: "#ccc" }}>
        <div className="max">{x}</div>
        <div className="max">{y}</div>
        <div className="max">{z}</div>
      </section>
    </div>
  );
}

function Controls({ onStart, onResetClick, onMockThrow }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      <button onClick={onStart}>Start</button>

      <button onClick={onResetClick}>Reset</button>
      <button onClick={onMockThrow}>Throw</button>
    </div>
  );
}

export default App;
