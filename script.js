$(document).ready(function() {
    // Get current date and time
    var now = moment().format('dddd MMMM Do, YYYY');
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
    
    // Set current date
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
    var $workScheduleDiv = $('#plannerContainer');
   
    // Clear existing schedule
    $workScheduleDiv.empty();
  
    // Build calendar - begin 7am for 12 hours
    var hr = 7
    for (hr = 7; hr <= 18; hr++) {
      let index = hr - 7;
      
      // Build row for each hour
      let $scheduleHrDiv = $('<div>');
      $scheduleHrDiv.addClass('row');
      $scheduleHrDiv.addClass('plannerRow');
      $scheduleHrDiv.attr('hour-index',hr);
    
      // Build time column 
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2 hour');
      const $timeBoxSpn = $('<span>');
      $timeBoxSpn.attr('class','time-block');
      // Adjust for PM hours
      let presentHr = 0;
      let ampm = "";
      if (hr > 12) { 
        presentHr = hr - 12;
        ampm = "pm";
      } else {
        presentHr = hr;
        ampm = "am";
      }
      
      // Populate time
      $timeBoxSpn.text(`${presentHr} ${ampm}`);
      $scheduleHrDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);

      // Build input column
      let $dailyWorkSpn = $('<input>');
      $dailyWorkSpn.attr('id',`input-${index}`);
      $dailyWorkSpn.attr('hour-index',index);
      $dailyWorkSpn.attr('type','text');
      $dailyWorkSpn.attr('class','dailyText');
      $dailyWorkSpn.val( planTextArr[index] );

      let $textEntryDiv = $('<div>');
      $textEntryDiv.addClass('col-md-9');
      $scheduleHrDiv.append($textEntryDiv);
      $textEntryDiv.append($dailyWorkSpn);
      
      // Build save column
      let $textSaveDiv = $('<div>');
      $textSaveDiv.addClass('col-md-1 savebtn');
      
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"fas fa-save fa-2x saveIcon");
      $scheduleHrDiv.append($textSaveDiv);
      $textSaveDiv.append($saveBtn);
  
      // Determine relative timing and set row color
      deterHourColor($scheduleHrDiv, hr);
      $workScheduleDiv.append($scheduleHrDiv);
    };
  
    // function to update row color
    function deterHourColor ($hourRow,hour) { 
      if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
      } else {
        $hourRow.css("background-color","tomato")
      }
    };
  
    // Listen for user clicks on plan area
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      let $index = $(this).attr('save-id');
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
      planTextArr[$index] = $value;
      $(`#saveid-${$index}`).removeClass('emphIcon');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      let i = $(this).attr('hour-index');
      $(`#saveid-${i}`).addClass('emphIcon');
    });
  });
  