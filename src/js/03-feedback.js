import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const saveFormData = throttle(() => {
    const formData = {
        email: form.email.value,
        message: form.message.value
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

form.addEventListener('input', saveFormData);

const loadFormData = () => {
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
        const formData = JSON.parse(savedData);
        form.email.value = formData.email;
        form.message.value = formData.message;
    }
};

window.addEventListener('DOMContentLoaded', loadFormData);

form.addEventListener('submit', event => {
    event.preventDefault();
    localStorage.removeItem('feedback-form-state');
    form.reset();

    const formData = {
        email: form.email.value,
        message: form.message.value
    };
    console.log('Form data submitted:', formData);
});

