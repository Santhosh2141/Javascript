let calculation = localStorage.getItem('calculation') || '';

     function updateCalculation(number){
      calculation += number; 
      console.log(calculation);
      localStorage.setItem('calulation', calculation);

      document.querySelector('.expression').innerHTML = `${calculation}`;
     }

     function calculate(calculation) {
      console.log(Math.round(eval(calculation)));
      document.querySelector('.expression').innerHTML = `${(eval(calculation))}`;
     }