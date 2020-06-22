/*
 * Treehouse Scrollable
 * 
 * Compatible with jQuery 1.4.4+
 *
 * @author Marcin Kossakowski
 * @author Joshua Lees
 * 
 */

(function($) {

  $.fn.thScrollable = function(options) {

      var options = $.extend({
          showItems: 5,
          prevElement: '.scrollable-prev',
          nextElement: '.scrollable-next',
    hideControls: false,
          itemElement: 'li',
          fadeSpeed: 500,
          onFirst: function() {},
          onLast: function() {},
          onChange: function() {}
      }, options);

      

      return this.each(function() {

          // Start
    var $this = this;
          var groups = [];
          var currentIndex = 0;
          var list = $(this).find(options.itemElement).hide().get();
          var evenGroupsCount = Math.floor(list.length / options.showItems);

          var i = 0;
          while (i < evenGroupsCount) {
              groups[i] = options.showItems;
              i++;
          }
          if (list.length - (groups.length * options.showItems) !== 0) {
              groups.push(list.length - (groups.length * options.showItems));
          }

          function groupIndex(mode) {
              var max = groups.length;
              var index = currentIndex;

              if (mode == 'next') {
                  if (index < max) {
                      index++;
                  }
                  else {
                      index = 1;
                  }
              }
              else {
                  if (index > 1) {
                      index--;
                  }
                  else {
                      index = max;
                  }
              }

              return index;
          }

          function listShow(mode) {
              var i = 0;
              var pointer;

              if (mode == 'prev') {
                  pointer = $(list).filter(":visible:first")[0] || $(list).first()[0];

              }
              else if (mode == 'next') {
                  pointer = $(list).filter(":visible:last")[0] || $(list).last()[0];
              }
              currentIndex = groupIndex(mode);

              $(list).hide();

              while (i < groups[currentIndex - 1]) {
                  if (mode == 'prev') {
                      pointer = $(pointer).prev()[0] || $(list).last()[0];
                  }
                  else if (mode == 'next') {
                      pointer = $(pointer).next()[0] || $(list).first()[0];
                  }


                  $(pointer).fadeIn(options.fadeSpeed);

                  i++;
              }




              $($this).find(options.prevElement).unbind('click');
              $($this).find(options.prevElement).bind('click', function() {
                  listShow('prev');
        return false;
              });

              $($this).find(options.nextElement).unbind('click');
              $($this).find(options.nextElement).bind('click', function() {
                  listShow('next');
        return false;
              });
      
      if(groups.length > 1) {
        $($this).find(options.nextElement).show();
        $($this).find(options.prevElement).show();
      } else {
        $($this).find(options.nextElement).hide();
        $($this).find(options.prevElement).hide();
      }
      
              if (currentIndex === 1) {
                  options.onFirst.call($this);
              } else if (currentIndex === (groups.length)) {
                  options.onLast.call($this);
              }

              options.onChange.call($this, {
                  currentPage: currentIndex,
                  totalPages: groups.length
              });

          };

          listShow('next');

      });
  };
})(jQuery);