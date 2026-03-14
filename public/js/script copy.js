document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('bill-date');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    dateInput.min = minDate;
    document.getElementById('financialYear').textContent = getCurrentFinancialYear();
    addRow();
    testApi();
});

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

function logoClick() {
    window.location.href = "index.html";
}

function billNumChange() {
    const billNum = document.getElementById('bill-no').value;
    const formattedBillNum = document.getElementById('formattedInvoiceNumber');
    formattedBillNum.textContent = billNum ? billNum : '';
}

function changeDate() {
    const dateInput = document.getElementById('bill-date');
    const formattedDateSpan = document.getElementById('formattedDate');
    const selectedDate = new Date(dateInput.value);
    if (!isNaN(selectedDate)) {
        formattedDateSpan.textContent = formatToDDMMMYYYY(selectedDate);
    }
}

function formatToDDMMMYYYY(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthAbbr[date.getMonth()];
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function getCurrentFinancialYear() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    let startYear, endYear;
    if (month >= 3) {
        startYear = year;
        endYear = year + 1;
    } else {
        startYear = year - 1;
        endYear = year;
    }
    return `${startYear}-${String(endYear).slice(-2)}`;
}

function addRow() {
    let table = document.getElementById('invoiceBody');
    let row = table.insertRow();
    let rowIndex = table.rows.length + 1;

    row.innerHTML = `
                <td class='border p-1 text-center'>${rowIndex}</td>
                <td class='border p-1 no-print'>
                    <input type='checkbox' class='w-full border rounded p-1 checkbox' onchange='handleCheckbox(this)' id='isHeader'>
                </td>
                <td class='border p-1'>
                    <div contenteditable='true' class='w-full border rounded p-1 print-text desc'></div>
                    <span class="error text-red-500 text-xs hidden descError"></span>
                </td>
                <td class='border p-1 text-center sac'>995470</td>
                <td class='border p-1 unit'>
                    <select class='w-full border rounded p-1'>
                        <option value='Sq.ft'>Sq.ft</option>
                        <option value='Sq.mt'>Sq.mt</option>
                        <option value='No's'>No's</option>
                    </select>
                    <span class="error text-red-500 text-xs hidden unitError"></span>
                </td>
                <td class='border p-1 rateQty print:text-center'>
                    <input type='number' class='w-full border rounded p-1 qty text-center' value='0.00' min='0' oninput='calculateTotal()'>
                    <span class="error text-red-500 text-xs hidden qtyError"></span>
                </td>
                <td class='border p-1 rateQty print:text-center'>
                    <input type='number' class='w-full border rounded p-1 rate text-center' value='0.00' min='0' oninput='calculateTotal()'>
                    <span class="error text-red-500 text-xs hidden rateError"></span>
                </td>
                <td class='border p-1 text-right amount'></td>
                <td class='border p-1 no-print text-center action-buttons'></td>
            `;
    recalculateSerialNumbers();
}

function removeRow(button) {
    button.parentElement.parentElement.remove();
    recalculateSerialNumbers();
    calculateTotal();
}

function recalculateSerialNumbers() {
    let rows = document.querySelectorAll('#invoiceBody tr');
    let serial = 1;

    rows.forEach((row, index) => {
        let checkbox = row.querySelector('.checkbox');
        if (checkbox && checkbox.checked) {
            row.cells[0].textContent = '';
        } else {
            if (row.cells.length > 1)
                row.cells[0].textContent = serial++;
        }
        let actionCell = row.querySelector('.action-buttons');
        if (actionCell) {
            actionCell.innerHTML =
                (rows.length === 1)
                    ? `<button onclick='addRow()' class='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600'>+</button>`
                    : (index === rows.length - 1)
                        ? `<button onclick='addRow()' class='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600'>+</button> 
                           <button onclick='removeRow(this)' class='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>-</button>`
                        : `<button onclick='removeRow(this)' class='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>-</button>`;
        }
    });
}

function handleCheckbox(checkbox) {
    const row = checkbox.closest('tr');
    const sacCell = row.querySelector('.sac');
    const unitSelect = row.querySelector('.unit select');
    const qtyInput = row.querySelector('.qty');
    const rateInput = row.querySelector('.rate');
    const amountCell = row.querySelector('.amount');

    if (checkbox.checked) {
        sacCell.textContent = '';
        unitSelect.classList.add('hidden');
        qtyInput.value = '';
        rateInput.value = '';
        amountCell.textContent = '';
    } else {
        sacCell.textContent = '995470';
        unitSelect.classList.remove('hidden');
        unitSelect.value = 'Sq.ft';
        qtyInput.value = '0.00';
        rateInput.value = '0.00';
        amountCell.textContent = '0.00';
    }
    recalculateSerialNumbers();
    calculateTotal();
}

