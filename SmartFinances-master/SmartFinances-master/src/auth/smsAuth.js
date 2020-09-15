import firebase from "./firebase";

export const submitPhone = phoneNumber => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
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
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
