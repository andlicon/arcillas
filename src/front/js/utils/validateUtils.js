export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
}

export const validateLogin = (idEmail, idPassword, idForm) => {
  const emailInput = document.getElementById(idEmail);
  const passwordInput = document.getElementById(idPassword);
  const login = document.getElementById(idForm);

  const emailValidate = !validateEmail(emailInput.value) ? 'No es un email válido' : '';
  emailInput.setCustomValidity(emailValidate);
  const passwordValidate = !validatePassword(passwordInput.value) ? 'No es una contraseña válida' : '';
  passwordInput.setCustomValidity(passwordValidate);

  login.classList.add('was-validated');
  login.checkValidity();

  if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
    return false;
  }

  return true;
}

export const validateProductForm = (form) => {
  const image = document.getElementById('image');
  const imageValidate = form.get('image') == 'undefined' ? 'Se debe especificar una imagen' : '';
  image.setCustomValidity(imageValidate);

  const productCreate = document.getElementById('productCreate');
  productCreate.classList.add('was-validated');
  productCreate.checkValidity();

  if (form.get('name').length == 0
    || form.get('description').length == 0
    || form.get('usage').length == 0
    || form.get('category_id') == undefined
    || form.get('unit_id') == undefined
    || form.get('image') == undefined) {
    return false;
  }

  return true;
};