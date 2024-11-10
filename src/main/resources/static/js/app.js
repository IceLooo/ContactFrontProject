document.addEventListener('DOMContentLoaded', getContacts);

function getContacts() {
    fetch('/api/contacts')
        .then(response => response.json())
        .then(contacts => {
            const tbody = document.querySelector('#contactTable tbody');
            tbody.innerHTML = '';
            contacts.forEach(contact => {
                const tr = document.createElement('tr');

                const tdName = document.createElement('td');
                tdName.textContent = contact.name;
                tr.appendChild(tdName);

                const tdEmail = document.createElement('td');
                tdEmail.textContent = contact.email;
                tr.appendChild(tdEmail);

                const tdPhone = document.createElement('td');
                tdPhone.textContent = contact.phone;
                tr.appendChild(tdPhone);

                const tdActions = document.createElement('td');

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Редактировать';
                editBtn.onclick = () => editContact(contact);
                tdActions.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Удалить';
                deleteBtn.onclick = () => deleteContact(contact.id);
                tdActions.appendChild(deleteBtn);

                tr.appendChild(tdActions);

                tbody.appendChild(tr);
            });
        });
}

function addContact() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;

    if (name.trim() === '' || email.trim() === '' || phone.trim() === '') return;

    fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, phone: phone })
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('contactName').value = '';
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactPhone').value = '';
            getContacts();
        });
}

function editContact(contact) {
    const name = prompt('Введите новое имя:', contact.name);
    const email = prompt('Введите новый Email:', contact.email);
    const phone = prompt('Введите новый телефон:', contact.phone);

    if (name !== null && email !== null && phone !== null) {
        fetch(`/api/contacts/${contact.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, phone: phone })
        }).then(() => getContacts());
    }
}

function deleteContact(id) {
    fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
    }).then(() => getContacts());
}
