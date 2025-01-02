
/* Timeline additional functionality ---  not really needed */
document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.querySelector('.timeline-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    timeline.addEventListener('mousedown', (e) => {
        isDown = true;
        timeline.classList.add('active');
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });

    timeline.addEventListener('mouseleave', () => {
        isDown = false;
        timeline.classList.remove('active');
    });

    timeline.addEventListener('mouseup', () => {
        isDown = false;
        timeline.classList.remove('active');
    });

    timeline.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        timeline.scrollLeft = scrollLeft - walk;
    });
});


/* Button Layout similar to tabs layout */

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.material-btn');
    const materialTitle = document.getElementById('material-title');
    const materialDescription = document.getElementById('material-description');

    // Function to update the material details
    function updateDetails(title, description) {
        materialTitle.textContent = title;
        materialDescription.textContent = description;
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const title = button.dataset.title;
            const description = button.dataset.description;
            updateDetails(title, description);
        });
    });
});