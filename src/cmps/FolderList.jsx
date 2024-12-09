import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./FolderList.css";

export function FolderList({ filterBy, onSetFilter }) {
    // const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy || { status: "inbox" })

    const navigate = useNavigate();

    useEffect(() => {
        if (filterByToEdit.status) {
            onSetFilter(filterByToEdit);
        }
    }, [filterByToEdit]);

    const navItems = [
        { name: "Inbox", path: "/inbox", icon: "/img/Inbox.png", filter: { status: "inbox" } },
        { name: "Starred", path: "/starred", icon: "/img/Starred.png", filter: { status: "star" } },
        { name: "Sent", path: "/sent", icon: "/img/Sent.png", filter: { status: "sent" } },
        { name: "Drafts", path: "/drafts", icon: "/img/Drafts.png", filter: { status: "draft" } },
        { name: "Deleted", path: "/deleted", icon: "/img/Deleted.png", filter: { status: "trash" } },
    ];

    const handleNavClick = (item) => {
        setFilterByToEdit(item.filter); // Update the filter
        onSetFilter(item.filter); // Sync with EmailIndex's filter logic
        navigate(item.path); // Navigate to the corresponding path
    }

    return (
        <aside className="sidebar">
            <ul className="nav-list">
                {navItems.map((item, idx) => (
                    <li key={idx} className="nav-item">
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleNavClick(item)}
                        >
                            <img
                                src={item.icon}
                                alt={`${item.name} icon`}
                                className="nav-icon"
                            />
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}


// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./FolderList.css";

// export function FolderList({ filterBy, onSetFilter }) {

//     const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

//     useEffect(() => {
//         onSetFilter(filterByToEdit)
//     }, [filterByToEdit])
    
//     const navItems = [
//         { name: "Inbox", path: "/inbox", icon: "/img/Inbox.png" },
//         { name: "Starred", path: "/starred", icon: "/img/Starred.png" },
//         { name: "Sent", path: "/sent", icon: "/img/Sent.png" },
//         { name: "Drafts", path: "/drafts", icon: "/img/Drafts.png" },
//         { name: "Deleted", path: "/deleted", icon: "/img/Deleted.png" },
//     ];

//     return (
//         <aside className="sidebar">
//             <ul className="nav-list">
//                 {navItems.map((item, idx) => (
//                     <li key={idx} className="nav-item">
//                         <NavLink
//                             to={item.path}
//                             className={({ isActive }) =>
//                                 isActive ? "nav-link active" : "nav-link"
//                             }
//                         >
//                             <img
//                                 src={item.icon}
//                                 alt={`${item.name} icon`}
//                                 className="nav-icon"
//                             />
//                             <span>{item.name}</span>
//                         </NavLink>
//                     </li>
//                 ))}
//             </ul>
//         </aside>
//     );
// }
