import XLSX from "xlsx";

export const make_cols = refstr =>
  Array(XLSX.utils.decode_range(refstr).e.c + 1)
    .fill(0)
    .map((x, i) => ({ text: XLSX.utils.encode_col(i), value: i }));

export const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");

export const makeAnExcelSheet = (
  arrayOfArrays = [],
  fileName = "test_file"
) => {
  const workBook = XLSX.utils.book_new();
  const sheetData = XLSX.utils.aoa_to_sheet(arrayOfArrays);
  XLSX.utils.book_append_sheet(workBook, sheetData, fileName);

  const file = XLSX.write(workBook, {
    bookType: "xlsx",
    bookSST: false,
    type: "array"
  });

  const fileBlob = new Blob([file], { type: "application/octet-stream" });
  fileBlob["name"] = `${fileName}.xlsx`;
  return fileBlob;
};
