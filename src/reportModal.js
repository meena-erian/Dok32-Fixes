function reportModal(){
    let mdiv = document.createElement("DIV");
    mdiv.className = "modal fade";
    mdiv.id = "reportModal";
    mdiv.role = "dialog";
    mdiv.innerHTML = `
  <div class="modal-dialog">
  
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Report results</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="sms-templates-list" class="col-form-label">Loading...</label>
          <select class='form-control' id='sms-templates-list'>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" disabled>Download</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
    
  </div>
`;
    return mdiv;
}

export {reportModal};