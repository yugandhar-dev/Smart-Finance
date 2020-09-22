import firebase from "./firebase";

export const submitPhone = phoneNumber => {
  console.log(phoneNumber);
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
    }
  );
  var appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
    })
    .catch(function (error) {
      return false;
    });
};

export const verifyOtp = async code => {
  let optConfirm = window.confirmationResult;
  const result = await optConfirm.confirm(code);
  try {
    await result.user;
    window.confirmationResult = null;
    return true;
  } catch (error) {
    console.log("error", error);
    window.confirmationResult = null;
    return false;
  }
};
