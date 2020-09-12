import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const InterestCard = ({ investData }) => {
  const { principal, contribution, interests, tenure, amount } = investData;

  return (
    <Card>
      <CardContent>
        <Typography component="h1" variant="h5">
          Investment Balance after {tenure} years
        </Typography>
        <hr />
        <Typography variant="body1">
          Starting Amount <span style={{ float: "right" }}>$ {principal}</span>
        </Typography>
        <hr />
        <Typography variant="body1">
          Total Contributions{" "}
          <span style={{ float: "right" }}>$ {contribution * tenure * 12}</span>
        </Typography>
        <hr />
        <Typography variant="body1">
          Total Interest Earned{" "}
          <span style={{ float: "right" }}>$ {interests.slice(-1)[0]}</span>
        </Typography>
        <hr />
        <Typography variant="body1">
          Total amount Invested{" "}
          <span style={{ float: "right" }}>
            $ {contribution * tenure * 12 + principal}
          </span>
        </Typography>
        <hr />
        <Typography variant="body1">
          Total Amount accumulated{" "}
          <span style={{ float: "right" }}>$ {amount.slice(-1)[0]}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InterestCard;
