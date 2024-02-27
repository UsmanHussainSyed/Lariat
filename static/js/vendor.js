$(window).on('load', function () {
  $('.preloader').fadeOut('slow')

  var csb = $('.table-list-scrolling .customscrollbar').outerHeight()
  var tb = $('.table-list-scrolling .tbody').outerHeight()
  if (tb > csb) {
    $('.table-list-scrolling').addClass('scrolling')
  } else {
    $('.table-list-scrolling').removeClass('scrolling')
  }

  var csb2 = $('.table-list-scrolling.s2 .customscrollbar').outerHeight()
  var tb2 = $('.table-list-scrolling.s2 .tbody').outerHeight()
  if (tb2 > csb2) {
    $('.table-list-scrolling.s2').addClass('scrolling')
  } else {
    $('.table-list-scrolling.s2').removeClass('scrolling')
  }
})

/* Tooltip ----------------------- */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function () {
  /* Collection Btn ----------------------- */
  $('.collection-btn').click(function () {
    $(this).parents('.collection-box').toggleClass('saved')
    $(this).text(function (i, v) {
      return v === 'Remove' ? 'Save' : 'Remove'
    })
    $('.collection-move .title').text(function (i, v) {
      return v === 'Remove From Collection'
        ? 'Save to Collection'
        : 'Remove From Collection'
    })
  })
  /* Collection Btn ----------------------- */
  $('.collection-box').hover(function () {
    $(this).toggleClass('open')
  })
  /* My Collection ----------------------- */
  $('.my-collection .tbody .categary-name .edit-name').click(function () {
    $('.my-collection .tbody .categary-name').removeClass('editmode')
    $(this).parents('.categary-name').addClass('editmode')
  })
  /* Choose Collection ----------------------- */
  $('.choose-collection .link-btn').click(function () {
    $('.save-collection').addClass('show')
    $(this).parents('.choose-collection').removeClass('show')
    $('.save-collection-title').addClass('show')
    $('.choose-collection-title').removeClass('show')
  })
  /* Save Collection ----------------------- */
  $('.save-collection .link-btn').click(function () {
    $('.choose-collection').addClass('show')
    $(this).parents('.save-collection').removeClass('show')
    $('.choose-collection-title').addClass('show')
    $('.save-collection-title').removeClass('show')
  })

  /* Annotation Dropdown Hide ----------------------- */
  $(
    '.annotation .dropdown-menu .btn, .top-right-fix-btn .dropdown-menu .btn'
  ).click(function () {
    $(this).parents('.dropdown-menu').removeClass('show')
  })

  /* Table Asc and Desc Order ----------------------- */
  $('.table-list-view .sortarrow span').click(function () {
    $(this).parent('.sortarrow').toggleClass('active')
  })

  /* Assign Products Scroll to Hide Popup JS ----------------------- */
  $('.customscrollbar').scroll(function () {
    $('.table-list-view .products .dropdown').removeClass('show')
    $('.table-list-view .products .dropdown-menu').removeClass('show')
  })

  /* Quick Note Big JS ----------------------- */
  $('.customscrollbar').scroll(function () {
    $('.table-list-view .QuickNoteBig .dropdown').removeClass('show')
    $('.table-list-view .QuickNoteBig .dropdown-menu').removeClass('show')
  })
  /*$('.QuickNoteBig .QuickNoteLink').click(function(){
		$(this).parents('.QuickNoteBig').addClass('show');
	});
	$(document).mousedown(function(e) {
		var container = $(".QuickNoteBig");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.removeClass('show');
		}
	});*/

  /* Lead Detail Choose File JS ----------------------- */
  $('#chooseFile').bind('change', function () {
    var filename = $('#chooseFile').val()
    if (/^\s*$/.test(filename)) {
      $('.file-upload').removeClass('active')
      $('#noFile').text('No file chosen...')
    } else {
      $('.file-upload').addClass('active')
      $('#noFile').text(filename.replace('C:\\fakepath\\', ''))
    }
  })

  /* Table Detail View JS ----------------------- */
  $('.header-right #detailView').click(function () {
    if ($(this).is(':checked')) {
      $('.multi-table-view').addClass('show-detail')
    } else if ($(this).is(':not(:checked)')) {
      $('.multi-table-view').removeClass('show-detail')
    }
  })

  /* hourly tracking action ----------------------- */
  $('.hr-date label input').click(function () {
    if ($(this).is(':checked')) {
      $('body').addClass('show-actions leftpart-shrink')
    } else if ($(this).is(':not(:checked)')) {
      $('body').removeClass('show-actions')
    }
  })

  // Normal Select
  $('.select').select2({
    minimumResultsForSearch: 1,
  })

  // Search By Select
  $('.search-by select').select2({
    minimumResultsForSearch: -1,
    dropdownCssClass: 'search-by-list',
  })

  // Table Head Filter Select
  $('.FilterMultiSelect select').select2({
    dropdownCssClass: 'FilterMultiSelectList',
  })

  /*User Image Dropdown ----------------------- */
  function custom_template(obj) {
    var data = $(obj.element).data()
    var text = $(obj.element).text()
    if (data && data['img_src']) {
      img_src = data['img_src']
      template = $('<img src="' + img_src + '"><p>' + text + '</p>')
      return template
    } else {
      template = $(
        "<span class='fl-as-imgtxt text-uppercase'>" +
          text.charAt(0) +
          '</span><p>' +
          text +
          '</p>'
      )
      return template
    }
  }
  var options = {
    templateSelection: custom_template,
    templateResult: custom_template,
    dropdownCssClass: 'assignee-select',
  }
  $('.assignee-select').select2(options)

  /* Owner Image Dropdown ----------------------- */
  function owner_template(obj) {
    var data = $(obj.element).data()
    var text = $(obj.element).text()
    if (data && data['img_src']) {
      img_src = data['img_src']
      template = $('<img src="' + img_src + '"><p>' + text + '</p>')
      return template
    } else {
      template = $(
        "<span class='fl-as-imgtxt text-uppercase'>" +
          text.charAt(0) +
          '</span><p>' +
          text +
          '</p>'
      )
      return template
    }
  }
  var options = {
    templateSelection: owner_template,
    templateResult: owner_template,
    dropdownCssClass: 'owner-select',
  }
  $('.owner-select').select2(options)

  /* Status Dropdown ----------------------- */
  function statusSelect(obj) {
    var data = $(obj.element).data()
    var text = $(obj.element).text()
    if (data && data['color'] && data['tcolor']) {
      var color = data['color']
      var tcolor = data['tcolor']
      template = $(
        '<span class="bg" style="background:' +
          color +
          '"><p style="color:' +
          tcolor +
          '">' +
          text +
          '</p></span>'
      )
      return template
    }
  }
  function formatState(state) {
    if (!state.id) {
      return state.text
    }
    var data = $(state.element).data()
    var color = data['color']
    var tcolor = data['tcolor']
    var $state = $(
      '<span style="background:' +
        color +
        ';color:' +
        tcolor +
        '">' +
        state.text +
        '</span>'
    )
    return $state
  }
  $('.status-select').select2({
    templateResult: formatState,
    templateSelection: statusSelect,
    dropdownCssClass: 'status-select',
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
  $('.search-filter-btn, .filter-close, .body-overlay').click(function () {
    $('.filter-menu').toggleClass('show')
    $('body').toggleClass('show-overly')
  })

  // Filter Dropdown
  $('.filter-dropdown-toggle').click(function () {
    $(this).parents('.filter-dropdown').toggleClass('open')
  })
  $(document).mouseup(function (e) {
    var container = $('.filter-dropdown')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('open')
    }
  })

  // Project Brief Project Number Change
  $('.project-number .edit-project-number').click(function () {
    $(this).parents('.project-number').addClass('edit-number')
  })
  $('.project-number .btn').click(function () {
    $(this).parents('.project-number').removeClass('edit-number')
  })

  // Video Hover js
  $('.video').each(function () {
    $(this).on('mouseover', function (e) {
      if ($(this).find('video source').attr('src') == '') {
        var videoLink = $(this).attr('data-src')
        $(this).find('video source').attr('src', videoLink)
        $('.thevideo', this).get(0).load()
        $('.thevideo', this).get(0).play()
      }
      $('.thevideo', this).get(0).play()
    })

    $(this).on('mouseout', function () {
      $('.thevideo', this).get(0).pause()
    })
  })

  // fancybox popup
  if ($('[data-fancybox]').length > 0) {
    $('[data-fancybox]').fancybox({
      video: {
        tpl:
          '<video class="fancybox-video"  controlsList="nodownload" poster="">' +
          '<source src="{{src}}" type="{{format}}" />' +
          'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
          '</video>',
        format: '', // custom video format
        autoStart: true,
      },
    })
  }

  /* Comment Attach ----------------------- */
  $('.side-baar-comment-box .btn-attach').click(function () {
    $(this).parents('.tab-pane').addClass('show-attach')
  })
  $('.side-baar-comment-box .hide-comment-attach').click(function () {
    $(this).parents('.tab-pane').removeClass('show-attach')
  })

  /* Add Version ----------------------- */
  $('.tabbing-inner .btn-version').click(function () {
    $('body').addClass('show-version')
  })
  $('.detail-right-actions .hide-version').click(function () {
    $('body').removeClass('show-version')
  })
  $('.version-history > li').click(function () {
    $('.version-history > li').removeClass('active')
    $(this).addClass('active')
  })

  /*  double click to edit text */
  $('.dblclick').editable('save.php', {
    tooltip: 'Doubleclick to edit...',
    event: 'dblclick',
    style: 'inherit',
    placeholder: 'New Section',
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

/* Status Color */
/*$(document).ready(function() {
	$(".project_task_list").each(function() {
		var statusbg = $('.project_task_row .status .status-dropdown .bg').attr('style');
		alert(statusbg);
		//$('.project_task_row .StatusBgColor').css(statusbg);
	});
});*/

/*function statuscolor() {
	$(".project_task_row").each(function() {
		var statusbg = $(this).childrens('.bg').attr("style");
		alert(statusbg);
		//$(this).append('<div class="statusBG"></div>');
		$(this).children('.StatusBgColor').css('background-color', statusbg);
	});
}*/
/*$(function () {
	$(".project_task_row .status .status-dropdown").change(function () {
		var selectedText = $(this).children().find(".bg").attr();
		alert("Selected Text: " + selectedText);
	});
});*/

$(window).on('load', function () {
  setbg()
  dashboard()
})
$(window).on('resize', function () {
  setbg()
  dashboard()
})

// Input Run Time Change Value With Auto Width----------------
$(document).on('keyup', '.editable__textarea', function () {
  var inputValue = $(this).val()
  var shadowDiv = $(document).find(
    '.editable__box.editable__focuschild .editable__preview'
  )
  shadowDiv.html(inputValue)
})
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

/* Navigation ----------------------- */
$(document).ready(function () {
  // Menu Active Class----------------
  $('.nav-main li a')
    .filter(function () {
      'use strict'
      return this.href == location.href.replace(/#.*/, '')
    })
    .parents('li')
    .addClass('active')
})

;(function ($) {
  'use strict'
  var $items = $('.nav-main li.nav-parent')
  function expand($li) {
    $li.children('ul.nav-children').slideDown('fast', function () {
      $li.addClass('nav-expanded')
      $(this).css('display', '')
      ensureVisible($li)
    })
  }
  function collapse($li) {
    $li.children('ul.nav-children').slideUp('fast', function () {
      $(this).css('display', '')
      $li.removeClass('nav-expanded')
    })
  }
  function ensureVisible($li) {
    var scroller = $li.offsetParent()
    if (!scroller.get(0)) {
      return false
    }
    var top = $li.position().top
    if (top < 0) {
      scroller.animate(
        {
          scrollTop: scroller.scrollTop() + top,
        },
        'fast'
      )
    }
  }
  function buildSidebarNav(anchor, prev, next, ev) {
    if (anchor.prop('href')) {
      var arrowWidth =
        parseInt(window.getComputedStyle(anchor.get(0), ':after').width, 10) ||
        0
      if (ev.offsetX > anchor.get(0).offsetWidth - arrowWidth) {
        ev.preventDefault()
      }
    }
    if (prev.get(0) !== next.get(0)) {
      collapse(prev)
      expand(next)
    } else {
      collapse(prev)
    }
  }
  $items.find('> a').on('click', function (ev) {
    var $html = $('html'),
      $window = $(window),
      $anchor = $(this),
      $prev = $anchor.closest('ul.nav').find('> li.nav-expanded'),
      $next = $anchor.closest('li'),
      $ev = ev
    if ($anchor.attr('href') == '#') {
      ev.preventDefault()
    }
    if (!$html.hasClass('sidebar-left-big-icons')) {
      buildSidebarNav($anchor, $prev, $next, $ev)
    } else if (
      $html.hasClass('sidebar-left-big-icons') &&
      $window.width() < 768
    ) {
      buildSidebarNav($anchor, $prev, $next, $ev)
    }
  })
}.apply(this, [jQuery]))

/* Date Calendar ----------------------- */
$(document).ready(function () {
  $('.datepicker').flatpickr({
    dateFormat: 'M d, y',
    monthSelectorType: 'static',
  })
})
/* inline Date Calendar ----------------------- */
$(document).ready(function () {
  $('.day-calendar input').flatpickr({
    dateFormat: 'M d, y',
    inline: true,
    monthSelectorType: 'static',
  })
})

/* Date Range Calendar ----------------------- */
$(document).ready(function () {
  $('.daterange').flatpickr({
    mode: 'range',
    dateFormat: 'M d, y',
    monthSelectorType: 'static',
  })
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

/* file upload functions */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader()
    reader.onload = function (e) {
      $('.image-upload-wrap').hide()
      $('.file-upload-image').attr('src', e.target.result)
      $('.file-upload-content').show()
      $('.image-title').html(input.files[0].name)
    }
    reader.readAsDataURL(input.files[0])
  } else {
    removeUpload()
  }
}
function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone())
  $('.file-upload-content').hide()
  $('.image-upload-wrap').show()
}

/* Left/Right sidebar toggle ======= */
$(document).ready(function () {
  $(document).on('click', '.body-content-fixed-toggle', function () {
    $('body').toggleClass('rightpart-shrink')
  })
	$(document).on("click",".shrink", function() {
		$('body').toggleClass('leftpart-shrink')
		$('body').removeClass('rightpart-shrink')
	})
	$(document).on("click","body.leftpart-shrink .clickBox", function() {
		$('body').removeClass('leftpart-shrink')
		$('body').removeClass('quick-view')
		$('body').removeClass('rightpart-shrink')
	})
  // $(document).on(
  //   'click',
  //   'body:not(.leftpart-shrink) .rightClickBox',
  //   function () {
  //     $('body').addClass('leftpart-shrink')
  //   }
  // )
  $(document).on('click', '.quick-view-open', function () {
    $('body').addClass('quick-view')
		$('body').addClass('leftpart-shrink')
		$('body').removeClass('rightpart-shrink')
  })
  $(document).on('click', '.close-quick-view', function () {
		$('body').removeClass('quick-view')
		$('body').removeClass('rightpart-shrink')
		$('body').addClass('leftpart-shrink')
  })
  $(document).on("click",".RightShrink", function() {
		$('body').toggleClass('rightpart-shrink')
		$('body').addClass('leftpart-shrink')
	})
  $(document).on("click","body:not(.rightpart-shrink) .rightClickBox", function() {
		$('body').addClass('rightpart-shrink')
		$('body').addClass('leftpart-shrink')
	})
})

/* Workspce Setting Drag Focus to Change BG Color */
$(document).ready(function () {
  $('.workspace-setting-table .drag').hover(
    function () {
      $('.workspace-setting-table .drag').removeClass('focus')
      $(this).addClass('focus')
    },
    function () {
      $('.workspace-setting-table .drag').removeClass('focus')
      $(this).removeClass('focus')
    }
  )
})
$(document).on(
  'focus',
  '.workspace-setting-table .drag .form-control',
  function () {
    $('.workspace-setting-table .drag').removeClass('focus')
    $(this).parents('.drag').addClass('focus')
  }
)

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

/* Manage Banner Image Upload with Preview Image ===================*/
$(document).ready(function () {
  $(document).on('change', '.btn-file :file', function () {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '')
    input.trigger('fileselect', [label])
  })
  $('.btn-file :file').on('fileselect', function (event, label) {
    var input = $(this).parents('.input-group').find(':text'),
      log = label
    if (input.length) {
      input.val(log)
    } else {
      if (log) alert(log)
    }
  })
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = function (e) {
        $('#img-upload').attr('src', e.target.result)
        $('.upload-img-preview .prev-img-btn').show()
        setbg()
      }
      reader.readAsDataURL(input.files[0])
    }
  }
  $('#imgInp').change(function () {
    readURL(this)
  })
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
  $('body').removeClass('multi-assign-show')
  $('body').removeClass('multi-status-show')
})
$(document).on('click', '.TaskMultiSelect .multi-set-date', function () {
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('.TaskMultiSelect .DateSet').addClass('show')
  $('.TaskMultiSelect .MultiAssign').removeClass('show')
  $('.TaskMultiSelect .MultiStatus').removeClass('show')
  $('.TaskMultiSelect .MultiPriority').removeClass('show')
  $('body').removeClass('multi-assign-show')
  $('body').removeClass('multi-status-show')
})
$(document).on('click', '.TaskMultiSelect .multi-assign', function () {
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('.TaskMultiSelect .DateSet').removeClass('show')
  $('.TaskMultiSelect .MultiAssign').addClass('show')
  $('.TaskMultiSelect .MultiStatus').removeClass('show')
  $('.TaskMultiSelect .MultiPriority').removeClass('show')
  $('body').addClass('multi-assign-show')
  $('body').removeClass('multi-status-show')
})

