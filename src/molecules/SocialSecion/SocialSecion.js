import { Grid } from "atoms";
import MemoTwitter from "assets/icons/Twitter";
import MemoShare from "assets/icons/Share";
import MemoGit from "assets/icons/Git";

export const SocialSecion = () => {

  const SocialClicks = (type) => {
    if(type === 'twitter') {
      window.open('https://twitter.com/sentinel_co?lang=en')
    } else if (type === 'telegram') {
      window.open('http://t.me/sentinel_co')
    } else if(type === 'git') {
      window.open('https://github.com/sentinel-official')
    }
  }

  return (
    <Grid gridAutoFlow="column" gridGap="2rem">
      <MemoTwitter fill="#55678B" onClick={() => SocialClicks('twitter')}/>
      <MemoShare fill="#55678B" onClick={() => SocialClicks('telegram')}/>
      <MemoGit fill="#55678B"  onClick={() => SocialClicks('git')}/>
    </Grid>
  );
};
