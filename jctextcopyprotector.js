jQuery.fn.jctextcopyprotector = function(settings) {
          settings = jQuery.extend({
            blockRightClick:true,
            blockDocTextSelection:true,
            useCSS:true,
            blockPageSave:true,
            alertUser:false,
            alertMessage:'Sorry! Content copy is not allowed?',
            callback:function(){}
          },settings);
          if(settings.blockRightClick) {
            jQuery(document).contextmenu(function(evt){
                if(settings.alertUser) {
                  alert(settings.alertMessage);
                }
                evt.preventDefault();        
                return false;
            });
          }
          if(settings.blockDocTextSelection && !settings.useCSS) {
            jQuery(document)[0].onselectstart = function(evt) { 
                if(settings.alertUser) {
                  alert(settings.alertMessage);
                }
                evt.preventDefault();
                return false;
            };
          }
          else if(settings.blockDocTextSelection && settings.useCSS) {
                jQuery('html,body').css({
                   '-moz-user-select':'none',
                   '-webkit-user-select':'none',
                   'user-select':'none',
                   '-ms-user-select':'none'
               });
          } 
          if(settings.blockPageSave) {
            var ctrl = false;
            jQuery(window).keydown(function(e) {
                if (e.keyCode == 17) ctrl = true;
            }).keyup(function(e) {
                if (e.keyCode == 17) ctrl = false;
            });
            jQuery(window).keydown(function(e) {
                if (ctrl && (e.keyCode == 83 || e.keyCode == 115 || e.keyCode == 97 || e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 99)) { // blocks CTRL c (copy)+a(select all)+s(save)
                  return false;
                }
            });           
          }
        };