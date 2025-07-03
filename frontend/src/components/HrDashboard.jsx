import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HrDash.module.css";

export default function HrDashboard({ token }) {
    const [visitors, setVisitors] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [searchSociety, setSearchSociety] = useState("");

    useEffect(() => {
        const fetchVisitors = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/visitors", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setVisitors(res.data);
            setFiltered(res.data);
        } catch (error) {
            console.error("Error fetching visitors:", error);
        }
        };

        fetchVisitors();
    }, [token]);

    useEffect(() => {
        let filteredList = [...visitors];

        if (searchName.trim() !== "") {
            filteredList = filteredList.filter((v) =>
                v.fullname.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            filteredList = filteredList.filter((v) => {
                const timeIn = new Date(v.time_in);
                return timeIn >= start && timeIn <= end;
            });
        }
        if (searchCategory !== "") {
            filteredList = filteredList.filter((v) => v.category === searchCategory);
        }

        if (searchSociety.trim() !== "") {
            filteredList = filteredList.filter((v) =>
                v.society_name.toLowerCase().includes(searchSociety.toLowerCase())
            );
        }

        setFiltered(filteredList);
    }, [searchName, startDate, endDate, visitors, searchCategory, searchSociety]);

    return (
        <div className={styles["hr-container"]}>
        <h2 className={styles["hr-title"]}>HR Dashboard</h2>

        <div className={styles["filters"]}>
            <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Search by society"
            value={searchSociety}
            onChange={(e) => setSearchSociety(e.target.value)}
            />
            <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />
            <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            />
            <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            >
            <option value="">All</option>
            <option value="client">Client</option>
            <option value="fournisseur">Fournisseur</option>
            </select>
        </div>

        <div className={styles["table-container"]}>
            <table className={styles["visitor-table"]}>
            <thead>
                <tr>
                <th>ID</th>
                <th>Fullname</th>
                <th>Society</th>
                <th>Category</th>
                <th>Time In</th>
                </tr>
            </thead>
            <tbody>
                {filtered.map((v) => (
                <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.fullname}</td>
                    <td>{v.society_name}</td>
                    <td>{v.category}</td>
                    <td>{new Date(v.time_in).toLocaleString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}
