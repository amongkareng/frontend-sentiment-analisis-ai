
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { uid } from "uid";
  import { app } from "../config";
  import { set, ref, getDatabase } from "firebase/database";

  const db = getDatabase(app);
  const ProcessingPage = ({ dataProcessing }) => {
    const [count, setCount] = useState(dataProcessing.length);
    const [countDataTesting, setCountDataTesting] = useState(0);
    const [countDataTraining, setCountDataTraining] = useState(0);
    const [ratioDataTesting, setRatioDataTesting] = useState(30);
    const [ratioDataTraining, setRatioDataTraining] = useState("70");
    const [resultProcess, setResultProcess] = useState([]);
    const [accuracy, setAccuracy] = useState(0);
    const [precision, setPrecision] = useState(0);
    const [recall, setRecall] = useState(0);
    const [totalData, setTotalData] = useState(0);

    const addData = (data) => {
      const uuid = uid();
      const newData = {
        accuracy: data.accuracy,
        confusion_matrix: data.confusion_matrix,
        precision: data.precision,
        predictions: data.predictions,
        recall: data.recall,
      };

      // Add the formatted JSON data to the database
      set(ref(db, `data/${uuid}`), {
        data: newData,
        uuid: uuid,
      })
        .then(() => {
          console.log("Data added successfully to the database.");
        })
        .catch((error) => {
          console.error("Error adding data to the database:", error);
        });
    };




    const ratio = () => {
      switch (ratioDataTraining) {
        case "70":
          setRatioDataTesting(30);
          break;
        case "80":
          setRatioDataTesting(20);
          break;
        case "90":
          setRatioDataTesting(10);
          break;
        default:
          console.log("error");
      }
    };

    const calculate = () => {
      const dataLength = dataProcessing.length;

      switch (ratioDataTraining) {
        case "70":
          setCountDataTraining(Math.ceil((dataLength / 10) * 7));
          setCountDataTesting(Math.ceil((dataLength / 10) * 3));
          break;
        case "80":
          setCountDataTraining(Math.ceil((dataLength / 10) * 8));
          setCountDataTesting(Math.ceil((dataLength / 10) * 2));
          break;
        case "90":
          setCountDataTraining(Math.ceil((dataLength / 10) * 9));
          setCountDataTesting(Math.ceil(dataLength / 10));
          break;
        default:
          console.log("error");
      }
    };

    const process = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://127.0.0.1:5000/prediction", {
          data: dataProcessing.slice(0, countDataTraining),
        });

        setResultProcess(response.data.predictions);
        setAccuracy(response.data.accuracy);
        setPrecision(response.data.precision);
        setRecall(response.data.recall);
        setTotalData(response.data.predictions.length);
        addData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      ratio();
      calculate();
      console.log(dataProcessing);
    }, [ratioDataTraining]);

    return (
      <>
        <div>
        <div class="title_page">
          <h1>Processing & Validation </h1>
        </div>
        <div class="page_explain">
        <p>
          Menu processing akan membagi jumlah data latih dan data uji menjadi
          rasio 70:30 atau 80:20 dan tujuan dari validasi dalam menu ini adalah untuk
          mengevaluasi dan memvalidasi model atau metode yang digunakan dalam
          analisis sentimen.
        </p>
        </div>
          <form onSubmit={process} class="form_processing">
            <div class="flexx_col">
              <label htmlFor="">Masukan jumlah data yang akan dipakai</label>
              <input
                defaultValue={count}
                type="number"
              />
            </div>
            <div  class="">
              <label htmlFor="">Rasio Data Latih : Data Uji</label>
              <div class="flexx">
                <select
                  value={ratioDataTraining}
                  name=""
                  id=""
                  class="ratio_data_training"
                  onChange={(e) => setRatioDataTraining(e.target.value)}
                >
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                </select>
                <input
                  value={ratioDataTesting}
                  type="number"
                  class="ratio_data_testing"
                />
              </div>
            </div>
            <div class="flexx_col">
              <label htmlFor="">
                Jumlah data yang akan diprediksi/klasifikasi
              </label>
              <input
                value={countDataTraining}
                type="number"
              />
            </div>
            <div class="flexx_col">
              <label htmlFor="">Sisa Data</label>
              <input
                value={countDataTesting}
                type="number"
              />
            </div>
            <button
              type="submit"
              class="submit_processing"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">
                  No
                </th>
                <th scope="col">
                  Tweets
                </th>
              </tr>
            </thead>
            <tbody>
              {dataProcessing.slice(0, 20).map((item, number) => (
                <tr key={number + 1} className="border-b hover:bg-neutral-100">
                  <td>{number + 1}</td>
                  <td>{item.join_text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div></div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Total Data Latih</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalData}</td>
                <td>{accuracy}</td>
                <td>{precision}</td>
                <td>{recall}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">
                  No
                </th>
                <th scope="col">
                  Tweets
                </th>
                <th scope="col">
                  Label
                </th>
              </tr>
            </thead>
            <tbody>
              {resultProcess.slice(0, 20).map((item, number) => (
                <tr key={number + 1}>
                  <td>{number + 1}</td>
                  <td>{item.text}</td>
                  <td>
                    {item.sentiment === 1 ? "Positif" : "Negatif"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  export default ProcessingPage;
