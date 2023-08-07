import { PDFDownloadLink, Document, Page, pdfjs } from "react-pdf";
export const generatePdfBlob = async (purchases) => {
  try {
    const pdfBlob = await new Promise((resolve) => {
      const element = (
        <Document>
          <Page size="A4">
            <TableContainer component={Paper} sx={{ width: "75vw" }}>
              <h3>Purchase</h3>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="th title">
                      Product name
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Quantity
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Unit price
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Vat(%)
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Total price
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Shiping address
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Supplier
                    </TableCell>
                    <TableCell align="left" className="th title">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((purchase) => (
                    <PurchaseRow key={purchase.id} purchase={purchase} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Page>
        </Document>
      );

      const container = document.createElement("div");
      ReactDOM.render(element, container);

      const pdfData = container.innerHTML;
      resolve(new Blob([pdfData], { type: "application/pdf" }));
    });

    return pdfBlob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};
