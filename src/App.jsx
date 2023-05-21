import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import RemoveCharacter from "./pages/RemoveCharacter";
import CaseFoldingPage from "./pages/CaseFoldingPage";
import TokenizePage from "./pages/TokenizePage";
import StopwordPage from "./pages/StopwordPage";
import StemmingPage from "./pages/StemmingPage";
import ResultPreprocessing from "./pages/ResultPreprocessing";
import twitterBlue from "./assets/twitterBlue.svg";
import dataCollection from "./assets/dataCollection.svg";
import preProcessing from "./assets/pre-processing.svg";
import processingsvg from "./assets/processing.svg";
import validationsvg from "./assets/validation.svg";
import FilteringPage from "./pages/RemovePunctuation";
import SlangPage from "./pages/Slang";
import ProcessingPage from "./pages/ProcessingPage";
import ValidationPage from "./pages/ValidationPage";

const App = () => {
  let currentPage;
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [dataReq, setDataReq] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [dataRemoveCharacter, setDataRemoveCharacter] = useState([]);
  const [dataCaseFolding, setDataCaseFolding] = useState([]);
  const [dataStopword, setDataStopword] = useState([]);
  const [dataStemming, setDataStemming] = useState([]);
  const [dataTokens, setDataTokens] = useState([]);
  const [dataResultPreprocessing, setDataResultPreprocesing] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(19);
  const [dataFiltering, setDataFiltering] = useState([]);
  const [dataSlang, setDataSlang] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setData(valuesArray);
        setDataReq(results.data);
        console.log(results.data);
      },
    });
  };

  const handlePrepocessing = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/preprocessing", {
        data: dataReq,
      });
      console.log(response.data);
      setDataRemoveCharacter(response.data.remove_emoji);
      setDataCaseFolding(response.data.text_lower_case);
      setDataTokens(response.data.tokens);
      setDataStopword(response.data.stopwords_list);
      setDataStemming(response.data.stemmed_tokens);
      setDataResultPreprocesing(response.data.stemmed_text);
      setDataResult(response.data.final_process);
      setDataFiltering(response.data.remove_character);
      setDataSlang(response.data.slang_remove);

      console.log(response.data.remove_character);
    } catch (error) {
      console.log(error);
    }
  };
  const calculate = () => {
    setPage(1);
    handlePrepocessing();
  };

  const removecharcater = () => {
    setPage(2);
  };

  const removepunctuation = () => {
    setPage(3);
  };

  const tokenize = () => {
    setPage(4);
  };

  const stopword = () => {
    setPage(5);
  };

  const stemming = () => {
    setPage(6);
  };

  const slang = () => {
    setPage(7);
  };

  const result = () => {
    setPage(8);
  };

  const processing = () => {
    setPage(9);
  };

  const validation = () => {
    setPage(10);
  };

  useEffect(() => {
    // console.log(dataResult);
  });
  switch (page) {
    case 0:
      currentPage = (
        <>
          <div class="">
            <div class="title_page">
              <h1>Data Collection</h1>
            </div>
            <div class="page_explain">
              <p>
                Tujuan dari menu data collection ini adalah untuk menampilkan
                dan mengirim data agar dapat diproses. Data yang dikumpulkan
                meliputi teks atau pesan yang mencerminkan opini, pendapat, atau
                perasaan dari tweets pengguna twitter tentang artificial
                intelligence yang ada
              </p>
            </div>
            <div class="pages_inputcsv">
              {data.length !== 0 ? (
                <div class="btn_form">
                  <button onClick={() => calculate()}>
                    Submit for Pre-Processing
                  </button>
                  <button onClick={() => setData([])}>Reset</button>
                </div>
              ) : (
                <form>
                  <label>
                    <input type="file" onChange={handleFileUpload} />
                  </label>
                </form>
              )}
            </div>
            <div class="csv_table">
              <h2>Data CSV</h2>
              <div class="full_table">
                <span>total data: {data.length}</span>
                {data.length !== 0 ? (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th scope="col">Tweet ID</th>
                          <th scope="col">Username</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Retweet Count</th>
                          <th scope="col">Favorite Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Slice the data array based on startIndex and endIndex */}
                        {data
                          .slice(startIndex, endIndex + 1)
                          .map((item, index) => (
                            <tr key={startIndex + index + 1}>
                              <td>{startIndex + index + 1}</td>
                              <td>{item[1]}</td>
                              <td>{item[2]}</td>
                              <td>{item[3]}</td>
                              <td>{item[4]}</td>
                              <td>{item[5]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {data.length !== 0 && (
                      <div class="flexx next_and_prev_btn_container">
                        <div class="">
                          <button
                            disabled={startIndex === 0}
                            onClick={() => {
                              setStartIndex(startIndex - 20);
                              setEndIndex(endIndex - 20);
                            }}
                          >
                            Previous
                          </button>
                        </div>
                        <div class="total_pages">
                          <p>
                            {startIndex / 20 + 1} /{" "}
                            {Math.ceil(data.length / 20)}
                          </p>
                        </div>
                        <div class="next_btn">
                          <button
                            disabled={endIndex >= data.length - 1}
                            onClick={() => {
                              setStartIndex(startIndex + 20);
                              setEndIndex(endIndex + 20);
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      );
      break;
    case 1:
      currentPage = (
        <>
          <div>
            <CaseFoldingPage
              caseFolding={dataCaseFolding}
              removecharcater={removecharcater}
            />
          </div>
        </>
      );
      break;
    case 2:
      currentPage = (
        <>
          <div>
            <RemoveCharacter
              dataRemoveCharacter={dataRemoveCharacter}
              removepunctuation={removepunctuation}
            />
          </div>
        </>
      );
      break;
    case 3:
      currentPage = (
        <>
          <div>
            <FilteringPage dataFiltering={dataFiltering} tokenize={tokenize} />
          </div>
        </>
      );
      break;
    case 4:
      currentPage = (
        <>
          <div>
            <TokenizePage dataTokenize={dataTokens} stopword={stopword} />
          </div>
        </>
      );
      break;
    case 5:
      currentPage = (
        <>
          <div>
            <StopwordPage dataStopword={dataStopword} stemming={stemming} />
          </div>
        </>
      );
      break;
    case 6:
      currentPage = (
        <>
          <div>
            <StemmingPage dataStemming={dataStemming} slang={slang} />
          </div>
        </>
      );
      break;
    case 7:
      currentPage = (
        <>
          <div>
            <SlangPage dataSlang={dataSlang} result={result} />
          </div>
        </>
      );
      break;
    case 8:
      currentPage = (
        <>
          <div>
            <ResultPreprocessing
              dataResult={dataResult}
              processing={processing}
            />
          </div>
        </>
      );
      break;
    case 9:
      currentPage = (
        <>
          <div>
          <ProcessingPage dataProcessing={dataResultPreprocessing} />
          </div>
        </>
      );
      break;
    case 10:
      currentPage = (
        <>
          <div>
            <ValidationPage />
          </div>
        </>
      );
      break;
    default:
      currentPage = (
        <div>
          <h1>Halaman tidak ditemukan</h1>
        </div>
      );
      break;
  }
  return (
    <>
      <div class="main_content">
        <nav>
          <div onClick={() => setPage(0)} class="nav_logo">
            <img alt="" src={twitterBlue} class="logo_tweet" />
            <h1>Anset</h1>
          </div>
          <ul>
            <li class="sidebar_menu">
              <a onClick={() => setPage(0)}>
                <div class="home_page">
                  <span>
                    <div class="flexx">
                      <img alt="" src={dataCollection} class="page_nav_logo" />
                      <p>Data Collection</p>{" "}
                    </div>
                  </span>
                </div>
              </a>
            </li>

            <li class="sidebar_menu flexx">
              <a onClick={() => setPage(8)}>
                <div class="home_page">
                  <span>
                    <div class="flexx">
                      <img alt="" src={preProcessing} class="page_nav_logo" />
                      <p>Pre-processing</p>{" "}
                    </div>
                  </span>
                </div>
              </a>
            </li>

            {/* sub_menu */}
            <div>
              <ul>
                <li class="sub_menu">
                  <a onClick={() => setPage(1)}>
                    <span>
                      <p>Case Folding</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(2)}>
                    <span>
                      <p>Remove Emoji</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(3)}>
                    <span>
                      <p>Remove Punctuation</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(4)}>
                    <span>
                      <p>Tokenization</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(5)}>
                    <span>
                      <p>Stopword</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(6)}>
                    <span>
                      <p>Stemming</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(7)}>
                    <span>
                      <p>Remove Slang</p>{" "}
                    </span>
                  </a>
                </li>
                <li class="sub_menu">
                  <a onClick={() => setPage(8)}>
                    <span>
                      <p>Result</p>{" "}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            {/* akhir sub_menu */}

            <li class="sidebar_menu">
              <a onClick={() => setPage(9)}>
                <div class="home_page">
                  <span>
                    <div class="flexx">
                      <img alt="" src={processingsvg} class="page_nav_logo" />
                      <p>Processing & Validation</p>{" "}
                    </div>
                  </span>
                </div>
              </a>
            </li>
            {/* <li class="sidebar_menu">
              <a onClick={() => setPage(10)}>
                <div class="home_page">
                  <span>
                    <div class="flexx">
                      <img alt="" src={validationsvg} class="page_nav_logo" />
                      <p>Validation</p>{" "}
                    </div>
                  </span>
                </div>
              </a>
            </li> */}
          </ul>
        </nav>
        <div class="main_content_data_collection">{currentPage}</div>
      </div>
    </>
  );
};

export default App;
