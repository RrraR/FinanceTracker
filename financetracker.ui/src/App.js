import {BrowserRouter, Route, Routes} from "react-router-dom";

import StartPage from "./Pages/StartPage";
import TrackerPage from "./Pages/TrackerPage";
import TransactionsPage from "./Pages/TransactionsPage";
import CategoriesPage from "./Pages/CategoriesPage";
import ScheduledPaymentsPage from "./Pages/ScheduledPaymentsPage";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path="/tracker" element={<TrackerPage/>}/>
                <Route path="/transactions" element={<TransactionsPage/>}/>
                <Route path="/categories" element={<CategoriesPage/>}/>
                <Route path="/scheduledPayments" element={<ScheduledPaymentsPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}