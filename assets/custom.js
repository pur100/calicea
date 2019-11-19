/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

 $(document).ready(function() {
     console.log( "ready" );
 });


  $("#cart-confirmation").click(function(e) {
    console.log("confirmed cart")
    var items = CartJS.cart.items
    items.forEach((item, index) => {
      //CART JS est bien initié, le JS capte bien les item.quantity mais me balance néanmoins l'alerte
      console.log("this is the item quantity")
      console.log(item.quantity)
      console.log("this is the item quantity modulo 6")
      console.log(item.quantity % 6)
      if ((item.quantity % 6) != 0) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        alert("Pour bénéficier du tarif PRO, veuillez acheter vos produits par lots de 6 articles")
      }
    })
  })

  $("#pro_minus").click(function(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    $('.QuantitySelector__CurrentQuantity').val(parseInt($('.QuantitySelector__CurrentQuantity').val()) - 6)
  })

  $("#pro_plus").click(function(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    $('#pro_quantity').val(parseInt($('#pro_quantity').val()) + 6)
  })

  $(".address-block").click(function(e) {
    console.log("clicked address block")
    $(this).toggleClass("selected-address")
  });

$("#call-drawer").click(function(e) {
  e.preventDefault();
  var cart = CartJS.cart
  var customer_id = $("#id").text()
  var customer_mail = $("#mail").text()
  var pro_price = parseInt($("#total_pro").data('proprice'))
  var total_price = parseInt(cart["total_price"])
  var line_items = CartJS.cart.items
  var cip = parseInt($("#cip").text())
  console.log(cip)
  console.log(customer_id)
  console.log(customer_mail)
  console.log(pro_price)
  console.log(total_price)
  console.log(line_items)
  $(".Segment__Title").addClass("no-show")
  $(".Modal__Header").addClass("no-show")
  $(".Form__Header").addClass("no-show")
  $(".Modal__Content").html("<img src='https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif'>")
  $.ajax({
      type: "POST",
      url: "https://caliceapp.herokuapp.com/checkout_pro",
      crossDomain: true,
      headers: {
              "Access-Control-Allow-Origin": "*",
              'Access-Control-Allow-Methods':'POST',
              'Access-Control-Allow-Headers':'application/json'
            },
      data:  {
        customer_mail: customer_mail,
        cip: cip,
        customer_id: customer_id,
        pro_price: pro_price,
        total_price: total_price,
        line_items: JSON.stringify(line_items)
      },
      success: function(data) {
        console.log(data)
        $(".Modal__Content").html("<div><h1>MERCI POUR VOTRE COMMANDE !</h1><h3>Vous recevrez d'ici quelques instants un email de confirmation</h3></div>")
      },
      error : function(resultat, statut, erreur){
        console.log(statut, erreur)
        $(".Modal__Content").html("<div><h1>Malheureusement, votre commande n'a pas pu aboutir.</h1><h3>Si le problème persiste, contactez-nous!.</h3></div>")
      },
      dataType: 'json'
      })
  });

$("#call-cart").click(function(e) {
  e.preventDefault();
  var cart = CartJS.cart
  var customer_mail = $("#mail").text()
  var customer_id = $("#id").text()
  var pro_price = parseInt($("#total_pro").data('proprice'))
  var total_price = parseInt(cart["total_price"])
  var line_items = CartJS.cart.items
  var cip = parseInt($("#cip").text())
  console.log(cip)
  console.log(customer_id)
  console.log(customer_mail)
  console.log(pro_price)
  console.log(total_price)
  $(".Segment__Title").addClass("no-show")
  $(".Modal__Header").addClass("no-show")
  $(".Form__Header").addClass("no-show")
  $(".Modal__Content").html("<img src='https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif'>")
  $.ajax({
      type: "POST",
      url: "https://caliceapp.herokuapp.com/checkout_pro",
      crossDomain: true,
      headers: {
              "Access-Control-Allow-Origin": "*",
              'Access-Control-Allow-Methods':'POST',
              'Access-Control-Allow-Headers':'application/json'
            },
      data:  {
        customer_mail: customer_mail,
        cip: cip,
        customer_id: customer_id,
        pro_price: pro_price,
        total_price: total_price,
        line_items: JSON.stringify(line_items)
      },
      success: function(data) {
        console.log(data)
        $(".Modal__Content").html("<div><h1>MERCI POUR VOTRE COMMANDE !</h1><h3>Vous recevrez d'ici quelques instants un email de confirmation</h3></div>")
        $("#modal-got-address2").addClass("order-sent")
        $(".order-sent").click(function(e) {
          console.log("order sent ??.................")
          $.ajax({
            type: "POST",
            url: "https://calicea.myshopify.com/cart/clear",
            crossDomain: false,
            headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods':'POST',
                    'Access-Control-Allow-Headers':'application/json'
                  },
            data:  {
            },
            success: function(data) {
              console.log(data)
              window.location = "https://calicea.myshopify.com/"
            },
            error : function(resultat, statut, erreur){
              console.log(statut, erreur)
            },
            dataType: 'json'
          })
        })
      },
      error : function(resultat, statut, erreur){
        console.log(statut, erreur)
        $(".Modal__Content").html("<div><h1>Malheureusement, votre commande n'a pas pu aboutir.</h1><h3>Si le problème persiste, contactez-nous!.</h3></div>")
      },
      dataType: 'json'
      })
  });

if (document.referrer == "https://calicea.myshopify.com/pages/client-professionnel" ) {
  console.log("client pro")
  alert("Merci, votre demande d'inscription a bien été prise en compte. Si vous vous êtes inscrits en tant que professionnel, votre demande sera validée par nos équipes sous 24h.")
}


if (document.referrer == "https://calicea.myshopify.com/challenge" ) {
  console.log("client pro challenge")
  alert("Merci, votre demande d'inscription a bien été prise en compte. Si vous êtes inscrits en tant que professionnel")
}


$("#pro_select").click(function(e) {
  console.log("selected pro")
  $(".register-pro ").removeClass("no-show")
  $(".register-particulier ").addClass("no-show")
})

$("#particulier_select").click(function(e) {
  console.log("selected pro")
  $(".register-pro ").addClass("no-show")
  $(".register-particulier ").removeClass("no-show")
})





