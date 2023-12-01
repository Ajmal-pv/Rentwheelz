import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { paymentpdf } from '../../../services/admin-Service';

const GeneratePDF = ({startDate,endDate}) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Make an HTTP request to fetch data from the backend
  
   paymentpdf(startDate,endDate)
      .then((response) => {
        console.log(response);
        setData(response.data) // Set the received data to the state
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  const generatePdf = () => {
    // Create a new jsPDF document
  
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text('Sales Report', 10, 10);

    // Check if data has been fetched
    if (data.length > 0) {
      // Define the columns for the table
      const columns = Object.keys(data[0])

      // Create a 2D array with the data
      const tableData = data.map((item) => columns.map((col) => item[col]));

      // Auto-generate the table
      pdf.autoTable({
        head: [columns],
        body: tableData,
        startY: 30,
      });
    }

    // Save or open the PDF
    pdf.save('sales_report.pdf');
  };

  return (
    <div>
      <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-2 rounded' onClick={generatePdf}>Generate Sales Report</button>
      {/* Other dashboard content */}
    </div>
  );
};

export default GeneratePDF;
