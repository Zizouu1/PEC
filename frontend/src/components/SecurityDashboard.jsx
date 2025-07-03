import { useState } from "react";
import axios from "axios";
import styles from "./ScDash.module.css";

export default function SecurityDashboard({ token }) {
    const [form, setForm] = useState({
        fullname: "",
        society_name: "",
        category: "client",
        description: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post(
            "http://localhost:8000/api/visitors",
            form,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        setMessage("Visitor added!");
        setForm({
            fullname: "",
            society_name: "",
            category: "client",
            description: "",
        });
        } catch (error) {
        setMessage(
            error.response?.data?.error || "Error adding visitor. Try again."
        );
        }
    };

    return (
        <div className={styles["form-container"]}>
        <div className={styles["form-box"]}>
            <h2 className={styles["form-title"]}>Add Visitor</h2>

            {message && <p className={styles["message"]}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles["input-group"]}>
                <label>Fullname</label>
                <input
                    type="text"
                    placeholder="Fullname"
                    value={form.fullname}
                    onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                />
                </div>

                <div className={styles["input-group"]}>
                <label>Society Name</label>
                <input
                    type="text"
                    placeholder="Society Name"
                    value={form.society_name}
                    onChange={(e) =>
                    setForm({ ...form, society_name: e.target.value })
                    }
                />
                </div>

                <div className={styles["input-group"]}>
                <label>Category</label>
                <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                    <option value="client">Client</option>
                    <option value="fournisseur">Fournisseur</option>
                </select>
                </div>

                <div className={styles["input-group"]}>
                <label>Description</label>
                <textarea
                    placeholder="Optional description"
                    rows="4"
                    value={form.description}
                    onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                    }
                ></textarea>
                </div>

                <button className={styles["submit-button"]}>
                Submit
                </button>
            </form>
        </div>
        </div>
    );
}
