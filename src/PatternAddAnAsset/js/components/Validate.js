
module.exports = {

  validateuploadForm(values){ 

    const MaxFileSize = 1024 * 1024 * 10;
    const AllowFileFormats = ['jpg','jpeg','png','tiff','mp4',
                                'mp3','doc','gif','docx','xls','xlsx',
                                'ppt','pptx','txt','pdf','csv','odg',
                                'odp','odt','ods','ebk','wdgt'];
      let FileName = '';
      let SplitString = '';
      let FileExtension = '';
      const errors = {}
      if (!values.file) {
        errors.file = 'Please Choose a File'
      }else if(values.file.length===0){
        errors.file = 'Please Choose a File'
      }else if (!values.name) {
          errors.name = 'Please Enter required field Name'
      }else{
        FileName = values.file[0].name;
        // SplitString = FileName.split('.');
        SplitString = FileName.substr(FileName.lastIndexOf('.')+1, FileName.length);
        // FileExtension = SplitString[1];
        if(AllowFileFormats.indexOf(SplitString.toLowerCase())===-1){
          errors.file = 'Error: wrong file type'
        }
        else if(values.file[0].size>MaxFileSize){
          errors.file = 'Error: Filesize should be less than 10 MB'
        }
      }
      return errors
    }
  }
