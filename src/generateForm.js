import {nationalities} from "./nationalities.js";
// Template Source https://www.w3docs.com/tools/editor/5941
function insertFormStyle(){
    document.head.innerHTML = document.head.innerHTML + `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
<style>
  .report-form{
      padding: 0;
  }
  .report-form div, .report-form form, .report-form input, .report-form select, .report-form textarea, .report-form p { 
  padding: 0;
  margin: 0;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 22px;
  box-sizing: revert;
  }
  .report-form h1 {
  position: absolute;
  margin: 0;
  font-size: 36px;
  color: #fff;
  z-index: 2;
  }
  .report-form .testbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 0;
  padding-right: 0;
  }
  .report-form form {
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 20px 0 #333; 
  }

  .report-form input, .report-form textarea, .report-form select {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  }
  .report-form input {
  width: calc(100% - 10px);
  padding: 5px;
  }
  .report-form select {
  width: 100%;
  padding: 7px 0;
  background: transparent;
  }
  .report-form textarea {
  width: calc(100% - 12px);
  padding: 5px;
  }
  .report-form .item:hover p, .report-form .item:hover i, .report-form .question:hover p, .question label:hover, .report-form input:hover::placeholder {
  color: #333;
  }
  .report-form .item input:hover, .report-form .item select:hover, .report-form .item textarea:hover {
  border: 1px solid transparent;
  box-shadow: 0 0 6px 0 #333;
  color: #333;
  }
  .report-form .item {
  position: relative;
  margin: 10px 0;
  }
  .report-form input[type="date"]::-webkit-inner-spin-button {
  display: none;
  }
  .report-form .item i, .report-form input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  font-size: 20px;
  color: #a9a9a9;
  }
  .report-form .item i {
  right: 1%;
  top: 30px;
  z-index: 1;
  }
  .report-form [type="date"]::-webkit-calendar-picker-indicator {
  right: 0;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
  }
  .report-form input[type="time"]::-webkit-inner-spin-button {
  margin: 2px 22px 0 0;
  }
  .report-form input[type=radio], .report-form input.other {
  display: none;
  }
  .report-form label.radio {
  position: relative;
  display: inline-block;
  margin: 5px 20px 10px 0;
  cursor: pointer;
  }
  .report-form .question span {
  margin-left: 30px;
  }
  .report-form label.radio:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #ccc;
  }
  .report-form #radio_5:checked ~ input.other {
  display: block;
  }
  .report-form input[type=radio]:checked + label.radio:before {
  border: 2px solid #444;
  background: #444;
  }
  .report-form label.radio:after {
  content: "";
  position: absolute;
  top: 7px;
  left: 5px;
  width: 7px;
  height: 4px;
  border: 3px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  opacity: 0;
  }
  .report-form input[type=radio]:checked + label:after {
  opacity: 1;
  }
  .report-form .btn-block {
  margin-top: 10px;
  text-align: center;
  }
  .report-form button {
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px; 
  background: #444;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  }
  .report-form button:hover {
  background: #666;
  }
  @media (min-width: 568px) {
    .report-form .name-item, .report-form .city-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  }
  .report-form .name-item input, .report-form .city-item input {
  width: calc(50% - 20px);
  }
  .report-form .city-item select {
  width: calc(50% - 8px);
  }
  }
</style>`;
}

