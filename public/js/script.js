document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tableContainer').style.display = "block";
    document.getElementById('headerContainer').style.display = "none";
    document.getElementById('invoiceContainer').style.display = "none";
    document.getElementById('jccContainer').style.display = "none";
    document.getElementById('buttonContainer').style.display = "none";
    loadInvoiceFnYear();
    document.getElementById('invoiceFinancialYear').value = getCurrentFinancialYear();
    const payLoad = {
        InvoiceFinancialYear: getCurrentFinancialYear()
    }
    getAllInvoiceData(payLoad);
});

function formateDate(date) {
    const today = date ? new Date(date) : new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    var formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate
}

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
var isEdit = false;
var invoiceEditID = '';
const expandIcon = `<svg class="w-4 h-4 text-green-600 expand-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>`;
const collapseIcon = `<svg class="w-4 h-4 text-green-600 collapse-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;


toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

function logoClick() {
    window.location.href = "index.html";
}

function addNewInvoice() {
    const dateInput = document.getElementById('bill-date');
    dateInput.min = formateDate();
    dateInput.value = formateDate();
    document.getElementById('financialYear').textContent = getCurrentFinancialYear();
    loadInvoicOwnerList();
    resetForm();
    document.getElementById('tableContainer').style.display = "none";
    document.getElementById('headerContainer').style.display = "block";
    document.getElementById('invoiceContainer').style.display = "block";
    document.getElementById('buttonContainer').style.display = "flex";
}

function billNumChange() {
    const billNum = document.getElementById('bill-no').value;
    const formattedBillNum = document.getElementById('formattedInvoiceNumber');
    formattedBillNum.textContent = billNum ? billNum : '';
    document.getElementById('jcc-invoice-no').textContent = document.getElementById('bill-no').value + '/' + getCurrentFinancialYear();
}

function poNumChange() {
    const poNum = document.getElementById('bill-po-no').value;
    const formattedPoNumber = document.getElementById('formattedPoNumber');
    formattedPoNumber.textContent = poNum ? poNum : '';
}

function changeDate() {
    const dateInput = document.getElementById('bill-date');
    const formattedDateSpan = document.getElementById('formattedDate');
    let jccFormattedDateSpan;
    let jccInvoiceFormattedDateSpan;
    jccFormattedDateSpan = document.getElementById('jccFormattedDate');
    jccInvoiceFormattedDateSpan = document.getElementById('jccInvoiceFormattedDate');
    const selectedDate = new Date(dateInput.value);
    if (!isNaN(selectedDate)) {
        formattedDateSpan.textContent = formatToDDMMMYYYY(selectedDate);
        jccFormattedDateSpan.textContent = formatToDDMMMYYYY(selectedDate);
        jccInvoiceFormattedDateSpan.textContent = formatToDDMMMYYYY(selectedDate);
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

function loadInvoiceFnYear() {
    const invoiceFnYear = [
        {
            name: 'Choose Invoice Financial Year',
            value: ''
        },
        {
            name: 'All',
            value: 'All'
        }, {
            name: '2020-21',
            value: '2020-21'
        }, {
            name: '2021-22',
            value: '2021-22'
        }, {
            name: '2022-23',
            value: '2022-23'
        }, {
            name: '2023-24',
            value: '2023-24'
        }, {
            name: '2024-25',
            value: '2024-25'
        }, {
            name: '2025-26',
            value: '2025-26'
        }, {
            name: '2026-27',
            value: '2026-27'
        }];

    const sortedOwners = [invoiceFnYear[0], ...invoiceFnYear.slice(1).sort((a, b) => a.name.localeCompare(b.name))];
    const select = document.getElementById('invoiceFinancialYear');

    sortedOwners.forEach(owner => {
        const option = document.createElement('option');
        option.value = owner.value;
        option.textContent = owner.name;
        select.appendChild(option);
    });
}

function loadInvoicOwnerList() {
    const invoiceOwner = [
        {
            name: 'Choose Invoice Owner',
            value: ''
        }, {
            name: 'Suresh (Purchase)',
            value: 'Suresh (Purchase)'
        }, {
            name: 'Suresh (Electrical)',
            value: 'Suresh (Electrical)'
        }, {
            name: 'Kamalesh',
            value: 'Kamalesh'
        }, {
            name: 'Gunasekaran',
            value: 'Gunasekaran'
        }, {
            name: 'Yuvaraj',
            value: 'Yuvaraj'
        }, {
            name: 'Devarajan',
            value: 'Devarajan'
        }, {
            name: 'Velmurugan',
            value: 'Velmurugan'
        }, {
            name: 'Velazhagan',
            value: 'Velazhagan'
        }, {
            name: 'Sivadoss',
            value: 'Sivadoss'
        }, {
            name: 'Anbu',
            value: 'Anbu'
        }, {
            name: 'Manikandan',
            value: 'Manikandan'
        }, {
            name: 'Raghuram',
            value: 'Raghuram'
        }, {
            name: 'Chellamuthu',
            value: 'Chellamuthu'
        }, {
            name: 'Sugumar (EB)',
            value: 'Sugumar (EB)'
        }, {
            name: 'Mahadevan',
            value: 'Mahadevan'
        }, {
            name: 'Bharathi',
            value: 'Bharathi'
        }, {
            name: 'Hari',
            value: 'Hari'
        }, {
            name: 'Venkatesh',
            value: 'Venkatesh'
        }, {
            name: 'Saravanan.C (EB)',
            value: 'Saravanan.C (EB)'
        }, {
            name: 'Saravanan MKM (EB)',
            value: 'Saravanan MKM (EB)'
        }, {
            name: 'Babu (EB)',
            value: 'Babu (EB)'
        }, {
            name: 'Murugan (EB)',
            value: 'Murugan (EB)'
        }, {
            name: 'Paramesh (EB)',
            value: 'Paramesh (EB)'
        }, {
            name: 'Kannan.P',
            value: 'Kannan.P'
        }];

    let sortedOwners = [];
    sortedOwners = [invoiceOwner[0], ...invoiceOwner.slice(1).sort((a, b) => a.name.localeCompare(b.name))];
    const select = document.getElementById('invoiceOwner');

    if (!select) return;

    // Clear existing options to avoid duplicate entries when called multiple times
    select.innerHTML = '';

    sortedOwners.forEach(owner => {
        const option = document.createElement('option');
        option.value = owner.value;
        option.textContent = owner.name;
        select.appendChild(option);
    });
}

function handleGICheckbox(isChecked) {
    // const isChecked = checkbox.checked;
    if (isChecked) {
        document.getElementById('jccContainer').style.display = 'block';
        changeDate();
        document.getElementById('jcc-invoice-no').textContent = document.getElementById('bill-no').value + '/' + getCurrentFinancialYear();
        document.getElementById('jcc-invoice-amount').textContent = document.getElementById('grandTotal').textContent;
        onWorkTitleBlur();
    } else {
        document.getElementById('jcc-work-title').textContent = '';
        document.getElementById('jcc-building-location').textContent = '';
        document.getElementById('jcc-invoice-no').textContent = '';
        document.getElementById('jccFormattedDate').defaultValue = formattedDate;
        document.getElementById('jccInvoiceFormattedDate').defaultValue = formattedDate;
        document.getElementById('jcc-invoice-amount').textContent = '';
        document.getElementById('jccContainer').style.display = 'none';
    }
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
                <td class='border p-1 text-center sac'>
                    <input type='text' class='w-full border rounded p-1 sacInput text-center' value='995470' autocomplete="off">
                </td>
                <td class='border p-1 unit'>
                    <select class='w-full border rounded p-1'>
                        <option value='Sq.ft'>Sq.ft</option>
                        <option value='Sq.mt'>Sq.mt</option>
                        <option value='No's'>No's</option>
                    </select>
                    <span class="error text-red-500 text-xs hidden unitError"></span>
                </td>
                <td class='border p-1 rateQty print:text-center'>
                    <input type='text' class='w-full border rounded p-1 qty text-center' value='0.00' autocomplete="off" oninput='calculateTotal()'>
                    <span class="error text-red-500 text-xs hidden qtyError"></span>
                </td>
                <td class='border p-1 rateQty print:text-center'>
                    <input type='text' class='w-full border rounded p-1 rate text-center' value='0.00' autocomplete="off" oninput='calculateTotal()'>
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
                    ? `<button type="button" onclick='addRow()' class="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white font-medium rounded-full text-sm p-2.5 inline-flex items-center"><span class="icon expand"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2H9v5a1 1 0 1 1-2 0V9H2a1 1 0 1 1 0-2h5V2a1 1 0 0 1 1-1z"/></svg></span></button>`
                    : (index === rows.length - 1)
                        ? `<button type="button" onclick='addRow()' class="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white font-medium rounded-full text-sm p-2.5 inline-flex items-center"><span class="icon expand"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2H9v5a1 1 0 1 1-2 0V9H2a1 1 0 1 1 0-2h5V2a1 1 0 0 1 1-1z"/></svg></span></button>
                      <button type="button" onclick='removeRow(this)' class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 inline-flex items-center"><span class="icon"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M2 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z"/></svg></span></button>`
                        : `<button type="button" onclick='removeRow(this)' class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 inline-flex items-center"><span class="icon"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M2 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z"/></svg></span></button>`;
        }
    });
}

