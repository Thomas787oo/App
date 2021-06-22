export const Regex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  containOneUpperCase: /(?=.*[A-Z])/gm,
  containOneNumber: /(?=.*?[0-9])/gm,
  containOneSpecialCharacter: /(?=.*[?!&#£$:%@¿§«»ω⊙¤°℃℉€¥¢¡;.,~^=*])/gm,
  containMinimumEightCharacters: /^[0-9A-Za-z?!&#£$:%@]{8,}/gm,
  password: /^(?=.*[A-Z])(?=.*?[0-9])(?=.*[?!&#£$:%@])[0-9A-Za-z?!&#£$:%@]{8,}/,
  frenchPhoneNumber: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
};
