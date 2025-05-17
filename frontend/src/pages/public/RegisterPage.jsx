import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

function RegisterPage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("user"); // Default role

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${config.api.url}/api/${role}`, {
                username: username,
                password: password,
                role: role,
                dob: new Date().toISOString().split("T")[0], // Tạm thời set ngày hiện tại
            });

            if (response.data.responseCode === 201) {
                // Đăng ký thành công, chuyển đến trang đăng nhập
                navigate("/login");
            } else {
                setError(response.data.message || "Đăng ký thất bại");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-[Inter]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đăng ký</h2>

                {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

                <form onSubmit={handleRegisterSubmit}>
                    {/* Trường Username */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                            Tên người dùng
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder="Nhập tên người dùng"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                            disabled={loading}
                        />
                    </div>

                    {/* Trường Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                            disabled={loading}
                        />
                    </div>

                    {/* Trường Mật khẩu */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                            disabled={loading}
                        />
                    </div>

                    {/* Trường Xác nhận Mật khẩu */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                            disabled={loading}
                        />
                    </div>

                    {/* Role chọn */}
                    <div className="mb-6">
                        <label htmlFor="login-role" className="block text-sm font-medium text-gray-600 mb-1">
                            Vai trò
                        </label>
                        <select
                            id="login-role"
                            name="role"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={loading}
                        >
                            <option value="user">Người dùng</option>
                            <option value="company">Công ty</option>
                            <option value="admin">Quản trị viên</option>
                        </select>
                    </div>

                    {/* Nút Đăng ký */}
                    <button
                        type="submit"
                        className={`w-full bg-pink-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-200 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>

                    {/* Link chuyển sang Đăng nhập */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Đã có tài khoản?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-pink-500 hover:underline font-medium focus:outline-none"
                            disabled={loading}
                        >
                            Đăng nhập
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
