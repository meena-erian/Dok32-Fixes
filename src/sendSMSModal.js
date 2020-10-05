function sendSMSModal(){
    let mdiv = document.createElement("DIV");
    mdiv.className = "modal fade";
    mdiv.id = "smsModal";
    mdiv.role = "dialog";
    mdiv.innerHTML = `
  <div class="modal-dialog">
  
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Sending SMS to all selected <b id='selected-contacts'>...</b> contacts</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="sms-templates-list" class="col-form-label">SMS template:</label>
          <select class='form-control' id='sms-templates-list'>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success">Send SMS</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
    
  </div>
`;
    fetch("https://everlast-office.dok32.com:4443/webApi/company/sms/template/list.json?limit=25").then(response => response.json())
      .then(data => {
        let select = document.getElementById('sms-templates-list');
        data.data.list.forEach(opt => {
          let newOpt = document.createElement("OPTION");
          newOpt.innerText = opt.name;
          newOpt.value = opt.id;
          select.append(newOpt);
        });
      });
    return mdiv;
}

export {sendSMSModal};