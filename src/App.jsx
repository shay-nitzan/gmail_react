import { Route, HashRouter as Router, Routes } from "react-router-dom"

import { Home } from "./pages/Home"
// import { About } from "./pages/About"
import { EmailIndex } from "./pages/EmailIndex"


export function App() {
  return <Router>
      <main>
        <Routes>
            <Route path="/" element = {<Home/>}></Route> {/*the path in adress bar*/}
            {/* <Route path="/about" element = {<About/>}></Route> */}
            <Route path="/email-index" element = {<EmailIndex/>}></Route>

        </Routes>
      </main>
  </Router>

}
