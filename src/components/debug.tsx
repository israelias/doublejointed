import React from "react"

export interface DebugPropss {
  title: string
  data: object
}

const Debug = ({ title, data }: DebugPropss) => (
  <div style={{ marginBottom: 20 }}>
    <div>[debug] {title}</div>
    <div style={{ fontSize: "12px" }}>
      {Object.keys(data).map(key => {
        let value = data[key]
        if (
          value !== undefined &&
          value !== null &&
          value.indexOf("http") === 0
        ) {
          value = <a href={value}>{value}</a>
        }
        return (
          <div key={key}>
            {key}:{" "}
            {value === undefined ? <i>undefined</i> : <strong>{value}</strong>}
          </div>
        )
      })}
    </div>
  </div>
)

export default Debug
