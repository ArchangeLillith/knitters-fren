import React from "react";

const PatternTitle = ({state, setState}) => {
  return (<>
    <label htmlFor="pattern-title">Pattern Title</label>
    <input
      type="text"
      required={true}
      maxLength={100}
      onChange={(e) =>
        setState((prev) => ({ ...prev, title: e.target.value }))
      }
      value={state.title}
      className="form-control bg-soft"
      id="pattern-title"
      placeholder="Title..."
    /></>
  )
};

export default PatternTitle;
