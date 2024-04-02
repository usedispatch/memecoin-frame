import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptNumberWithKey(number: string, key: string): string {
  // let encryptedNumber = '';
  // for (let i = 0; i < number.length; i++) {
  //     let charCode = number.charCodeAt(i);
  //     let keyChar = key.charCodeAt(i % key.length);
  //     let encryptedCharCode = charCode + keyChar;
  //     encryptedNumber += String.fromCharCode(encryptedCharCode);
  // }
  return btoa(number); // Base64 encode
}

export function decryptNumberWithKey(encryptedNumber: string, key: string) {
  let decryptedNumber = '';
  encryptedNumber = atob(encryptedNumber); // Base64 decode
  decryptedNumber = encryptedNumber;
  // for (let i = 0; i < encryptedNumber.length; i++) {
  //     let charCode = encryptedNumber.charCodeAt(i);
  //     let keyChar = key.charCodeAt(i % key.length);
  //     let decryptedCharCode = charCode - keyChar;
  //     decryptedNumber += String.fromCharCode(decryptedCharCode);
  // }
  return decryptedNumber;
}
