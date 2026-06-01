// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

const tabs = [
  {
    to: "/dashboard",
    label: "Home",
    icon: (active) => (
      <svg width="22" height="22" fill={active ? "#6c47ff" : "none"} stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
        <path d="M3 9L12 2l9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    to: "/products",
    label: "Stock",
    icon: (active) => (
      <svg width="22" height="22" fill="none" stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: (active) => (
      <svg width="22" height="22" fill="none" stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    to: "/customers",
    label: "Customers",
    icon: (active) => (
      <svg width="22" height="22" fill="none" stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-around py-2 z-10 max-w-lg mx-auto">
      {tabs.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 ${isActive ? "text-brand-600" : "text-gray-400"}`
          }
        >
          {({ isActive }) => (
            <>
              {icon(isActive)}
              <span className={`text-[10px] font-semibold ${isActive ? "text-brand-600" : "text-gray-400"}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}









// // src/components/Navbar.jsx
// import { NavLink } from "react-router-dom";

// const tabs = [
//   {
//     to: "/dashboard",
//     label: "Home",
//     icon: (active) => (
//       <svg width="22" height="22" fill={active ? "#6c47ff" : "none"} stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
//         <path d="M3 9L12 2l9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//       </svg>
//     ),
//   },
//   {
//     to: "/products",
//     label: "Products",
//     icon: (active) => (
//       <svg width="22" height="22" fill="none" stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
//         <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
//         <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
//         <polyline points="7.5 19.79 7.5 14.6 3 12" />
//         <polyline points="21 12 16.5 14.6 16.5 19.79" />
//         <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
//         <line x1="12" y1="22.08" x2="12" y2="12" />
//       </svg>
//     ),
//   },
//   {
//     to: "/transactions",
//     label: "Transactions",
//     icon: (active) => (
//       <svg width="22" height="22" fill="none" stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
//         <rect x="2" y="5" width="20" height="14" rx="2" />
//         <line x1="2" y1="10" x2="22" y2="10" />
//       </svg>
//     ),
//   },
//   {
//     to: "/customers",
//     label: "Customers",
//     icon: (active) => (
//       <svg width="22" height="22" fill="none" stroke={active ? "#6c47ff" : "#9ca3af"} strokeWidth="2">
//         <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M23 21v-2a4 4 0 00-3-3.87" />
//         <path d="M16 3.13a4 4 0 010 7.75" />
//       </svg>
//     ),
//   },
// ];

// export default function Navbar() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-around py-2 z-10 max-w-lg mx-auto">
//       {tabs.map(({ to, label, icon }) => (
//         <NavLink
//           key={to}
//           to={to}
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-0.5 px-3 py-1 ${isActive ? "text-brand-600" : "text-gray-400"}`
//           }
//         >
//           {({ isActive }) => (
//             <>
//               {icon(isActive)}
//               <span className="text-[10px] font-medium">{label}</span>
//             </>
//           )}
//         </NavLink>
//       ))}
//     </nav>
//   );
// }