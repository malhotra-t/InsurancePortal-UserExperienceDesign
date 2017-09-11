$(document).ready(function(){

  $.ajax({
    url: "http://localhost:8000/plans.json",
    dataType: "jsonp"
  });


});

var plans;
var planCard = "<div class='card plan-parent'><div class='card-header'><div class='col-lg-3'>      Plan Name: <span class='plan-name'></span></div><div class='col-lg-3'><span class='glyphicon glyphicon-record'></span>Plan Type: <span class='plan-type'></span> </div><div class='col-lg-6'><div class='row'><div class='col-lg-6'><a class='brand' href='PlanDetails.html'><span class='fa fa-bars'></span> Details</a></div><div class='col-lg-6'><div class='form-check'><label class='form-check-label'><input class='form-check-input compare-checkbox' type='checkbox' value=''>Check to compare</label></div></div></div> </div></div><div class='card-block'><div class='card-deck-wrapper'><div class='card-deck'><div class='card'><div class='card-block'><h4 class='card-title'>Monthly Premium</h4><h5 class='card-text text-success monthly-premium'>$302</h5></br><h4 class='card-title'>Deductible</h4><h5 class='card-text text-success deductible'>$150</h5></div></div><div class='card'><div class='card-block'><table class='table'><thead><tr><th>Services</th><th>You Pay</th></tr></thead><tbody><tr><td>Doctor Visit</td><td>$50 after deductible copay</td></tr><tr><td>Specialist Visit</td><td>$75 after deductible copay</td></tr><tr><td></td><td>No data available.</td></tr></tbody></table></div></div></div></div></div><div class='row'><div class='col-lg-3'></div><div class='col-lg-3'></div><div class='col-lg-3 col-lg-offset-6'></div><div class='col-lg-3'></div></div></div>";
var networkItem =  "<label class='form-check-label network-item-label'><input class='form-check-input network-item-checkbox' type='checkbox' value=''>HMO</label><br/>";
var companyNameItem = "<label class='form-check-label company-name-item-label'><input class='form-check-input company-name-item-input' type='checkbox' value=''>Tufts Health Public</label><br/>";
var planTypeItem = "<div class='col-lg-6'><div class='form-check'><label class='form-check-label plan-type-label'><input class='form-check-input plan-type-input' type='checkbox' value=''>Gold</label></div></div>";

var networkSet = new Set();
var insuranceCompanySet = new Set();
var planTypeSet = new Set();

function jsonCallback(json){

  plans = json["plans"];

  paintPlanCards(plans);

  paintNetworkFilters();

  paintCompanyFilters();

  paintPlanFilters();

  enableFiltering();



}

function clearSelection(){
  $(".clear-selection").click(function(){

	  var compareCheckboxes = $(".compare-checkbox");
    $.each(compareCheckboxes, function( index, value ) {
      $(value).prop("checked", false);
    });

  });
}

function compareSelectionConditions(){
  $(".compare-checkbox").change(function(){
    var checkedCompareBoxes = $(".compare-checkbox:checked");
    if (checkedCompareBoxes.length >= 2 ) {

      $("#compareSelection").removeClass("disabled");
    } else {
      $("#compareSelection").addClass("disabled");
    }
  });
}

function paintPlanFilters(){
  // paint plan types
  for (let item of planTypeSet) {
    $(".plan-type-set").append(planTypeItem);
    var itemLabel = $(".plan-type-set .plan-type-label").last();
    var itemCheckbox = $(".plan-type-set .plan-type-input").last();
    $(itemCheckbox).val(item);

    $(itemLabel).contents().filter(function(){
      return this.nodeType == 3;
    }).replaceWith(item);

    console.log("a plan type iteration just got done");
  }
}

function paintCompanyFilters(){
  // paint insurance companies
  for (let item of insuranceCompanySet) {
    $(".company-name-set").append(companyNameItem);
    var itemLabel = $(".company-name-set .company-name-item-label").last();
    var itemCheckbox = $(".company-name-set .company-name-item-input").last();
    $(itemCheckbox).val(item);

    $(itemLabel).contents().filter(function(){
      return this.nodeType == 3;
    }).replaceWith(item);

    console.log("an insurance company iteration just got done");
  }
}

