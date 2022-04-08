const amenityList = []
$(document).ready(function() {
  $('input[type=checkbox]').change(
    function() {
        if (this.checked) {
          amenityList.push(this.data('name'));
        } else if (this.unchecked) {
          amenityList.remove(this.data('name'));
        }

        if (amenityList.length > 0) {
          $('.amenities h4').text(amenityList.sort().join(', '));
        }
    });
});
