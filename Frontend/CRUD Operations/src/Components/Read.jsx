import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Read() {

    const [data, setData] = useState();
    const [error, setError] = useState("");

    async function getData() {

        const response = await fetch(`http://localhost:${8080 || 3000}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },

        });
        const result = await response.json();
        // console.log(result);
        if (!response.ok) {
            setError(error);
            // console.log(error);
        }
        if (response.ok) {
            setData(result);
            // console.log(data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:${8080 || 3000}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            }
        );
        const result = await response.json();
        if (!response.ok) {
            setError(result.error);
            // console.log(result.error);
        }
        if (response.ok) {
            getData();
            setError("Data Deleted Successfully.");
            {
                setTimeout(() => {
                    setError("");
                }, 1000);
            }
        }
    }

    // console.log(data);

    return <div className="container my-2">

        {error && <div className="alert alert-danger">{error}</div>}

        <h2 className="text-center">All Data</h2>
        <div className="row">
            {data && data.map((ele) => (
                <div key={ele._id} className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{ele.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{ele.age}</h6>
                            <p className="card-text">{ele.email}</p>
                            <a type="button" href={`${ele._id}`} className="btn btn-outline-primary btn-sm " style={{ marginRight: "10px" }}>Update</a>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(ele._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
}