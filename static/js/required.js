$(document).ready(function () {
  /* Table Asc and Desc Order ----------------------- */
  /* Table Asc and Desc Order ----------------------- */
  $('.table-list-view .sortarrow span').click(function () {
    $(this).parent('.sortarrow').toggleClass('active')
  })

  /* Table Detail View JS ----------------------- */
  $(document).on('click', '.header-right #detailView', function () {
    if ($(this).is(':checked')) {
      $('.multi-table-view').addClass('show-detail')
    } else if ($(this).is(':not(:checked)')) {
      $('.multi-table-view').removeClass('show-detail')
    }
  })

  /* add more button toggle */
  $('.add-more-btn a,.add-user-form  a').click(function () {
    $('.add-more-user').toggleClass('active')
  })

  /* file upload js */
  $('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping')
  })
  $('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping')
  })

  // Filter Toggle Icon
  // $('.filter-icon,.filter-close').click(function () {
  //   $('.filter-menu').toggleClass('show')
  // })

  /* Comment Attach ----------------------- */
  $('.side-baar-comment-box .btn-attach').click(function () {
    $(this).parents('.tab-pane').addClass('show-attach')
  })
  $('.side-baar-comment-box .hide-comment-attach').click(function () {
    $(this).parents('.tab-pane').removeClass('show-attach')
  })
})

/* Dashboard Window Height JS */
function dashboard() {
  var wh = $(window).height()
  var ww = $(window).width()

  var df = $('.dashboard-form').outerHeight()
  var dn = $('.dashboard-tabs .nav').outerHeight()
  var th = wh - (df + dn + 40)
  $('.dashboard-tabs .tab-content').height(th)

  var gsb = $('.general-settings-box').outerHeight()
  var tt = $('.general-settings-box .top-title').outerHeight()
  var wab = gsb - (tt + 40)
  $('.general-settings-box .customscrollbar').height(wab)
}
dashboard()

/* Image to Background JS */
function setbg() {
  $('.img-mask').each(function () {
    var theBg = $(this).find('.bg-img').attr('src')
    $(this).css('background-image', 'url(' + theBg + ')')
    $(this).find('img.bg-img').hide()
  })
}
setbg()

// Task list----------------

$(window).on('load', function () {
  setbg()
  dashboard()
})
$(window).on('resize', function () {
  setbg()
  dashboard()
})

// Input Run Time Change Value With Auto Width----------------
// $(document).on('keyup', '.editable__textarea', function () {
//   var inputValue = $(this).val()
//   var shadowDiv = $(document).find(
//     '.editable__box.editable__focuschild .editable__preview'
//   )
//   shadowDiv.html(inputValue)
// })
$(document).on('blur', '.editable__textarea', function () {
  $(this).parents('.editable__box').removeClass('editable__focuschild')
})
$(document).on('focus', '.editable__textarea', function () {
  $(this).parents('.editable__box').addClass('editable__focuschild')
})
$(document).on(
  'blur',
  '.side-baar-comment-box .comment-box textarea',
  function () {
    $(this).parents('.comment-box').removeClass('textarea__focus')
  }
)
$(document).on(
  'focus',
  '.side-baar-comment-box .comment-box textarea',
  function () {
    $(this).parents('.comment-box').addClass('textarea__focus')
  }
)

// Comment Tabs----------------
$(document).on('click', '.cs-toggle-attr', function () {
  $(this)
    .parents('.cs-toggle-wrapper')
    .attr('data-active', $(this).attr('data-class'))
  $(this).addClass('active').siblings().removeClass('active')
})

/* Add Lead menu toggle class ======= */
// $(document).ready(function () {
//   $(document).on('click', '.tl-notes a.add-tl-notes', function () {
//     $('.active-note').hide()
//     $('.new-note').show()
//   })
//   $(document).on('click', '.new-note .cancel-btn', function () {
//     $('.active-note').show()
//     $('.new-note').hide()
//   })
// })

/* Add Lead menu toggle class ======= */
$(document).ready(function () {
  $(document).on('click', '.dl-detail-left a.dl-editicon', function () {
    $(this).hide()
    $('.dl-detail-left-fr').hide()
    $('.dl-detail-left-bk').show()
  })
  $(document).on(
    'click',
    '.dl-detail-left-bk .dealer-edit-cancel',
    function () {
      $('.dl-detail-left-fr').show()
      $('.dl-detail-left-bk').hide()
      $('.dl-detail-left a.dl-editicon').show()
    }
  )
})

