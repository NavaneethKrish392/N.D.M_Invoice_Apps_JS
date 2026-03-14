import { ndmInvoiceApp } from "./app";

// ndmInvoiceApp.listen(9090, () => {
// 	console.log("Server Running on Port 9090");
// });
const PORT = process.env.PORT || 9090;

ndmInvoiceApp.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});