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
    
    var dom = opts.dom || document.getElementById(container);
    jQuery(dom).addClass('about-to-delete');
    jQuery(dom).effect('pulsate', { 'times': 3 }, function () {
        if (confirm("Are you sure you want to delete this?")) {
            jQuery.ajax({
                type: 'POST',
                url: postUrl,
                success: function (responseText, textStatus, xhr) {
                    if (xhr.status === 200) {
                        jQuery(dom).hide("fade");
                        jQuery(dom).remove();
                    } else {
                        alert("Error: " + textStatus);
                    }
                    if (opts.success) {
                        opts.success();
                    }
                },
                error: function (xhr) {
                    window.sky = xhr;
                    alert("Error!");
                }
            });
            return true;
        } else {
            jQuery(dom).removeClass('about-to-delete');
            return false;
        }
    });
}