/* Left/Right sidebar toggle ======= */
$(document).ready(function () {
  $(document).on('click', '.body-content-fixed-toggle', function () {
    $('body').toggleClass('rightpart-shrink')
  })
})

//   $(document).on('click', '.shrink', function () {
//     $('body').toggleClass('leftpart-shrink')
//     $('.clickBox').addClass('open');
//   })
//   $(document).on('click', '.clickBox.open', function () {
//     $(this).removeClass('open')
//     $('body').removeClass('leftpart-shrink')
//   })
// })
// $(document).ready(function () {
//   $(document).on('click', '.shrink, .RightShrink', function () {
//     $('body').toggleClass('leftpart-shrink')
//   })
//   $(document).on('click', 'body.leftpart-shrink .clickBox', function () {
//     $('body').removeClass('leftpart-shrink')
//     $('body').removeClass('quick-view')
//   })
//   $(document).on(
//     'click',
//     'body:not(.leftpart-shrink) .rightClickBox',
//     function () {
//       $('body').addClass('leftpart-shrink')
//     }
//   )
// })
$(document).ready(function () {
  $(document).on('click', '.body-content-fixed-toggle', function () {
    $('body').toggleClass('rightpart-shrink')
  })
  $(document).on('click', '.shrink', function () {
    $('body').toggleClass('leftpart-shrink')
    $('body').removeClass('rightpart-shrink')
  })
  $(document).on('click', 'body.leftpart-shrink .clickBox', function () {
    $('body').removeClass('leftpart-shrink')
    // $('body').removeClass('quick-view')
    $('body').removeClass('rightpart-shrink')
  })
  $(document).on('click', '.quick-view-open', function () {
    // $('body').addClass('quick-view')
    $('body').addClass('leftpart-shrink')
    $('body').removeClass('rightpart-shrink')
  })
  $(document).on('click', '.close-quick-view', function () {
    // $('body').removeClass('quick-view')
    $('body').removeClass('rightpart-shrink')
    $('body').addClass('leftpart-shrink')
  })
  $(document).on('click', '.RightShrink', function () {
    $('body').toggleClass('rightpart-shrink')
    $('body').addClass('leftpart-shrink')
  })
  $(document).on(
    'click',
    'body:not(.rightpart-shrink) .rightClickBox',
    function () {
      $('body').addClass('rightpart-shrink')
      $('body').addClass('leftpart-shrink')
    }
  )
})
/* lead Detail page lead assignment toggle ======= */
$(document).ready(function () {
  $(document).on(
    'click',
    '.lead-assignments ul.ld-list > li.new-lead-add',
    function () {
      $('.ld-click-hide').hide()
      $('.ld-click-show').show()
    }
  )
})

/* Project Attachment Gallery Popup JS Start ===================*/
$(document).on('click', '.pp-img', function () {
  $('.attach-gallery-model').addClass('open')
})
$(document).on('click', '.attach-close', function () {
  $('.attach-gallery-model').removeClass('open')
})
$(document).on('click', '.gallery-thumg', function () {
  $('.gallery-thumg').removeClass('active')
  $(this).addClass('active')
})

