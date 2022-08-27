import { Button } from "@mantine/core";
import { BrandGoogle } from "tabler-icons-react";

export function SocialButton({ icon, ...others }) {
  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      leftIcon={icon}
      styles={(theme) => ({
        root: {
          border: 0,
          paddingLeft: 20,
          paddingRight: 20,
        },
        leftIcon: {
          marginRight: theme.spacing.md,
        },
      })}
      {...others}
    />
  );
}

export function GoogleButton({ ...others }) {
  return (
    <SocialButton icon={<BrandGoogle strokeWidth={3} />} {...others}>
      Sign in with Google
    </SocialButton>
  );
}
