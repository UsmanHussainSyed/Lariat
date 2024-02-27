/* Workspce Setting Drag Focus to Change BG Color */
$(document).on('mouseover', '.workspace-setting-table .drag', function () {
  $('.workspace-setting-table .drag').removeClass('focus')
  $(this).addClass('focus')
})
$(document).on(
  'focus',
  '.workspace-setting-table .drag .form-control',
  function () {
    $('.workspace-setting-table .drag').removeClass('focus')
    $(this).parents('.drag').addClass('focus')
  }
)

/* ============= Start Section Name edit ==================== */
/*$(document).ready(function () {
  $(document).on('click', '.section_name', function () {
    let value = $(this).text().trim()
    $(this).addClass('hidden')
    $(this).siblings('.section_edit').removeClass('hidden')
    $(this).siblings('.section_edit').val(value).focus()
  })

  $(document).on('blur', '.section_edit', function () {
    let value = $(this).val().trim()
    $(this).addClass('hidden')
    $(this).siblings('.section_name').removeClass('hidden')
    let newVal = value != '' ? value : 'Untitled Section'
    $(this).siblings('.section_name').text(newVal)
  })

  $(document).on('keyup', '.section_edit', function (e) {
    if (e.keyCode == '13' || e.which == '13') {
      let value = $(this).val().trim()
      $(this).addClass('hidden')
      $(this).siblings('.section_name').removeClass('hidden')
      let newVal = value != '' ? value : 'Untitled Section'
      $(this).siblings('.section_name').text(newVal)
    }
  })
})*/
/* ============== End Section Name edit ======================= */

// Project Brief Project Number Change
$(document).on('click', '.project-number .edit-project-number', function () {
  $(this).parents('.project-number').addClass('edit-number')
})
$(document).on(
  'click',
  '.project-number .btn, .project-number .close-project-number',
  function () {
    $(this).parents('.project-number').removeClass('edit-number')
  }
)

/* Accept Project Popup JS */
$(document).on('click', '.accept-project-link', function () {
  $('#accept-project').modal({ backdrop: 'static' })
})
$(document).on('click', '.common-popup-link', function () {
  $('.common-popup-modal').modal({ backdrop: 'static' })
})
$(document).on('click', '.template-popup-link', function () {
  $('.template-popup-modal').modal({ backdrop: 'static' })
})
/* Share Popup Static */
$(document).on('click', 'a[data-target="#sharePopup"]', function () {
  $('.sharePopup').modal({backdrop: 'static'});
})
/* Client change Popup JS */
$(document).on('click', '#clientChangeDialog', function () {
  $('#client-change').modal({ backdrop: 'static' })
})
/* Client change Popup JS */
$(document).on('click', '#cropLogoDialog', function () {
  $('#crop-logo').modal({ backdrop: 'static' })
})
/* Account Manager ----------------------- */
$(document).on('click', '.account-manager-link', function () {
  $(this).parent().toggleClass('open')
})
$(document).on('click', '.account-manager-close', function () {
  $(this).parents().removeClass('open')
})
$(document).on('mousedown', function (e) {
  var container = $('.account-manager-box')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.parent().removeClass('open')
  }
})
$(document).on('click', '.table-list-view a[aria-expanded="false"]', function () {
  $(this).parents('li.h-auto').toggleClass('open')
})

/* CK Editor */
$(document).ready(function () {
  $(document).on('focus', '.ck-editor .ck-content', function () {
    $(this).parents('.ck-editor').addClass('open')
  })
  // $(document).on('blur','.ck-editor .ck-content', function () {
  //   $(this).parents('.ck-editor').removeClass('open');
  // })
})

$(document).mousedown(function (e) {
  var container = $('.ck-editor,.annotation, .ck.ck-balloon-panel')
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('open')
  }
})
$(document).on('click', '.addEmojiPicker', function () {
  const emojiPickerWidth = 320
  const parentWidth = $(this).parent('.commentEmoji').width()
  const currentPosition = $(this).position()
  const left = currentPosition.left
  const right = parentWidth - left
  const overSpare = right - emojiPickerWidth

  /*console.log('Total:' + parentWidth)
  console.log('Left:' + left)
  console.log('Right:' + right)
  console.log('OverSpace:' + overSpare)*/

  if (right <= emojiPickerWidth) {
    $(this)
      .children('.emoji-mart')
      .css('transform', `translateX(${overSpare}px)`)
  }
})

