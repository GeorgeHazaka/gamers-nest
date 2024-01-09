import { useEffect, useRef, useState } from "react";

// Custom hook for handling click outside toggle behavior
const useClickOutsideToggle = () => {
  // State to track the expanded/collapsed state
  const [expanded, setExpanded] = useState(false);
  // Ref to store a reference to the DOM element
  const ref = useRef(null);
  useEffect(() => {
    // Function to handle click outside
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    // Add event listener for mouseup events
    document.addEventListener("mouseup", handleClickOutside);

    // Clean up: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;