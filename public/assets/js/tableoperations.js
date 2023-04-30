const subtotalCells = document.querySelectorAll("#my-table .subtotal");
let subtotal = 0;

//iterate through all the subtotal cells
subtotalCells.forEach(cell => {
    subtotal += parseFloat(cell.textContent);
});

//update the total subtotal
document.querySelector("#total-subtotal").textContent = "$" + subtotal;