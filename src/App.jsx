import { Route, HashRouter as Router, Routes } from "react-router-dom"

// import { Home } from "./pages/Home"
import { EmailIndex } from "./pages/EmailIndex"
import { AppHeader } from "./cmps/AppHeader"
import ToastModal from "./cmps/ToastModal"

import './App.css'

export function App() {
    return (
        <Router>
            <div className="app-layout">
                <AppHeader />
                <ToastModal />
                <main className="main-content">
                    <Routes>
                        {/* Email Routes */}
                        <Route path="/email-index" element={<EmailIndex />} />
                        <Route path="/inbox" element={<EmailIndex />} />
                        <Route path="/starred" element={<EmailIndex />} />
                        <Route path="/sent" element={<EmailIndex />} />
                        <Route path="/drafts" element={<EmailIndex />} />
                        <Route path="/deleted" element={<EmailIndex />} />

                        {/* Email Preview Route */}
                        <Route path="/*" element={<EmailIndex />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}