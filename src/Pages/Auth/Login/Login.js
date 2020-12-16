import { Box, Grid, Button } from "atoms";
import { LoginForm } from "templates/LoginForm";
import { SentinelIntro } from "molecules/SentinelIntro";
// import { MinimiseSection } from "molecules/MinimiseSection";
import { SocialSecion } from "molecules/SocialSecion";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <Grid gridTemplateColumns="40rem 2.5fr">
      <SentinelIntro />
      <Grid>
        {/* <MinimiseSection /> */}
        <Box height="2rem" />
        <LoginForm />
        <Box
          borderTop="1px solid "
          borderColor="border.0"
          alignSelf="end"
          p="1rem 2rem "
        >
          <Grid
            gridAutoFlow="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <SocialSecion />
            <Grid gridAutoFlow="column" gridGap="2rem" alignItems="center">
              <Link to="/configure-setting">
                <Button px="3rem" justifySelf="center" type="submit">
                  Login
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
