import { FormControl } from "@angular/forms";

export default function restrictedWord(words) {
  return (formControl: FormControl): { [key: string]: any } => {
    debugger;
    for (const w of words) {
      if (formControl.value.includes(w)) return { restrictedWord: w };
    }
    return undefined;
  };
}
