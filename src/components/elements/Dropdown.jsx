import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="border-2 border-white select">
      <select name="format" onChange={func} id="format" defaultValue="0">
        <option value="0" disabled>
          {title.toUpperCase()}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.label} {/* ✅ Fix: Now rendering text instead of an object */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
