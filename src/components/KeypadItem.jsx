/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import useBear from "../utils/store";

const KeypadItem = (props) => {
  const { keyCode, keyTrigger, id, url, volume, power } = props;

  const updateName = useBear((state) => state.updateName);

  const [isClicked, setIsClicked] = useState(false);

  const audio = document.getElementById(id);

  const onClickHandler = () => {
    setIsClicked(true);
    updateName(id);
  };

  const onKeyPressHandler = useCallback(
    (event) => {
      if (event.keyCode === keyCode) {
        setIsClicked(true);
        updateName(id);
      }
    },
    [keyCode, updateName, id]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressHandler);

    if (isClicked) {
      if (power) {
        audio.volume = Math.round(100 * volume) / 100;
        audio.currentTime = 0;
        audio.play();
      }
      setTimeout(() => {
        setIsClicked(false);
      }, 80);
    }
  }, [isClicked, audio, onKeyPressHandler, volume, power]);

  return (
    <div
      className={`p-10 w-[80px] md:w-[100px] h-[60px] md:h-[80px] flex items-center justify-center flex-1 rounded-md shadow-custom shadow-black cursor-pointer ${
        isClicked
          ? power
            ? " bg-[#FAA52B] scale-95 shadow-none"
            : " bg-[#808080] scale-95 shadow-none"
          : " bg-[#808080]"
      }`}
      onClick={onClickHandler}
    >
      <audio id={id} src={url}></audio>
      {keyTrigger}
    </div>
  );
};

export default KeypadItem;