function generateFormTemplate(str){
    var div = document.createElement("DIV");
    div.className = "report-form";
    div.innerHTML = `    <div class="testbox">
      <form action="/">
        <div class="item">
          <p>Name</p>
          <div class="name-item">
            <input type="text" name="name" placeholder="First" />
            <input type="text" name="name" placeholder="Last" />
          </div>
        </div>
        <div class="item">
          <p>Email</p>
          <input type="text" name="name"/>
        </div>
        <div class="item">
          <p>Phone</p>
          <input type="text" name="name"/>
        </div>
        <div class="item">
          <p>Number of Passengers</p>
          <input type="text" name="name"/>
        </div>
        <div class="item">
          <p>Contact Address</p>
          <input type="text" name="name" placeholder="Street address" />
          <input type="text" name="name" placeholder="Street address line 2" />
          <div class="city-item">
            <input type="text" name="name" placeholder="City" />
            <input type="text" name="name" placeholder="Region" />
            <input type="text" name="name" placeholder="Postal / Zip code" />
            <select>
              <option value="">Country</option>
              <option value="1">Russia</option>
              <option value="2">Germany</option>
              <option value="3">France</option>
              <option value="4">Armenia</option>
              <option value="5">USA</option>
            </select>
          </div>
        </div>
        <div class="question">
          <p>Vehicle</p>
          <div class="question-answer">
            <div>
              <input type="radio" value="none" id="radio_1" name="vehicle" />
              <label for="radio_1" class="radio"><span>Limousine (8-12 person)</span></label>
            </div>
            <div>
              <input type="radio" value="none" id="radio_2" name="vehicle" />
              <label for="radio_2" class="radio"><span>SUV (6-7 person)</span></label>
            </div>
            <div>
              <input type="radio" value="none" id="radio_3" name="vehicle" />
              <label for="radio_3" class="radio"><span>Van (12-15 person)</span></label>
            </div>
            <div>
              <input type="radio" value="none" id="radio_4" name="vehicle" />
              <label for="radio_4" class="radio"><span>Bus (50+ person)</span></label>
            </div>
            <div>
              <input type="radio" value="none" id="radio_5" name="vehicle" />
              <label for="radio_5" class="radio other"><span>other:</span></label>
              <input class="other" type="text" name="name" />
            </div>
          </div>
        </div>
        <div class="item">
          <p>Pick Up Date</p>
          <input type="date" name="bdate" />
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="item">
          <p>Pick Up Time</p>
          <input type="time" name="name" />
          <i class="fas fa-clock"></i>
        </div>
        <div class="item">
          <p>If pick up from the airport, please enter airport name</p>
          <input type="text" name="name"/>
        </div>
        <div class="item">
          <p>Flight Number</p>
          <input type="text" name="name"/>
        </div>
        <div class="item">
          <p>Pick Up Point</p>
          <input type="text" name="name" placeholder="Street address" />
          <input type="text" name="name" placeholder="Street address line 2" />
          <div class="city-item">
            <input type="text" name="name" placeholder="City" />
            <input type="text" name="name" placeholder="Region" />
            <input type="text" name="name" placeholder="Postal / Zip code" />
            <select>
              <option value="">Country</option>
              <option value="1">Russia</option>
              <option value="2">Germany</option>
           <option value="3">France</option>
              <option value="4">Armenia</option>
              <option value="5">USA</option>
            </select>
          </div>
        </div>
        <div class="item">
          <p>Destination</p>
          <input type="text" name="name" placeholder="Street address" />
          <input type="text" name="name" placeholder="Street address line 2" />
          <div class="city-item">
            <input type="text" name="name" placeholder="City" />
            <input type="text" name="name" placeholder="Region" />
            <input type="text" name="name" placeholder="Postal / Zip code" />
            <select>
              <option value="">Country</option>
              <option value="1">Russia</option>
              <option value="2">Germany</option>
              <option value="3">France</option>
              <option value="4">Armenia</option>
              <option value="5">USA</option>
            </select>
          </div>
        </div>
        <div class="item">
          <p>Notes</p>
          <textarea rows="3"></textarea>
        </div>
        <div class="btn-block">
          <button type="submit" href="/">SEND</button>
        </div>
      </form>
    </div>`;
    return div;
}

function appendOneOrMore(node, children){
    if(Array.isArray(children)){
        children.forEach(child => {
            node.append(child);
        });
    }
    else{
        node.append(children);
    }
}

function generateInput(inputStructure){
    let label = document.createElement("P");
    label.innerText = inputStructure.label;
    switch(inputStructure.type){
        case "select":
            let selectE = document.createElement("SELECT");
            inputStructure.options.forEach((option) => {
                let opt = document.createElement("OPTION");
                opt.value = option.value;
                opt.innerText = option.name;
                selectE.append(opt);
            });
            return [label, selectE];
        case "date":
            let inp = document.createElement("INPUT");
            inp.type = "date";
            let ico = document.createElement("I");
            ico.className = "fas fa-calendar-alt";
            return [label, inp, ico];
        case "nationality":
            let selectNat = document.createElement("SELECT");
            nationalities.forEach((option) => {
                let opt = document.createElement("OPTION");
                opt.value = option;
                opt.innerText = option;
                selectNat.append(opt);
            });
            return [label, selectNat];
        case "text":
            let textInp = document.createElement("INPUT");
            textInp.type = "text";
            return [label, textInp];
        default:
            let err = document.createElement("P");
            err.innerText = "Undefined input type";
            return err;
    }
    return document.createElement("INPUT");
}

function generateForm(formStructure){
    //var loadingDiv = document.createElement("DIV");
    //loadingDiv.className = "panel panel-default";
    //loadingDiv.setAttribute("ng-hide", "isLoading");
    var wrapperDiv = document.createElement("DIV");
    wrapperDiv.className = "wrapper report-form";
    //loadingDiv.appendChild(wrapperDiv);
    var testDiv = document.createElement("DIV");
    testDiv.className = "testbox";
    wrapperDiv.appendChild(testDiv);
    var form = document.createElement("FORM");
    testDiv.appendChild(form);
    let writePointer = form;
    for(var i = 0; i < formStructure.length; i++){
        let item = document.createElement("DIV");
        item.className = "item";
        writePointer.appendChild(item);
        writePointer = item;
        if(false && i < formStructure.length - 1){ // Create each two elements in one line unless it's the last element
            let twoItems = document.createElement("DIV");
            twoItems.className = "city-item";
            writePointer.appendChild(twoItems);
            writePointer = twoItems;
            appendOneOrMore(writePointer, generateInput(formStructure[i]));
            i = i+1;
            appendOneOrMore(writePointer,generateInput(formStructure[i]));
            writePointer = writePointer.parentElement;
        }
        else {
            appendOneOrMore(writePointer,generateInput(formStructure[i]));
        }
        writePointer = writePointer.parentElement;
    }
    return wrapperDiv;
}
export {generateForm, insertFormStyle};