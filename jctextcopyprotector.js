jQuery.fn.jccopyblock = function(settings) {
          settings = jQuery.extend({
            blockRightClick:true,
            blockDocTextSelection:true,
            useCSS:true,
            blockPageSave:false,
            alertUser:false,
            alertMessage:'Sorry! Content copy is not allowed?',
            callback:function(){}
          },settings);
          if(settings.blockRightClick) {
            jQuery(document).contextmenu(function(evt){
                if(settings.alertUser && settings.alertMessage.length > 0) {
                  alert(settings.alertMessage);
                }
                evt.preventDefault();        
                return false;
            });
          }
          if(settings.blockDocTextSelection && !settings.useCSS) {
            jQuery(document)[0].onselectstart = function(evt) { 
                if(settings.alertUser && settings.alertMessage.length > 0) {
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
            jQuery(document).keydown(function(e) {
                if (settings.blockPageSave && e.ctrlKey && (e.which == 83 || e.which == 115 || e.which == 97 || e.which == 65 || e.which == 67 || e.which == 99)) { // blocks CTRL c (copy)+a(select all)+s(save)
                  if(settings.alertUser && settings.alertMessage.length > 0) {
                    alert(settings.alertMessage);
                  }
                  e.preventDefault();
                  return false;
                }
            });                     
        };