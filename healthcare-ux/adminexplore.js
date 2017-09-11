$(document).ready(function(){
  $("#edit").click(function() {
      $(this).toggle();
      $( "#save" ).toggle();
      $('#monthly-premium').attr('contentEditable',true);
      $('#monthly-premium').css({
      "background-color": "yellow"

    });
    });

  $( "#save" ).click(function() {
    $(this).toggle();
    $( "#edit" ).toggle();

    $('#monthly-premium').attr('contentEditable',false);
    $('#monthly-premium').css({
    "background-color": "white"
  });
  });
});

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

function gotoComparePage() {
  window.location = 'COMPARE_PLANS_ADMIN.html';
}
