gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const textOverlay = document.getElementById('textOverlay1');

    // Ensure video metadata is loaded
    video.addEventListener('loadedmetadata', () => {
        const videoDuration = video.duration;

        // Variables to control the timing for the text
        const textStartTime = 5; // Time in seconds when the text should appear
        const textDuration = 2; // Duration for the text to stay visible

        // Show the text overlay at the specified time
        video.addEventListener('timeupdate', () => {
            if (video.currentTime >= textStartTime && video.currentTime <= textStartTime + 0.1) {
                gsap.fromTo(textOverlay, 
                    { opacity: 0, display: 'none' }, 
                    { 
                        opacity: 1, 
                        display: 'block', 
                        duration: 1, 
                        onComplete: () => {
                            gsap.delayedCall(textDuration, () => { 
                                gsap.to(textOverlay, { opacity: 0, duration: 1 });
                                gsap.delayedCall(1, () => {
                                    textOverlay.style.display = 'none';
                                });
                            });
                        }
                    }
                );
            }
        });

    // Start video playback when user scrolls
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            onEnter: () => video.play(),
            once: true  // Ensures this trigger only runs once
        });
    });
});