(Number(value)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')   -   returns the value formatted to currency

somArray.find(neededObject => neededObject.neededObjectID == ID)   -   to find an object in array