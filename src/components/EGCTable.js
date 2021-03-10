import React, { useEffect } from "react";

const data = [
  { amps: "15", copper: "14", aluminum: "12" },
  { amps: "20", copper: "12", aluminum: "10" },
  { amps: "30", copper: "10", aluminum: "8" },
  { amps: "40", copper: "10", aluminum: "8" },
  { amps: "60", copper: "10", aluminum: "8" },
  { amps: "100", copper: "8", aluminum: "6" },
  { amps: "200", copper: "6", aluminum: "4" },
  { amps: "300", copper: "4", aluminum: "2" },
  { amps: "400", copper: "3", aluminum: "1" },
  { amps: "500", copper: "2", aluminum: "1/0" },
  { amps: "600", copper: "1", aluminum: "2/0" },
  { amps: "800", copper: "1/0", aluminum: "3/0" },
  { amps: "1000", copper: "2/0", aluminum: "4/0" },
  { amps: "1200", copper: "3/0", aluminum: "250" },
  { amps: "1600", copper: "4/0", aluminum: "350" },
  { amps: "2000", copper: "250", aluminum: "400" },
  { amps: "2500", copper: "350", aluminum: "600" },
  { amps: "3000", copper: "400", aluminum: "600" },
  { amps: "4000", copper: "500", aluminum: "800" },
  { amps: "5000", copper: "700", aluminum: "1200" },
  { amps: "6000", copper: "800", aluminum: "1200" },
];

const tableTitle = "NEC Table 250.122 Equipment Grounding Conductors";

function EGCTable(props) {
  useEffect(() => {
    return () => {
      props.setShowTiles(true);
    };
  }, []);

  const tableData = () => {
    return (
      <>
        {data.map((row) => (
          <tr>
            <td>{row.amps}</td>
            <td>{row.copper}</td>
            <td>{row.aluminum}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div>
      <div>
        <label>{tableTitle}</label>
      </div>
      <div style={{ margin: "0 20% auto" }}>
        <table>
          <tr>
            <th rowSpan="2">
              Rating or Setting of Automatic Overcurrent Device in Circuit Ahead
              of Equipment, etc., Not Exceeding (Amperes)
            </th>
            <th colSpan="2">Size (AWG or kcmil)</th>
          </tr>
          <tr>
            <td>Copper</td>
            <td>Aluminum or Copper-Clad Aluminum</td>
          </tr>
          {tableData()}
        </table>
        <label>
          <h6>Notes:</h6>
        </label>
        <ol>
          <li>
            Where multiple sets of service-entrance conductors are used as
            permitted in 230.40, Exception No. 2, the equivalent size of the
            largest service-entrance conductor shall be determined by the
            largest sum of the areas of the corresponding conductors of each
            set.
          </li>
          <li>
            Where there are no service-entrance conductors, the grounding
            electrode conductor size shall be determined by the equivalent size
            of the largest service-entrance conductor required for the load to
            be served.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default EGCTable;
