$(document).ready(function() {
  const amenityDict = {};
  $('input[type=checkbox]').change(function() {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    const amenityList = [];
    for (const item in amenityDict) {
      amenityList.push(amenityDict[item]);
    }
    if (amenityList.length > 0) {
      $('.amenities h4').css("width", "250px");
      $('.amenities h4').css("height", "16.5px");
      $('.amenities h4').css("overflow", "hidden");
      $('.amenities h4').css("white-space", "nowrap");
      $('.amenities h4').css("text-overflow", "ellipsis");
      $('.amenities h4').text(amenityList.sort().join(', '));
    } else {
      $('.amenities h4').text(String.fromCharCode(160));
    }
  });
  $.get('http://127.0.0.1:5001/api/v1/status', (data) => {
    if (data.status == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    method: 'POST',
    data: "{}",
    contentType: "application/json",
    success: function (places) { 
      for (const place of places) { 
        $.get('http://127.0.0.1:5002/api/v1/users/' + place.user_id, function (userData) {
          $('.places').append(`<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${(place.max_guest === 1) ? '' : 's'}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms === 1) ? '' : 's'}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms === 1) ? '' : 's'}</div>
              </div>
              <div class="user">
                <b>Owner:</b> ${userData.first_name} ${userData.last_name}
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`);
        });
      }
    }
  });
  $('button').click(function () {
    $('.places > article').remove();
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: Object.keys(amenityDict) }),
      contentType: 'application/json',
      success: function (places) {
        for (const place of places) {
          $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, function (userData) {
            $('.places').append(`<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${(place.max_guest === 1) ? '' : 's'}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms === 1) ? '' : 's'}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms === 1) ? '' : 's'}</div>
                </div>
                <div class="user">
                  <b>Owner:</b> ${userData.first_name} ${userData.last_name}
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>`);
          });
        }
      }
    });
  });
});
