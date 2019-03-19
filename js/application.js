'use strict';

$(function () {
  return retinajs();
});

$(function () {
  $('[before-scroll], [after-scroll]').each(function () {
    var $this = $(this),
        beforeOffset = $this.attr('before-offset') || 0,
        afterOffset = $this.attr('after-offset') || 0,
        clientHeight = $this[0].clientHeight,
        offsetTop = $this[0].offsetTop,
        beforeClass = $this.attr('before-scroll'),
        afterClass = $this.attr('after-scroll'),
        beforeOnce = $this.attr('before-once') !== 'false',
        afterOnce = $this.attr('after-once') !== 'false',
        scrollHandler = function scrollHandler() {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
          isBefore = scrollTop + window.innerHeight - ($this.offset().top + $this[0].clientHeight / 2) < -beforeOffset,
          isAfter = scrollTop - ($this.offset().top + $this[0].clientHeight / 2) > afterOffset;
      if (beforeClass && beforeClass == afterClass) {
        if (isBefore || isAfter) {
          $this.addClass(beforeClass);
        } else {
          $this.removeClass(beforeClass);
          if (beforeOnce || afterOnce) {
            $(window).unbind('scroll', scrollHandler);
          }
        }
      } else {
        if (beforeClass) {
          if (isBefore) {
            $this.addClass(beforeClass);
          } else {
            $this.removeClass(beforeClass);
            if (beforeOnce) {
              $(window).unbind('scroll', scrollHandler);
            }
          }
        }
        if (afterClass) {
          if (isAfter) {
            $this.addClass(afterClass);
          } else {
            $this.removeClass(afterClass);
            if (afterOnce) {
              $(window).unbind('scroll', scrollHandler);
            }
          }
        }
      }
    };
    $(window).bind('scroll', scrollHandler);
  });
  $(window).trigger('scroll');
  $(window).on('resize', function () {
    $(window).trigger('scroll');
  });
});

$(function () {
  var $teaser = $('.teaser'),
      $next = $teaser ? $teaser.find('.next') : null;
  if ($teaser.length && $next.length) {
    $next.on('click', function () {
      $('html,body').stop().animate({ scrollTop: $teaser.next().offset().top }, 500);
    });
  }
});

$(function () {
  var $teaser = $('.teaser'),
      assets = ['teaser-bg.jpg', 'teaser-works--small.png'],
      assetsLoaded = 0;
  assets.forEach(function (src) {
    var $img = $('<img src="/img/' + src + '" display="none"/>');
    if ($img[0].naturalHeight) {
      assetsLoaded++;
    } else {
      $img.on('load', function () {
        assetsLoaded++;
        if (assetsLoaded == assets.length) {
          $('.teaser').removeClass('loading');
        }
      });
    }
  });
  if (assetsLoaded < assets.length) {
    $teaser.addClass('loading');
  }
});