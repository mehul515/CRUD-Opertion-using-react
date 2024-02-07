import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {


    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [age, setAge] = useState(0);
    let [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const getSingleUser = async () => {
        const response = await fetch(`http://localhost:${8080 || 3000}/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },

        });

        const result = await response.json();

        if (!response.ok) {
            // console.log("Error : ", result.error);
            setError(result.error);
        }
        if (response.ok) {
            // console.log("updated user : ",result);
            setName(result.name);
            setAge(result.age);
            setEmail(result.email);
        }
    }
    useEffect(() => { getSingleUser() }, []);

    const handleUpate = async (event) => {
        event.preventDefault();
        const UpdateUser = { name, email, age };
        const response = await fetch(`http://localhost:${8080 || 3000}/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer YOUR_TOKEN',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UpdateUser),

        });

        const result = await response.json();

        if (!response.ok) {
            // console.log("Error : ", result.error);
            setError(result.error);
        }
        if (response.ok) {
            setError("Data Updated Successfully.")
            {
                setTimeout(() => {
                    setError("");
                    navigate("/all");
                }, 1000);
            }

        }

    }


    return <div className="container my-2">
        {error && <div className="alert alert-success text-center">{error}</div>}
        <h2 className="text-center">Enter the Updated Data</h2>
        <form onSubmit={handleUpate}>
            <div className="mb-3">
                <label forhtml="name" className="form-label">Name </label>
                <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="mb-3">
                <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3">
                <label forhtml="age" className="form-label">Age</label>
                <input
                    name="age"
                    type="number"
                    className="form-control"
                    id="age"
                    placeholder="Enter Your Age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
}