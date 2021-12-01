(Number(value)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')   -   returns the value formatted to currency

somArray.find(neededObject => neededObject.neededObjectID == ID)   -   to find an object in array



:class="{invalid: (($v.employee.position.$dirty && !$v.employee.position.required) || (roomNumberChecking))}"     -   vuelidate class changer

<span v-if="$v.employee.position.$dirty && !$v.employee.position.required" class="validation-error">Пожалуйста, введите номер комнаты</span>    -   vuelidate invalid span
