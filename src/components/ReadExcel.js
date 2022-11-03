import React, { useState } from "react";
import { Card, CardHeader, CardBody, Row, Col, Table, Label } from "reactstrap";
import { ExcelImportTools } from "./ExcelImportTools";

export const ReadExcel = () => {
  const [sheetDate, setSheetData] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);

  //[Headers]
  //{Data}

  const handleFileUploaded = (e) => {
    // console.log("File Uploaded", e);
    if (e) {
      let sheetNames = Object.keys(e);
      setSheetNames(sheetNames);
      setSheet(sheetNames[0]);
    } else {
      setSheetNames(null);
    }
    setSheetData(e);
  };

  const handleSheetChange = (e) => {
    setSheet(e.target.value);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="title">Read Excel Sheets</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <ExcelImportTools
                  onFileUploaded={(e) => handleFileUploaded(e)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {sheetDate && (
          <>
            <Row>
              <Col md={12}>
                {sheetNames.map((s) => (
                  <div>
                    <input
                      type="radio"
                      name="sheetName"
                      value={s}
                      checked={s === sheet}
                      onChange={(e) => handleSheetChange(e)}
                      key={s}
                    />
                    <label>{s}</label>
                  </div>
                ))}
              </Col>
            </Row>
            <Row>
              <Label>{sheet}</Label>
              <Col md={12}>
                <Table bordered className="border">
                  <thead className="text-primary">
                    <tr>
                      <th>ROW</th>
                      {sheetDate[sheet][0].map((head) => (
                        <th key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sheetDate[sheet].slice(1, 21).map((row, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        {row.map((column) => (
                          <td>{column}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};
