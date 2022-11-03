import React, { useRef, useState } from "react";
import { Row, Col, Label } from "reactstrap";
import { read, utils } from "xlsx";

export const ExcelImportTools = (props) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  /*{
        "sheet1":{},
        "sheet2": {}
   }
   */
  const [sheetData, setSheetData] = useState({});

  const fileRef = useRef();

  const acceptableFileName = ["xlsx", "xls", "csv"];

  //   File.extension
  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const readDataFromExcel = (data) => {
    const wb = read(data);
    setSheetNames(wb.SheetNames);

    let mySheetData = {};

    //Loop Through The Sheets
    for (let index = 0; index < wb.SheetNames.length; index++) {
      const sheetName = wb.SheetNames[index];

      const workSheet = wb.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(workSheet, {
        blankrows: "",
        header: 1,
        defval:"",
      });

      mySheetData[sheetName] = jsonData;
    }

    setSheetData(mySheetData);

    return mySheetData;
  };

  const handleFile = async (e) => {
    //console.log(e);
    const myFile = e.target.files[0];
    if (!myFile) {
      return;
    }

    if (!checkFileName(myFile.name)) {
      alert("Invalid File Type");
      return;
    }

    //Read the XLSX MetaData

    const data = await myFile.arrayBuffer();

    const mySheetData = readDataFromExcel(data);

    //Assign the sheets
    setFile(myFile);
    setFileName(myFile.name);

    props.onFileUploaded(mySheetData);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    setSheetNames([]);
    setSheetData(null);
    props.onFileUploaded(null);
    fileRef.current.value = "";
  };
  return (
    <Row>
      <Col>
        <div className="mb-2">
          {fileName && (
            <Label>
              file name: <b>{fileName}</b>
            </Label>
          )}
          {!fileName && <Label>Please Upload a File</Label>}
        </div>
        <div className="row">
          <input
            type="file"
            accept="xlsx, xls"
            multiple={false}
            onChange={(e) => handleFile(e)}
            ref={fileRef}
          />
          {fileName && (
            <div className="ml-1" onClick={handleRemove}>
              &#10005;
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};
