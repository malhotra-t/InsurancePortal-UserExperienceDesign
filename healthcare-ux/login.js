$(document).ready(function(){

  $(".forgot-password").click(function(event){

    event.preventDefault();
    alert("Please get in touch with the System Admin for access related issues: sys.admin@tps.com ");
  });

  $("form").submit(function(event){
    event.preventDefault();
    login($(this));
  });

});
function login(form)/*function to check userid & password*/
{
  console.log($(form).find("#inputEmail3"));
   /*the following code checkes whether the entered userid and password are matching*/
 if($(form).find("#inputEmail3").val() == "user" && $(form).find("#inputPassword3").val() == "password")
  {
    window.location='MyPlan.html';/*opens the target page while Id & password matches*/
  }else if($(form).find("#inputEmail3").val() == "admin" && $(form).find("#inputPassword3").val() == "password")
   {
     window.location='dashboard.html';/*opens the target page while Id & password matches*/
   }
 else
 {
   alert("Error Password or Username");/*displays error message*/
  }
}
