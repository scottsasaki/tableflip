// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // const [max, setMax] = useState({ x: 0, y: 0, z: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const [thrown, setThrown] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [sensor, setSensor] = useState(false);

  function handleResetClick() {
    setPreparing(false);
    setX(0);
    setY(0);
    setZ(0);
    setThrown(false);
  }

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

  useEffect(() => {
    if (sensor) {
      acl.start();
    }

    return () => {
      acl.stop();
    };
  }, [sensor]);

  function handleMockThrow() {
    if (thrown) {
      handleResetClick();
      setTimeout(() => {
        setPreparing(true);
      }, 1000);
    } else {
      setPreparing(true);
    }

    setTimeout(
      () => {
        setPreparing(false);
        setThrown(true);

        setX((Math.random() * 10 + 2).toFixed(2));
        setY((Math.random() * 10).toFixed(2));
        setZ((Math.random() * 10).toFixed(2));
      },
      thrown ? 1500 : 1000
    );
  }

  const handleToggleSensing = () => {
    setSensor(!sensor);
  };

  const face = () => {
    if (thrown) {
      return x > 8 ? "(╯ಠ□ಠ)╯︵" : "(╯°□°)╯︵";
    } else {
      return "(╮°_°)╮";
    }
  };
  return (
    <div className="app-container">
      <header className="header">Tableflip</header>
      <div className="subheader">Accelerometer on Chrome Mobile Only</div>

      <Controls
        onStart={handleToggleSensing}
        onResetClick={handleResetClick}
        onMockThrow={handleMockThrow}
        sensor={sensor}
      />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "20% 80%",
          margin: "10rem auto",
          maxWidth: "500px",
        }}
      >
        <div
          className={`character ${preparing ? "shaking" : ""}`}
          style={{ textAlign: "right" }}
        >
          {face()}
        </div>
        <div className="room">
          <div
            className="x-axis"
            style={{
              transform: `translateX(${x * 20}px)`,
              transition: "all 1s",
              display: "inline-block",
            }}
          >
            <div
              className="table"
              style={{
                display: "inline-block",
                transform: `rotate(${x * 150}deg)`,
                transition: "all 1s",
              }}
            >
              ┳━┳
            </div>
          </div>
        </div>
        {/* ┳━┳ ┳━┳ ヽ(ಠل͜ಠ)ﾉ (╯°□°)╯︵ ┻━┻ */}
      </section>

      <section className="debug">
        <div className="code">{x}</div>
        <div className="code">{y}</div>
        <div className="code">{z}</div>
      </section>
    </div>
  );
}

function Controls({ onStart, onResetClick, onMockThrow, sensor }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <button onClick={onMockThrow} className="button-throw">
        Throw
      </button>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button onClick={onStart}>
          {sensor ? "Stop Accelerometer" : "Start Accelerometer"}
        </button>

        <button onClick={onResetClick}>Reset</button>
      </div>
    </div>
  );
}

export default App;
