import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const [logged, setLogged] = useState(null);
    let admin = sessionStorage.getItem("AdminLoginEmail")
    let pass = sessionStorage.getItem("AdminLoginPassword")

    useEffect(() => {
        async function Verify() {
            if (!admin || !pass) {
                setLogged(false);
                return;
            }

            const response = await fetch("/api/VerifyAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({ email: admin, password: pass })
            });

            const data = await response.json();
            setLogged(data.success);
        }

        Verify();
    }, [admin, pass]); 

    if (logged === null) {
        return;
    }
    return logged ? <Outlet /> : <Navigate to="/Admin/Login" />;
}


export default ProtectedRoutes;