import { useCallback, useState } from 'react';

/**
 * @module useFormWithValidation
 * @description Пользовательский хук.<br>
 * Запускает валидацию формы, с которой используется. Для запуска валидации, хук
 *  импортируется в компонент с формой и запускается. Хук выполняет валидацию и вывод ошибок
 *  используя браузерную валидацию, т.е. свойство validity объекта ValidityState.<br>
 * Особеннсти хука:<br>
 * - используются управляемые инпуты;<br>
 * - каждый инпут валидируется отдельно, что позволяет стилизовать каждый инпут в зависимости
 *  от его состояния<br>
 * - проверяется валидность всей формы в целом, если не валиден хотя бы один инпут - вся форма не валидна<br>
 * - заполняемый инпут получает состояние "выбранный", что позволяет отдельно стилизовать инпут, в котором
 *  происходит заполнение поля<br>
 * Возвращает объект со стейтами и методами.
 * @returns {Object}  { values, errors, isValid, handleInputChange, setValues, resetForm }
 * @since v.2.0.6
 * @public
 */
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputChecked, setIsInputChecked] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [formError, setFormError] = useState('');

  /**
   * @method
   * @name handleInputChange
   * @argument {Event} event - событие
   * @description Обработчик изменения полей инпутов.<br> При каждом вводе в поле инпута введенное значение
   *  и результаты валидации введенных значений и формы в целом сохраняются в соответствующие стейты.
   * @public
   * @since v.1.0.0
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsFormValid(event.target.closest('form').checkValidity());
    setIsInputChecked({ ...isInputChecked, [name]: true });
    setIsInputValid({ ...isInputValid, [name]: event.target.checkValidity() });
  };

  /**
   * @method
   * @name resetForm
   * @description Сброс формы после ввода значений<br> Если после ввода значений в форму новые значения не были
   * отправлены, форма приводится в изначальное актуальное состояние установкой стейтов в необходимые состояния.
   *  Состояния стейтов передаются аргументами коллбэку метода resetForm.
   * @public
   * @since v.2.0.6
   */
  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsFormValid = false,
      newIsInputChecked = {},
      newIsInputValid = {},
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
      setIsInputChecked(newIsInputChecked);
      setIsInputValid(newIsInputValid);
      setFormError('');
    },
    [setValues, setErrors, setIsFormValid, setIsInputChecked, setIsInputValid],
  );

  return {
    values,
    errors,
    isFormValid,
    isInputChecked,
    isInputValid,
    handleInputChange,
    setValues,
    resetForm,
    formError,
    setFormError,
  };
}
