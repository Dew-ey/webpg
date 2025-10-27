$(document).ready(function() {
    // Toggle subentries when clicking the main entry row
    $('.parent-entry > .entry-row').click(function() {
        $(this).siblings('.sub-entries').slideToggle(150);
    });

    // Load Markdown for subentries
    $('.sub-entry').click(function(e) {
        e.stopPropagation(); // prevent parent toggle
        const file = $(this).data('file');
        fetch(file)
            .then(res => res.text())
            .then(text => {
                $('#md-display').html(marked.parse(text));
            })
            .catch(err => {
                $('#md-display').html('<p style="color:red;">Error loading file.</p>');
                console.error(err);
            });
    });
});