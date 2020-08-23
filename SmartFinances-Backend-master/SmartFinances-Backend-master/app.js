require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//import routes here
const userAuthRoutes = require("./routes/user/userAuth");
const newTransaction = require("./routes/user/newTransaction");
const userDashboard = require("./routes/user/userDashboard");
const adminCreateFund = require("./routes/admin/createFund");
const adminCreateUser = require("./routes/admin/createNewUser");
const fundOptions = require("./routes/user/userFundOptions");
const userBalance = require("./routes/user/balance");
const walletFunds = require("./routes/user/addFundsToWallet");
const manageUser = require("./routes/admin/manageUser");
const userPayToMerchant = require("./routes/user/payToMerchant");
const investmentWithdraw = require("./routes/user/investmentWithdraw");
const thirdpartyapi = require("./routes/thirdparty/thirdPartyapi");
const manageFund = require("./routes/admin/manageFund");
const { authenticate } = require("./middlewares/authenticate");

//DB Connections
//This is local DB connection
//Change this address to cloud host
//const db = "mongodb://localhost:27017/smartfinances";
//Cloud DB connection

const db =
  "mongodb+srv://mayeshaUser:mangopass@firstcluster-hrstd.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(err => {
    console.log(err);

    console.log("DB CONNECTION ERROR");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser()); //used to put or delete some values into the cookies
app.use(cors());

app.use(authenticate);

//Routes here
app.use("/api", userAuthRoutes);
app.use("/api", newTransaction);
app.use("/api", userDashboard);
app.use("/api", adminCreateFund);
app.use("/api", adminCreateUser);
app.use("/api", fundOptions);
app.use("/api", userBalance);
app.use("/api", userPayToMerchant);
app.use("/api", investmentWithdraw);
app.use("/openapi", thirdpartyapi);

investmentWithdraw;

app.use("/api", walletFunds);
app.use("/api", manageFund);

//Port
const port = process.env.PORT || 8000;

//Starting Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