function calculateTotal() {
    let total = 0;
    document.querySelectorAll('#invoiceBody tr').forEach(row => {
        const checkbox = row.querySelector('.checkbox');
        const isChecked = checkbox?.checked || false;

        const qtyInput = row.querySelector('.qty');
        const rateInput = row.querySelector('.rate');
        const amountCell = row.querySelector('.amount');

        if (!isChecked && qtyInput && rateInput && amountCell) {
            const qty = parseFloat(qtyInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            const amount = Number((qty * rate).toFixed(2));
            amountCell.textContent = amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            total += amount;
        } else if (amountCell) {
            amountCell.textContent = '';
        }
    });

    let cgst = Number((total * 0.09).toFixed(2));
    let sgst = Number((total * 0.09).toFixed(2));
    let grandTotal = Number((total + cgst + sgst).toFixed(2));

    document.getElementById('totalAmount').textContent = total.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('cgstAmount').textContent = cgst.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('sgstAmount').textContent = sgst.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('grandTotal').textContent = grandTotal.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    if (parseFloat(grandTotal.toFixed(2))) {
        const amountInWords = convertToIndianRupeesWords(parseFloat(grandTotal.toFixed(2)));
        document.getElementById('amountInWords').textContent = amountInWords;
    }
}

function convertToIndianRupeesWords(num) {
    const a = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX',
        'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE',
        'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN',
        'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'
    ];
    const b = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY',
        'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'
    ];

    function numToWords(n, suffix) {
        if (n === 0) return '';
        if (n < 20) return a[n] + ' ' + suffix;
        return b[Math.floor(n / 10)] + ' ' + a[n % 10] + ' ' + suffix;
    }

    function convertNumberToWords(n) {
        if (n === 0) return 'ZERO RUPEES ONLY';
        let str = '';
        const crore = Math.floor(n / 10000000);
        n %= 10000000;
        const lakh = Math.floor(n / 100000);
        n %= 100000;
        const thousand = Math.floor(n / 1000);
        n %= 1000;
        const hundred = Math.floor(n / 100);
        const rest = n % 100;

        if (crore) str += numToWords(crore, 'CRORE ');
        if (lakh) str += numToWords(lakh, 'LAKH ');
        if (thousand) str += numToWords(thousand, 'THOUSAND ');
        if (hundred) str += a[hundred] + ' HUNDRED ';
        if (rest) {
            if (str !== '') str += 'AND ';
            str += numToWords(rest, '');
        }
        return str.trim();
    }

    const number = Math.floor(num);
    const paise = Math.round((num - number) * 100);

    let words = convertNumberToWords(number) + ' RUPEES';
    if (paise > 0) {
        words += ' AND ' + convertNumberToWords(paise) + ' PAISE';
    }
    words += ' ONLY';
    return words.toUpperCase();
}


function printDoc() {
    if (!validateInvoiceRows()) {
        return;
    } else {
        printDocdss();
    }
}

async function printDocdss() {
    const errorList = document.getElementById('error');
    errorList.innerHTML = '';
    const payload = {
        InvoiceNo: document.getElementById('bill-no').value,
        InvoiceDate: document.getElementById('bill-date').value,
        InvoiceVendorCode: "0010013228",
        InvoicePoNumber: null,
        InvoiceTitle: document.getElementById('work-title').textContent,
        InvoiceTotal: parseFloat(document.getElementById('totalAmount').textContent.replace(/,/g, '')),
        InvoiceCGST: parseFloat(document.getElementById('cgstAmount').textContent.replace(/,/g, '')),
        InvoiceSGST: parseFloat(document.getElementById('sgstAmount').textContent.replace(/,/g, '')),
        InvoiceGrandTotal: parseFloat(document.getElementById('grandTotal').textContent.replace(/,/g, '')),
        InvoiceGrandTotalWords: document.getElementById('amountInWords').textContent,
        InvoiceWorkDetails: collectTableItems(),
    }

    try {
        const response = await fetch("/api/createInvoice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.status === "Success") {
            window.print();
            resetForm();
        } else {
            errorList.innerHTML = "Failed to save invoice. Try again.";
        }
    } catch (err) {
        errorList.innerHTML = "Server error while saving invoice.";
    }
}

