import React, { useEffect } from "react";

function ConductorAdjustmentTable(props) {
    useEffect(() => {
      return () => {
        props.setShowTiles(true);
      };
    }, []);

}

export default ConductorAdjustmentTable