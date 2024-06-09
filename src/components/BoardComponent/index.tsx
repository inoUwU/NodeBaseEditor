import { type Component, createSignal, onMount } from "solid-js";
import styles from "./styles.module.css";

const BoardComponent: Component = () => {
  const [grabbingBoard, setGrabbingBoard] = createSignal<boolean>(false);
  const [scale, setScale] = createSignal<number>(1);

  onMount(() => {
    const boardElement = document.getElementById("board");
    if (boardElement) {
      boardElement.addEventListener(
        "wheel",
        (Event) => {
          // update scale
          setScale(scale() + Event.deltaY * -0.005);

          // restrict scale
          setScale(Math.min(Math.max(1, scale()), 2));

          // apply scale transform
          boardElement.style.transform = `scale(${scale()})`;
          boardElement.style.marginTop = `${(scale() - 1) * 50}vh`;
          boardElement.style.marginLeft = `${(scale() - 1) * 50}vw`;
        },
        { passive: true }
      );
    }
  });

  const handleOnMouseDownBoard = () => {};
  const handleOnMouseUpBoard = () => {};
  const handleOnMouseMove = () => {};

  return (
    <div id="boardWrapper" class={styles.wrapper}>
      <div
        id="board"
        class={grabbingBoard() ? styles.boardDragging : styles.board}
        onMouseDown={handleOnMouseDownBoard}
        onMouseUp={handleOnMouseUpBoard}
        onMouseMove={handleOnMouseMove}
      >
        ;
      </div>
    </div>
  );
};

export default BoardComponent;
