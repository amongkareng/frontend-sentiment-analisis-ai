import React, { useState } from "react";
import TextToken from "../components/TextToken";

const TokenizePage = ({ dataTokenize, stopword }) => {
  const totalData = dataTokenize.length;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, dataTokenize.length);

  return (
    <>
      <div>
        <div class="title_page">
          <h1>Tokenization</h1>
        </div>
        <div class="page_explain">
          <p>
            Tujuan dari tokenisasi dalam langkah preprocessing adalah untuk
            memecah teks menjadi unit-unit yang lebih kecil, yang disebut token.
            Tokenisasi merupakan langkah dasar dalam pemrosesan teks yang
            membantu mengubah teks menjadi urutan kata atau frasa yang terpisah.
          </p>
        </div>
        <button class="pages_inputcsv" onClick={() => stopword()}>
          Stopword
        </button>
      </div>
      <div class="csv_table">
        <span>Total data: {totalData}</span>
        <table>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Hasil Remove Punctuation</th>
              <th scope="col">Hasil Konversi (Tokenization)</th>
            </tr>
          </thead>
          <tbody>
            {dataTokenize.slice(startIndex, endIndex).map((item, number) => (
              <tr
                key={startIndex + number + 1}
                className="border-b hover:bg-neutral-100"
              >
                <td>{number + 1}</td>
                <td>{item.original_tokenize}</td>
                <td>[{<TextToken tokenizeText={item.tokenize_text} />}]</td>
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
              {currentPage} / {Math.ceil(dataTokenize.length / rowsPerPage)}
            </p>
          </div>
          <div>
            <button
              disabled={endIndex >= dataTokenize.length}
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

export default TokenizePage;