$(document).ready(function () {
  /*  const dragEnter = $(document).find('.project-body-right.project-brief')
  const dragLeave = $(document).find(
    '.project-body-right.project-brief .drag-and-drop .pm-dropzone'
  )

  console.log('----====' + dragLeave.attr('class'))

  dragEnter.on('dragbetterenter', function () {
    console.log('enter...')
    let activeCommentType = $('.project-brief-comment.active').data('class') // internal, client
    activeCommentType =
      activeCommentType === undefined ? 'client' : activeCommentType

    $('.project-brief-' + activeCommentType + '-attachment ')
      .parents('.tab-pane')
      .addClass('show-attach')
    $(this).addClass('dragging')
  })*/

  /*dragLeave.on('dragbetterleave', function () {
    console.log('leave...')
  })*/

  /* ---------------------------------------------------------------------------  */

  /*$(document).on(
    'dragenter',
    '.project-body-right.project-brief',
    function (e) {
      e.stopPropagation()
      e.preventDefault()
      let activeCommentType = $('.project-brief-comment.active').data('class') // internal, client
      activeCommentType =
        activeCommentType === undefined ? 'client' : activeCommentType

      $('.project-brief-' + activeCommentType + '-attachment ')
        .parents('.tab-pane')
        .addClass('show-attach')
      $(this).addClass('dragging')
      // const attachBtn = document.querySelector('.btn-attach')
      // attachBtn.click()
    }
  )*/

  /* $(document).on(
    'dragleave drop',
    '.project-body-right.project-brief .drag-and-drop',
    function (e) {
      e.stopPropagation()
      e.preventDefault()
      console.log('cccccccc')
      // $(document).find('.drag-and-drop .hide-comment-attach').trigger('click')
      // $('.drag-and-drop .hide-comment-attach').trigger('click')

      //$('.hide-comment-attach').trigger('click')

      let activeCommentType = $('.project-brief-comment.active').data('class') // internal, client
      activeCommentType =
        activeCommentType === undefined ? 'client' : activeCommentType
      $('.project-brief-' + activeCommentType + '-attachment ')
        .parents('.tab-pane')
        .removeClass('show-attach')
      $('.project-body-right.project-brief').removeClass('dragging')
    }
  )*/

  /*  $(document).on('dragenter', 'body', function () {
    $('body').append('<div class="body-drag-enter"></div>')
    console.log('body enter...')
  })*/

  $(document).on('dragenter dragover', 'body', function (e) {
    e.stopPropagation()
    e.preventDefault()
    // check for active tab
    const activeTab = $('.project-tabs li.active').data('tabname')
    if (activeTab === 'project-brief') {
      // for project brief comments
      const hasClient = $(
        "input[name='project_brief_comment_has_client']"
      ).val()
      // console.log(hasClient)
      const defaultType = parseInt(hasClient) === 1 ? 'client' : 'internal'

      let activeCommentType = $('.project-brief-comment.active').data('class') // internal, client
      activeCommentType =
        activeCommentType === undefined ? defaultType : activeCommentType
      // console.log('.project-brief-' + activeCommentType + '-attachment ')
      $('.project-brief-' + activeCommentType + '-attachment ')
        .parents('.tab-pane')
        .addClass('show-attach')
      $('.project-body-right.project-brief').addClass('dragging')
    } else if (activeTab === undefined) {
      // for task-detail and my task detail comments
      const hasClient = $("input[name='task_detail_comment_has_client']").val()
      const defaultType = parseInt(hasClient) === 1 ? 'client' : 'internal'
      let activeCommentType = $('.task-detail-comment.active').data('class') // internal, client
      // console.log(activeCommentType)
      activeCommentType =
        activeCommentType === undefined ? defaultType : activeCommentType
      $('.task-detail-' + activeCommentType + '-attachment ')
        .parents('.tab-pane')
        .addClass('show-attach')
      $('.project-body-right.task-detail').addClass('dragging')
    } else if (activeTab === 'project-budget') {
      // for project budget comment
      $('.project-budget-attachment ')
        .parents('.tab-pane')
        .addClass('show-attach')
      $('.project-body-right.project-budget').addClass('dragging')
    }
  })
  $(document).on('drop', 'body', function (e) {
    e.stopPropagation()
    e.preventDefault()
    // check for active tab
    const activeTab = $('.project-tabs li.active').data('tabname')
    if (activeTab === 'project-brief') {
      // for project brief comments
      const hasClient = $(
        "input[name='project_brief_comment_has_client']"
      ).val()
      const defaultType = parseInt(hasClient) === 1 ? 'client' : 'internal'

      let activeCommentType = $('.project-brief-comment.active').data('class') // internal, client
      activeCommentType =
        activeCommentType === undefined ? defaultType : activeCommentType
      $('.project-brief-' + activeCommentType + '-attachment ')
        .parents('.tab-pane')
        .removeClass('show-attach')
      $('.project-body-right.project-brief').removeClass('dragging')
    } else if (activeTab === undefined) {
      const hasClient = $("input[name='task_detail_comment_has_client']").val()
      const defaultType = parseInt(hasClient) === 1 ? 'client' : 'internal'
      let activeCommentType = $('.task-detail-comment.active').data('class') // internal, client
      activeCommentType =
        activeCommentType === undefined ? defaultType : activeCommentType
      $('.task-detail-' + activeCommentType + '-attachment ')
        .parents('.tab-pane')
        .removeClass('show-attach')
      $('.project-body-right.task-detail').removeClass('dragging')
    } else if (activeTab === 'project-budget') {
      $('.project-budget-attachment ')
        .parents('.tab-pane')
        .removeClass('show-attach')
      $('.project-body-right.project-budget').removeClass('dragging')
    }
  })

  $(document).on('click', '.cs-toggle-attr', function () {
    $(this).parent().parent().parent().removeClass('dragging')
  })
})
