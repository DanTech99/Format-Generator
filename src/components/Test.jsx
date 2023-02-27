function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }
  
  const App = () => {
    const [data, setData] = React.useState({
      firstName: '',
      lastName: '',
      phone: '',
      description: '',
    });
  
    const generateDocument = () => {
      loadFile(
        'https://docxtemplater.com/tag-example.docx',
        function (error, content) {
          if (error) {
            throw error;
          }
          var zip = new PizZip(content);
          var doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          doc.setData(data);
          doc.render();
          var out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          saveAs(out, 'output.docx');
        }
      );
    };
}