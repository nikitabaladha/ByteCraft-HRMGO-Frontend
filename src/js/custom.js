// ByteCraft-HRMGO-Frontend\hrmgo\src\Js\custom.js

export function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  
  export const formatCost = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  export const handleClickOutside = (ref, onClose) => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
  
    document.addEventListener("mousedown", listener);
  
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  };