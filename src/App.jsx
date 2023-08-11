import { useEffect, useState } from "react";
import classes from "./App.module.css";
import KeypadList from "./components/KeypadList";
import useBear from "./utils/store.js";

function App() {
  const name = useBear((state) => state.name);
  const updateName = useBear((state) => state.updateName);

  const [power, setPower] = useState(true);
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [bank, setBank] = useState(false);

  const onClickPower = () => {
    setPower(!power);
    updateName(null);
  };

  const onChangeVol = (event) => {
    setVolume(event.target.value);
    setDisplay("Volume: " + Math.round(100 * event.target.value));
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplay(null);
    }, 1e3);
  }, [volume]);

  const onClickBank = () => {
    if (power) {
      setBank(!bank);
      setDisplay(bank ? "Heater Kit" : "Smooth Piano Kit");
    }
  };

  useEffect(() => {
    if (power) {
      setDisplay(name);
    }
    if (!power) {
      setDisplay(null);
    }
  }, [name, power]);

  return (
    <div className="h-screen flex justify-center items-center m-auto font-russoOne text-[16px] select-none">
      <div className="bg-[#B3B3B3] p-7 border-[4px] border-[#FAA52B] grid grid-rows-2 grid-cols-none md:grid-rows-none md:grid-cols-2 gap-10">
        <div className="grid grid-cols-3 grid-rows-3 gap-3">
          {<KeypadList bank={bank} volume={volume} power={power} />}
        </div>
        <div className="grid grid-rows-4">
          <div className="flex flex-col items-center justify-center">
            <div>Power</div>
            <div
              className="w-[50px] h-[30px] border border-black bg-black p-1 cursor-pointer"
              onClick={onClickPower}
            >
              <div
                className="w-[20px] h-[20px] border border-blue-800 bg-blue-800"
                style={power ? { float: "right" } : { float: "left" }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-[200px] h-[50px] p-[15px] bg-[#808080] flex justify-center items-center">
              {display}
            </div>
          </div>
          <input
            type="range"
            max="1"
            min="0"
            step="0.01"
            value={volume}
            className={classes.input}
            onChange={onChangeVol}
            disabled={!power}
          />
          <div className="flex flex-col items-center justify-center">
            <div>Bank</div>
            <div
              className="w-[50px] h-[30px] border border-black bg-black p-1 cursor-pointer"
              onClick={onClickBank}
            >
              <div
                className="w-[20px] h-[20px] border border-blue-800 bg-blue-800"
                style={!bank ? { float: "left" } : { float: "right" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
