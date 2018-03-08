$(document).ready(() => {
  const url = './';

  $('#guest-list').sortable({
    connectWith: '.connectedSortable',
    cursor: 'move',
    receive(e, ui) {
      const nome_tavolo = ui.item[0].parentElement.parentElement.children[0].children[1].innerText;
      const e_id = ui.item[0].id;
      const formData = new FormData();

      formData.append('user_id', ui.item[0].id);
      formData.append('tavolo_id', this.dataset.rel);
      formData.append('nome_tavolo', ui.item[0].parentElement.parentElement.children[0].children[1].innerText);
      formData.append('nome_cognome', ui.item[0].children[0].innerText);

      // When it gets sorted it updates fl_tavoli
      fetch('./api/tables_update.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(result => {
          console.log(ui);
          // if (nome_tavolo == 'Aggiungi Ospite') {
          //   $('#guest-list div.guest');
          // }
          // $('#guest-list').load('./includes/guests_refresh.php');
          // $('#table-container').load('./includes/tables_refresh.php');

          console.log(result);
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  });

  // Makes the inside body of the tables sortable
  $('.table-body').sortable({
    connectWith: '.connectedSortable',
    cursor: 'move',
    receive(e, ui) {
      const formData = new FormData();
      formData.append('user_id', ui.item[0].id);
      formData.append('tavolo_id', this.dataset.rel);
      formData.append('nome_tavolo', ui.item[0].parentElement.parentElement.children[0].children[1].innerText);
      formData.append('nome_cognome', ui.item[0].children[0].innerText);

      // When it gets sorted it updates fl_tavoli
      fetch('./api/tables_update.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(result => {
          console.log(ui.item[0].id);
          // $('#guest-list').load('./includes/guests_refresh.php');
          // $('#table-container').load('./includes/tables_refresh.php');
          console.log(result);
        })
        .catch(err => {
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
        .then(response => response.text())
        .then(result => {
          formData.delete('nome');
          formData.delete('cognome');
          formData.delete('adulti');
          formData.delete('bambini');
          formData.delete('seggioloni');
          formData.delete('note_intolleranze');
          $('#add-guest-modal')
            .find("input[name='nome']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='cognome']")
            .val('');
          $('#add-guest-modal')
            .find("input[name='note_intolleranze']")
            .val('');

          $.get('./includes/guests_refresh.php', function(data) {
            $('#guest-list').html(data);
            console.log('Guest was added.');
          });

          // $('#guest-list').load('./includes/guests_refresh.php');
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
        .then(response => response.text())
        .then(result => {
          $('#add-table-modal')
            .find("select[name='nome_tavolo']")
            .val('');
          $('#add-table-modal')
            .find("select[name='numero_tavolo']")
            .val('');

          $('#table-container').load('./includes/tables_refresh.php');

          $('#add-table-modal').hide();

          toastr.success('Table Created Successfully.', 'Success Alert', { timeOut: 5000 });
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  });

  // Delete guest from guest-list
  $('#guest-list').click(function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-btn') {
      $('.modal-confirm').html(`
        <h3>Sei sicuro di voler eliminare ${e.target.parentElement.childNodes[1].innerHTML}?</h3>
        <div class="confirm-btn-set">
          <div class="confirm">
            <button id="si" class="btn"><i class="fas fa-check-circle"></i> Sì</button>
            <button id="no" class="btn"><i class="fas fa-times-circle"></i> No</button>
          </div>
        </div>
      `);

      $('#content-confirm').show();

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
            $.get('./includes/guests_refresh.php', function(data) {
              $('#guest-list').html(data);
              console.log(result);
            });
            $('.modal-confirm').html('');
            $('#content-confirm').hide();

            toastr.success(result, 'Alert', { timeOut: 5000 });
          })
          .catch(err => {
            console.error(err.message);
          });
      });

      $('#no').click(function() {
        $('.modal-confirm').html('');
        $('#content-confirm').hide();
      });
    }
  });

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
});
