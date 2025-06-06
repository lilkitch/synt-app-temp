import React from "react";

import { ButtonInputControl } from "./components/ButtonInputControl";
import { AutocompleteControl } from "./components/AutocompleteControl";
import { ButtonTextControlVM } from "./viewmodels/ButtonTextControlVM";
import { AutocompleteViewModel } from "./viewmodels/AutocompleteViewModel";

import type { ButtonConfig } from "./components/ButtonInputControl";

const App = () => {
  const [vm1] = React.useState(() => new ButtonTextControlVM());
  const [vm2] = React.useState(() => new ButtonTextControlVM());
  const [ac1] = React.useState(() => new AutocompleteViewModel(3));
  const [ac2] = React.useState(() => new AutocompleteViewModel(10));

  const buttons1: ButtonConfig[] = React.useMemo(
    () => [
      { position: "right", label: "Clear", onClick: vm1.clear },
      { position: "right", label: "Hello", onClick: vm1.setHello },
    ],
    [vm1.clear, vm1.setHello]
  );

  const buttons2: ButtonConfig[] = React.useMemo(
    () => [
      { position: "left", label: "Check number", onClick: vm2.alertIfNumber },
      { position: "right", label: "Show text", onClick: vm2.alertValue },
    ],
    [vm2.alertIfNumber, vm2.alertValue]
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Контрол с 2 кнопками справа</h2>
      <ButtonInputControl viewModel={vm1} buttons={buttons1} />

      <h2>Контрол с 1 кнопкой слева и 1 кнопкой справа</h2>
      <ButtonInputControl viewModel={vm2} buttons={buttons2} />

      <h2>Автокомплит (макс. 3)</h2>
      <AutocompleteControl viewModel={ac1} />

      <h2>Автокомплит (макс. 10)</h2>
      <AutocompleteControl viewModel={ac2} />
    </div>
  );
};

export default App;
