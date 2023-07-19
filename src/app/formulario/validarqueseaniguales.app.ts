import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const validarQueSeanIguales: ValidatorFn = (
  formulario2: FormGroup
): ValidationErrors | null => {
  const password = formulario2.get("form1")
  const confirmarPassword = formulario2.get("form1")

  return password.value === confirmarPassword.value
    ? null
    : { noSonIguales: true }
}
