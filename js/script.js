$(document).ready(() => {
  const url = './';

  function getGuestsData() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url + 'api/get_data.php'
    }).done(function(data) {
      manageGuests(data.utenti);
    });
  }

  function manageGuests(data) {
    let rows = '';
    console.log(data);

    $.each(data, function(key, value) {
      rows += `<div class="guest" id="${value.id}" tavolo-id="${value.tavolo_id}">`;
      rows += `<p class="family-name">${value.nome} ${value.cognome}</p>`;
      rows += `<p class="number-adults">${value.adulti}</p>`;
      rows += `<p class="number-babies">${value.bambini}</p>`;
      rows += `<p class="number-highchair">${value.seggioloni}</p>`;
      rows += `<p class="number-intolerant">${value.note_intolleranze}</p>`;
      rows += `</div>`;
    });

    $('#guest-list').html(rows);
  }

  // function getTablesData() {
  //   $.ajax({
  //     type: 'GET',
  //     dataType: 'json',
  //     url: url + 'api/get_data.php'
  //   }).done(function(data) {
  //     manageTables(data.utenti, data.tavoli);
  //   });
  // }

  // function manageTables(data) {
  //   let rows = '';
  //   console.log(data);

  //   // $.each(data, function(key, value) {
  //   //   rows += `<div class="table" data-rel="<?php echo $table['nome_tavolo'].$table['id']; ?>">`;
  //   //   rows += `<div class="table-header">`;
  //   //   rows += `<p class="table-id" hidden><?php echo $table['id']; ?></p>`;
  //   //   rows += `<p class="table-name"><strong><?php echo $table['nome_tavolo']; ?></strong></p>`;
  //   //   rows += `</div>`;
  //   //   rows += `<div class="table-body connectedSortable" data-rel="<?php echo $table['id'] ?>">`;
  //   //   //     <?php
  //   //   //       foreach($result_commensali as $guest) : ?>
  //   //   //         <?php if ($guest['tavolo_id'] > 0) : ?>
  //   //   //           <?php if ($guest['tavolo_id'] == $table['id']) : ?>
  //   //   //             <div id="<?php echo $guest['id'] ?>" tavolo-id="<?php echo $guest['tavolo_id'] ?>" class="guest" >
  //   //   //               <p class="family-name"><?php echo $guest['nome']." ".$guest['cognome'] ?></p>
  //   //   //               <p class="number-adults"><?php echo $guest['adulti'] ?></p>
  //   //   //               <p class="number-babies"><?php echo $guest['bambini'] ?></p>
  //   //   //               <p class="number-highchair"><?php echo $guest['seggioloni'] ?></p>
  //   //   //               <p class="number-intolerant"><?php echo $guest['note_intolleranze'] ?></p>
  //   //   //             </div>
  //   //   //           <?php endif; ?>
  //   //   //         <?php endif; ?>
  //   //   //     <?php endforeach; ?>
  //   //   //   </div>
  //   //   // </div>
  //   //   rows += `<div class="guest" id="${value.id}" tavolo-id="${value.tavolo_id}">`;
  //   //   rows += `<p class="family-name">${value.nome} ${value.cognome}</p>`;
  //   //   rows += `<p class="number-adults">${value.adulti}</p>`;
  //   //   rows += `<p class="number-babies">${value.bambini}</p>`;
  //   //   rows += `<p class="number-highchair">${value.seggioloni}</p>`;
  //   //   rows += `<p class="number-intolerant">${value.note_intolleranze}</p>`;
  //   //   rows += `</div>`;
  //   // });

  // $('#table-list').html(rows);
  // }

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
      fetch('./includes/tables_update.php', {
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
          fetch('./includes/tables_update.php', {
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

    if (nome != '' || cognome != '' || adulti != '' || bambini != '' || seggioloni != '' || note_intolleranze != '') {
      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: url + form_action,
        data: {
          nome: nome,
          cognome: cognome,
          adulti: adulti,
          bambini: bambini,
          seggioloni: seggioloni,
          note_intolleranze: note_intolleranze
        }
      }).done(function(data) {
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
        getGuestsData();

        $('#add-guest-modal').hide();

        toastr.success('Guest Created Successfully.', 'Success Alert', { timeOut: 5000 });
      });
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

        // $('#table-container').html('');
        $('#table-container').load('./includes/tables_refresh.php');

        // getTablesData();

        $('#add-table-modal').hide();

        toastr.success('Table Created Successfully.', 'Success Alert', { timeOut: 5000 });
      });
    }
  });
});
