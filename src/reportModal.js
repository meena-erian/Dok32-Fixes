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
          <label for="report-progress" class="col-form-label"><b id="report-progress-label">Loading...</b>: <i id="report-progress-counter"></i></label>
          <div class="progress">
            <div id="report-progress" class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="form-group">
          <div id="report-results" class='collapse'>Report will show here...</div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="report-result-toggle" class="btn btn-success" data-toggle="collapse" data-target="#report-results">Show Report</button>
        <a id="report-download-button" type="button" class="btn btn-success" disabled>Download Report</a>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      <script>
  $('button#report-result-toggle').click(function(){
      $(this).text(function(i,old){
          console.log(i);
          return old=='Show Report' ?  'Hide Report' : 'Show Report';
      });
  });
      </script>
    </div>
    
  </div>
`;
    return mdiv;
}

export {reportModal};