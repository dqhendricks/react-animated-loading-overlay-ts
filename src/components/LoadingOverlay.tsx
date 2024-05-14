import { useState, useEffect, useRef, PropsWithChildren } from "react";

import styles from "./LoadingOverlay.module.css";

interface LoadingOverlay {
  isLoading: boolean;
}

type Status = "ready" | "showing" | "hiding";

function handleEvent(event: Event) {
  // dummy handler for preventing user input
  event.preventDefault();
}

function disableUserInput() {
  // disable keyboard events
  window.addEventListener("keydown", handleEvent);
  window.addEventListener("keyup", handleEvent);
  // disable mouse events
  window.addEventListener("mousedown", handleEvent);
  window.addEventListener("mouseup", handleEvent);
}

function enableUserInput() {
  // remove event listeners
  window.removeEventListener("keydown", handleEvent);
  window.removeEventListener("keyup", handleEvent);
  window.removeEventListener("mousedown", handleEvent);
  window.removeEventListener("mouseup", handleEvent);
}

export default function LoadingOverlay({
  isLoading,
  children,
}: PropsWithChildren<LoadingOverlay>) {
  const [status, setStatus] = useState<Status>("ready");
  const timer = useRef(0);

  useEffect(() => {
    // this effect allows us to fade out the overlay before unmounting it
    if (status === "ready" && isLoading) {
      setStatus("showing"); // mount overlay when isLoading set to true and status is "ready"
      disableUserInput();
    }
    if (status === "showing" && !isLoading) {
      setStatus("hiding"); // begin overlay's hide animation when isLoading set to false and status is "showing"
      timer.current = setTimeout(() => {
        // animation is complete and we can unmount the overlay and go back to "ready" state
        setStatus("ready");
        enableUserInput();
      }, 250);
    }
  }, [isLoading, status]);

  useEffect(() => {
    return () => {
      // ensure we clean up on dismount in case of page navigation
      enableUserInput();
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      {status !== "ready" && (
        <div
          className={`${styles.overlay} ${
            status === "hiding" ? styles.hide : ""
          }`}
        >
          <div className={styles.overlayContent}>
            {/* can put any content in here and it will center in overlay during loading */}
            {children}
          </div>
        </div>
      )}
    </>
  );
}
