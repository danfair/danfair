<?php 
    get_header();
    the_post();
?>
        <section class="hero-area">
            <div class="hero-area__text-container">
                <h1 class="white-text">DAN FAIR</h1>
                <?php the_content(); ?>
                <a href="#portfolio" class="btn btn--orange see-work-button">See my work<div class="btn__arrow white down"></div></a>
            </div>
        </section>
        <section id="portfolio" class="portfolio max-width-wrapper">
            <h3 class="orange-text">PORTFOLIO</h3>
            <div class="portfolio__project">
                <p>Something</p>
            </div>
        </section>
    </body>
</html>
<?php get_footer(); ?>