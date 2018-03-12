$(document).ready(() => {
  const url = './';

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

  // Updates guest data when it is dragged to a different table
  function guestUpdate(e, ui) {
    let nome_tavolo = ui.item[0].parentElement.parentElement.children[0].children[1].innerText;
    let tavolo_id = ui.item[0].parentElement.dataset.rel;
    const id = ui.item[0].id;

    if (nome_tavolo == ' Aggiungi Ospite') {
      nome_tavolo = 'Elenco degli Ospiti';
    }

    if (tavolo_id == 'guest-list connectedSortable ui-sortable') {
      tavolo_id = 0;
    }

    const formData = new FormData();

    formData.append('user_id', ui.item[0].id);
    formData.append('tavolo_id', tavolo_id);
    formData.append('nome_tavolo', nome_tavolo);
    formData.append('nome_cognome', ui.item[0].children[0].innerText);

    if (tavolo_id == 0) {
      // When it gets sorted it updates fl_tavoli
      fetch('./api/tables_update.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          const resultElement = result;
          $(`#delete${id}`).show();
          console.log(
            `${resultElement.nome} ${resultElement.cognome}(id: ${
              resultElement.id
            }) aggiunto correttamente a ${nome_tavolo}(tavolo_id: ${resultElement.tavolo_id})`
          );
        })
        .catch(err => {
          console.error(err.message);
        });
    } else if (tavolo_id > 0) {
      // When it gets sorted it updates fl_tavoli
      fetch('./api/tables_update.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          const resultElement = result;

          $(`.table-body #${id} button.delete-btn`).hide();

          console.log(
            `${resultElement.nome} ${resultElement.cognome}(id: ${
              resultElement.id
            }) aggiunto correttamente a ${nome_tavolo}(tavolo_id: ${resultElement.tavolo_id})`
          );
        })
        .catch(err => {
          console.error(err.message);
        });
    }
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
      guestUpdate(e, ui);
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

  $('.sposi-radio').change(() => {
    if ($('#tutti').is(':checked')) {
      $('.table').show();
    } else if ($('#sposo').is(':checked')) {
      $('.table').hide();
      $('.table[tavolo-nome*="SPOSO"]').show();
    } else if ($('#sposa').is(':checked')) {
      $('.table').hide();
      $('.table[tavolo-nome*="SPOSA"]').show();
    }
  });

  // Add a new guest
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
      let formData = new FormData();
      formData.append('nome', nome);
      formData.append('cognome', cognome);
      formData.append('adulti', adulti);
      formData.append('bambini', bambini);
      formData.append('seggioloni', seggioloni);
      formData.append('note_intolleranze', note_intolleranze);

      // When it gets sorted it updates fl_tavoli
      fetch(`${url}${form_action}`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          const resultElement = result;
          console.log(result);
          $('#add-guest-modal')
            .find("input[name='nome']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='cognome']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='note_intolleranze']")
            .val('');

          $('#guest-list').append(`
            <div class="guest" id="${resultElement.id}"  tavolo-id="${resultElement.tavolo_id}">
              <p class="family-name">${resultElement.nome} ${resultElement.cognome}</p>
              <p class="number-adults">${resultElement.adulti}</p>
              <p class="number-babies">${resultElement.bambini}</p>
              <p class="number-highchair">${resultElement.seggioloni}</p>
              <p class="number-intolerant">${resultElement.note_intolleranze}</p>
              <button id="delete${resultElement.id}" type="button" class="delete-btn">
                <i class="fas fa-minus-circle"></i>
              </button>
            </div>
          `);

          $('#guest-list').sortable({
            connectWith: '.connectedSortable',
            placeholder: 'ui-sortable-placeholder',
            cursor: 'move',
            receive(ev, ui) {
              guestUpdate(e, ui);
            }
          });

          $('.table-body').sortable({
            connectWith: '.connectedSortable',
            placeholder: 'ui-sortable-placeholder',
            cursor: 'move',
            receive(ev, ui) {
              guestUpdate(e, ui);
            }
          });

          $('#add-guest-modal').hide();

          toastr.success(`${nome} ${cognome} creata con successo`, 'Successo', { timeOut: 5000 });
        })
        .catch(err => {
          console.error(err.message);
          toastr.error(err, 'Avviso di errore', { timeOut: 5000 });
        });
    } else {
      alert('You left a field blank');
    }
  });

  // Add a new table
  $('#submit-table').click(function(e) {
    e.preventDefault();
    const form_action = $('#add-table-modal')
      .find('form')
      .attr('action');

    const numero_tavolo = $('#add-table-modal')
      .find("input[name='numero_tavolo']")
      .val();
    const nome_tavolo = $('#add-table-modal')
      .find("select[name='nome_tavolo']")
      .val();

    const formData = new FormData();
    formData.append('numero_tavolo', numero_tavolo);
    formData.append('nome_tavolo', nome_tavolo);

    if (nome_tavolo != '') {
      fetch(`${url}${form_action}`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          const resultElement = result;
          $('#add-table-modal')
            .find("select[name='nome_tavolo']")
            .val('');
          $('#add-table-modal')
            .find("select[name='numero_tavolo']")
            .val('');
          console.log(result);

          $('#table-container').append(`
            <div id="${resultElement.id}" class="table" tavolo-nome="${resultElement.nome_tavolo} ${
            resultElement.numero_tavolo
          }">
              <div class="table-header">
                <p class="table-id" hidden>${resultElement.id}</p>
                <p class="table-name">${resultElement.nome_tavolo} ${resultElement.numero_tavolo}</p>
                <button id="delete${resultElement.id}" type="button" title="Elimina tavolo" class="delete-btn">
                  <i class="fas fa-minus-circle"></i>
                </button>
              </div>
              <div class="table-body connectedSortable" data-rel="${resultElement.id}">

              </div>
            </div>`);

          $('#guest-list').sortable({
            connectWith: '.connectedSortable',
            cursor: 'move',
            receive(ev, ui) {
              guestUpdate(e, ui);
            }
          });

          $('.table-body').sortable({
            connectWith: '.connectedSortable',
            cursor: 'move',
            receive(ev, ui) {
              guestUpdate(e, ui);
            }
          });

          $('#add-table-modal').hide();

          toastr.success(`${nome_tavolo} ${numero_tavolo} creata con successo.`, 'Successo', { timeOut: 5000 });
        })
        .catch(err => {
          console.error(err.message);
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
        const formData = new FormData();
        const id = e.target.parentElement.id;
        formData.append('id', id);
        fetch(`${url}api/guests_delete.php`, {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(result => {
            $(`#guest-list > #${id}`).remove();

            console.log(`${nome_cognome} ${result}`);

            $('.modal-confirm').html('');
            $('#content-confirm').hide();

            toastr.success(`${nome_cognome} cancellato.`, 'Successo', { timeOut: 5000 });
          })
          .catch(err => {
            console.error(err.message);
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
      console.log(e.target.parentElement.parentElement.attributes[0].value);
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
        const formData = new FormData();
        const id = e.target.parentElement.parentElement.attributes[0].value;
        formData.append('id', id);
        fetch(`${url}api/tables_delete.php`, {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(result => {
            $(`#table-container > #${id}`).remove();
            console.log(`Tavolo ${nome_tavolo} ${result}`);

            $('.modal-confirm').html('');
            $('#content-confirm').hide();

            toastr.success(`Tavolo ${nome_tavolo} cancellato.`, 'Successo', { timeOut: 5000 });
          })
          .catch(err => {
            console.error(err.message);
          });
      });

      // Else hide confirm modal
      $('#no').click(function() {
        $('.modal-confirm').html('');
        $('#content-confirm').hide();
      });
    }
  });
});