function paintNetworkFilters(){
  // paint network items
  for (let item of networkSet) {
    $(".network-set").append(networkItem);
    var networkItemLabel = $(".network-set .network-item-label").last();
    var networkItemCheckbox = $(".network-set .network-item-checkbox").last();
    $(networkItemCheckbox).val(item);

    $(networkItemLabel).contents().filter(function(){
      return this.nodeType == 3;
    }).replaceWith(item);

    console.log("a network iteration just got done");
  }
}

function enableFiltering(){
  $(":checkbox").change(function() {
    var filteredPlans = new Set();
    var checkedItems = new Array();
    var checkedNetworkBoxes = $(".network-item-checkbox:checked");
    $.each(checkedNetworkBoxes, function(index, box){
      checkedItems.push($(box).val());
    });
    filteredPlans = filterPlansForNetwork(checkedItems, filteredPlans);

    checkedItems = new Array();
    checkedCompanyBoxes = $(".company-name-item-input:checked");
    $.each(checkedCompanyBoxes, function(index, box){
      checkedItems.push($(box).val());
    });
    filteredPlans = filterPlansForCompany(checkedItems, filteredPlans);

    checkedItems = new Array();
    checkedPlanTypeBoxes = $(".plan-type-input:checked");
    $.each(checkedPlanTypeBoxes, function(index, box){
      checkedItems.push($(box).val());
    });
    filteredPlans = filterPlansForPlanType(checkedItems, filteredPlans);

    if (filteredPlans.size == 0) {
      filteredPlans = plans;
    }
    paintPlanCards(filteredPlans);
  });
}

function filterPlansForNetwork(checkedItems, filteredPlans){

  $.each(plans, function( index, plan ) {
      if (checkedItems.includes(plan["network"])) {
          filteredPlans.add(plan);
      }
  });

  return filteredPlans;

}

function filterPlansForCompany(checkedItems, filteredPlans){

  $.each(plans, function( index, plan ) {
      if (checkedItems.includes(plan["companyName"])) {
          filteredPlans.add(plan);
      }
  });

  return filteredPlans;

}

function filterPlansForPlanType(checkedItems, filteredPlans){

  $.each(plans, function( index, plan ) {
      if (checkedItems.includes(plan["planType"])) {
          filteredPlans.add(plan);
      }
  });

  return filteredPlans;

}

function paintPlanCards(plans){

  $(".plan-container").empty();

  plans = Array.from(plans);

  $.each(plans, function( index, value ) {

    // fetch required values
    var planName = value["planName"];
    var planType = value["planType"];
    var monthlyPayment = value["summary"]["monthlyPayment"];
    var deductible = value["summary"]["deductible"];

    // append plan card
    $(".plan-container").append(planCard);
    var parentDiv = $(".plan-container .plan-parent").last();

    // find destinations
    var planNameTag = $(parentDiv).find("span.plan-name");
    var planTypeTag = $(parentDiv).find("span.plan-type");
    var monthlyPaymentTag = $(parentDiv).find(".monthly-premium");
    var deductibleTag = $(parentDiv).find(".deductible");

    // plant values at destinations
    $(planNameTag).html(planName);
    $(planTypeTag).html(planType);
    $(monthlyPaymentTag).html("$" + monthlyPayment);
    $(deductibleTag).html("$" + deductible);

    // update Filter Sets
    networkSet.add(value["network"]);
    insuranceCompanySet.add(value["companyName"]);
    planTypeSet.add(value["planType"]);

    console.log("a plan iteration just got done");


  });
  compareSelectionConditions();

  clearSelection();

  enableTooltip();
}

function enableTooltip(){
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}

function gotoComparePage() {
  window.location = 'COMPARE_PLANS.html';
}
