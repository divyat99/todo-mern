import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

export const apiBaseURL = () => {
  return "http://localhost:4000/api";
};

export const auth = () => {
  if (getAllLocatData()?.token) return true;
  else return false;
};

export const toastifySuccess = (message) => {
  toast.success(`${message}`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const toastifyError = (message) => {
  toast.error(`${message}`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const encryptLocalStorageData = (name, data, key) => {
  var encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  localStorage.setItem(name, encryptData);
};

export const dycryptLocalStorageData = (encryptData, key) => {
  var bytes = CryptoJS.AES.decrypt(encryptData, key);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const getAllLocatData = () => {
  if (localStorage.getItem("web-secret"))
    return dycryptLocalStorageData(
      localStorage.getItem("web-secret"),
      "DoNotTryToAccess"
    );
  else {
    return null;
  }
};
export const binaryToBase64 = (binaryData) => {
  const binaryString = String.fromCharCode(...new Uint8Array(binaryData));
  return `data:image/jpeg;base64,${btoa(binaryString)}`;
};
