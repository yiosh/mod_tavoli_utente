$(document).ready(() => {
  const url = './';

  // Connect quest-list with the other sortables
  if ($('#to-assign').is(':checked')) {
    $('#guest-list').sortable({
      connectWith: '.connectedSortable',
      cursor: 'move'
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
      fetch('./api/tables_update.php', {
        method: 'POST',
        body: formData
      }).catch(err => {
        console.error(err.message);
      });
    }
  });

  // Show Add Guest Modal
  $('#add-guest').click(() => {
    $('#add-guest-modal').show();
  });
  // Show Add Table Modal
  $('#add-table').click(() => {
    $('#add-table-modal').show();
  });

  // When close button of the guest modal is clicked it hides the modal
  $('#close1').click(() => {
    $('#add-guest-modal').hide();
  });

  // When close button of the table modal is clicked it hides the modal
  $('#close2').click(() => {
    $('#add-table-modal').hide();
  });

  // Add an event handler to the assignment buttons
  $('.assign-btns').change(() => {
    // Checked if the "To Assign" button is checked
    if ($('#to-assign').is(':checked')) {
      $('#guest-list .guest').hide();
      $('#guest-list .guest[tavolo-id="0"]').show();
      $('#guest-list').sortable({
        connectWith: '.connectedSortable',
        cursor: 'move',
        // helper: 'clone',
        receive(e, ui) {
          const formData = new FormData();
          formData.append('user_id', ui.item[0].id);
          formData.append('tavolo_id', this.dataset.rel);

          // When it gets sorted it updates fl_tavoli
          fetch('./api/tables_update.php', {
            method: 'POST',
            body: formData
          }).catch(err => {
            console.error(err.message);
          });
        }
      });
    } else if ($('#assigned').is(':checked')) {
      $('#guest-list .guest').hide();
      $('#guest-list .guest[tavolo-id!="0"]').show();

      // // Destroy sortable to prevent users from draggin assigned users into tables
      $('#guest-list').sortable('destroy');
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

  $('#submit-guest').click(function(e) {
    e.preventDefault();
    const form_action = $('#add-guest-modal')
      .find('form')
      .attr('action');
    const nome = $('#add-guest-modal')
      .find("input[name='nome']")
      .val();
    const cognome = $('#add-guest-modal')
      .find("input[name='cognome']")
      .val();
    const adulti = $('#add-guest-modal')
      .find("input[name='adulti']")
      .val();
    const bambini = $('#add-guest-modal')
      .find("input[name='bambini']")
      .val();
    const seggioloni = $('#add-guest-modal')
      .find("input[name='seggioloni']")
      .val();
    const note_intolleranze = $('#add-guest-modal')
      .find("input[name='note_intolleranze']")
      .val();

    if (nome != '' || cognome != '' || note_intolleranze != '') {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('cognome', cognome);
      formData.append('adulti', adulti);
      formData.append('bambini', bambini);
      formData.append('seggioloni', seggioloni);
      formData.append('cognome', cognome);
      formData.append('note_intolleranze', note_intolleranze);

      // When it gets sorted it updates fl_tavoli
      fetch(`${url}${form_action}`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(result => {
          $('#add-guest-modal')
            .find("input[name='nome']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='cognome']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='adulti']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='bambini']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='seggioloni']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='note_intolleranze']")
            .val('');
          $('#guest-list').load('./includes/guests_refresh.php');
          // getGuestsData();

          $('#add-guest-modal').hide();

          toastr.success('Guest Created Successfully.', 'Success Alert', { timeOut: 5000 });
        })
        .catch(err => {
          console.error(err.message);
        });
    } else {
      alert('You left a field blank');
    }
  });

  $('#submit-table').click(function(e) {
    e.preventDefault();
    const form_action = $('#add-table-modal')
      .find('form')
      .attr('action');
    const nome_tavolo = $('#add-table-modal')
      .find("select[name='nome_tavolo']")
      .val();

    if (nome_tavolo != '') {
      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: url + form_action,
        data: {
          nome_tavolo: nome_tavolo
        }
      }).done(function(data) {
        $('#add-table-modal')
          .find("select[name='nome_tavolo']")
          .val('');

        $('#table-container').load('./includes/tables_refresh.php');

        $('#add-table-modal').hide();

        toastr.success('Table Created Successfully.', 'Success Alert', { timeOut: 5000 });
      });
    }
  });
});
