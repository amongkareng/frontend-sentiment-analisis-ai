import React, { useState } from "react";
import TextToken from "../components/TextToken";

const StopwordPage = ({ dataStopword, stemming }) => {
  const totalData = dataStopword.length;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, dataStopword.length);

  return (
    <>
      <div>
        <div class="title_page">
          <h1>Stopword</h1>
        </div>
        <div class="page_explain">
          <p>
            Tujuan dari penggunaan stopwords (kata penghenti) dalam langkah
            preprocessing adalah untuk menghapus kata-kata yang umum dan
            memiliki sedikit nilai informasi dalam analisis teks. Stopwords
            adalah kata-kata umum seperti "dan", "atau", "dari", "itu", yang
            sering muncul dalam teks namun memiliki kontribusi yang terbatas
            dalam pemahaman konten atau ekstraksi fitur penting.
          </p>
        </div>
        <button class="pages_inputcsv" onClick={() => stemming()}>
          Stemming
        </button>
      </div>
      <div class="csv_table">
        <span>Total data: {totalData}</span>
        <table>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Hasil Tokenize</th>
              <th scope="col">Hasil Konversi (Stopword)</th>
            </tr>
          </thead>
          <tbody>
            {dataStopword.slice(startIndex, endIndex).map((item, number) => (
              <tr key={number + 1}>
                <td>{startIndex + number + 1}</td>
                <td>
                  [{<TextToken tokenizeText={item.original_stopwords} />}]
                </td>
                <td>[{<TextToken tokenizeText={item.stopwords_text} />}]</td>
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
              {currentPage} / {Math.ceil(dataStopword.length / rowsPerPage)}
            </p>
          </div>
          <div>
            <button
              disabled={endIndex >= dataStopword.length}
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

export default StopwordPage;
