// turn on foundation
$(document).foundation();
$(document).ready(function () {
  //Prevent mega nav overlap on 641px and up
  if (window.innerWidth >= 641) {
    $('ul#top-nav-list > li').find('.m-menu').hide();
    $('ul#top-nav-list > li').hover(function () {
      $(this).siblings().find('.m-menu').hide();
      $(this).find('.m-menu').toggle();
    });
  }

  ; // Prevents scrolling to top on empty top nav links

  $('li.has-dropdown > a[href$="#"]').click(function (e) {
    e.preventDefault();
  }); //Scroll to top button

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scrollToTop').fadeIn();
    } else {
      $('#scrollToTop').fadeOut();
    }
  });
  $('#scrollToTop').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  }); // Service box alignment fix for incomplete rows in DES template

  $('.home#services .row div.service-item:last-of-type').addClass('end'); //City Scroll & Map Zoom Preventer 

  $('#home-city-list-wrap').click(function () {
    $(this).css('pointer-events', 'none');
    $('#home-city-list').css('pointer-events', 'visible');
  }); //colorbox

  $('a.lightbox_caption').colorbox({
    title: function () {
      if ($(this).attr('title') != '') {
        return '<div class="lightbox_caption_span">' + $(this).attr('title') + '</div>';
      } else {
        return '';
      }
    },
    opacity: '0.6'
  });
  $('a.lightbox').colorbox({
    title: '<span style="display:none;"></span>',
    opacity: '0.6',
    scalePhotos: true,
    width: '90%',
    maxWidth: '800px'
  });
  $('a.colorlink').colorbox({
    inline: true,
    opacity: '0.6'
  });
  $("#carousel").tabs();
  $(".mag").append("<span></span>");
  $(".arrow-button").append("<span></span>");
});

function nextTab() {
  currentTab = $('#carousel').tabs('option', 'selected');
  numTabs = $('#carousel > ul > li').size();
  newTab = currentTab + 1;

  if (newTab == numTabs) {
    newTab = 0;
  }

  $("#carousel").tabs('select', newTab);
  return false;
}

function prevTab() {
  currentTab = $('#carousel').tabs('option', 'selected');
  numTabs = $('#carousel > ul > li').size();

  if (currentTab < 1) {
    newTab = numTabs - 1;
  } else {
    newTab = currentTab - 1;
  }

  $("#carousel").tabs('select', newTab);
  return false;
} // DES Open Hours Fix


$('p.today:contains(":")').html(function () {
  return $(this).html().replace("Today's Hours: ", "<span>Today's Hours: </span>");
});
$('p.today:contains("open")').html(function () {
  return $(this).html().replace("We're open ", "<span>We're open</span>");
});
$('div.open-hours').css('width', 'auto'); // Meganav Accessibility

const topLevelLinks = document.querySelectorAll('.has-dropdown > a');
topLevelLinks.forEach(link => {
  if (link.nextElementSibling) {
    link.addEventListener('focus', function () {
      this.parentElement.classList.add('focus');
    });
    const dropdown = link.nextElementSibling;
    const dropdownLinks = dropdown.querySelectorAll('.m-menu-ul a');
    const lastLinkIndex = dropdownLinks.length - 1;
    const lastLink = dropdownLinks[lastLinkIndex];
    lastLink.addEventListener('blur', function () {
      link.parentElement.classList.remove('focus');
    });
  }
});