$(document).on('click', '.attach-gallery-thumb .thumb-img', function () {
  var imgpath = $(this).attr('img-url')
  var imgname = $(this).attr('img-name')
  $('.attach-gallery-img-preview .preview-image img').attr('src', imgpath)
  $('.attach-gallery-button a').attr('href', imgpath)
  $('.attach-gallery-attname').text(imgname)
  $('#pdf-preview-dialog').hide()
  $('.preview-image').show()
  $('.no-preview-file').css('opacity', '0')
  $('.no-preview-file').css('visibility', 'hidden')
})
$(document).on('click', '.attach-gallery-thumb .thumb-pdf', function () {
  var pdfpath = $(this).attr('pdf-path')
  var pdfname = $(this).attr('pdf-name')
  $('#pdf-preview').attr('src', pdfpath)
  $('.attach-gallery-button a').attr('href', pdfpath)
  $('.attach-gallery-attname').text(pdfname)
  $('.preview-image').hide()
  $('.no-preview-file').css('opacity', '0')
  $('.no-preview-file').css('visibility', 'hidden')
  $('#pdf-preview-dialog').show()
})
$(document).on('click', '.attach-gallery-thumb .other-files', function () {
  var filepath = $(this).attr('file-path')
  var filename = $(this).attr('file-name')
  $('#pdf-preview').attr('src', filepath)
  $('.attach-gallery-button a').attr('href', filepath)
  $('.attach-gallery-attname').text(filename)
  $('.attachment-name').text(filename)
  $('.no-preview-file a').attr('href', filepath)

  $('.preview-image').hide()
  $('#pdf-preview-dialog').hide()
  $('.no-preview-file').css('opacity', '1')
  $('.no-preview-file').css('visibility', 'visible')
})
$('.attach-gallery-arrow-right .attach-gallery-arrow-icon').click(function () {
  var $next
  var $selected = $('.attach-gallery-thumb')
  $next = $selected.next('.gallery-thumg')
  $next = $selected.find('.gallery-thumg.active')
  $next.removeClass('active')
  $next.next('.gallery-thumg').addClass('active')
  $('.attach-gallery-thumb .gallery-thumg.active').trigger('click')
})
$('.attach-gallery-arrow-left .attach-gallery-arrow-icon').click(function () {
  var $prev
  var $selected = $('.attach-gallery-thumb')
  $prev = $selected.prev('.gallery-thumg')
  $prev = $selected.find('.gallery-thumg.active')
  $prev.removeClass('active')
  $prev.prev('.gallery-thumg').addClass('active')
  $('.attach-gallery-thumb .gallery-thumg.active').trigger('click')
})
/* Project Attachment Gallery Popup JS End ===================*/

/* Multi Task Select Due Date Set JS ===================*/
$(document).on('click', '.TaskMultiSelect .more-option', function () {
  $('.TaskMultiSelect .MoreOptopns').toggleClass('show')
  $('.TaskMultiSelect .DateSet').removeClass('show')
  $('.TaskMultiSelect .MultiAssign').removeClass('show')
  $('.TaskMultiSelect .MultiStatus').removeClass('show')
  $('.TaskMultiSelect .MultiPriority').removeClass('show')
})
$(document).on('click', '.TaskMultiSelect .multi-set-date', function () {
  $('.TaskMultiSelect .DateSet').addClass('show')
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
})
$(document).on('click', '.TaskMultiSelect .multi-assign', function () {
  $('.TaskMultiSelect .MultiAssign').addClass('show')
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('body').addClass('multi-assign-show')
})
$(document).on('click', '.TaskMultiSelect .multi-priority', function () {
  $('.TaskMultiSelect .MultiPriority').addClass('show')
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('body').addClass('multi-status-show')
})
$(document).on('click', '.TaskMultiSelect .multi-status', function () {
  $('.TaskMultiSelect .MultiStatus').addClass('show')
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('body').addClass('multi-status-show')
})

/* Recurring Date JS Start ================================*/
$(document).ready(function () {
  /* Share Popup Static */
  $(document).on('click', "a[data-target='#sharePopup']", function () {
    $('.sharePopup').modal({ backdrop: 'static' })
  })
  /* Recurring Date Popup JS */
  $(".recurring-icon[data-target='#recurring-date']").click(function () {
    $('body').addClass('show-recurring')
    $('#recurring-date').modal({ backdrop: 'static' })
  })
  /* Recurring Option Select to Change Value JS */
  $('.recurring-common .select')
    .change(function () {
      $(this)
        .find('option:selected')
        .each(function () {
          var optionValue = $(this).attr('value')
          if (optionValue) {
            $('.hide-show-div')
              .not('.' + optionValue)
              .hide()
            $('.' + optionValue).show()
          } else {
            $('.hide-show-div').hide()
          }
        })
    })
    .change()

  /* Recurring Option Select to Change Value JS */
  $('.end-select .select')
    .change(function () {
      $(this)
        .find('option:selected')
        .each(function () {
          var optionValue = $(this).attr('value')
          if (optionValue) {
            $('.end-hide-show')
              .not('.' + optionValue)
              .hide()
            $('.' + optionValue).show()
          } else {
            $('.end-hide-show').hide()
          }
        })
    })
    .change()
})
/* Recurring Date JS End ================================*/

/* Rollover Hours */
$(function () {
  $('#rollover-hrs').hide()
  $('#RolloverCheckbox').on('click', function () {
    if ($(this).prop('checked')) {
      $('#rollover-hrs').fadeIn()
    } else {
      $('#rollover-hrs').hide()
    }
  })
})

