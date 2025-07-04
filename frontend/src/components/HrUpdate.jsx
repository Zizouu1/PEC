import { useState , useEffect } from "react";
import axios from "axios";
import styles from "./ScDash.module.css";
import { useNavigate , useLocation } from 'react-router-dom';





export default function HrUpdate({ token }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [visitor, setVisitor] = useState({});
    const [form, setForm] = useState({
        fullname: "",
        society_name: "",
        category: "client",
        description: "",
    });
    const visitorId = location.state?.visitorId;


    useEffect(() => {
        const getV = async () => {
            if (!visitorId) return;
            try {
                const res = await axios.get("http://localhost:8000/api/visitors", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                const allVisitors = res.data;
                const foundVisitor = allVisitors.find(v => v.id === Number(visitorId));
                setVisitor(foundVisitor);
                setForm({
                    fullname: foundVisitor.fullname,
                    society_name: foundVisitor.society_name,
                    category: foundVisitor.category,
                    description: foundVisitor.description,
                });
            } catch (error) {
                console.error("Error fetching visitors:", error);
            }
        };
        getV();
    },[visitorId, token]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!visitorId) return;
        try {
            await axios.put(`http://localhost:8000/api/visitors/${visitorId}`, form, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                setForm({
                    fullname: "",
                    society_name: "",
                    category: "client",
                    description: "",
                });
        } catch (error) {
            console.error("Error updating visitor:", error);
        }
        navigate("/HrDashboard")
    };

    return (
        <div className={styles["form-container"]}>
        <div className={styles["form-box"]}>
            <h2 className={styles["form-title"]}>Update Visitor</h2>
            {visitor && visitor.fullname && (
                <p className={styles["visitor-info"]}>
                    Editing visitor: <strong>{visitor.fullname}</strong>
                </p>
            )}

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

                <button className={styles["submit-button"]} type="submit">
                Save
                </button>
            </form>
        </div>
        </div>
    );
}
