import MemoHelp from "assets/icons/Help";
import { Box } from "atoms/Box";
import ReactTooltip from "react-tooltip";
import { HELP_MESSAGE } from "utils/utility";

export const HelpTooltip = () => {
  return (
    <Box className="help-tooltip">
      <Box>
        <a data-for="help" data-tip="3">
          <MemoHelp height="1.3rem" width="1.3rem" cursor="pointer" />
        </a>
      </Box>
      <ReactTooltip
        id="help"
        getContent={() => (
          <Box>
            <p>{HELP_MESSAGE}</p>
          </Box>
        )}
        effect="solid"
        place="top"
        border={true}
        type="light"
      />
    </Box>
  );
};
