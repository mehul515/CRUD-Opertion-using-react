import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [age, setAge] = useState(0);
    let [error, setError] = useState("");
    const navigate = useNavigate();

    console.log(name, email, age);

    function handleChange(event) {
        setFormData((currData) => {
            currData[event.target.name] = event.target.value;
            return { ...currData };
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const addUser = { name, email, age };
        // console.log(addUser);
        let user = JSON.stringify(addUser);
        // console.log(user);
        const response = await fetch(`http://localhost:${8080 || 3000}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer YOUR_TOKEN',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addUser),

        });

        const result = await response.json();

        if (!response.ok) {
            // console.log("Error : ", result.error);
            setError(result.error);
        }
        if (response.ok) {
            // console.log(result);
            alert("Saved Successfully.");
            setError("");
            setName("");
            setEmail("");
            setAge(0);
            navigate("/all");
        }
    }

    return <div className="container my-2">
        {error && <div className="alert alert-danger">{error}</div>}
        <h2 className="text-center">Enter the Data</h2>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}