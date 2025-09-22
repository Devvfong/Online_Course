// Main JavaScript file for the application

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Course enrollment functionality
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const courseId = this.dataset.courseId;
            const isPaid = this.dataset.isPaid === 'true';
            
            if (isPaid) {
                alert('This is a paid course. Payment integration is not implemented in this demo.');
                return;
            }
            
            // Enroll in free course
            fetch(`/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Successfully enrolled in course!');
                    location.reload();
                } else {
                    alert(data.error || 'Enrollment failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during enrollment');
            });
        });
    });
    
    // Delete confirmation for admin actions
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                const form = this.closest('form');
                if (form) {
                    form.submit();
                } else {
                    // Handle AJAX delete
                    const url = this.dataset.url;
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            location.reload();
                        } else {
                            alert(data.error || 'Delete failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred');
                    });
                }
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirmPassword"]');
            
            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    e.preventDefault();
                    alert('Passwords do not match');
                    return false;
                }
            }
        });
    });
    
    // Auto-hide alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
    
    // Search functionality enhancement
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // Could implement live search here
            }, 500);
        });
    }
});

// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg`;
    alertDiv.innerHTML = `
        <div class="flex">
            <div class="flex-1">${message}</div>
            <button class="ml-4 text-lg">&times;</button>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
    
    // Manual remove
    alertDiv.querySelector('button').addEventListener('click', () => {
        alertDiv.remove();
    });
}

// Loading state management
function setLoading(element, loading = true) {
    if (loading) {
        element.disabled = true;
        element.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    } else {
        element.disabled = false;
        element.innerHTML = element.dataset.originalText || 'Submit';
    }
}