function handleCheckbox(checkbox) {
    const row = checkbox.closest('tr');
    const sacInput = row.querySelector('.sacInput');
    const unitSelect = row.querySelector('.unit select');
    const qtyInput = row.querySelector('.qty');
    const rateInput = row.querySelector('.rate');
    const amountCell = row.querySelector('.amount');

    if (checkbox.checked) {
        sacInput.value = '';
        unitSelect.classList.add('hidden');
        qtyInput.value = '';
        rateInput.value = '';
        amountCell.textContent = '';
    } else {
        sacInput.value = '995470';
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
            const qty = parseFloat(qtyInput.value) || 0.00;
            const rate = parseFloat(rateInput.value) || 0.00;
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
    document.getElementById('jcc-invoice-amount').textContent = grandTotal.toLocaleString('en-IN', {
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
        printAndSaveDoc();
    }
}

async function printAndSaveDoc() {
    const errorList = document.getElementById('error');
    errorList.innerHTML = '';
    const insertUpdatePayload = {
        InvoiceNo: document.getElementById('bill-no').value,
        InvoiceDate: document.getElementById('bill-date').value,
        InvoiceFinancialYear: getCurrentFinancialYear(),
        InvoiceOwner: document.getElementById('invoiceOwner').value,
        InvoiceIsGIWork: true,
        InvoiceVendorCode: "0010013228",
        InvoicePoNumber: document.getElementById('bill-po-no').value ?? '',
        InvoiceTitle: document.getElementById('work-title').textContent,
        InvoiceTotal: parseFloat(document.getElementById('totalAmount').textContent.replace(/,/g, '')),
        InvoiceCGST: parseFloat(document.getElementById('cgstAmount').textContent.replace(/,/g, '')),
        InvoiceSGST: parseFloat(document.getElementById('sgstAmount').textContent.replace(/,/g, '')),
        InvoiceGrandTotal: parseFloat(document.getElementById('grandTotal').textContent.replace(/,/g, '')),
        InvoiceGrandTotalWords: document.getElementById('amountInWords').textContent,
        InvoiceWorkDetails: collectTableItems(),
    };
    console.log(insertUpdatePayload);
    try {
        let apiUrl;
        if (isEdit) {
            apiUrl = '/api/updateInvoice';
            insertUpdatePayload._id = invoiceEditID;
        } else {
            apiUrl = '/api/createInvoice';
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(insertUpdatePayload),
        });

        const result = await response.json();
        if (result.status === "Success") {
            if (validatePO()) {
                printTablesSeparately();
            }
        } else {
            errorList.innerHTML = "Failed to save invoice. Try again.";
        }
    } catch (err) {
        errorList.innerHTML = "Server error while saving invoice.";
    }
}

function validatePO() {
    const poNumber = document.getElementById('bill-po-no').value;
    if (poNumber) {
        document.getElementById('billPoNumberParent').classList.remove('no-print');
    } else {
        document.getElementById('billPoNumberParent').classList.add('no-print');
    }
    return true;
}

function collectTableItems() {
    const items = [];
    document.querySelectorAll("#invoice-table tbody tr").forEach((row) => {
        const checkbox = row.querySelector('.checkbox');
        const item = {
            WorkIsHeader: checkbox.checked,
            WorkDesc: row.querySelector('.desc').textContent,
            WorkSAC: checkbox.checked ? "" : row.querySelector('.sacInput').value,
            WorkUnit: checkbox.checked ? '' : row.querySelector('.unit select').value,
            WorkQty: checkbox.checked ? '' : parseFloat(row.querySelector('.qty').value.replace(/,/g, '')),
            WorkRate: checkbox.checked ? '' : parseFloat(row.querySelector('.rate').value.replace(/,/g, '')),
            WorkAmount: checkbox.checked ? '' : parseFloat(row.querySelector('.amount').textContent.replace(/,/g, ''))
        };
        items.push(item);
    });
    return items;
}

function resetForm() {
    isEdit = false;
    document.getElementById('bill-no').value = '';
    document.getElementById('bill-date').defaultValue = formattedDate;
    document.getElementById('bill-po-no').value = '';
    document.getElementById('invoiceOwner').value = '';
    document.getElementById('work-title').textContent = '';
    document.getElementById('totalAmount').textContent = '';
    document.getElementById('cgstAmount').textContent = '';
    document.getElementById('sgstAmount').textContent = '';
    document.getElementById('grandTotal').textContent = '';
    document.getElementById('amountInWords').textContent = '';
    document.querySelectorAll('#invoiceBody tr').forEach((row, index) => {
        row.remove();
    });
    document.getElementById('jcc-work-title').textContent = '';
    document.getElementById('jcc-building-location').textContent = '';
    document.getElementById('jcc-invoice-no').textContent = '';
    document.getElementById('jccFormattedDate').defaultValue = formattedDate;
    document.getElementById('jccInvoiceFormattedDate').defaultValue = formattedDate;
    document.getElementById('jcc-invoice-amount').textContent = '';
    document.getElementById('printInvoice').textContent = 'Save';
    addRow();
    handleGICheckbox(true);
}

function onWorkTitleBlur() {
    const workEl = document.getElementById('work-title');
    document.getElementById('jcc-work-title').textContent = workEl.textContent;
    const jccEl = document.getElementById('jcc-building-location');
    if (!workEl || !jccEl) return;

    let jccTitle = (workEl.textContent || '').trim();

    // match "G I SHEET", "G.I SHEET", "OLD G.I SHEET" (case-insensitive)
    const giRegex = /\b(?:old\s*)?g\.?\s*i\.?\s*sheet\b/i;
    const m = giRegex.exec(jccTitle);

    if (m) {
        jccTitle = jccTitle.slice(0, m.index).trim();
        // drop trailing punctuation / connectors
        jccTitle = jccTitle.replace(/[.,:;\/\-\u2013\u2014&\s]+$/g, '').trim();
        // remove common trailing spill words
        jccTitle = jccTitle.replace(/\b(?:removing|removals?|fixing|repair(?:ing)?|work(?:s)?|removal|replacing|installation)\b$/i, '').trim();
    }

    jccEl.textContent = jccTitle || workEl.textContent.trim();
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
    const invoiceOwner = document.getElementById('invoiceOwner').value;

    let rows = document.querySelectorAll('#invoiceBody tr');
    let errorList = document.getElementById('error');
    errorList.innerHTML = '';

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

    if (!invoiceOwner) {
        const li = document.createElement('li');
        li.textContent = '* Please select the Invoice Owner';
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

function cancelDoc() {
    resetForm();
    const payLoad = {
        InvoiceFinancialYear: getCurrentFinancialYear()
    };
    getAllInvoiceData(payLoad);
    document.getElementById('tableContainer').style.display = "block";
    document.getElementById('headerContainer').style.display = "none";
    document.getElementById('invoiceContainer').style.display = "none";
    document.getElementById('jccContainer').style.display = "none";
    document.getElementById('buttonContainer').style.display = "none";
}

function parseDateUTC(mmddyyyy) {
    const [month, day, year] = mmddyyyy.split('/');
    return new Date(Date.UTC(year, month - 1, day)); // months are 0-indexed
}

function searchClick() {
    let startDate = document.getElementById('datepicker-range-start').value;
    let endDate = document.getElementById('datepicker-range-end').value;

    const invoiceFinancialYear = document.getElementById('invoiceFinancialYear').value;
    if (invoiceFinancialYear) {
        const payLoad = {
            InvoiceFinancialYear: invoiceFinancialYear
        };

        if (startDate && endDate) {
            payLoad.startDate = parseDateUTC(startDate).toISOString();
            payLoad.endDate = parseDateUTC(endDate).toISOString();
        }
        getAllInvoiceData(payLoad);
        return;
    } else {
        alert('Please select the dates');
    }
}

function clearClick() {
    document.getElementById('datepicker-range-start').value = '';
    document.getElementById('datepicker-range-end').value = '';
    document.getElementById('invoiceFinancialYear').value = getCurrentFinancialYear();
    const payLoad = {
        InvoiceFinancialYear: getCurrentFinancialYear()
    };
    getAllInvoiceData(payLoad);
}

function getAllInvoiceData(payLoad) {
    document.getElementById("loader").classList.remove("hidden");
    fetch("/api/getInvoiceList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payLoad)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "Success") {
                bindDataTable(data.records);
            } else {
                console.error("Error:", data.error);
                document.getElementById("loader").classList.add("hidden");
            }
        })
        .catch(error => console.error("Fetch Error:", error))
        .finally(() => {
            document.getElementById("loader").classList.add("hidden");
        });
}

function bindDataTable(data) {
    new DataTable('#invoiceListTable', {
        data: data,
        responsive: true,
        autoWidth: true,
        searching: true,
        destroy: true,
        dom: 'Blfrtip',
        order: [[1, 'desc']],
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
                title: 'Invoice_Report',
                className: 'bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 no-print',
                footer: true,
                exportOptions: {
                    columns: ':visible:not(:last-child)'
                }
            }
        ],
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: expandIcon,
            },
            {
                data: 'InvoiceNo',
                // render: function (data, type, row) {
                //     const invNo = data ? String(data) : '';
                //     const finYear = row && row.InvoiceFinancialYear ? row.InvoiceFinancialYear : '';
                //     if (type === 'display' || type === 'filter') {
                //         return finYear ? `${invNo} / ${finYear}` : invNo;
                //     }
                //     const numericParts = (invNo.match(/\d+/g) || []).join('');
                //     let sortKey;
                //     if (numericParts) {
                //         const padded = numericParts.padStart(12, '0');
                //         const prefix = invNo.replace(/\d+/g, '') || '';
                //         sortKey = `${prefix}-${padded}`;
                //     } else {
                //         sortKey = invNo;
                //     }
                //     return finYear ? `${finYear}-${sortKey}` : sortKey;
                // },
                className: 'invoiceNoTd'
            },
            {
                data: 'InvoiceDate',
                render: function (data, type, row) {
                    if (!data) return '';
                    const date = new Date(data);
                    const day = String(date.getDate()).padStart(2, '0');
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const month = monthNames[date.getMonth()];
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                },
                className: 'invoiceDateTd'
            },
            {
                data: 'InvoiceOwner',
                className: 'invoiceOwnerId',
                orderable: false,
                defaultContent: '',
            },
            {
                data: 'InvoiceTitle',
                className: 'invoiceTitleTd',
                orderable: false,
                defaultContent: '',
            },
            {
                data: 'InvoiceTotal',
                render: function (data, type, row) {
                    return parseFloat(data).toFixed(2);
                },
                className: 'invoiceTotalTd',
            },
            {
                data: 'InvoiceCGST',
                render: function (data, type, row) {
                    return parseFloat(data).toFixed(2);
                }
            },
            {
                data: 'InvoiceSGST',
                render: function (data, type, row) {
                    return parseFloat(data).toFixed(2);
                }
            },
            {
                data: 'InvoiceGrandTotal',
                render: function (data, type, row) {
                    return parseFloat(data).toFixed(2);
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500" data-id="${row._id}" onclick="editSingleInvoice('${row._id}')"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 0 0-2.828 0l-9.5 9.5A2 2 0 0 0 5 13.414V16a1 1 0 0 0 1 1h2.586a2 2 0 0 0 1.414-.586l9.5-9.5a2 2 0 0 0 0-2.828l-2.586-2.586zM14 4l2 2-1 1-2-2 1-1zM6 13.414l8.586-8.586 2 2L8 15.414H6v-2z"/></svg><span class="sr-only">Edit</span></button>`;
                },
                className: 'actionClassTd'
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            function sum(column) {
                return data.reduce((total, row) => total + parseFloat(row[column] || 0), 0);
            }

            const api = this.api();
            const totalInvoice = sum("InvoiceTotal").toFixed(2);
            const totalCGST = sum("InvoiceCGST").toFixed(2);
            const totalSGST = sum("InvoiceSGST").toFixed(2);
            const totalGrand = sum("InvoiceGrandTotal").toFixed(2);

            $(api.column(5).footer()).html(totalInvoice);
            $(api.column(6).footer()).html(totalCGST);
            $(api.column(7).footer()).html(totalSGST);
            $(api.column(8).footer()).html(totalGrand);
        }
    });

    function formatChild(invoice) {
        if (!invoice.InvoiceWorkDetails || invoice.InvoiceWorkDetails.length === 0) {
            return '<div>No work details found.</div>';
        }
        let html = '<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">';
        html += `<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                Description
            </th>
            <th scope="col" class="px-6 py-3">
                SAC / HSN
            </th>
            <th scope="col" class="px-6 py-3">
                Unit
            </th>
            <th scope="col" class="px-6 py-3">
                Qty
            </th>
            <th scope="col" class="px-6 py-3">
                Rate
            </th>
            <th scope="col" class="px-6 py-3">
                Amount
            </th>
        </tr>
    </thead>`;
        html += '<tbody>';
        invoice.InvoiceWorkDetails.forEach((item) => {
            const amount = Number((item.WorkQty * item.WorkRate)).toFixed(2);
            amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            html += `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td class="px-6 py-4">${item.WorkDesc}</td>
                        <td class="px-6 py-4">${item.WorkIsHeader ? '' : item.WorkSAC}</td>
                        <td class="px-6 py-4">${item.WorkIsHeader ? '' : item.WorkUnit}</td>
                        <td class="px-6 py-4">${item.WorkIsHeader ? '' : parseFloat(item.WorkQty).toFixed(2)}</td>
                        <td class="px-6 py-4">${item.WorkIsHeader ? '' : parseFloat(item.WorkRate).toFixed(2)}</td>
                        <td class="px-6 py-4">${item.WorkIsHeader ? '' : amount}</td>
                    </tr>`;
        });
        html += '</tbody>';
        html += '</table>';
        return html;
    }

    const table = $('#invoiceListTable').DataTable();
    document.querySelector('#invoiceListTable tbody').addEventListener('click', function (event) {
        if (event.target.closest('td.dt-control')) {
            const td = event.target.closest('td.dt-control');
            const tr = td.closest('tr');
            const row = table.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.classList.remove('shown');
                td.innerHTML = expandIcon;
            } else {
                row.child(formatChild(row.data())).show();
                tr.classList.add('shown');
                td.innerHTML = collapseIcon;
            }
        }
    });

    setTimeout(() => {
        const excelButton = document.querySelector('.dt-button.buttons-excel');
        if (excelButton) {
            excelButton.classList.remove('dt-button');
        }
    }, 0);
    document.getElementById("loader").classList.add("hidden");
}

function editSingleInvoice(id) {
    loadInvoicOwnerList();
    document.getElementById("loader").classList.remove("hidden");
    fetch("/api/getInvoiceListByID", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: id
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "Success") {
                bindData(data.records);
            } else {
                console.error("Error:", data.error);
            }
            isEdit = true;
            document.getElementById('tableContainer').style.display = "none";
            document.getElementById('headerContainer').style.display = "block";
            document.getElementById('invoiceContainer').style.display = "block";
            document.getElementById('buttonContainer').style.display = "flex";
            document.getElementById("loader").classList.add("hidden");
        })
        .catch(error => console.error("Fetch Error:", error))
        .finally(() => {
            document.getElementById("loader").classList.add("hidden");
        });
}

function bindData(records) {
    invoiceEditID = records._id;
    document.getElementById('printInvoice').textContent = 'Update';
    document.getElementById('bill-no').value = records.InvoiceNo;
    document.getElementById('formattedInvoiceNumber').textContent = records.InvoiceNo;
    document.getElementById('bill-date').value = formateDate(records.InvoiceDate);
    document.getElementById('formattedDate').textContent = formatToDDMMMYYYY(new Date(records.InvoiceDate));
    document.getElementById('financialYear').textContent = getCurrentFinancialYear();
    document.getElementById('bill-po-no').value = records.InvoicePoNumber;
    document.getElementById('formattedPoNumber').textContent = records.InvoicePoNumber;
    document.getElementById('invoiceOwner').value = records.InvoiceOwner ? records.InvoiceOwner : '';
    document.getElementById('work-title').textContent = records.InvoiceTitle;
    document.getElementById('totalAmount').textContent = records.InvoiceTotal.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('cgstAmount').textContent = records.InvoiceCGST.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('sgstAmount').textContent = records.InvoiceSGST.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('grandTotal').textContent = records.InvoiceGrandTotal.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('amountInWords').textContent = records.InvoiceGrandTotalWords;
    document.querySelectorAll('#invoiceBody tr').forEach((row, index) => {
        row.remove();
    });
    const table = document.getElementById("invoiceBody");

    records.InvoiceWorkDetails.forEach((item, index) => {
        const row = table.insertRow();
        let rowIndex = table.rows.length + 1;
        let qty = '';
        let rate = '';
        let amount;

        if (item.WorkQty && item.WorkRate) {
            qty = parseFloat(item.WorkQty) || 0.00;
            rate = parseFloat(item.WorkRate) || 0.00;
            amount = Number((qty * rate).toFixed(2));

            qty = qty.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            rate = rate.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            amount = amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        row.innerHTML = `
                <td class='border p-1 text-center'>${rowIndex}</td>
                <td class='border p-1 no-print'>
                    <input type='checkbox' class='w-full border rounded p-1 checkbox' onchange='handleCheckbox(this)' id='isHeader' ${item.WorkIsHeader ? "checked" : ""}>
                </td>
                <td class='border p-1'>
                    <div contenteditable='true' class='w-full border rounded p-1 print-text desc'>${item.WorkDesc}</div>
                    <span class="error text-red-500 text-xs hidden descError"></span>
                </td>
                <td class='border p-1 text-center sac'>
                    <input type='text' class='w-full border sacInput rounded p-1 text-center' value='${item.WorkIsHeader ? '' : item.WorkSAC}' autocomplete="off">
                </td>
                <td class='border p-1 unit'>
                    ${item.WorkIsHeader ? '' : getUnitDropdown(item.WorkUnit)}
                </td>
                <td class='border p-1 rateQty print:text-center'>
                    <input type='text' class='w-full border rounded p-1 qty text-center' value='${qty}' autocomplete="off" oninput='calculateTotal()'>
                    <span class="error text-red-500 text-xs hidden qtyError"></span>
                </td>
                <td class='border p-1 rateQty print:text-center'>
                    <input type='text' class='w-full border rounded p-1 rate text-center' value='${rate}' autocomplete="off" oninput='calculateTotal()'>
                    <span class="error text-red-500 text-xs hidden rateError"></span>
                </td>
                <td class='border p-1 text-right amount'>${amount ? amount : ''}</td>
                <td class='border p-1 no-print text-center action-buttons'></td>
            `;
        recalculateSerialNumbers();
    });

    // if (records.InvoiceIsGIWork) {
    document.getElementById('jccContainer').style.display = 'block';
    document.getElementById('jccFormattedDate').textContent = formatToDDMMMYYYY(new Date(records.InvoiceDate));
    document.getElementById('jccInvoiceFormattedDate').textContent = formatToDDMMMYYYY(new Date(records.InvoiceDate));
    document.getElementById('jcc-work-title').textContent = records.InvoiceTitle;
    document.getElementById('jcc-invoice-no').textContent = records.InvoiceNo + '/' + getCurrentFinancialYear();
    document.getElementById('jcc-invoice-amount').textContent = records.InvoiceGrandTotal.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    onWorkTitleBlur();
    // } else {
    //     document.getElementById('jccContainer').style.display = 'none';
    // }
}

function getUnitDropdown(selectedUnit) {
    const options = ["Sq.ft", "Sq.mt", "No's"];
    return `
      <select class='w-full border rounded p-1'>
        ${options
            .map(
                (unit) => {
                    return `<option value="${unit}" ${unit === selectedUnit ? 'selected' : ''}>${unit}</option>`;
                }
            )
            .join("")}
      </select>
      <span class="error text-red-500 text-xs hidden unitError"></span>
    `;
}

async function printTablesSeparately() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const originalTitle = document.title;
    const billNo = document.getElementById('bill-no')?.value || '';
    const firstTitle = `Bill_No_${billNo || 'Invoice'}`;
    const secondTitle = `JCC_Bill_No_${billNo || 'JCC'}`;
    const prev = {};

    const els = {
        headerContainer: document.getElementById('headerContainer'),
        invoiceContainer: document.getElementById('invoiceContainer'),
        jccContainer: document.getElementById('jccContainer'),
        tableContainer: document.getElementById('tableContainer'),
        buttonSection: document.getElementById('buttonContainer')
    };

    Object.keys(els).forEach(key => {
        const el = els[key];
        if (!el) return;
        prev[key] = {
            display: el.style.display,
            hasNoPrint: el.classList.contains('no-print')
        };
    });

    try {
        if (els.tableContainer) els.tableContainer.style.display = 'none';
        if (els.tableContainer) {
            els.tableContainer.classList.add('no-print');
            els.tableContainer.style.display = 'none';
        }

        // 1) Print headerContainer + invoiceContainer (hide others)
        ['headerContainer', 'invoiceContainer'].forEach(key => {
            const el = els[key];
            if (!el) return;
            el.style.display = 'block';
            el.classList.remove('no-print');
        });
        if (els.jccContainer) els.jccContainer.style.display = 'none';

        document.title = firstTitle;
        await sleep(300);
        window.print();
        await sleep(300);

        // 2) Print jccContainer only (hide others)
        if (els.headerContainer) {
            els.headerContainer.style.display = 'none';
            els.headerContainer.classList.add('no-print');
        }
        if (els.invoiceContainer) {
            els.invoiceContainer.style.display = 'none';
            els.invoiceContainer.classList.add('no-print');
        }
        if (els.jccContainer) {
            els.jccContainer.style.display = 'block';
            els.jccContainer.classList.remove('no-print');
        }

        document.title = secondTitle;
        await sleep(300);
        window.print();
        await sleep(300);
    } finally {
        resetForm();
        const payLoad = {
            InvoiceFinancialYear: getCurrentFinancialYear()
        }
        getAllInvoiceData(payLoad);
        els.tableContainer.style.display = "block";
        els.headerContainer.style.display = "none";
        els.invoiceContainer.style.display = "none";
        els.jccContainer.style.display = "none";
        els.buttonSection.style.display = "none";
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
        window.scrollTo(0, 0);
    }
}

