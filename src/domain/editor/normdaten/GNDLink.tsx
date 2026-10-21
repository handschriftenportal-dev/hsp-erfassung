import { Link } from "@mui/material";
import type { FC } from "react";
import { NormdatenUtilities } from "src/domain/editor/normdaten/NormdatenUtilities";

interface Props {
  gndIdentifier: string | null;
}

export const GNDLink: FC<Props> = ({ gndIdentifier }) => {
  return (
    gndIdentifier && (
      <Link
        component="button"
        variant="gnd-link"
        onClick={(event) => {
          event.stopPropagation();
          window.open(NormdatenUtilities.idToUrl(gndIdentifier), "_blank");
        }}
      >
        {gndIdentifier}
      </Link>
    )
  );
};
