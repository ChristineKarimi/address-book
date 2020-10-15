// define contact constructor to only hold firstName and lastName and an array of addresses
function Contact(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];         // When we first create a new Contact, this array will start out empty. 
                                 // Then, when the user provides addresses for the particular Contact, we will create a new Address out of each, and push it to that Contact's addresses array.
  }                              // To do this, we'll make sure each new Contact object is initialized with an empty addresses array. We'll add the following to the Contact constructor:


                                
  Contact.prototype.fullName = function(){
    return this.firstName + " " + this.lastName;
  }
  
  function Address(street, city, state) {    // Now we need to write an Address constructor. At a minimum, each Address object will need to know its own street, city, and county. We can create an Address constructor that will add each of those properties to every Address object created
    this.street = street;                    // This should look fairly similar to our Contact constructor. When our Address constructor is called to create a new Address object, we will provide it with parameters for a street, city and county. It will then set corresponding street, city and county properties on the Address object it's creating as equivalent to the arguments that were passed in.
    this.city = city; 
    this.state = state;
  }

  Address.prototype.fullAddress = function() {                      // we now write an Address prototype method called fullAddress() that will return all properties of an Addressobject as a single string.
    return this.street + ", " + this.city + ", " + this.state;
  }
  
  function resetFields() {
    $("input#new-first-name").val("");
     $("input#new-last-name").val("");
     $("input.new-street").val("");
     $("input.new-city").val("");
     $("input.new-state").val("");
    //  $("div.new-address").not(':first').remove();
   }  

// Now let's incorporate jQuery to show new fields for another address when the user clicks the "Another Address" button we've just added.
// When the form first loads, it will display one set of address form fields.
// Then, when they click the button labeled "Another address", a second set of address form fields will be added.
// To do this, we'll add the following code to the $(document).ready callback function. Note that it should not reside in the form submit listener callback function. This is because the button must be functional before we submit the form; after all, if the user wants to add two different addresses to a Contact, they'll need to be able to hit the "Another Address" button to receive more address form fields before submitting the form to create the new Contact.

   $(document).ready(function() {
    $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });
  
  // When appending a large amount of HTML with jQuery, we'll break it into smaller strings on different lines, using the + operator to concatenate them, as you see above. 
  // This makes it more readable than if it was all on a single line. For further readability, we keep the spacing and indentation the same as our other HTML.

// Next, we'll add jQuery logic to our form submit listener in order to collect and utilize the address information provided by the user. 
// Previously, when the form was submitted, we collected the first and last name and created a Contact object with that data.
// Now we must also loop through the address form fields to collect that information, create Address objects, and push them onto the Contact object's addresses property
// The code to accomplish this, It should reside after the line that creates a new Contact. (However, note that you will not yet see the results of this, because we haven't added code to display the address information yet.

    $("form#new-contact").submit(function(event) {
      event.preventDefault();
      debugger;
  
      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
  
      var newContact = new Contact(inputtedFirstName, inputtedLastName);
  
      $(".new-address").each(function() {
       var inputtedStreet = $(this).find("input.new-street").val();
       var inputtedCity = $(this).find("input.new-city").val();
       var inputtedState = $(this).find("input.new-state").val();
  
       var newAddress = { street: inputtedStreet, city: inputtedCity, state: inputtedState };
       newContact.addresses.push(newAddress);
  
     });

// Here, we've created a loop that cycles through each DOM element with the class new-address. 
// Much like looping through all elements of an array with the forEach() method,we can look through all elements of a given jQuery class with the each() method. 
// However, instead of taking a parameter that each element is assigned to, we use the this keyword to refer to the current element. 
// We also are using the find() method in the code above, which looks through all child elements of the provided element for any other elements that match the criteria provided as an argument. 
// There's achildren() method, too, but children() will only traverse down a single level, whereas find()will look through children, their children, and so on.
//  Since our inputs are nested within form-group<div>s, we need to traverse down two levels. Therefore, we use find() instead of children().

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

// Finally, we need to display each of a Contact's addresses alongside their name.
//We'll do this in a <ul> with an id of addresses. To accomplish this, we'll place the following code inside the .contact click listener

$("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
  
        $(".contact").last().click(function() {
          $("#show-contact").show();
  
          $("#show-contact h2").text(newContact.firstName);
          $(".first-name").text(newContact.firstName);
          $(".last-name").text(newContact.lastName);
  
          $("ul#addresses").text("");
          newContact.addresses.forEach(function(address) {
            $("ul#addresses").append("<li>" + address.street + ", " + address.city + ", " + address.state + "</li>");
          });
        });
        resetFields();
        // $("input#new-first-name").val(""); //refactored by brining this code into a function
        // $("input#new-last-name").val("");  //outside of the event binding, preprocess it before
        // $("input.new-street").val("");     //document loads. now we can reference the reset field function
        // $("input.new-city").val("");
        // $("input.new-state").val("");
  
      });
    });
  