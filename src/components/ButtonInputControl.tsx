import React from "react";
import { observer } from "mobx-react-lite";
import { ButtonTextControlVM } from "../viewmodels/ButtonTextControlVM";
import styles from "./ButtonInputControl.module.css";

export type ButtonConfig = {
  position: "left" | "right";
  label: string;
  onClick: () => void;
};

type Props = {
  viewModel: ButtonTextControlVM;
  buttons?: ButtonConfig[];
  className?: string; //  на случай стилизации извне
};

const ControlButton: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => (
  <button onClick={onClick} className={styles.button}>
    {label}
  </button>
);

export const ButtonInputControl: React.FC<Props> = observer(
  ({ viewModel, buttons = [], className }) => {
    const groupButtons = (position: ButtonConfig["position"]) =>
      buttons.filter((btn) => btn.position === position);

    const leftButtons = groupButtons("left");
    const rightButtons = groupButtons("right");

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        {leftButtons.map((btn) => (
          <ControlButton key={`left-${btn.label}`} {...btn} />
        ))}

        <input
          type="text"
          value={viewModel.value}
          onChange={(e) => viewModel.setValue(e.target.value)}
          className={styles.input}
        />

        {rightButtons.map((btn) => (
          <ControlButton key={`right-${btn.label}`} {...btn} />
        ))}
      </div>
    );
  }
);
