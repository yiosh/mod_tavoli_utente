$(document).ready(() => {
  const fragment = document.createDocumentFragment();
  // Connect quest-list with the other sortables
  if ($('#to-assign').is(':checked')) {
    $('#guest-list').sortable({
      connectWith: '.connectedSortable',
      cursor: 'move',
    });
  }
  // Makes the inside body of the tables sortable
  $('.table-body').sortable({
    connectWith: '.connectedSortable',
    cursor: 'move',
    receive(e, ui) {
      const formData = new FormData();
      formData.append('user_id', ui.item[0].id);
      formData.append('tavolo_id', this.dataset.rel);

      // When it gets sorted it updates fl_tavoli
      fetch('./includes/tables_update.php', {
        method: 'POST',
        body: formData,
      }).catch(err => {
        console.error(err.message);
      });
    },
  });

  // Show Add Guest Modal
  $('#add-guest').click(() => {
    document.getElementById('add-guest-modal').style.display = 'block';
  });
  // Show Add Table Modal
  $('#add-table').click(() => {
    document.getElementById('add-table-modal').style.display = 'block';
  });

  // When close button of the guest modal is clicked it hides the modal
  $('#close1').click(() => {
    document.getElementById('add-guest-modal').style.display = 'none';
  });

  // When close button of the table modal is clicked it hides the modal
  $('#close2').click(() => {
    document.getElementById('add-table-modal').style.display = 'none';
  });

  // Add an event handler to the assignment buttons
  $('.assign-btns').change(() => {
    // Checked if the "To Assign" button is checked
    if ($('#to-assign').is(':checked')) {
      $('#guest-list').html('');
      $('#guest-list').sortable({
        connectWith: '.connectedSortable',
        cursor: 'move',
        // helper: 'clone',
        receive(e, ui) {
          const formData = new FormData();
          formData.append('user_id', ui.item[0].id);
          formData.append('tavolo_id', this.dataset.rel);

          // When it gets sorted it updates fl_tavoli
          fetch('./includes/tables_update.php', {
            method: 'POST',
            body: formData,
          }).catch(err => {
            console.error(err.message);
          });
        },
      });

      // Fetch users not assigned and show them in guest-list div
      fetch('./includes/guests_not_assigned.php')
        .then(response => response.json()) // Translate JSON into JavaScript
        .then(content => {
          content.forEach(data => {
            $('#guest-list').append(`
          <div class="guest" id="${data.id}">
            <p class="family-name">${data.nome} ${data.cognome}</p>
            <p class="number-adults">${data.adulti}</p>
            <p class="number-babies">${data.bambini}</p>
            <p class="number-highchair">${data.seggioloni}</p>
            <p class="number-intolerant">${data.note_intolleranze}</p>
          </div>`);
          });
        })
        .catch(err => {
          console.error(err.message);
        });
    } else if ($('#assigned').is(':checked')) {
      $('#guest-list').html('');

      // Destroy sortable to prevent users from draggin assigned users into tables
      $('#guest-list').sortable('destroy');

      // Fetch users assigned and show them in guest-list div
      fetch('./includes/guests_assigned.php')
        .then(response => response.json()) // Translate JSON into JavaScript
        .then(content => {
          content.forEach(data => {
            $('#guest-list').append(`
            <div class="guest" id="${data.id}">
              <p class="family-name">${data.nome} ${data.cognome}</p>
              <p class="number-adults">${data.adulti}</p>
              <p class="number-babies">${data.bambini}</p>
              <p class="number-highchair">${data.seggioloni}</p>
              <p class="number-intolerant">${data.note_intolleranze}</p>
            </div>`);
          });
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  });

  $('.sposi-radio').change(() => {
    if ($('#tutti').is(':checked')) {
      $('.table').show();
    } else if ($('#sposo').is(':checked')) {
      $('.table').hide();
      $('.table[data-rel*="SPOSO"]').show();
    } else if ($('#sposa').is(':checked')) {
      $('.table').hide();
      $('.table[data-rel*="SPOSA"]').show();
    }
  });
});
