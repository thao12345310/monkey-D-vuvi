import React, { useState } from "react"; // Import useState hook

// Define the AuthPage functional component (renamed for clarity)
function LoginPage() {
  // State để theo dõi xem đang hiển thị form đăng nhập hay đăng ký
  // true: hiển thị Đăng nhập, false: hiển thị Đăng ký
  const [isLoginView, setIsLoginView] = useState(true);

  // Xử lý gửi form đăng nhập
  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
    // Lấy dữ liệu form
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("Login attempt with:", { email, password });
    // TODO: Thêm logic xác thực đăng nhập của bạn ở đây (ví dụ: gọi API)
  };

  // Xử lý gửi form đăng ký
  const handleRegisterSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
    // Lấy dữ liệu form
    const username = event.target.username.value; // Thêm trường username nếu cần
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!"); // Sử dụng cách thông báo tốt hơn trong ứng dụng thực tế
      return;
    }

    console.log("Register attempt with:", { username, email, password });
    // TODO: Thêm logic đăng ký người dùng của bạn ở đây (ví dụ: gọi API)
  };

  return (
    // Container chính, căn giữa form theo chiều dọc và ngang
    // Sử dụng flexbox và min-height để lấp đầy màn hình
    // Đặt màu nền và font chữ (giả sử Inter được tải toàn cục hoặc qua cấu hình Tailwind)
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-[Inter]">
      {/* Card chứa form: Nền trắng, padding, góc bo tròn, đổ bóng, và chiều rộng tối đa */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* Tiêu đề Form - Thay đổi dựa trên trạng thái isLoginView */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isLoginView ? "Login" : "Register"}
        </h2>

        {/* Hiển thị có điều kiện: Form Đăng nhập hoặc Form Đăng ký */}
        {isLoginView ? (
          // Form Đăng nhập
          <form onSubmit={handleLoginSubmit}>
            {/* Trường Email/Username */}
            <div className="mb-4">
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email or Username
              </label>
              <input
                type="email"
                id="login-email" // ID duy nhất cho input đăng nhập
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>

            {/* Trường Mật khẩu */}
            <div className="mb-6">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password" // ID duy nhất cho input đăng nhập
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
              {/* Optional: <a href="#" className="text-xs text-pink-500 hover:underline float-right mt-1">Forgot Password?</a> */}
            </div>

            {/* Nút Gửi Đăng nhập */}
            <button
              type="submit"
              className="w-full bg-pink-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-200"
            >
              Login
            </button>

            {/* Link chuyển sang Đăng ký */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <button
                type="button" // Quan trọng: type="button" để không gửi form
                onClick={() => setIsLoginView(false)} // Chuyển sang view Đăng ký
                className="text-pink-500 hover:underline font-medium focus:outline-none"
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          // Form Đăng ký
          <form onSubmit={handleRegisterSubmit}>
            {/* Trường Username (Tùy chọn) */}
            {/* <div className="mb-4">
              <label htmlFor="register-username" className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                id="register-username"
                name="username"
                required
                placeholder="Your Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div> */}

            {/* Trường Email */}
            <div className="mb-4">
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="register-email" // ID duy nhất cho input đăng ký
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>

            {/* Trường Mật khẩu */}
            <div className="mb-4">
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="register-password" // ID duy nhất cho input đăng ký
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>

            {/* Trường Xác nhận Mật khẩu */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>

            {/* Nút Gửi Đăng ký */}
            <button
              type="submit"
              className="w-full bg-pink-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-200"
            >
              Register
            </button>

            {/* Link chuyển sang Đăng nhập */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button" // Quan trọng: type="button" để không gửi form
                onClick={() => setIsLoginView(true)} // Chuyển về view Đăng nhập
                className="text-pink-500 hover:underline font-medium focus:outline-none"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// Export thành phần làm export mặc định
export default LoginPage;

// Ví dụ cách bạn có thể render thành phần này trong App component chính
/*
import React from 'react';
import AuthPage from './AuthPage'; // Giả sử AuthPage.js ở cùng thư mục

function App() {
  return (
    <AuthPage />
  );
}

export default App;
*/