function collectTableItems() {
    const items = [];
    document.querySelectorAll("#invoice-table tbody tr").forEach((row) => {
        const checkbox = row.querySelector('.checkbox');
        const item = {
            WorkIsHeader: checkbox.checked,
            WorkDesc: row.querySelector('.desc').textContent,
            WorkSAC: "995470",
            WorkUnit: row.querySelector('.unit select').value,
            WorkQty: parseFloat(row.querySelector('.qty').value.replace(/,/g, '')),
            WorkRate: parseFloat(row.querySelector('.rate').value.replace(/,/g, '')),
            WorkAmount: parseFloat(row.querySelector('.amount').textContent.replace(/,/g, ''))
        };
        items.push(item);
    });
    return items;
}

function resetForm() {
    document.getElementById('bill-no').value = '';
    document.getElementById('bill-date').value = '';
    document.getElementById('work-title').textContent = '';
    document.getElementById('totalAmount').textContent = '';
    document.getElementById('cgstAmount').textContent = '';
    document.getElementById('sgstAmount').textContent = '';
    document.getElementById('grandTotal').textContent = '';
    document.getElementById('amountInWords').textContent = '';
    document.querySelectorAll('#invoiceBody tr').forEach((row, index) => {
        row.remove();
    });
    addRow();
}

function validateInvoiceRows() {
    let isDescValid = true;
    let isUnitValid = true;
    let isQtyValid = true;
    let isRateValid = true;
    let isValid = true;

    const billNumberVal = document.getElementById('bill-no').value;
    const billDateVal = document.getElementById('bill-date').value;
    const workTitleVal = document.getElementById('work-title').textContent;

    let rows = document.querySelectorAll('#invoiceBody tr');
    let errorList = document.getElementById('error');
    errorList.innerHTML = '';

    console.log("Rows value: ", rows);

    rows.forEach((row, index) => {
        const checkbox = row.querySelector('.checkbox');
        if (!checkbox || !checkbox.checked) {
            const descCell = row.querySelector('.desc').textContent;
            const unitSelect = row.querySelector('.unit select').value;
            const qtyInput = row.querySelector('.qty').value;
            const rateInput = row.querySelector('.rate').value;

            if (!descCell) {
                isDescValid = false;
            }

            if (!unitSelect) {
                isUnitValid = false;
            }

            if (qtyInput <= 0) {
                isQtyValid = false;
            }

            if (rateInput <= 0) {
                isRateValid = false;
            }
        }
    });

    if (!billNumberVal) {
        const li = document.createElement('li');
        li.textContent = '* Please enter the Bill Number';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }

    if (!billDateVal) {
        const li = document.createElement('li');
        li.textContent = '* Please select the Bill date';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }


    if (!workTitleVal) {
        const li = document.createElement('li');
        li.textContent = '* Please enter work title';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }


    if (!isDescValid) {
        const li = document.createElement('li');
        li.textContent = '* Please enter work Description';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }

    if (!isUnitValid) {
        const li = document.createElement('li');
        li.textContent = '* Please select the Unit';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }

    if (!isQtyValid) {
        const li = document.createElement('li');
        li.textContent = '* Please enter the Quantity';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }

    if (!isRateValid) {
        const li = document.createElement('li');
        li.textContent = '* Please enter the Rate';
        document.getElementById('error').appendChild(li);
        isValid = false;
    }
    return isValid;
}

function getTableData() {
    const table = document.getElementById("invoice-table");
    const rows = table.getElementsByTagName("tr");
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        const isChecked = row.querySelector(".row-check")?.checked || false;
        const desc = row.querySelector(".desc")?.value || "";
        const qty = parseFloat(row.querySelector(".qty")?.value || "0");
        const rate = parseFloat(row.querySelector(".rate")?.value || "0");
        const sac = row.querySelector(".sac")?.value || "";
        const amount = parseFloat(row.querySelector(".amount")?.value || "0");

        data.push({ isChecked, desc, qty, rate, sac, amount });
    }

    console.log(data); // This will log all row data to the console
}

function testApi() {
    fetch("/api/getInvoiceList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "Success") {
                // Update DOM here as needed
            } else {
                console.error("Error:", data.error);
            }
        })
        .catch(error => console.error("Fetch Error:", error));
}