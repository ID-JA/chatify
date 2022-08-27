import { TextInput } from "@mantine/core";

import React, { useState } from "react";
import zxcvbn from "zxcvbn";

import useStyles from "./StrengthIndicator.styles";

export const StrengthIndicator = React.forwardRef(
  ({ minStrength = 4, thresholdLength = 8, onChange, error, name }, ref) => {
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState(0);

    function handleChange(value) {
      setPassword(value);
      setStrength(zxcvbn(value).score);
    }

    const passwordLength = password.length;
    const passwordStrong = strength >= minStrength;
    const passwordLong = passwordLength > thresholdLength;

    const { classes } = useStyles({
      passwordLength,
      passwordLong,
      passwordStrong,
    });

    return (
      <>
        <TextInput
          ref={ref}
          label="Password"
          name={name}
          type="password"
          onChange={(e) => handleChange(e.target.value)}
          rightSection={
            <span className={classes.badge}>
              {passwordLength !== 0 && (passwordLong ? `${thresholdLength}+` : passwordLength)}
            </span>
          }
          error={error}
        />

        <div className={classes["strength-indicator"]}>
          <div className={classes["strength-indicator-fill"]} data-strength={strength}></div>
        </div>
      </>
    );
  }
);
StrengthIndicator.displayName = "StrengthIndicator";
