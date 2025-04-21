import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState("API");
  const [loading, setLoading] = useState(false);

  const options = ["Local", "API"];
  
  const dataObj = [
    { name: "Arjit 1", email: "arjit@gmail.com", address: "Jammu" },
    { name: "Arjit 2", email: "arjit2@gmail.com", address: "Kashmir" },
    { name: "Arjit 3", email: "arjit3@gmail.com", address: "Gurgaon" },
  ];

  useEffect(() => {
    if (dataSource === "API") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const responseData = await response.json();
          setData(responseData);
        } catch (err) {
          console.log("Error:", err);
          setLoading(false);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      };
      fetchData();
    } else {
      setData(dataObj);
    }
  }, [dataSource]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSourceChange = (e) => {
    setDataSource(e.target.value);
  };

  console.log("data:", data);
  return (
    <div className="App">
      <select value={dataSource} onChange={handleSourceChange}>
        Data
        {options.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      />
      {loading ? (
        "Loading..."
      ) : (
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Address</td>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase()) ||
                  (dataSource === "API"
                    ? `${item.address.street},${item.address.suite},${item.address.city}`
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    : item.address.toLowerCase().includes(search.toLowerCase()))
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {dataSource === "API"
                      ? `${item.address.street},${item.address.suite},${item.address.city}`
                      : `${item.address}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

