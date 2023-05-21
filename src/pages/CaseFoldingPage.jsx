import React, { useState } from "react";

const CaseFoldingPage = ({ caseFolding, removecharcater }) => {
  const totalData = caseFolding.length;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, caseFolding.length);

  return (
    <>
      <div>
        <div className="title_page">
          <h1>Case Folding</h1>
        </div>
        <div className="page_explain">
          <p>
            Tujuan dari case folding dalam langkah preprocessing adalah untuk
            mengubah semua karakter dalam teks menjadi format yang seragam,
            seperti mengubah huruf kapital menjadi huruf kecil. Case folding
            membantu menyederhanakan teks dan memastikan keseragaman dalam
            analisis teks, terlepas dari perbedaan dalam penggunaan huruf besar
            dan kecil.
          </p>
        </div>
        <button className="pages_inputcsv" onClick={() => removecharcater()}>
          Remove Character
        </button>
      </div>
      <div className="csv_table">
        <span>Total data: {totalData}</span>
        <table>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Data Tweets Original</th>
              <th scope="col">Hasil Konversi (Case Folding)</th>
            </tr>
          </thead>
          <tbody>
            {caseFolding.slice(startIndex, endIndex).map((item, number) => (
              <tr key={number + 1}>
                <td>{startIndex + number + 1}</td>
                <td>{item.original_casefolding}</td>
                <td>{item.casefolding_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flexx next_and_prev_btn_container">
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </div>
          <div className="total_pages">
            <p>
              {currentPage} / {Math.ceil(caseFolding.length / rowsPerPage)}
            </p>
          </div>
          <div>
            <button
              disabled={endIndex >= caseFolding.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseFoldingPage;
