// this script section will mostly be for the dropdown menu contents, other scripts can and will be added later or possibly into other scripts
document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.querySelector(".arrow-down"); //select the arrow
    const dropdown = document.querySelector(".dd-content"); // select the dropdown menu
    let isOpen = false; // tracks the menus given state

    arrow.addEventListener("click", () => { 
        isOpen = !isOpen; // Toggle state
        dropdown.style.display = isOpen ? "block" : "none"; // Shows or hides menu
        arrow.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)"; // Rotates arrow to show up / down 
    });
});