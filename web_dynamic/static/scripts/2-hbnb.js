const amenityList = [];
$(document).ready(function() {
  $('input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {
          amenityList.push($(this).data('name'));
        } else {
          amenityList.splice(amenityList.indexOf($(this).data('name')), 1);
        }
        if (amenityList.length > 0) {
          $('.amenities h4').css("width", "250px");
          $('.amenities h4').css("height", "25px");
          $('.amenities h4').css("overflow", "hidden");
          $('.amenities h4').css("white-space", "nowrap");
          $('.amenities h4').css("text-overflow", "ellipsis");
          $('.amenities h4').text(amenityList.sort().join(', '));
        } else {
          $('.amenities h4').text(String.fromCharCode(160));
        }
    });
});


$.get('http://0.0.0.0:5001/api/v1/status', (data) => {
  if (data.status == 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});
