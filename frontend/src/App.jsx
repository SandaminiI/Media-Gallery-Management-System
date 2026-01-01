// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // //import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p><div className="text-3xl font-bold">Tailwind OK</div>

// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// // //   )
// // // }

// // // export default App
// // export default function App() {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center">
// //       <h1 className="text-6xl font-bold text-red-600">
// //         Tailwind Red Text ❤️
// //       </h1>
// //     </div>
// //   );
// // }


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import ProtectedRoute from "./components/ProtectedRoute";

// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import VerifyOtpPage from "./pages/VerifyOtpPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import DashboardPage from "./pages/DashboardPage";
// import UnauthorizedPage from "./pages/UnauthorizedPage";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />

//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/verify-otp" element={<VerifyOtpPage />} />
//         <Route path="/forgot" element={<ForgotPasswordPage />} />
//         <Route path="/reset" element={<ResetPasswordPage />} />
//         <Route path="/unauthorized" element={<UnauthorizedPage />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";

// next part pages (we will create in Part B)
import GalleryPage from "./pages/GalleryPage";
import SharedGalleryPage from "./pages/SharedGalleryPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
  path="/gallery"
  element={
    <ProtectedRoute>
      <GalleryPage />
    </ProtectedRoute>

  }
/>

<Route
  path="/shared"
  element={
    <ProtectedRoute>
      <SharedGalleryPage />
    </ProtectedRoute>
  }
/>

          
        </Routes>
      </div>
    </div>
  );
}
