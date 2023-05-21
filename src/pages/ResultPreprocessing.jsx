import React, { useState } from "react";

const ResultPreprocessing = ({ dataResult, processing }) => {
  const totalData = dataResult.length;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, dataResult.length);

  return (
    <>
      <div>
        <div className="title_page">
          <h1>Result Pre-Processing</h1>
        </div>
        <div className="page_explain">
          <p>
            Berikut adalah tampilan pre-processing yang berfungsi untuk mengolah
            data mentah yang telah dimasukkan sebelumnya melalui menu data
            collection, kemudian data tersebut akan dibersihkan, mengubah
            format, dan mengelolah data teks agar dapat digunakan secara efektif
            dalam aplikasi analisis sentimen. Pada table dibawah dapat dilihat
            perbandingan original tweets atau data mentah dan data yang telah di
            pre-processing
          </p>
        </div>
        <button class="pages_inputcsv" onClick={() => processing()}>
          Processing
        </button>
      </div>
      <div class="csv_table">
        <span>Total data: {totalData}</span>
        <table>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Data Tweets Original</th>
              <th scope="col">Hasil PreProcessing</th>
            </tr>
          </thead>
          <tbody>
            {dataResult.slice(startIndex, endIndex).map((item, number) => (
              <tr key={number + 1}>
                <td>{number + 1}</td>
                <td>{item.original_casefolding}</td>
                <td>{item.slangremove_andfinaltext}</td>
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
              {currentPage} / {Math.ceil(dataResult.length / rowsPerPage)}
            </p>
          </div>
          <div>
            <button
              disabled={endIndex >= dataResult.length}
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

export default ResultPreprocessing;
