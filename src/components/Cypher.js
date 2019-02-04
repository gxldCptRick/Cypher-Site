import React from "react";
function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}
export function Cypher(props) {
  if (!props.data) throw new Error("props must contain data object");
  const cypher = props.data;
  return (
    <div>
      <h2>{cypher.name}</h2>
      <p>Key Type: {capitalizeString(cypher.keyType)}</p>
      <p>{cypher.description}</p>
    </div>
  );
}