$(document).on('click', '.TaskMultiSelect .multi-status', function () {
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('.TaskMultiSelect .DateSet').removeClass('show')
  $('.TaskMultiSelect .MultiAssign').removeClass('show')
  $('.TaskMultiSelect .MultiStatus').addClass('show')
  $('.TaskMultiSelect .MultiPriority').removeClass('show')
  $('body').removeClass('multi-assign-show')
  $('body').addClass('multi-status-show')
})
$(document).on('click', '.TaskMultiSelect .multi-priority', function () {
  $('.TaskMultiSelect .MoreOptopns').removeClass('show')
  $('.TaskMultiSelect .DateSet').removeClass('show')
  $('.TaskMultiSelect .MultiAssign').removeClass('show')
  $('.TaskMultiSelect .MultiStatus').removeClass('show')
  $('.TaskMultiSelect .MultiPriority').addClass('show')
  $('body').removeClass('multi-assign-show')
  $('body').addClass('multi-status-show')
})

/* Recurring Date JS Start ================================*/
$(document).ready(function () {
  /* Modal Popup Outside Click to Not Close */
  $('.static-modal-link').click(function () {
    $('.static-modal').modal({ backdrop: 'static' })
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
$(document).on('click', '.start-timer .start-time-btn', function () {
  $('.start-timer').removeClass('show')
  $('.stop-timer').addClass('show')
})
$(document).on('click', '.stop-timer .stop-time-btn', function () {
  $('.stop-timer').removeClass('show')
  $('.start-timer').addClass('show')
})

// Main Menu Click Hide Show JS----------------
$(document).on('click', '.main-left:not(.show)', function () {
  $(this).addClass('show')
})
$(document).on(
  'click',
  '.main-left .nav.nav-children > li:not(.sub-nav) > .nav-link',
  function () {
    $(this).parents('.main-left').removeClass('show')
  }
)
$(document).mouseup(function (e) {
  var container = $('.main-left')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('show')
  }
})

// Grid and List View----------------
$(document).on('click', '.gried-view span', function () {
  $('.gried-view span').removeClass('active')
  $(this).addClass('active')
})
$(document).on('click', '.gried-view .gridview', function () {
  $('.resource-wrapper').addClass('grid-tile')
  $('.resource-wrapper').removeClass('grid-list')
  $('.dam-container').removeClass('show-panal-list')
})
$(document).on('click', '.gried-view .listview', function () {
  $('.resource-wrapper').addClass('grid-list')
  $('.resource-wrapper').removeClass('grid-tile')
  $('.dam-container').removeClass('show-panal-list')
})
$(document).on('click', '.gried-view .panalview', function () {
  $('.dam-container').addClass('show-panal-list')
})

/* Task Description Updated JS */
$('.activity-desc').click(function () {
  var link = $(this)
  $('.showpanel').slideToggle('slow', function () {
    if ($(this).is(':visible')) {
      link.text('Hide Description')
    } else {
      link.text('Show Description')
    }
  })
})

/* Project Main Search */
$(document).ready(function () {
  $('.main-search-box .search-result-option').hover(function () {
    $('.search-result-option').removeClass('selected')
    $(this).addClass('selected')
  })
})

/* Custom Tooltip */
$('.tip').each(function () {
  $(this).tooltip({
    html: true,
    title: $('#' + $(this).data('tip')).html(),
  })
})

/* CK Editor */
$(document).ready(function () {
  $('.ck-editor .ck-content').focus(function () {
    $(this).parents('.ck-editor').addClass('open')
  })
})
$(document).mousedown(function (e) {
  var container = $('.ck-editor, .annotation, .ck.ck-balloon-panel')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('open')
  }
})

/* DAM Checkbox Check to Bottom Bar Show */
$('.resource-wrapper ul.tbody li input, .categary-selectbar input').change(
  function () {
    if ($(this).is(':checked')) {
      $(this).parents('.resource-wrapper ul.tbody li').addClass('selected-box')
      $(this).parents('.categary-selectbar').addClass('selected')
    } else {
      $(this)
        .parents('.resource-wrapper ul.tbody li')
        .removeClass('selected-box')
      $(this).parents('.categary-selectbar').removeClass('selected')
    }
    if (
      $(
        '.dam-container .resource-wrapper ul.tbody li input, .categary-selectbar input'
      ).is(':checked')
    ) {
      $('body').addClass('selectBaractive')
    } else {
      $('body').removeClass('selectBaractive')
    }
  }
)

/* Life of Lead Hide Show */
$('.tl-item').click(function(event){
	$('.tl-item').removeClass('active');
	$('.life-of-lead').removeClass('active-lead');
	$(this).addClass('active');
	var myindex =  $(this).attr("data-index");
	$('.life-of-lead[data-index="' + myindex + '"]').addClass('active-lead');
});
/* Profile Workspace */
$(function () {
  $('.profile-access-box .workspace-access-title input').on(
    'click',
    function () {
      if ($(this).prop('checked')) {
        $('.profile-access-box').removeClass('selected')
        $(this).parents('.profile-access-box').addClass('selected')
      }
    }
  )
})

/* Folder Rename JS */
$(document).ready(function () {
  $('.folder-list .rename-link').click(function () {
    $('.folder-list').removeClass('active-rename')
    $(this).parents('.folder-list').addClass('active-rename')
    $('.rename-input input').focus()
  })
})
$(document).mousedown(function (e) {
  var container = $('.folder-list')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('active-rename')
  }
})
$(document).ready(function(){
  $(".static-modal-link").click(function(){
		$('.static-modal').modal({backdrop: 'static'})
	})
})

/* Add Life of Lead ======= */
$(document).ready(function() {
	$(document).on("click","#addLifeofLead", function() {
		$('.active-lead').hide();
		$('.new-leads').show();
	});
	$(document).on("click","#cancelLifeofLead", function() {
		$('.active-lead').show();
		$('.new-leads').hide();
	});
});
/* Add Note ======= */
$(document).ready(function() {
	$(document).on("click","#addNote", function() {
		$('.active-note').hide();
		$('.new-notes').show();
	});
	$(document).on("click","#cancelNote", function() {
		$('.active-note').show();
		$('.new-notes').hide();
	});
});
