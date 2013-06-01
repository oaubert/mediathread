/* requires jQueryUI */

function ajaxDelete(link, container, opts) {
    var postUrl = null;
    if (link && link.href) {
        postUrl = link.href;
    } else if (opts && opts.href) {
        postUrl = opts.href;
    } else {
        alert("An error occurred. Unable to delete this item.");
    }    
    
    var dom = document.getElementById(container);
    jQuery(dom).addClass('about-to-delete');
    
    var msg = "Are you sure you want to delete this?";
    if (opts) {
        if (opts.item) {
            msg = "Are you sure you want to remove this item from your collection?";            
        } else if (opts.object_type) {
            msg = "Are you sure you want to delete this " + opts.object_type + "?";
        }
    }
    
    jQuery("#dialog-confirm").html(msg);
    
    jQuery("#dialog-confirm" ).dialog({
        resizable: false,
        height: 140,
        modal: true,
        title: "Confirm action",
        close: function(event, ui) {
            jQuery(dom).removeClass('about-to-delete');
        },
        buttons: {
            "Cancel": function() {
                jQuery(this).dialog("close");                
            },
            "OK": function() {
                jQuery(this).dialog("close");
                jQuery.ajax({
                    type: 'POST',
                    url: postUrl,
                    success: function (responseText, textStatus, xhr) {
                        if (xhr.status === 200) {
                            jQuery(dom).fadeOut(function () {
                                jQuery(dom).remove();
                            });
                        } else {
                            alert("Error: " + textStatus);
                        }
                        if (opts && opts.success) {
                            opts.success();
                        }
                    },
                    error: function (xhr) {
                        window.sky = xhr;
                        alert("Error!");
                    }
                });                    
            }
        }
    });
    
    return false;
}
