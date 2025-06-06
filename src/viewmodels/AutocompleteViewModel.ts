import { makeAutoObservable, runInAction } from "mobx";
import { getCountryByName } from "../api/apiService";
import countries from "../api/countries.json";

export type Country = typeof countries[number];

export class AutocompleteViewModel {
  value = "";
  suggestions: Country[] = [];
  isLoading = false;

  constructor(public maxSuggestions: number) {
    makeAutoObservable(this);
  }

  setValue = (val: string) => {
    this.value = val;
    this.fetchSuggestions(val);
  };

  selectSuggestion = (country: Country) => {
    this.value = country.name;
    this.suggestions = [];
  };

  private fetchSuggestions = async (query: string) => {
    if (!query) {
      this.suggestions = [];
      return;
    }

    this.isLoading = true;
    try {
      const result = await getCountryByName(query);
      const unique = Array.from(new Map(result.map(r => [r.name, r])).values());

      runInAction(() => {
        this.suggestions = unique.slice(0, this.maxSuggestions);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
