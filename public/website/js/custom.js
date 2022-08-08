var overlay = document.getElementById("loader");
window.addEventListener('load', function () {
  //  alert()
  overlay.style.display = 'none';
})

$(document.body).on('click', '.singin_button', function () {
  $('#login_model').modal('show');
  $('#forgot_model').modal('hide');
  $('#signup_model').modal('hide');
  $('body').addClass('modal-open');
});

$(document.body).on('click', '.for_got_button', function () {
  $('#forgot_model').modal('show');
  $('#login_model').modal('hide');
  $('#signup_model').modal('hide');
  $('body').addClass('modal-open');
});
$(document.body).on('click', '.register_button', function () {
  $('#signup_model').modal('show');
  $('#forgot_model').modal('hide');
  $('#login_model').modal('hide');
  $('body').addClass('modal-open');
});

$(document.body).on('click', '.forgot_button', function () {
  $('#forgot_model').modal('show');
  $('#signup_model').modal('hide');
  $('#login_model').modal('hide');
  $('body').addClass('modal-open');
});


//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.SIGNUP

//////////////////
$(document.body).on("click", '#signup_btn', function () {
  let form = $('#sign_up_form');
  var formValue = form.validate(
    {
      rules: {
        name: "required",
        email: {
          required: true,
          email: true,
          remote: {
            url: '/check_email_exists',
            type: 'post'
          }
        },
        password: "required",
        confirm_password: {
          required: true,
          equalTo: "#sign_up_password"
        },
        phone: {
          required: true,
          remote: {
            url: '/check_phone_exists',
            type: 'post'
          },
          minlength: 10
        },
        country_code: "required",

      },
      messages: {
        name: 'Please enter name',
        email: {
          required: "Please enter email",
          email: "Please enter valid email address",
          remote: "Email already exists please use another"
        },
        phone: {
          required: "Please enter phone",
          // phone: "Please enter valid phone",
          remote: "Phone already exists please use another",
          minlength: 'Please enter valid phone number.'
        },
        password: 'Please enter password',
        confirm_password: {
          required: "Please enter password",
          equalTo: "Confirm password and password should be same"
        },
        country_code: 'Please enter country code',
      }
    }
  )
  let signup_valid = $("#sign_up_form").valid()
  if (signup_valid == true) {
    let name = $('#sign_up_form input[name="name"]').val()
    let email = $('#sign_up_form input[name="email"]').val()
    let phone = $('#sign_up_form input[name="phone"]').val()
    var country_code = $('#sign_up_form select[name="country_code"]').find(":selected").val();
    let password = $('#sign_up_form input[name="password"]').val()
    let confirm_password = $('#sign_up_form input[name="confirm_password"]').val()
    $.ajax({
      type: 'post',
      url: '/sign_up',
      data: {
        name,
        email,
        phone,
        country_code,
        password,
        confirm_password
      },
      success: (response) => {
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = "/home";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }

});
//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.LOGIN

//////////////////
$(document.body).on("click", '#login_btn', function () {
  let form = $('#login_form');
  var formValue = form.validate(
    {
      rules: {
        email: "required",
        password: "required",
      },
      messages: {
        email: "Please enter email",
        password: 'Please enter password',
      }
    }
  )
  let login_valid = $("#login_form").valid()
  if (login_valid == true) {
    let email = $('#login_form input[name="email"]').val()
    let password = $('#login_form input[name="password"]').val()
    $.ajax({
      type: 'post',
      url: '/log_in',
      data: {
        email,
        password,
      },
      success: (response) => {
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = "/home";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});

//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.CONTCT US

//////////////////

$(document.body).on("click", '#contact_us', function () {
  let form = $('#contactUs_form');
  var formValue = form.validate(
    {
      rules: {
        first_name: "required",
        last_name: "required",
        email: "required",
        phone: "required",
        massage: "required"
      },
      messages: {
        first_name: "Please add First name",
        last_name: "Please add Last name",
        email: "Please enter email",
        phone: "Please enter phone",
        massage: "Please enter massage",
        // message:{ 
        //   required: "Please enter something"
        // }
      }
    }
  )
  let contact_us_valid = $("#contactUs_form").valid()
  if (contact_us_valid == true) {
    console.log('=======================andr')
    let first_name = $('#contactUs_form input[name="first_name"]').val()
    let last_name = $('#contactUs_form input[name="last_name"]').val()
    let email = $('#contactUs_form input[name="email"]').val()
    let phone = $('#contactUs_form input[name="phone"]').val()
    let message = $('#contactUs_form textarea[name="message"]').val()

    // console.log(first_name,last_name,phone,email,message,'======================custom');return

    $.ajax({
      type: 'post',
      url: '/add_contact_us',
      data: {
        first_name,
        last_name,
        email,
        phone,
        message
      },
      success: (response) => {
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = "/contact_us";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});
//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.Update PROFILE

//////////////////

$(document.body).on("click", '#update_profile_btn', function () {
  let form = $('#update_profile_form');
  var formValue = form.validate(
    {
      rules: {
        name: "required",
        email: {
          required: true,
          email: true,
          remote: {
            url: '/check_email_exists',
            type: 'post'
          }
        },
        phone: {
          required: true,
          remote: {
            url: '/check_phone_exists',
            type: 'post'
          }
        },
        country_code: "required",

      },
      messages: {
        name: 'Please enter name',
        email: {
          required: "Please enter email",
          email: "Please enter valid email address",
          remote: "Email already exists please use another"
        },
        phone: {
          required: "Please enter phone",
          phone: "Please enter valid phone",
          remote: "Phone already exists please use another"
        },
        country_code: 'Please enter country code',

      }
    }
  )
  let contact_us_valid = $("#update_profile_form").valid()
  if (contact_us_valid == true) {
    console.log('=======================andr')
    let name = $('#update_profile_form input[name="name"]').val()
    var country_code = $('#update_profile_form select[name="country_code"]').find(":selected").val();
    let email = $('#update_profile_form input[name="email"]').val()
    let phone = $('#update_profile_form input[name="phone"]').val()
    let image = $('#update_profile_form input[name="image"]').val()

    // console.log(name,country_code,phone,email,image,'======================custom');return

    console.log('$("#update_profile_form")<>>>>>>>>>>', $("#update_profile_form"));
    let fd = new FormData($("#update_profile_form")[0])

    $.ajax({
      type: 'post',
      url: '/update_profile',
      data: fd,
      dataType: 'json',
      contentType: false,
      cache: false,
      processData: false,
      success: (response) => {
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = "/get_profile";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});


//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.Update password

//////////////////

$(document.body).on("click", '#update_password_btn', function () {
  let form = $('#update_password_form');

  console.log('====================andr');
  var formValue = form.validate(
    {
      rules: {
        old_password: {
          required: true,
          remote: {
            url: '/check_old_password_exists',
            type: 'post'
          }
        },
        new_password: "required",
        confirm_password: {
          required: true,
          equalTo: "#update_newPassword"
        },
      },
      messages: {
        old_password: {
          required: "Please enter old password",
          remote: "old password did not match"
        },
        new_password: "Please enter new password",
        confirm_password: {
          required: "Please enter confirm password",
          equalTo: "Confirm password and new password should be same"
        },
      }
    }
  )
  let contact_us_valid = $("#update_password_form").valid()
  if (contact_us_valid == true) {
    console.log('=======================andr')
    let old_password = $('#update_password_form input[name="old_password"]').val()
    let new_password = $('#update_password_form input[name="new_password"]').val()
    let confirm_password = $('#update_password_form input[name="confirm_password"]').val()
    // console.log(old_password,new_password,confirm_password,'======================custom');return


    $.ajax({
      type: 'post',
      url: '/update_password',
      data: {
        confirm_password
      },
      success: (response) => {
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = "/get_profile";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});


//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.add_billing_address_

//////////////////

$(document.body).on("click", '#add_billing_address_btn', function () {
  let form = $('#add_billing_address_form');
  // alert('hi')
  console.log('====================andr');
  var formValue = form.validate(
    {
      rules: {
        first_name: "required",
        last_name: "required",
        address_line_1: "required",
        address_line_2: "required",
        city: "required",
        state: "required",
        country: "required",
        zip_code: "required",

      },
      messages: {
        first_name: "Please enter first name",
        last_name: "Please enter last name",
        address_line_1: "Please enter address line 1",
        address_line_2: "Please enter address line 2",
        city: "Please enter new city",
        state: "Please enter new state",
        country: "Please enter new country",
        zip_code: "Please enter new zip code",

      }
    }
  )
  let add_billing_address = $("#add_billing_address_form").valid()
  let first_name = $('#add_billing_address_form input[name="first_name"]').val()
  let last_name = $('#add_billing_address_form input[name="last_name"]').val()
  let address_line_1 = $('#add_billing_address_form input[name="address_line_1"]').val()
  let address_line_2 = $('#add_billing_address_form input[name="address_line_2"]').val()
  let city = $('#add_billing_address_form input[name="city"]').val()
  let state = $('#add_billing_address_form input[name="state"]').val()
  let country = $('#add_billing_address_form input[name="country"]').val()
  let zip_code = $('#add_billing_address_form input[name="zip_code"]').val()

  if (add_billing_address == true) {
    $.ajax({
      type: 'post',
      url: '/add_address',
      data: {
        first_name,
        last_name,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        zip_code,
        type: 1
      },
      success: (response) => {

        const urlParams = new URLSearchParams(window.location.search);
        // console.log(urlParams,'===================herer');return
        const key = urlParams.get('key');
        if (response.status == true) {
          setTimeout(function () {
            // window.location.href = "/address";
            window.location.href = window.location.href + "?key=" + key;
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});


//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.add_shiping_address_form

//////////////////

$(document.body).on("click", '#add_shiping_address_btn', function () {
  let form = $('#add_shiping_address_form');

  console.log('====================andr');
  var formValue = form.validate(
    {
      rules: {
        first_name: "required",
        last_name: "required",
        address_line_1: "required",
        address_line_2: "required",
        city: "required",
        state: "required",
        country: "required",
        zip_code: "required",

      },
      messages: {
        first_name: "Please enter first name",
        last_name: "Please enter last name",
        address_line_1: "Please enter address line 1",
        address_line_2: "Please enter address line 2",
        city: "Please enter new city",
        state: "Please enter new state",
        country: "Please enter new country",
        zip_code: "Please enter new zip code",

      }
    }
  )
  let add_shiping_address_form = $("#add_shiping_address_form").valid()
  let first_name = $('#add_shiping_address_form input[name="first_name"]').val()
  let last_name = $('#add_shiping_address_form input[name="last_name"]').val()
  let address_line_1 = $('#add_shiping_address_form input[name="address_line_1"]').val()
  let address_line_2 = $('#add_shiping_address_form input[name="address_line_2"]').val()
  let city = $('#add_shiping_address_form input[name="city"]').val()
  let state = $('#add_shiping_address_form input[name="state"]').val()
  let country = $('#add_shiping_address_form input[name="country"]').val()
  let zip_code = $('#add_shiping_address_form input[name="zip_code"]').val()

  if (add_shiping_address_form == true) {
    $.ajax({
      type: 'post',
      url: '/add_address',
      data: {
        first_name,
        last_name,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        zip_code,
        type: 2
      },
      success: (response) => {

        const urlParams = new URLSearchParams(window.location.search);
        // console.log(urlParams,'===================herer');return
        const key = urlParams.get('key');
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = window.location.href + "?key=" + key;
            // window.location.href = "/address";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});

//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.for_got_button_form

//////////////////

$(document.body).on("click", '#for_got_button', function () {
  let form = $('#forgot_password_form');
  console.log('====================andr');
  var formValue = form.validate(
    {
      rules: {
        forgot_email: {
          required: true,
          email: true,
          remote: {
            url: '/check_email_exists',
            type: 'post'
          }
        },
      },
      messages: {
        forgot_email: {
          required: "Please enter email",
          email: "Please enter valid email address",
          remote: "Email does not exists"
        }
      }
    }
  )
  let forgot_password_form = $("#forgot_password_form").valid()
  let forgot_email = $('#forgot_password_form input[name="forgot_email"]').val()
  if (forgot_password_form == true) {
    console.log('=========================herer=================andr')
    $.ajax({
      type: 'post',
      url: '/forgotPassword',
      data: {
        forgot_email
      },
      success: (response) => {
        if (response.status == true) {
          setTimeout(function () {
            window.location.href = "/home";
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});


//////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>>.add to cart

//////////////////
// const addToCart = (ths)=>{
//   let pid = ths.getAttribute('productId');
//   $.ajax({
//     type: 'post',
//     url: '/add_to_cart',
//     data: {
//       pid
//     },
//     success: (response) => {
//       if (response.status == true) {
//         iziToast['success']({
//           title: response.msg,
//           position: 'topRight'
//         });
//       } else {
//         iziToast['error']({
//           title: response.msg,
//           position: 'topRight'
//         });
//       }
//     }
//   });


// }

$(document.body).on("click", '#add_to_cart', function () {
  let specification = document.getElementById('productSpecifications').innerHTML;

  const specs = document.getElementsByClassName('specifications');

  let isValid = true

  for (let i = 0; i < specs.length; i++) {
    let element = specs[i];
    val = element.options[element.selectedIndex].value
    if(val == 0){
        isValid = false
    }    
  }

  console.log(isValid, 'result')
  if(!isValid){
    iziToast['error']({
      title: "Please select the specifications!",
      position: 'topRight'
    });
    return
  }

  // return


  let selectedValue = []
  if (specification) specification = JSON.parse(specification);
  let getKeys = Object.keys(specification)

  for (let i in getKeys) {
    if (document.getElementById(getKeys[i])) {
      let c = document.getElementById(getKeys[i])
      if (c.options[c.selectedIndex].value && c.options[c.selectedIndex].value != 0) {
        selectedValue.push({ [getKeys[i]]: c.options[c.selectedIndex].value })
      } else {
        console.log(`select ${getKeys[i]}`)
      }
    }
  }
  // console.log(selectedValue)
  // return


  let pid = $(this).attr('pid')
  let qty = $('input[name="qty"]').val()
  let sc = $(this).attr("sc");
  let product_specifications = JSON.stringify(selectedValue)
  const button = this

  $.ajax({
    type: 'post',
    url: '/add_to_cart',
    data: {
      pid,
      qty,
      sc,
      product_specifications
    },
    success: (response) => {

    if(response.msg == 'WithoutLogin'){
        let getStorage = localStorage.getItem('cart');
        if(!getStorage){
          localStorage.setItem('cart',JSON.stringify(response.session.cart))
        }else{
          let getData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):'';
          getData.push(response.session.cart[0])
           localStorage.setItem('cart',JSON.stringify(getData));
        }

    }
    // else{
    //   if (response.status == true) {
        cartCounter(1)
        if (document.getElementById('checkout')) {


          document.getElementById('checkout').disabled = false;
          document.getElementById('binood').innerHTML = ``
          document.getElementById('binood').innerHTML = `${response.getTax.value} %`
        }
        if (response.getCart) {
          let getCart = response.getCart
          let get_full_Cart = response.get_full_Cart

          console.log(get_full_Cart.shipping, '=========here')

          $('#fuckThisList').append(
            `<tr>
            <td class="product-thumbnail">
              <a href="#"><img src="${getCart.product.productImage}" alt=""></a>
            </td>
            <td class="product-name">
              <div class="cart_items">
                <h4>
                  ${getCart.product.name}
                </h4>
                <p>
                  ${getCart.product.description.substring(0, 40)}
                </p>
                <p><b> color:Pink </b></p>
              </div>
            </td>
            <td class="product-price-cart"><span class="amount">
                ${getCart.product.retailPrice}
              </span></td>
            <td class="product-quantity pro-details-quality">
              <div class="cart-plus-minus">
                <div class="dec qtybutton inc_dec_qtybutton" cart_id="${getCart.qty}" type="2">-
                </div>
                <input class="cart-plus-minus-box" type="text" name="qtybutton"
                  value="${getCart.qty}">
                <div class="inc qtybutton inc_dec_qtybutton" cart_id="${getCart.id}" type="1">+
                </div>
              </div>
            </td>
            <td class="product-remove ">
              <a id="del_cart" piid="${getCart.id}">Remove</a>
            </td>
          </tr>`);
          $('#cart_subtotal').text(`$${getCart.sub_total}`)

          $('#cart_total').text(`$${getCart.total}`)
          $('#cart_shipping').text(`$${getCart.shipping}`)
          $(button).html('Added to cart');
          $(button).attr('disabled', 'true');
        }
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      // } else {
      //   iziToast['error']({
      //     title: response.msg,
      //     position: 'topRight'
      //   });
      // }
    // }
  }
  });
});

$(document.body).on("click", '#del_cart', function () {
  let piid = $(this).attr('piid')
  // alert(pid)
  // return
  $.ajax({
    type: 'post',
    url: '/del_cart_item',
    data: {
      piid
    },
    success: (response) => {

      const urlParams = new URLSearchParams(window.location.search);
      const key = urlParams.get('key');
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = window.location.href + "?key=" + key;
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});


$(document.body).on("click", '.inc_dec_qtybutton', function () {
  let cart_id = $(this).attr('cart_id')
  let type = $(this).attr('type')
  $.ajax({
    type: 'post',
    url: '/update_cart',
    data: {
      cart_id,
      type
    },

    success: (response) => {
      if (response.status == true) {
        // iziToast['success']({
        //   title: response.msg,
        //   position: 'topRight'
        // });
        (type == 1) ? $(this).prev().val(response.qty) : $(this).next().val(response.qty)
        $(this).parent().parent().prev('.product-price-cart').find('span:first').text(`$${response.price}`)
        $('#cart_subtotal').text(`$${response.subtotal}`)

        $('#cart_total').text(`$${response.total}`)


      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});

// cart counter work 
function cartCounter(qty) {
  $('#cartCounter').text(parseInt($('#cartCounter').text()) + parseInt(qty))
}
// compare counter work 
function compareCounter(qty) {
  $('#compareCounter').text(parseInt($('#compareCounter').text()) + parseInt(qty))
}
//////////////////////////del address///////

$(document.body).on("click", '.del_address', function () {
  let address_id = $(this).attr('address_id')

  // return
  $.ajax({
    type: 'post',
    url: '/del_address',
    data: {
      address_id
    },
    success: (response) => {
      const urlParams = new URLSearchParams(window.location.search);
      // console.log(urlParams,'===================herer');return
      const key = urlParams.get('key');
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = window.location.href + "?key=" + key;

          // window.location.href = "/address?key=" + key;
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});
/////////////////add in wishlist/////////////////////
$(document.body).on("click", '#add_to_wishlist', function () {
  let pid = $(this).attr('pid')
  // alert(pid)++++++++++++++++++++++++++++++
  $.ajax({
    type: 'post',
    url: '/add_to_wishlist',
    data: {
      pid
    },
    success: (response) => {

      if (response.status == true) {
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});
/////////////////////del from wishlist///////////

$(document.body).on("click", '#del_wish', function () {
  let wish_id = $(this).attr('wish_id')
  // return
  $.ajax({
    type: 'post',
    url: '/del_wishlist',
    data: {
      wish_id
    },
    success: (response) => {
      const urlParams = new URLSearchParams(window.location.search);
      // console.log(urlParams,'===================herer');return
      const key = urlParams.get('key');
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = window.location.href + "?key=" + key;
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});

$(document.body).on("click", '#add_blog_comment', function () {
  let pid = $(this).attr('pid')
  let form = $('#blog_comment_form');
  var formValue = form.validate(
    {
      rules: {
        name: "required",
        email: {
          required: true,
          email: true,
        },
        comment: "required",
        subject: "required",

      },
      messages: {
        name: 'Please enter name',
        email: {
          required: "Please enter email",
          email: "Please enter valid email address",
        },
        comment: 'Please enter comment',
        subject: 'Please enter subject',
      }
    }
  )
  let blog_comment_form = $("#blog_comment_form").valid()
  let name = $('#blog_comment_form input[name="name"]').val()
  let comment = $('#blog_comment_form textarea[name="comment"]').val()
  let email = $('#blog_comment_form input[name="email"]').val()
  let subject = $('#blog_comment_form input[name="subject"]').val()


  if (blog_comment_form == true) {
    $.ajax({
      type: 'post',
      url: '/add_blog_comment',
      data: {
        pid,
        name,
        email,
        comment,
        subject
      },
      success: (response) => {
        if (response.status == true) {
          if (response.find_comment) {
            let find_comment = response.find_comment
            let find_all_comment = response.find_all_comment
            $('#comment_list').append(
              `<br> 
            <div class="col-md-6 comment mt-4 text-justify float-left"> 
            <h4>${find_comment.name}</h4> <span>- ${find_comment.createdAt}</span> <br>
            <p>${find_comment.comment}</p>
            </div>`
            );
          }
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});


$(document.body).on("click", '#add_card_btn', function () {
  let pid = $(this).attr('pid')
  let form = $('#add_card');
  var formValue = form.validate(
    {
      rules: {
        name: "required",
        card_number: "required",
        exp_month: "required",
        exp_year: "required",
        cvv: "required",

      },
      messages: {
        name: 'Please enter name',
        card_number: "Please enter card number",
        exp_month: "Please enter exp month",
        exp_year: "Please enter exp year",
        cvv: "Please enter cvv",
      }
    }
  )
  let add_card = $("#add_card").valid()
  let name = $('#add_card input[name="name"]').val()
  let card_number = $('#add_card input[name="card_number"]').val()
  let exp_month = $('#add_card input[name="exp_month"]').val()
  let exp_year = $('#add_card input[name="exp_year"]').val()
  let cvv = $('#add_card input[name="cvv"]').val()

  // console.log('========================herer');return
  // alert(pid)
  $.ajax({
    type: 'post',
    url: '/add_card',
    data: {
      pid,
      name,
      card_number,
      exp_month,
      exp_year,
      cvv
    },
    success: (response) => {
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = window.location.href;
        }, 1000);
        console.log('==function chl pda=====================herer')
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});

// =======================<<<<cofirm order-----------SSA

$(document.body).on("click", '#confirm_order', function () {
  let cart = $(this).attr('cart')
  let card_id = $(this).attr('card_id')
  let shiping_address = $(this).attr('shiping_address')
  let billing_address = $(this).attr('billing_address')
  $.ajax({
    type: 'post',
    url: '/add_order',
    data: {
      cart,
      card_id,
      shiping_address,
      billing_address,
    },
    success: (response) => {
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = "/home";
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});
/////////////////////////add reviews//////////////

$(document.body).on("click", '#add_review', function () {
  let pid = $(this).attr('pid')
  let form = $('#add_review_form');
  var formValue = form.validate(
    {
      rules: {
        review: "required",
      },
      messages: {
        review: 'Please enter review',
      }
    }
  )
  let add_review = $("#add_review_form").valid()
  let review = $('#add_review_form textarea[name="review"]').val()
  var $rateYo = $("#rateYo").rateYo();
  var rating = $rateYo.rateYo("rating");
  var key = document.getElementsByName('key')[0].value
  // alert(key);return
  if (add_review == true) {
    $.ajax({
      type: 'post',
      url: '/post_review',
      data: {
        review,
        pid,
        rating,
        key
      },
      success: (response) => {
        if (response.status == true) {
          const key = document.getElementsByName('key')[0].value
          setTimeout(function () {
            // window.location.replace('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload');
            window.location.href = window.location.href;
            // window.location.replace("/product_review?key=" + key);
          }, 1000);
          iziToast['success']({
            title: response.msg,
            position: 'topRight'
          });
        } else {
          iziToast['error']({
            title: response.msg,
            position: 'topRight'
          });
        }
      }
    });
  }
});

$(document.body).on("change", '#sorting', function () {
  let cat_id = $(this).attr('cat_id')
  var value = $('#sorting').find(":selected").val()
  var key = document.getElementsByName('key')[0].value
  window.location.href = window.location.href + "&order=" + value;
});
//////////////////////////////////
////////===========>>>>RE-ORDER==================
//////////////////////////////////
$(document.body).on("click", '#re_order', function () {
  let pid = $(this).attr('pid')
  let order_id = $(this).attr('order_id')

  // alert(pid);return
  $.ajax({
    type: 'post',
    url: '/re_order',
    data: {
      pid,
      order_id
    },
    success: (response) => {
      if (response.status == true) {
        // const key = document.getElementsByName('key')[0].value
        // console.log(response,'==================');return
        setTimeout(function () {
          window.location.href = window.location.href
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});
$(document.body).on("click", '#add_to_compare', function () {
  let pid = $(this).attr('pid')
  // alert(pid);
  $.ajax({
    type: 'post',
    url: '/add_to_compare',
    data: {
      pid,
    },
    success: (response) => {
      if (response.status == true) {
        compareCounter(1)
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});

$(document.body).on("click", '#del_compare', function () {
  let piid = $(this).attr('piid')
  // return
  $.ajax({
    type: 'post',
    url: '/del_comparison',
    data: {
      piid
    },
    success: (response) => {
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = window.location.href
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});

$(document.body).on("click", '.del_card', function () {
  let card_id = $(this).attr('card_id')
  $.ajax({
    type: 'post',
    url: '/del_card',
    data: {
      card_id
    },
    success: (response) => {
      if (response.status == true) {
        setTimeout(function () {
          window.location.href = window.location.href
        }, 1000);
        iziToast['success']({
          title: response.msg,
          position: 'topRight'
        });
      } else {
        iziToast['error']({
          title: response.msg,
          position: 'topRight'
        });
      }
    }
  });
});


const redirectFunction = () => {
  window.location.href = '/checkout'
}


let getStorage = localStorage.getItem('cart')
if(getStorage){
  getStorage = JSON.parse(getStorage).length
  document.getElementById('cartCounter').innerHTML = getStorage
}


// [...document.querySelectorAll('.')].map((val)=>{

//   val.addEventListener('click',(val) =>{
//     console.log('==================',val)
// })
// })


var deleteLinks = document.querySelectorAll('.cartQuantityUpdate');
let getData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):{}
Array.from(deleteLinks).forEach(link => {

  link.addEventListener('click', function(event) {
  let getType  =  link.getAttribute('type');
  let productid  =  link.getAttribute('productid');
  let price = +link.getAttribute('price');
  let id = link.getAttribute('id');
  let getId  = link.getAttribute('amountId')
  let getProduct = getData.find(val => val.pid == productid)
  let otherProduct = getData.filter(val => val.pid != productid)
  let getAmount = document.getElementById(getId)

  if(getType == 1){
    getProduct['qty'] = +getProduct['qty']+1;
    let qq =getProduct['qty'];
    console.log( qq)
    getProduct['total_price']  =price * qq;
    link.previousElementSibling.value = qq;
    getAmount.innerHTML  =price * qq
  }else{
    getProduct['qty'] = +getProduct['qty']-1;
    let qq = getProduct['qty']
    getProduct['total_price']  =price*qq;
    link.nextElementSibling.value = qq;
    getAmount.innerHTML  =price * qq
  }
   
     otherProduct.push(getProduct)
     localStorage.removeItem("cart");
     localStorage.setItem('cart',JSON.stringify(otherProduct))

  

    //  console.log('===========va;l',document.getElementById(id).nextElementSibling) 
    //  document.getElementById(id).nextElementSibling.value = 1



  // let storage = localStorage.getItem('cart')
  //   if(storage){
  //     storage = JSON.parse(storage);
  //     let getProductIds =storage.map((val) => {
  //       let x = {[val.pid]:val.qty}
  //       return x
  //     })
  //     stringId = JSON.stringify(getProductIds)
  //     getCart =  window.btoa(stringId);
  //     window.location = `getCart?Ids=${getCart}`
  //   }

      
    });
});

// document.getElementById('')