// Dashboard Start and Stop Timer JS----------------
/*$(document).on('click', '.start-timer .start-time-btn', function () {
  $('.start-timer').removeClass('show')
  $('.stop-timer').addClass('show')
})
$(document).on('click', '.stop-timer .stop-time-btn', function () {
  $('.stop-timer').removeClass('show')
  $('.start-timer').addClass('show')
})*/

// annotation dialog toggle

$(document).on(
  'click',
  '.annotation .dropdown-menu .btn, .top-right-fix-btn .dropdown-menu .btn',
  function () {
    $(this).parents('.dropdown-menu').removeClass('show')
  }
)

$(document).ready(function () {
  $(document).on('click', '.folder-list .rename-link', function () {
    $('.folder-list').removeClass('active-rename')
    $(this).parents('.folder-list').addClass('active-rename')
    $('.rename-input input').focus()
  })
})
$(document).mousedown(function (e) {
  const container = $('.folder-list')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('active-rename')
  }
})
/* Assets Rename JS */
$(document).ready(function () {
  $(document).on('click', '.rename-asset .rename-link', function () {
    $('.rename-asset').removeClass('active-rename')
    $(this).parents('.rename-asset').addClass('active-rename')
    $('.rename-input input').focus()
  })
})
$(document).mousedown(function (e) {
  var container = $('.rename-asset')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('active-rename')
  }
})
// lead details right sidebar toggle
$(document).on('click', '.body-content-fixed-toggle', function () {
  $('body').toggleClass('rightpart-shrink')
})

$(document).ready(function () {
  $('.static-modal-link').click(function () {
    $('.static-modal').modal({ backdrop: 'static' })
  })
})
$(document).ready(function () {
  /* Collection Btn ----------------------- */
  // $(document).on('click', '.collection-btn', function () {
  //   $(this).parents('.collection-box').toggleClass('saved')
  //   $(this).text(function (i, v) {
  //     return v === 'Remove' ? 'Save' : 'Remove'
  //   })
  //   $('.collection-move .title').text(function (i, v) {
  //     return v === 'Remove From Collection'
  //       ? 'Save to Collection'
  //       : 'Remove From Collection'
  //   })
  // })
  /* Collection Btn ----------------------- */
  // $('.collection-box').hover(function () {
  //   $(this).toggleClass('open')
  // })
  /* My Collection ----------------------- */
  $('.my-collection .tbody .categary-name .edit-name').click(function () {
    $('.my-collection .tbody .categary-name').removeClass('editmode')
    $(this).parents('.categary-name').addClass('editmode')
  })
  /* Choose Collection ----------------------- */
  // $(document).on('click', '.choose-collection .link-btn', function () {
  //   $(this).parent().parent().find('.save-collection').addClass('show')
  //   $(this).parent().removeClass('show')
  //   // $('.save-collection').addClass('show')
  //   // $(this).parents('.choose-collection').removeClass('show')
  //   // $('.save-collection-title').addClass('show')
  //   // $('.choose-collection-title').removeClass('show')
  // })
  // /* Save Collection ----------------------- */
  // $(document).on('click', '.save-collection .link-btn', function () {
  //   $(this).parent().removeClass('show')
  //   $(this).parent().parent().find('.choose-collection').addClass('show')

  //   // $('.choose-collection').addClass('show')
  //   // $(this).parents('.save-collection').removeClass('show')
  //   // $('.choose-collection-title').addClass('show')
  //   // $('.save-collection-title').removeClass('show')
  // })
})
// Shared Popup JS

$(document).on('click', '.sharePopup .shared-options', function () {
  $('.advance-share-option').toggleClass('hidden')
})
/* PIN Hide Show */
$(document).on('click', '.toggle-pin', function () {
  $(this).toggleClass('fa-eye fa-eye-slash')
  var input = $($(this).attr('toggle'))
  if (input.attr('type') == 'password') {
    input.attr('type', 'text')
  } else {
    input.attr('type', 'password')
  }
})

$(document).ready(function () {
  $(document).on('click', '.permission-btn', function () {
    $('.top-bar.permission').toggleClass('open')
    $('.top-bar.tags').removeClass('open')
  })

  $(document).on('click', '.tags-btn', function () {
    $('.top-bar.tags').toggleClass('open')
    $('.top-bar.permission').removeClass('open')
  })
})
