/* eslint-disable no-lone-blocks */
{
  isEditing ? (
    <>
      <TextField
        value={editValue}
        onChange={handleChange}
        // style={{ width: "60px", height: "40px" }}
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
  );
}

{
  isEditing ? (
    <TextField
      size="small"
      value={editValue}
      variant="outlined"
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" disabled={!isSaveDisabled}>
              <SaveIcon color={isSaveDisabled ? "success" : "error"} />
            </IconButton>
            <IconButton size="small" onClick={handleCancelClick}>
              <CloseIcon color="error" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <>
      <span>{editValue}</span>
      {isMouseOver && (
        <IconButton size="small" onClick={handleEditClick}>
          <ModeEditOutlinedIcon color="primary" />
        </IconButton>
      )}
    </>
  );
}
{
  /* {showEditIcon && !editMode && (
    <IconButton size="small" onClick={handleEditIconClick}>
      <EditIcon color="primary" />
    </IconButton>
  )} */
}

// const handleConvert = () => {
//   if (input1) {
//     const convertedAmount = convertCurrency(
//       parseFloat(input1),
//       dropdown1,
//       dropdown2,
//       currencies
//     );
//     if (convertedAmount !== null) {
//       setInput2(convertedAmount);
//     }
//   }

//   if (input2) {
//     const convertedAmount = convertCurrency(
//       parseFloat(input2),
//       dropdown2,
//       dropdown1,
//       currencies
//     );
//     if (convertedAmount !== null) {
//       setInput1(convertedAmount);
//     }
//   }
// };

// const handleInputChange = (
//   value: any,
//   dropdown: any,
//   otherInput: any,
//   otherDropdown: any
// ) => {
//   const convertedAmount: any = convertCurrency(
//     parseFloat(value),
//     dropdown,
//     otherDropdown,
//     currencies
//   );
//   if (!isNaN(convertedAmount)) {
//     otherInput(convertedAmount.toString());
//   }
// };

// useEffect(() => {
//   if (input1 && dropdown1 && dropdown2) {
//     handleConvert();
//   }
// }, [input1, dropdown1, dropdown2]);

// useEffect(() => {
//   if (input2 && dropdown2 && dropdown1) {
//     handleConvert();
//   }
// }, [input2, dropdown2, dropdown1]);
