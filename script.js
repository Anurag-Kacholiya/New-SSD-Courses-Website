// This function runs once the entire DOM is ready
$(function() {

    // --- 1. Live Clock ---
    function updateClock() {
        const now = new Date();
        const formattedTime = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });
        $('#clock').text(formattedTime);
    }
    // Update the clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display clock immediately

    // --- 2. Dynamic Styling for Schedule Tables ---
    const today = new Date();
    // Set hours to 0 to compare dates only
    today.setHours(0, 0, 0, 0); 

    // Find all schedule tables and iterate through their rows
    $('#schedule table tbody tr, #lab table tbody tr').each(function() {
        const row = $(this);
        // Date is usually in the second column (index 1)
        const dateCell = row.children('td').eq(1);
        if (dateCell) {
            const dateText = dateCell.text();
            const match = dateText.match(/(\d{1,2})-([A-Za-z]{3})-(\d{2,4})/); // Matches DD-MMM-YY or DD-MMM-YYYY
            
            if (match) {
                const day = match[1];
                const month = match[2];
                const year = `20${match[3]}`; // Assuming 21st century
                const eventDate = new Date(`${month} ${day}, ${year}`);
                
                if (eventDate < today) {
                    row.addClass('past-event');
                }
            }
        }
    });

    // --- 3. Smooth Scrolling for Navbar Links ---
    $('.navbar-nav a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70 // Adjust for fixed navbar height
            }, 800);
        }
    });

});