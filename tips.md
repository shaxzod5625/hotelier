(Number(value)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')   -   returns the value formatted to currency

somArray.find(neededObject => neededObject.neededObjectID == ID)   -   to find an object in array



:class="{invalid: (($v.employee.position.$dirty && !$v.employee.position.required) || (roomNumberChecking))}"     -   vuelidate class changer

<span v-if="$v.employee.position.$dirty && !$v.employee.position.required" class="validation-error">Пожалуйста, введите номер комнаты</span>    -   vuelidate invalid span


sessionStorage.removeItem('employees')    -    removes specificly one item in storage


/////////////////////////////////////////////////////

To sort out empty objects from an array

oops() {
  const array = [
    {belongs: '', num: 1},
    {belongs: 'asdas', num: 2},
    {belongs: '', num: 3},
    {belongs: 'asdasd', num: 4},
    {belongs: '', num: 5},
    {belongs: '', num: 6},
    {belongs: 'asdasd', num: 7},
    {belongs: '', num: 8}
  ]

  const sorted = array.filter(obj => obj.belongs === '')

  return sorted
}
/////////////////////////////////////////////////////


// var result = this.setAccomodationsCategories.reduce((unique, o) => {
  //   if(!unique.some(obj => obj.category === o.category)) {
  //     unique.push(o);
  //   }
  //   return unique;
  // },[]);

  // return result.sort(function(a, b){
  //   let x = a.category.toLowerCase();
  //   let y = b.category.toLowerCase();
  //   if (x < y) {return -1;}
  //   if (x > y) {return 1;}
  //   return 0;
  // })




  setAccomodationsCategories() {
      const accomodations = this.$store.state.accomodations
      const length = accomodations.length
      const sorted = []
      
      for (let i = 0; i < length; i ++) {
        sorted.push({
          category: accomodations[i].category
        })
      }

      return sorted
    },





    '70000'.replace(/\s+/g, '')


