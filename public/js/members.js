// members.js - JavaScript functionality for member management

// Function to handle editing a member
function onEdit() {
    // Hide the Edit button
    document.getElementById('editButton').style.display = 'none';
    
    // Show Cancel and Save buttons
    const buttonContainer = document.getElementById('buttonContainer');
    
    // Create Cancel button if it doesn't exist
    if (!document.getElementById('cancelButton')) {
        const cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.className = 'btn btn-secondary me-2';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = onCancel;
        buttonContainer.appendChild(cancelButton);
    } else {
        document.getElementById('cancelButton').style.display = 'inline-block';
    }
    
    // Create Save button if it doesn't exist
    if (!document.getElementById('saveButton')) {
        const saveButton = document.createElement('button');
        saveButton.id = 'saveButton';
        saveButton.className = 'btn btn-success';
        saveButton.textContent = 'Save';
        saveButton.onclick = onSave;
        buttonContainer.appendChild(saveButton);
    } else {
        document.getElementById('saveButton').style.display = 'inline-block';
    }
    
    // Change all fields to input elements
    const memberData = {
        name: document.getElementById('memberName').textContent,
        age: document.getElementById('memberAge').textContent,
        email: document.getElementById('memberEmail').textContent,
        phone: document.getElementById('memberPhone').textContent,
        avatar: document.getElementById('memberAvatar').src
    };
    
    // Replace name with input
    const nameContainer = document.getElementById('nameContainer');
    nameContainer.innerHTML = '';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    nameInput.className = 'form-control';
    nameInput.value = memberData.name;
    nameContainer.appendChild(nameInput);
    
    // Replace age with input
    const ageContainer = document.getElementById('ageContainer');
    ageContainer.innerHTML = '';
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = 'ageInput';
    ageInput.className = 'form-control';
    ageInput.value = memberData.age;
    ageContainer.appendChild(ageInput);
    
    // Replace email with input
    const emailContainer = document.getElementById('emailContainer');
    emailContainer.innerHTML = '';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'emailInput';
    emailInput.className = 'form-control';
    emailInput.value = memberData.email;
    emailContainer.appendChild(emailInput);
    
    // Replace phone with input
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = '';
    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.id = 'phoneInput';
    phoneInput.className = 'form-control';
    phoneInput.value = memberData.phone;
    phoneContainer.appendChild(phoneInput);
    
    // Replace image with input URL
    const avatarContainer = document.getElementById('avatarContainer');
    avatarContainer.innerHTML = '';
    const avatarInput = document.createElement('input');
    avatarInput.type = 'text';
    avatarInput.id = 'avatarInput';
    avatarInput.className = 'form-control mb-2';
    avatarInput.value = memberData.avatar;
    avatarContainer.appendChild(avatarInput);
    
    // Add a preview of the current avatar
    const avatarPreview = document.createElement('img');
    avatarPreview.id = 'avatarPreview';
    avatarPreview.src = memberData.avatar;
    avatarPreview.alt = 'Avatar Preview';
    avatarPreview.className = 'img-thumbnail mt-2';
    avatarPreview.style.maxHeight = '200px';
    avatarContainer.appendChild(avatarPreview);
    
    // Update preview when URL changes
    avatarInput.addEventListener('input', function() {
        avatarPreview.src = this.value;
    });
}

// Function to handle canceling edit mode
function onCancel() {
    // Reload the page to reset all fields
    window.location.reload();
}

// Function to handle saving member changes
function onSave() {
    const memberId = document.getElementById('memberId').value;
    
    // Get values from input fields
    const updatedMember = {
        name: document.getElementById('nameInput').value,
        age: document.getElementById('ageInput').value,
        email: document.getElementById('emailInput').value,
        phone: document.getElementById('phoneInput').value,
        avatar: document.getElementById('avatarInput').value
    };
    
    // Send POST request to update the member
    fetch(`/members/${memberId}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMember)
    })
    .then(response => {
        if (response.ok) {
            // Reload the page to show updated data
            window.location.reload();
        } else {
            alert('Failed to update member');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the member');
    });
}

// Function to handle deleting a member
function onDelete() {
    if (confirm('Are you sure you want to delete this member?')) {
        const memberId = document.getElementById('memberId').value;
        
        // Send POST request to delete the member
        fetch(`/members/${memberId}/delete`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                // Redirect to members list page
                window.location.href = '/members';
            } else {
                alert('Failed to delete member');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the member');
        });
    }
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make sure the buttons have the correct event handlers
    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.onclick = onEdit;
    }
    
    const deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.onclick = onDelete;
    }
});