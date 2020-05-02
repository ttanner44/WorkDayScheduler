$(document).ready(function() {
    // get current date and time
    var now = moment().format('dddd MMMM Do, YYYY');
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
    
    // set current date
    var $dateHeading = $('#currentDay');
    $dateHeading.text(now);
    
    // Get stored todos from localStorage
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
    
    // Update plans from local storage
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      planTextArr = new Array(11);
    }
  
    // Set var referencing planner element
    let $workScheduleDiv = $('#plannerContainer');
    // clear existing elements
    $workScheduleDiv.empty();
  
    // Build calendar - begin 7am for 12 hours
    var hour = 7
    for (hour = 7; hour <= 18; hour++) {
      // index for array use offset from hour
      let index = hour - 7;
      
      // build row for each hour
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      // Build time column 
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2 hour');
      const $timeBoxSpn = $('<span>');
      $timeBoxSpn.attr('class','time-block');

      // Adjust for PM hours
      let displayHour = 0;
      let ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      // populate time
      $timeBoxSpn.text(`${displayHour} ${ampm}`);

      // insert into time column
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);

      // START building input portion of row
      // build row components
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyText');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      // create col to control width
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
      // STOP building Time box portion of row
  
      // START building save portion of row
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1 savebtn');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"fas fa-save fa-2x saveIcon");
      
      // add col width and row component to row
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      // STOP building save portion of row
  
      // set row color based on time
      updateRowColor($rowDiv, hour);
      
      // add row to planner container
      $workScheduleDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 
      if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
      } else {
        $hourRow.css("background-color","tomato")
      }
    };
  
    // saves to local storage

    // conclick function to listen for user clicks on plan area
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      let $index = $(this).attr('save-id');
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
      planTextArr[$index] = $value;
  
       // remove shawdow pulse class
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
   
      // neeed to check for save button
       let i = $(this).attr('hour-index');
  
      // add shawdow pulse class
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });
  