import React from "react";
import { observer } from "mobx-react-lite";
import { AutocompleteViewModel } from "../viewmodels/AutocompleteViewModel";
import styles from "./AutocompleteControl.module.css";

interface Props {
  viewModel: AutocompleteViewModel;
}

export const AutocompleteControl: React.FC<Props> = observer(
  ({ viewModel }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      viewModel.setValue(e.target.value);
    };

    return (
      <div className={styles.wrapper}>
        <input
          type="text"
          value={viewModel.value}
          onChange={handleChange}
          className={styles.input}
          placeholder="Введите страну"
        />

        {viewModel.isLoading && (
          <div className={styles.loading} aria-live="polite">
            Загрузка...
          </div>
        )}

        {viewModel.suggestions.length > 0 && (
          <ul className={styles.dropdown}>
            {viewModel.suggestions.map((s) => (
              <li
                key={s.name}
                className={styles.suggestion}
                onClick={() => viewModel.selectSuggestion(s)}
              >
                <img src={s.flag} alt={s.name} className={styles.flag} />
                <div>
                  <div className={styles.name}>{s.name}</div>
                  <div className={styles.fullName}>{s.fullName}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
