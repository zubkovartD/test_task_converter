import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { validateInputValue } from "../../utils";
import useCurrenciesStore from "../../store/store";

const EditableCell = (props: any) => {
  const { currencies, setCurrencies } = useCurrenciesStore();
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(props.value || "");
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [previousValue, setPreviousValue] = useState<string>("");
  const [isSaveDisabled, setSaveDisabled] = useState<boolean>(false);

  React.useEffect(() => {
    setEditValue(props.value || "");
  }, [props.value]);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    setEditing(true);
    setPreviousValue(editValue);
  };

  const handleSaveClick = () => {
    if (!isSaveDisabled) {
      setEditValue(inputRef.current?.value || "");
      setEditing(false);

      const updatedCurrencies = currencies.map((currency) => {
        if (currency.ccy === props.ccy) {
          return {
            ...currency,
            [props.field]: inputRef.current?.value || "",
          };
        }
        return currency;
      });

      setCurrencies(updatedCurrencies);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditValue(previousValue);
  };

  const handleChange = () => {
    const currentValue = inputRef.current?.value || "";
    setEditValue(currentValue);
    setSaveDisabled(!validateInputValue(props.value, currentValue));
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <TableCell
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
      data-testid="editable-cell"
    >
      {isEditing ? (
        <>
          <TextField
            value={editValue}
            onChange={handleChange}
            inputRef={inputRef}
          />
          <SaveIcon
            style={{
              display: isMouseOver ? "inline" : "none",
              position: "absolute",
              top: "0",
              right: "24px",
              fontSize: "16px",
              cursor: isSaveDisabled ? "not-allowed" : "pointer",
              color: isSaveDisabled ? "#d3d3d3" : "inherit",
            }}
            onClick={handleSaveClick}
          />
          <CloseIcon
            style={{
              display: isMouseOver ? "inline" : "none",
              position: "absolute",
              top: "0",
              right: "0",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={handleCancelClick}
          />
        </>
      ) : (
        <>
          <span>{editValue}</span>
          <ModeEditOutlinedIcon
            style={{
              display: isMouseOver ? "inline" : "none",
              position: "absolute",
              top: "4px",
              right: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={handleEditClick}
          />
        </>
      )}
    </TableCell>
  );
};

export default EditableCell;
