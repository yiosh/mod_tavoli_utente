$(document).ready(() => {
  // Searchbar
  $('.search-txt').keyup(function() {
    let search_str = $('.searchbox')
      .find("input[type='search']")
      .val()
      .toLowerCase();
    let guests = $('#guest-list div.guest');
    let p;

    for (let i = 0; i < guests.length; i++) {
      p = guests[i].getElementsByTagName('p')[0];
      if (p.innerHTML.toLowerCase().indexOf(search_str) > -1) {
        guests[i].style.display = '';
      } else {
        guests[i].style.display = 'none';
      }
    }
  });

  // Function to update guests when they are dragged to guest-list
  function guestUpdate(e, ui) {
    const tavolo_id = 0;
    const id = ui.item[0].id;
    $(`#guest-list #${id}`).attr('tavolo-id', 0);

    const formData = {
      user_id: id,
      tavolo_id: tavolo_id
    };

    $.ajax({
      type: 'POST',
      url: 'api/tables_update.php',
      data: formData,
      success: function(response) {
        $(`#delete${id}`).show();
        console.log(`Aggiornamento riuscito: ${response}`);
      },
      error: function(errorMessage) {
        console.log(errorMessage);
        toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
      }
    });
  }

  // Function to update guests when they are dragged to table-body
  function tableUpdate(e, ui, tbody) {
    const tavolo_id = ui.item[0].parentElement.dataset.rel;
    // const nome_tavolo = 'test';
    const id = ui.item[0].id;
    $(`#${tbody} #${id}`).attr('tavolo-id', tavolo_id);

    const formData = {
      user_id: id,
      tavolo_id: tavolo_id
    };

    $.ajax({
      type: 'POST',
      url: 'api/tables_update.php',
      data: formData,
      success: function(response) {
        // console.log(response);
        $(`.table-body #${id} button.delete-btn`).hide();

        console.log(`Aggiornamento riuscito: ${response}`);
      },
      error: function(errorMessage) {
        console.log(errorMessage);
        toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
      }
    });
  }

  // Makes guests inside the guest-list sortable
  $('#guest-list').sortable({
    connectWith: '.connectedSortable',
    placeholder: 'ui-sortable-placeholder',
    cursor: 'move',
    receive(e, ui) {
      guestUpdate(e, ui);
    }
  });

  // Makes guests inside tables sortable
  $('.table-body').sortable({
    connectWith: '.connectedSortable',
    placeholder: 'ui-sortable-placeholder',
    cursor: 'move',
    receive(e, ui) {
      const tbody = this.attributes[0].value;
      tableUpdate(e, ui, tbody);
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

  // Filter tables according to radio value
  $('.sposi-radio').change(() => {
    if ($('#tutti').is(':checked')) {
      console.log('Tutti selezionato');
      $('.table').show();
    } else if ($('#sposo').is(':checked')) {
      console.log('Sposo selezionato');
      $('.table').hide();
      $('.table[tavolo-nome*="SPOSO"]').show();
    } else if ($('#sposa').is(':checked')) {
      console.log('Sposa selezionato');
      $('.table').hide();
      $('.table[tavolo-nome*="SPOSA"]').show();
    }
  });

  // Add a new guest
  $('#submit-guest').click(function(e) {
    e.preventDefault();
    const $form_action = $('#add-guest-modal')
      .find('form')
      .attr('action');
    const $nome = $('#add-guest-modal').find("input[name='nome']");
    const $cognome = $('#add-guest-modal').find("input[name='cognome']");
    const $adulti = $('#add-guest-modal').find("input[name='adulti']");
    const $bambini = $('#add-guest-modal').find("input[name='bambini']");
    const $seggioloni = $('#add-guest-modal').find("input[name='seggioloni']");
    const $note_intolleranze = $('#add-guest-modal').find("input[name='note_intolleranze']");

    const guestData = {
      nome: $nome.val(),
      cognome: $cognome.val(),
      adulti: $adulti.val(),
      bambini: $bambini.val(),
      seggioloni: $seggioloni.val(),
      note_intolleranze: $note_intolleranze.val()
    };

    if ($nome.val() != '' || $cognome.val() != '' || $note_intolleranze.val() != '') {
      $.ajax({
        type: 'POST',
        url: $form_action,
        data: guestData,
        success: function(newGuest) {
          const response = JSON.parse(newGuest);

          console.log(`Opesti creata: ${newGuest}`);
          $nome.val('');
          $cognome.val('');
          $note_intolleranze.val('');

          $('#guest-list').append(`
              <div class="guest" id="${response.id}"  tavolo-id="${response.tavolo_id}">
                <p class="family-name">${response.nome} ${response.cognome}</p>
                <p class="number-adults">${response.adulti}</p>
                <p class="number-babies">${response.bambini}</p>
                <p class="number-highchair">${response.seggioloni}</p>
                <p class="number-intolerant">${response.note_intolleranze}</p>
                <button id="delete${response.id}" type="button" class="delete-btn">
                  <i class="fas fa-minus-circle"></i>
                </button>
              </div>
            `);

          $('#add-guest-modal').hide();

          toastr.success(`${$nome.val()} ${$cognome.val()} creata con successo`, 'Successo', { timeOut: 5000 });
        },
        error: function(errorMessage) {
          console.log(errorMessage);
          toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
        }
      });
    }
  });

  // Add a new table
  $('#submit-table').click(function(e) {
    e.preventDefault();
    const $form_action = $('#add-table-modal')
      .find('form')
      .attr('action');

    const $numero_tavolo = $('#add-table-modal').find("input[name='numero_tavolo']");
    const $nome_tavolo = $('#add-table-modal').find("select[name='nome_tavolo']");

    const tableData = {
      nome_tavolo: $nome_tavolo.val(),
      numero_tavolo: $numero_tavolo.val()
    };

    if ($nome_tavolo.val() != '' && $numero_tavolo.val() != '') {
      $.ajax({
        type: 'POST',
        url: $form_action,
        data: tableData,
        success: function(newTable) {
          const response = JSON.parse(newTable);
          console.log(`Tavolo creato: ${newTable}`);
          $numero_tavolo.val('');

          $('#table-container').append(`
            <div id="${response.id}" class="table" tavolo-nome="${response.nome_tavolo} ${response.numero_tavolo}">
              <div class="table-header">
                <p class="table-id" hidden>${response.id}</p>
                <p class="table-name">${response.nome_tavolo} ${response.numero_tavolo}</p>
                <button id="delete${response.id}" type="button" title="Elimina tavolo" class="delete-btn">
                  <i class="fas fa-minus-circle"></i>
                </button>
              </div>
              <div class="table-body connectedSortable" data-rel="${response.id}">

              </div>
            </div>`);

          $('.table-body').sortable({
            connectWith: '.connectedSortable',
            placeholder: 'ui-sortable-placeholder',
            cursor: 'move',
            receive(ev, ui) {
              const tbody = this.attributes[0].value;
              tableUpdate(e, ui, tbody);
            }
          });

          $('#add-table-modal').hide();

          toastr.success(`${response.nome_tavolo} ${response.numero_tavolo} creata con successo.`, 'Successo', {
            timeOut: 5000
          });
        },
        error: function(errorMessage) {
          console.log(errorMessage);
          toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
        }
      });
    }
  });

  // Delete guest from guest-list
  $('#guest-list').click(function(e) {
    const nome_cognome = e.target.parentElement.childNodes[1].innerHTML;
    e.preventDefault();
    if (e.target.className === 'delete-btn') {
      $('.modal-confirm').html(`
        <h3>Sei sicuro di voler eliminare ${nome_cognome}?</h3>
        <div class="confirm-btn-set">
          <div class="confirm">
            <button id="si" class="btn"><i class="fas fa-check-circle"></i> Sì</button>
            <button id="no" class="btn"><i class="fas fa-times-circle"></i> No</button>
          </div>
        </div>
      `);

      // Show confirm modal
      $('#content-confirm').show();

      // If "Si" is clicked delete record
      $('#si').click(function() {
        const id = e.target.parentElement.id;

        $.ajax({
          type: 'POST',
          url: 'api/guests_delete.php',
          data: { id: id },
          success: function(response) {
            $(`#guest-list > #${id}`).remove();

            console.log(`Ospite ${nome_cognome} ${response}`);

            $('.modal-confirm').html('');
            $('#content-confirm').hide();

            toastr.success(`Ospite ${nome_cognome} cancellato.`, 'Successo', { timeOut: 5000 });
          },
          error: function(errorMessage) {
            console.log(errorMessage);
            toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
          }
        });
      });

      // Else hide confirm modal
      $('#no').click(function() {
        $('.modal-confirm').html('');
        $('#content-confirm').hide();
      });
    }
  });

  // Delete table from table-container
  $('#table-container').click(function(e) {
    e.preventDefault();

    if (e.target.className === 'delete-btn') {
      const nome_tavolo = e.target.parentElement.parentElement.attributes[2].value;
      $('.modal-confirm').html(`
        <h3>Sei sicuro di voler eliminare il tavolo ${nome_tavolo}?</h3>
        <div class="confirm-btn-set">
          <div class="confirm">
            <button id="si" class="btn"><i class="fas fa-check-circle"></i> Sì</button>
            <button id="no" class="btn"><i class="fas fa-times-circle"></i> No</button>
          </div>
        </div>
      `);

      // Show confirm modal
      $('#content-confirm').show();

      // If "Si" is clicked delete record
      $('#si').click(function() {
        const id = e.target.parentElement.parentElement.attributes[0].value;

        $.ajax({
          type: 'POST',
          url: 'api/tables_delete.php',
          data: { id: id },
          success: function(response) {
            $(`#table-container > #${id}`).remove();
            console.log(`Tavolo ${nome_tavolo} ${response}`);

            $('.modal-confirm').html('');
            $('#content-confirm').hide();

            $.ajax({
              type: 'GET',
              url: 'api/guests_fetch.php',
              success: function(res) {
                let guests = JSON.parse(res);
                $('#guest-list').html('');

                $.each(guests, function(i, guest) {
                  $('#guest-list').append(`
                    <div class="guest" id="${guest.id}" tavolo-id="0">
                      <p class="family-name">${guest.nome} ${guest.cognome}</p>
                      <p class="number-adults">${guest.adulti}</p>
                      <p class="number-babies">${guest.bambini}</p>
                      <p class="number-highchair">${guest.seggioloni}</p>
                      <p class="number-intolerant">${guest.note_intolleranze}</p>
                      <button id="delete${guest.id}" type="button" class="delete-btn">
                        <i class="fas fa-minus-circle"></i>
                      </button>
                    </div>
                  `);
                });
              },
              error: function(errorMessage) {
                console.log(errorMessage);
                toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
              }
            });

            toastr.success(`Tavolo ${nome_tavolo} cancellato.`, 'Successo', { timeOut: 5000 });
          },
          error: function(errorMessage) {
            console.log(errorMessage);
            toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
          }
        });
      });

      // Else hide confirm modal
      $('#no').click(function() {
        $('.modal-confirm').html('');
        $('#content-confirm').hide();
      });
    }
  });

  $('#numero_tavolo').keyup(function() {
    let numero = $('#numero_tavolo').val();
    if (numero != '') {
      $.ajax({
        type: 'GET',
        url: 'api/table_check.php',
        data: { numero: numero },
        success: function(response) {
          // console.log(`${response}`);
          if (response != 'null') {
            const result = JSON.parse(response);
            console.log(`Il tavolo numero ${result.numero_tavolo} esiste già`);
            toastr.warning(`Il tavolo numero ${result.numero_tavolo} esiste già`, 'Avviso', { timeOut: 5000 });
          }

          // $('.modal-confirm').html('');
          // $('#content-confirm').hide();

          // toastr.error(`${response}`, 'Avviso', { timeOut: 5000 });
        },
        error: function(errorMessage) {
          console.log(errorMessage);
          toastr.error(errorMessage, 'Avviso di errore', { timeOut: 5000 });
        }
      });
    }
  });
});
