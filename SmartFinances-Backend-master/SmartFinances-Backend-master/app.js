require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const tesseract = require("./lib/tesseract");

// import routes here
const userAuthRoutes = require("./routes/user/userAuth");
const newTransaction = require("./routes/user/newTransaction");
const userDashboard = require("./routes/user/userDashboard");
const adminCreateFund = require("./routes/admin/createFund");
const adminCreateUser = require("./routes/admin/createNewUser");
//const fundOptions = require("./routes/user/userFundOptions");
const userBalance = require("./routes/user/balance");
const walletFunds = require("./routes/user/addFundsToWallet");
const userPayToMerchant = require("./routes/user/payToMerchant");
const investmentWithdraw = require("./routes/user/investmentWithdraw");
const thirdpartyapi = require("./routes/thirdparty/thirdPartyapi");
const manageFund = require("./routes/admin/manageFund");
const receiptValue = require("./routes/user/receiptValue");
const getInvestments = require("./routes/user/getInvestments");
const investmentSell = require("./routes/user/investmentSell");
const userPhoneNumber = require("./routes/admin/manageUser");
const changeProfileSettings = require("./routes/user/changeProfileSettings");
const getTransactions = require("./routes/user/transactionHistory");
const userInvestments = require("./routes/user/userinvestments");
const uploadreceipt = require("./routes/user/uploadReceipt");
const changePassword = require("./routes/user/changePassword");
const modifyUser = require("./routes/admin/modifyUser");
const modifyFund = require("./routes/admin/modifyFund");
// Middlewares
const { authenticate } = require("./middlewares/authenticate");

app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser()); // used to put or delete some values into the cookies
app.use(cors());
app.use(authenticate);

// Routes here

app.use("/api", userAuthRoutes);
app.use("/api", newTransaction);
app.use("/api", userDashboard);
app.use("/api", adminCreateFund);
app.use("/api", adminCreateUser);
//app.use("/api", fundOptions);
app.use("/api", userBalance);
app.use("/api", userPayToMerchant);
app.use("/api", investmentWithdraw);
app.use("/openapi", thirdpartyapi);
app.use("/api", walletFunds);
app.use("/api", manageFund);
app.use("/api", receiptValue);
app.use("/api", investmentSell);
app.use("/api", getInvestments);
app.use("/api", userPhoneNumber);
app.use("/api", changeProfileSettings);
app.use("/api", userInvestments);
app.use("/api", getTransactions);
app.use("/api", uploadreceipt);
app.use("/api", changePassword);
app.use("/api", modifyUser);
app.use("/api", modifyFund);
// Server Startup
(async () => {
  // We must not catch errors on db connection
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  await tesseract.initWorker();
})();

module.exports = app;
