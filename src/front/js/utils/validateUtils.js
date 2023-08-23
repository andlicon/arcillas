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
  let { name, description, usage } = form;
  const { categoryId, unitId, image } = form;
  name = name.trim();
  description = description.trim();
  usage = usage.trim();

  if (name.length == 0
    || description.legnth == 0
    || usage.length == 0
    || categoryId == undefined
    || unitId == undefined
    || image == undefined) {
    return false;
  }
  if (image[0] == undefined) return false

  return true;
};