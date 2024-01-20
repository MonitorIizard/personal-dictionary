"use client";
// import Image from 'next/image'
// import "@/app/globals.css"

// export default function Home() {
//   return (
//     // <div className='card'>
//     //   <h1>Hello world</h1>
//     // </div>
//     <Image src={"https://picsum.photos/200/281"} alt='place holder'
//            width={0} height={0} 
//            sizes='100vw' 
//            style={{width : '100%', height : '281px' }}/>
//   )
// }
import { useState, useEffect } from "react";
import initSqlJs, { Database, QueryExecResult } from "sql.js";
import styles from "./ui/styles/Home.module.css";

export default function SqlJsPage() {
  const [db, setDb] = useState<Database>();
  // const [error, setError] = useState<>(null);
  const [execResults, setExecResults] = useState<Array<QueryExecResult>>();

  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `/sql-wasm.wasm`,
    })
      .then((SQL) => setDb(new SQL.Database()))
      .catch((err) => setError(err));
  }, []);

  const exec = (sql : string) => {
    try {
      const results = db!.exec(sql);
      console.log(results);
      setExecResults(results);
      setError(null);
    } catch (err) {
      setExecResults();
      setError(err);
    }
  };

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  const ResultTable = ({ columns, values }) => {
    return (
      <table>
        <thead>
          <tr color="text-white">
            {columns.map((columnName) => (
              <td key={columnName}>{columnName}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {values.map(
            (
              row, // values is an array of arrays representing the results of the query
              rowIndex
            ) => (
              <tr key={rowIndex} className="text-white">
                {row.map((value, cellIndex) => (
                  <td className="text-white" key={cellIndex}>{value}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };

  return db ? (
    <div className={`${styles.container} text-white`}>
      <h1>Next.js SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        className={`${styles.codeBox} text-black`}
      />

      <pre className={`${styles.error} text-white`}>{(error || "").toString()}</pre>

      <pre>
        {execResults
          ? execResults.map((execResult, rIndex) => (
              <ResultTable
                key={rIndex}
                columns={execResult.columns}
                values={execResult.values}
              />
            ))
          : ""}
      </pre>
    </div>
  ) : (
    <pre>Loading...</pre>
  );
}