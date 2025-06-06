import { makeAutoObservable } from "mobx";

export class ButtonTextControlVM {
  value = "";

  constructor(initialValue: string = "") {
    makeAutoObservable(this);
    this.value = initialValue;
  }

  setValue = (newValue: string) => {
    this.value = newValue;
  };

  clear = () => {
    this.value = "";
  };

  setHello = () => {
    this.value = "Hello world!";
  };

  alertValue = () => {
    alert(this.value);
  };

  alertIfNumber = () => {
    const num = Number(this.value);
    if (!isNaN(num)) {
      alert(`Число: ${num}`);
    } else {
      alert("Введите число");
    }
  };
}
