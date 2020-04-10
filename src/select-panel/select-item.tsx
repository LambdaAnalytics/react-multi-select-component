/**
 * This component represents an individual item in the multi-select drop-down
 */
import { css } from "goober";
import React, { useEffect, useRef } from "react";

import { Option } from "../lib/interfaces";
import DefaultItemRenderer from "./default-item";

interface ISelectItemProps {
  itemRenderer;
  option: Option;
  checked: boolean;
  focused?: boolean;
  disabled?: boolean;
  onSelectionChanged: (checked: boolean) => void;
  onClick;
}

const ItemContainer = css({
  boxSizing: "border-box",
  cursor: "pointer",
  display: "block",
  padding: "10px",
  outline: "0",
  "&:hover,&.selected": {
    background: "var(--rmsc-hover)",
  },
});

const SelectItem = ({
  itemRenderer: ItemRenderer = DefaultItemRenderer,
  option,
  checked,
  focused,
  disabled,
  onSelectionChanged,
  onClick,
}: ISelectItemProps) => {
  const itemRef: any = useRef();

  useEffect(() => {
    updateFocus();
    // eslint-disable-next-line
  }, []);

  const toggleChecked = () => {
    onSelectionChanged(!checked);
  };

  const handleClick = e => {
    toggleChecked();
    onClick(e);
  };

  const updateFocus = () => {
    if (focused && itemRef) {
      itemRef.current.focus();
    }
  };

  const handleKeyDown = e => {
    switch (e.which) {
      case 13: // Enter
      case 32: // Space
        toggleChecked();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <label
      className={`${ItemContainer} select-item ${checked && "selected"}`}
      role="option"
      aria-selected={checked}
      tabIndex={-1}
      ref={itemRef}
      onKeyDown={handleKeyDown}
    >
      <ItemRenderer
        option={option}
        checked={checked}
        onClick={handleClick}
        disabled={disabled}
      />
    </label>
  );
};

export default SelectItem;
